/* Progressive enhancement only. Every page works with JavaScript turned off:
   the nav list is visible at desktop widths, and the forms are ordinary POSTs. */

(function () {
  'use strict';

  /* ---- mobile navigation ---- */
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.getElementById('site-nav');

  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      var open = panel.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) {
        panel.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        panel.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- forms ---- */
  var forms = document.querySelectorAll('.js-lead-form');

  Array.prototype.forEach.call(forms, function (form) {
    var status = form.querySelector('.js-form-status');
    var submit = form.querySelector('.js-submit');

    function show(message, ok) {
      if (!status) return;
      status.textContent = message;
      status.className = 'form-status js-form-status ' + (ok ? 'form-status--ok' : 'form-status--err');
      status.hidden = false;
      status.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    form.addEventListener('submit', function (e) {
      // Let the browser handle its own validation messages first.
      if (!form.checkValidity()) {
        form.reportValidity();
        e.preventDefault();
        return;
      }

      e.preventDefault();
      var original = submit ? submit.textContent : '';
      if (submit) {
        submit.disabled = true;
        submit.textContent = 'Sending…';
      }

      fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
        .then(function (res) {
          return res.json().catch(function () {
            return { ok: res.ok };
          });
        })
        .then(function (data) {
          if (data && data.ok) {
            form.reset();
            show('Thank you. Your message is with us and we will reply within one business day.', true);
          } else {
            show((data && data.error) || 'Something went wrong on our end. Please email dgobbo@talusholdings.com and we will pick it up there.', false);
          }
        })
        .catch(function () {
          show('We could not send that from here. Please email dgobbo@talusholdings.com and we will pick it up there.', false);
        })
        .then(function () {
          if (submit) {
            submit.disabled = false;
            submit.textContent = original;
          }
        });
    });
  });
})();
