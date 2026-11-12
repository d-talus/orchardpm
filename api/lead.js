/* Vercel serverless function that receives every form on the site.
 *
 * It validates, drops obvious spam, and then forwards the lead to whichever
 * destination is configured through environment variables. With none set it
 * still returns success and logs the lead, so the site never breaks in preview.
 *
 * Environment variables (set any or all in the Vercel project settings):
 *   LEAD_WEBHOOK_URL     Any HTTPS endpoint that accepts a JSON POST.
 *                        Works with HubSpot workflows, Zapier, Make, Slack.
 *   HUBSPOT_PORTAL_ID    HubSpot account id, used with HUBSPOT_FORM_GUID to post
 *   HUBSPOT_FORM_GUID    straight into a HubSpot form.
 *   RESEND_API_KEY       Send the lead as email through Resend.
 *   LEAD_EMAIL_TO        Where that email goes. Defaults to the founder address.
 *   LEAD_EMAIL_FROM      Verified sender for Resend, e.g. "site@orchardpropertymgmt.com".
 */

const FOUNDER_EMAIL = 'dgobbo@talusholdings.com';

const FORM_LABELS = {
  'seller-inquiry': 'Seller inquiry',
  'careers-application': 'Careers application',
  'general-contact': 'General contact',
};

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 100_000) reject(new Error('payload too large'));
    });
    req.on('end', () => resolve(raw));
    req.on('error', reject);
  });
}

async function parseRequest(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;

  const type = String(req.headers['content-type'] || '');
  const raw = typeof req.body === 'string' ? req.body : await readBody(req);

  if (type.includes('application/json')) {
    try { return JSON.parse(raw); } catch { return {}; }
  }
  // Both urlencoded and multipart arrive here; URLSearchParams covers urlencoded,
  // and Vercel's Node runtime parses multipart into req.body for us.
  return Object.fromEntries(new URLSearchParams(raw));
}

function clean(value, max = 2000) {
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(data) {
  const errors = [];
  const form = clean(data.form, 60);
  if (!FORM_LABELS[form]) errors.push('Unknown form.');

  const email = clean(data.email, 254).toLowerCase();
  if (!EMAIL_RE.test(email)) errors.push('Please enter a valid email address.');

  const first = clean(data.first_name, 80);
  const last = clean(data.last_name, 80);
  if (!first || !last) errors.push('Please enter your first and last name.');

  if (form === 'seller-inquiry' || form === 'careers-application') {
    const phone = clean(data.phone, 40).replace(/[^\d]/g, '');
    if (phone.length < 10) errors.push('Please enter a phone number we can reach you on.');
  }
  if (form === 'general-contact' && !clean(data.message, 20)) {
    errors.push('Please include a message.');
  }

  return { form, email, first, last, errors };
}

async function forward(payload) {
  const sent = [];

  if (process.env.LEAD_WEBHOOK_URL) {
    await fetch(process.env.LEAD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    sent.push('webhook');
  }

  if (process.env.HUBSPOT_PORTAL_ID && process.env.HUBSPOT_FORM_GUID) {
    const fields = Object.entries(payload.fields)
      .filter(([, v]) => v)
      .map(([name, value]) => ({ name, value: String(value) }));
    await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_GUID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields, context: { pageUri: payload.pageUri, pageName: payload.formLabel } }),
      }
    );
    sent.push('hubspot');
  }

  if (process.env.RESEND_API_KEY) {
    const rows = Object.entries(payload.fields)
      .filter(([, v]) => v)
      .map(([k, v]) => `<p><strong>${k.replace(/_/g, ' ')}:</strong> ${String(v).replace(/[<>&]/g, '')}</p>`)
      .join('');
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.LEAD_EMAIL_FROM || 'Orchard website <onboarding@resend.dev>',
        to: [process.env.LEAD_EMAIL_TO || FOUNDER_EMAIL],
        reply_to: payload.fields.email,
        subject: `${payload.formLabel}: ${payload.fields.first_name} ${payload.fields.last_name}`,
        html: `<h2>${payload.formLabel}</h2>${rows}<p><small>Sent from ${payload.pageUri || 'orchardpropertymgmt.com'}</small></p>`,
      }),
    });
    sent.push('email');
  }

  return sent;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  let data;
  try {
    data = await parseRequest(req);
  } catch {
    return res.status(400).json({ ok: false, error: 'We could not read that submission.' });
  }

  // Honeypot: a real person never fills this in.
  if (clean(data.company_website)) {
    return res.status(200).json({ ok: true });
  }

  const { form, email, first, last, errors } = validate(data);
  if (errors.length) {
    return res.status(400).json({ ok: false, error: errors[0] });
  }

  const fields = {};
  for (const [key, value] of Object.entries(data)) {
    if (key === 'company_website' || key === 'form') continue;
    const v = clean(value, key === 'message' ? 4000 : 300);
    if (v) fields[key] = v;
  }
  fields.first_name = first;
  fields.last_name = last;
  fields.email = email;

  const payload = {
    form,
    formLabel: FORM_LABELS[form],
    fields,
    pageUri: String(req.headers.referer || ''),
    receivedAt: new Date().toISOString(),
  };

  try {
    const sent = await forward(payload);
    if (!sent.length) {
      // Nothing configured yet. Keep the lead in the function log so it is not lost.
      console.log('[lead] no delivery target configured', JSON.stringify(payload));
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[lead] delivery failed', err, JSON.stringify(payload));
    return res.status(502).json({
      ok: false,
      error: `We could not send that from here. Please email ${FOUNDER_EMAIL} and we will pick it up there.`,
    });
  }
}
