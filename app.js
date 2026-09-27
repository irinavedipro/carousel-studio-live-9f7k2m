// Older cached HTML may ask for app.js from a different release.
// Keep the user's page in place and offer an explicit refresh, instead of booting incompatible code.
(() => {
  const notice=document.createElement('section');
  notice.style.cssText='position:fixed;z-index:9999;inset:16px 16px auto;padding:20px;border:1px solid #f3ecdf;border-radius:18px;background:#151a19;color:#f3ecdf;font:16px/1.5 system-ui;box-shadow:0 12px 40px #0008';
  const text=document.createElement('p');text.textContent='Carousel Studio обновилась. Откройте новую версию, чтобы продолжить работу.';
  const button=document.createElement('button');button.textContent='Открыть новую версию';button.style.cssText='padding:14px 20px;border:0;border-radius:12px;background:#f3ecdf;color:#151a19;font:600 16px system-ui';
  button.addEventListener('click',()=>location.replace(location.pathname+'?release=18'));
  notice.append(text,button);document.body.prepend(notice);
})();
