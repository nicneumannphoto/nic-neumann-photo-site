/*
 * booking-notice.js — "Booking closed for 2026" popup.
 * Shows once per browser session on any page except inquire.html
 * (that page has its own banner above the form). Turns itself off Jan 1, 2027 (Mountain Time).
 */
(function () {
  var EXPIRES = new Date('2027-01-01T00:00:00-07:00');
  if (new Date() >= EXPIRES) return;
  if (/inquire\.html$/.test(location.pathname)) return;
  try { if (sessionStorage.getItem('nnpNoticeSeen')) return; } catch (e) {}

  var EMAIL = 'hello@nicneumannphoto.com';
  var referral = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Photographer referral request') +
    '&body=' + encodeURIComponent('Hi Nic, I would love a referral. My date is: ');

  var css =
    '.nnp-ov{position:fixed;inset:0;z-index:9999;background:rgba(55,32,23,.55);display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity .5s ease}' +
    '.nnp-ov.on{opacity:1}' +
    '.nnp-md{position:relative;background:#FAF2EB;color:#372017;max-width:720px;width:100%;padding:60px 72px 44px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:18px;box-shadow:0 20px 60px rgba(55,32,23,.3);outline:1px solid #C1AD8C;outline-offset:-10px;max-height:calc(100vh - 40px);max-height:calc(100dvh - 40px);overflow-y:auto}' +
    '@media (max-height:640px),(max-width:480px){.nnp-md{padding:40px 22px 24px;gap:12px}.nnp-md h2{font-size:24px}.nnp-md img{width:44px}}' +
    '.nnp-md img{width:56px;height:auto}' +
    '.nnp-ey{font:500 11px/1 Figtree,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#716A43}' +
    '.nnp-md h2{margin:0;font:400 30px/1.15 "Crimson Pro",Georgia,serif;letter-spacing:.06em;text-transform:uppercase;text-wrap:balance}' +
    '.nnp-md p{margin:0;font:400 15px/1.7 Figtree,sans-serif;text-wrap:pretty}' +
    '.nnp-ac{display:flex;flex-direction:column;gap:10px;width:100%;padding-top:6px}' +
    '.nnp-bt{display:block;padding:16px 20px;text-decoration:none;font:500 12px/1 Figtree,sans-serif;letter-spacing:.2em;text-transform:uppercase;border:1px solid #716A43}' +
    '.nnp-p{background:#716A43;color:#FAF2EB!important}.nnp-p:hover{background:#372017;border-color:#372017}' +
    '.nnp-g{background:transparent;color:#372017!important}.nnp-g:hover{background:#372017;color:#FAF2EB!important;border-color:#372017}' +
    '.nnp-x{position:absolute;top:18px;right:18px;width:40px;height:40px;border:1px solid #372017;border-radius:50%;background:transparent;color:#372017;font-size:18px;line-height:1;cursor:pointer}' +
    '.nnp-x:hover{background:#372017;color:#FAF2EB}';

  function show() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var ov = document.createElement('div');
    ov.className = 'nnp-ov';
    ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-labelledby', 'nnp-title');
    ov.innerHTML =
      '<div class="nnp-md">' +
        '<button class="nnp-x" aria-label="Close">&times;</button>' +
        '<img src="assets/mark-brown.png" alt="">' +
        '<span class="nnp-ey">A quick note</span>' +
        '<h2 id="nnp-title">Booking is closed for the rest of 2026</h2>' +
        '<p>Thank you so much for thinking of me! My calendar is full through the end of 2026, so every current client gets my full attention and their gallery right on time. I’m happily booking 2027 and 2028 dates and would love to hear about yours.</p>' +
        '<p>Need a photographer sooner? I’m glad to refer you to talented local photographers I know and trust.</p>' +
        '<div class="nnp-ac">' +
          '<a class="nnp-bt nnp-p" href="inquire.html">Inquire about 2027 &amp; 2028</a>' +
          '<a class="nnp-bt nnp-g" href="' + referral + '">Ask for a referral</a>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ov);
    function close() {
      ov.classList.remove('on');
      setTimeout(function () { ov.remove(); }, 500);
      try { sessionStorage.setItem('nnpNoticeSeen', '1'); } catch (e) {}
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e) { if (e.key === 'Escape') close(); }
    ov.addEventListener('click', function (e) {
      if (e.target === ov || e.target.classList.contains('nnp-x')) close();
      else if (e.target.closest('.nnp-bt')) { try { sessionStorage.setItem('nnpNoticeSeen', '1'); } catch (e2) {} }
    });
    document.addEventListener('keydown', onKey);
    requestAnimationFrame(function () { ov.classList.add('on'); });
  }
  setTimeout(show, 900);
})();
