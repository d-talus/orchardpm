/* Inline SVG icons, all drawn with currentColor so they inherit the icon-badge
   color in both light and dark sections.

   The eight `service` icons are the Orchard Property Management brand service
   icons from the brand package (4 Service Icons / SVG (web)), converted from
   fixed brand hex values to currentColor. Their original viewBoxes are kept, so
   a non-square icon scales to fit its box instead of stretching.

   Everything else is drawn on a 24x24 grid with a 1.6px stroke to match. */

const S = (paths, viewBox = '0 0 24 24') =>
  `<svg viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;

/* Brand service icon: heavier strokes on a larger grid, accents at half opacity
   so the secondary detail still reads on an evergreen background. */
const B = (viewBox, strokeWidth, paths) =>
  `<svg viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="16" aria-hidden="true" focusable="false">${paths}</svg>`;

export const icons = {
  /* ---------- the eight executive support services ---------- */
  'corporate-development': B(
    '0 0 573.44 573.44',
    32,
    '<path d="M58.72,46.72h456c6.63,0,12,5.37,12,12v316c0,6.63-5.37,12-12,12h-456c-6.63,0-12-5.37-12-12v-316C46.72,52.09,52.09,46.72,58.72,46.72z"/><path d="M286.72,386.72v80 M186.72,526.72l100-60l100,60"/><path d="M126.72,306.72l100-100l80,60l140-140" opacity="0.55"/>'
  ),
  'finance-accounting': B(
    '0 0 573.44 554.19',
    30.8,
    '<path d="M46.12,508.07h481.2"/><path d="M103.86,508.07V354.09 M219.35,508.07V277.1 M334.84,508.07V315.59 M450.33,508.07V180.86"/><path d="M65.37,257.85L200.1,142.36l115.49,57.74L488.83,46.12 M392.58,46.12h96.24v96.24" opacity="0.55"/>'
  ),
  legal: B(
    '0 0 573.44 523.31',
    28.64,
    '<path d="M286.72,48.62v411.75 M179.31,478.27h214.83 M107.7,120.23h358.04"/><path d="M107.7,120.23L45.04,281.35h125.31L107.7,120.23z M465.74,120.23l-62.66,161.12H528.4L465.74,120.23z"/><circle cx="286.72" cy="66.52" r="35.8" fill="currentColor" stroke="none" opacity="0.55"/>'
  ),
  'lean-implementation': B(
    '0 0 573.44 507.02',
    34.13,
    '<path d="M478.72,168.18C427.36,62.14,299.77,17.81,193.73,69.17c-43.2,20.92-78.09,55.81-99.01,99.01"/><path d="M94.72,338.85c51.36,106.04,178.95,150.37,284.99,99.01c43.2-20.92,78.09-55.81,99.01-99.01"/><path d="M30.72,104.18l128,21.33L73.39,232.18L30.72,104.18z M542.72,402.85l-128-21.33l85.33-106.67L542.72,402.85z" fill="currentColor" stroke="none"/><circle cx="286.72" cy="253.51" r="64" fill="currentColor" stroke="none" opacity="0.55"/>'
  ),
  'human-resources': B(
    '0 0 573.44 443.44',
    32,
    '<circle cx="186.72" cy="116.72" r="70"/><path d="M46.72,396.72c0-100,60-160,140-160s140,60,140,160"/><circle cx="406.72" cy="136.72" r="60" opacity="0.55"/><path d="M346.72,256.72c80-20,180,20,180,140" opacity="0.55"/>'
  ),
  tax: B(
    '0 0 573.44 782.42',
    41.8,
    '<path d="M51.62,51.62h313.47l156.73,156.73V730.8H51.62V51.62z"/><path d="M365.09,51.62v156.73h156.73"/><path d="M143.05,273.66h130.61 M143.05,378.15h274.29"/><path d="M182.23,639.37l208.98-156.73" opacity="0.55"/><circle cx="201.82" cy="502.23" r="36.57" opacity="0.55"/><circle cx="371.62" cy="619.78" r="36.57" opacity="0.55"/>'
  ),
  sales: B(
    '0 0 573.44 573.44',
    32,
    '<path d="M46.72,296.72l250-250h210c13.33,0,20,6.67,20,20v210l-250,250L46.72,296.72z"/><circle cx="416.72" cy="156.72" r="36"/><path d="M336.72,236.72c-20-25-90-25-90,20c0,40,90,30,90,80c0,45-75,45-100,20 M291.72,186.72v220" opacity="0.55"/>'
  ),
  marketing: B(
    '0 0 573.44 479.36',
    31.69,
    '<path d="M125.79,165.4L363.47,46.57v356.52L125.79,284.24V165.4z"/><path d="M54.57,165.4h63.23c4.42,0,8,3.58,8,8v102.84c0,4.42-3.58,8-8,8H54.57c-4.42,0-8-3.58-8-8V173.4C46.57,168.99,50.15,165.4,54.57,165.4z"/><path d="M165.4,304.05l39.61,128.74h59.42l-29.71-99.03"/><path d="M432.79,155.5c26.41,46.22,26.41,92.43,0,138.65 M492.21,96.08c46.22,85.83,46.22,171.66,0,257.49" opacity="0.55"/>'
  ),

  /* ---------- property types and general interface ---------- */
  building: S('<path d="M4 20.5V5.2a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v15.3"/><path d="M13 10h6a1 1 0 0 1 1 1v9.5"/><path d="M2.5 20.5h19"/><path d="M6.8 7.8h3.4M6.8 11.3h3.4M6.8 14.8h3.4M15.8 13h1.6M15.8 16.4h1.6"/>'),
  house: S('<path d="M3.5 10.6 12 3.8l8.5 6.8"/><path d="M5.6 12.3v8.2h12.8v-8.2"/><path d="M10 20.5v-5h4v5"/>'),
  community: S('<path d="M3 20.5h18"/><path d="M5 20.5V9.4l4.2-2.8V20.5"/><path d="M9.2 20.5V11l5.6-3.6v13.1"/><path d="M14.8 20.5v-7.2L19 15.7v4.8"/>'),
  key: S('<circle cx="8" cy="12" r="4.2"/><path d="M12.2 12H21"/><path d="M17.6 12v3.2M20 12v2.3"/>'),
  wrench: S('<path d="M15.5 3.5a5 5 0 0 0-5.9 6.6L3.9 15.8a2 2 0 0 0 2.8 2.8l5.7-5.7a5 5 0 0 0 6.6-5.9l-2.8 2.8-2.6-.7-.7-2.6 2.6-2.9Z"/>'),
  handshake: S('<path d="m9 12 2 2a1.6 1.6 0 0 0 2.3 0l3.2-3.2"/><path d="M3 9.5 6.5 6h4L13 8l-2.2 2.2a1.5 1.5 0 0 1-2.1 0L7.5 9"/><path d="M21 9.5 17.5 6h-4"/><path d="M3 9.5v5l3 3 2-2M21 9.5v5l-3 3-2.5-2.5"/>'),
  shield: S('<path d="M12 3 5 6v5.5c0 4.2 2.9 7.6 7 9.5 4.1-1.9 7-5.3 7-9.5V6l-7-3Z"/><path d="m9 12 2.2 2.2L15.5 10"/>'),
  users: S('<circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 5.5a3 3 0 0 1 0 5.8"/><path d="M17.5 14.2A5.5 5.5 0 0 1 20.5 19"/>'),
  chart: S('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
  clock: S('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 1.8"/>'),
  lock: S('<rect x="4.5" y="10" width="15" height="10.5" rx="2.5"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/>'),
  calendar: S('<rect x="3.5" y="5.5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3.5v4M16 3.5v4"/>'),
  growth: S('<path d="M3 17.5 9 11l3.5 3.5L21 6"/><path d="M15.5 6H21v5.5"/>'),
  document: S('<path d="M13.5 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l-5.5-5.5Z"/><path d="M13.5 3.5V9H19"/><path d="M8.5 13h7M8.5 16.5h5"/>'),
  map: S('<path d="M9 4.5 3.5 6.8v12.7L9 17.2l6 2.3 5.5-2.3V4.5L15 6.8 9 4.5Z"/><path d="M9 4.5v12.7M15 6.8v12.7"/>'),
  mail: S('<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="m3.8 7 7.1 5.3a2 2 0 0 0 2.2 0L20.2 7"/>'),
  leaf: S('<path d="M19.5 4.5c0 9-5 13.5-11.2 13.5A4.3 4.3 0 0 1 4 13.7C4 7.9 10.4 5.6 19.5 4.5Z"/><path d="M4.5 20c2.2-4.6 5.6-8 10.2-10.2"/>'),
  bolt: S('<path d="M13.5 3 5.6 13.2h5.3L10 21l8-10.4h-5.4L13.5 3Z"/>'),
  drop: S('<path d="M12 3.2s5.5 5.6 5.5 9.3a5.5 5.5 0 0 1-11 0C6.5 8.8 12 3.2 12 3.2Z"/><path d="M9.5 13.2a2.6 2.6 0 0 0 2.6 2.6"/>'),
  menu: S('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  close: S('<path d="M6 6l12 12M18 6 6 18"/>'),
};

export function icon(name) {
  return icons[name] || icons.building;
}

export function iconBadge(name) {
  return `<span class="icon-badge">${icon(name)}</span>`;
}
