(() => {
  'use strict';
  const STORAGE_KEY = 'kenia-privacy-preferences-v1';
  const banner = document.getElementById('cookieBanner');
  const dialog = document.getElementById('privacySettings');
  const analytics = document.getElementById('analyticsConsent');
  const marketing = document.getElementById('marketingConsent');
  const current = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); }
    catch { return null; }
  };
  const integrations = []; // Ningún proveedor de analítica o publicidad está configurado.
  function savePreferences(value) {
    const preferences = {
      necessary: true,
      analytics: Boolean(value.analytics),
      marketing: Boolean(value.marketing),
      updatedAt: new Date().toISOString(),
      version: 1
    };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences)); }
    catch { /* La navegación funciona aunque el navegador no permita almacenamiento local. */ }
    banner?.setAttribute('hidden', '');
    // Cada integración opcional futura debe comprobar la preferencia antes de insertarse.
    integrations.forEach(item => {
      const allowed = item.category === 'analytics' ? preferences.analytics : preferences.marketing;
      if (allowed && typeof item.load === 'function') item.load();
    });
    return preferences;
  }
  function openSettings() {
    const saved = current();
    if (analytics) analytics.checked = Boolean(saved?.analytics);
    if (marketing) marketing.checked = Boolean(saved?.marketing);
    if (dialog && !dialog.open) dialog.showModal();
  }
  function closeSettings() { if (dialog?.open) dialog.close(); }

  if (banner && !current()) banner.hidden = false;
  document.querySelectorAll('[data-open-privacy]').forEach(button => button.addEventListener('click', openSettings));
  document.getElementById('closePrivacy')?.addEventListener('click', closeSettings);
  document.getElementById('rejectOptional')?.addEventListener('click', () => {
    savePreferences({ analytics: false, marketing: false });
  });
  document.getElementById('acceptOptional')?.addEventListener('click', () => {
    savePreferences({ analytics: true, marketing: true });
  });
  document.getElementById('savePrivacy')?.addEventListener('click', () => {
    savePreferences({ analytics: analytics?.checked, marketing: marketing?.checked });
    closeSettings();
  });
  document.getElementById('acceptAllPrivacy')?.addEventListener('click', () => {
    savePreferences({ analytics: true, marketing: true });
    closeSettings();
  });
  dialog?.addEventListener('click', event => { if (event.target === dialog) closeSettings(); });
  if (new URLSearchParams(window.location.search).get('privacy') === '1') openSettings();

  // Google Maps is a third-party request and is created only after an explicit click.
  document.getElementById('loadMap')?.addEventListener('click', () => {
    const mount = document.getElementById('mapMount');
    if (!mount || mount.querySelector('iframe')) return;
    const frame = document.createElement('iframe');
    frame.title = 'Mapa de Panadería y Pastelería Kenia';
    frame.loading = 'lazy';
    frame.referrerPolicy = 'no-referrer-when-downgrade';
    frame.allowFullscreen = true;
    frame.src = 'https://maps.google.com/maps?q=Cl.%2039%20Bis%20Sur%20%2372J-62%2C%20Bogot%C3%A1&t=&z=16&ie=UTF8&iwloc=&output=embed';
    mount.replaceChildren(frame);
  });
})();
