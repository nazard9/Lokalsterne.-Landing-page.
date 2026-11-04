/*
 * Contact form modal. Opens from any link to "#contact-form" (footer
 * "Contact us") and when a page is opened with #contact-form in the URL.
 *
 * Sending: set CONTACT_ENDPOINT to a URL that accepts a JSON POST
 * ({ name, phone, email, message }), e.g. a Formspree / Make / backend URL.
 * While it is empty the form only validates and shows the thank-you state.
 */
(function () {
  'use strict';

  var CONTACT_ENDPOINT = '';

  var dialog, form, errorEl;

  function build() {
    dialog = document.createElement('dialog');
    dialog.className = 'cm-dialog';
    dialog.setAttribute('aria-labelledby', 'cm-title');
    dialog.innerHTML =
      '<div class="cm-body">' +
        '<div class="cm-head">' +
          '<h2 class="cm-title" id="cm-title">Contact form</h2>' +
          '<button type="button" class="cm-close" aria-label="Close"><img src="/contact/close.svg" alt=""></button>' +
        '</div>' +
        '<form class="cm-form" novalidate>' +
          '<div class="cm-fields">' +
            field('cm-name', 'Name *', '<input class="cm-input" id="cm-name" name="name" type="text" autocomplete="name" required autofocus>') +
            field('cm-phone', 'Phone *', '<input class="cm-input" id="cm-phone" name="phone" type="tel" autocomplete="tel" required>') +
            field('cm-email', 'E-Mail-Adresse *', '<input class="cm-input" id="cm-email" name="email" type="email" autocomplete="email" required>') +
            field('cm-message', 'Message', '<textarea class="cm-input" id="cm-message" name="message" rows="4"></textarea>') +
          '</div>' +
          '<label class="cm-consent"><input class="cm-check" type="checkbox" name="consent" required>' +
            '<span>I declare that I have read the <a href="/terms" target="_blank" rel="noopener">terms and conditions</a> and accept their provisions.</span></label>' +
          '<p class="cm-error" role="alert" hidden></p>' +
          '<button type="submit" class="cm-send">Send</button>' +
        '</form>' +
      '</div>';
    document.body.appendChild(dialog);

    form = dialog.querySelector('form');
    errorEl = dialog.querySelector('.cm-error');

    dialog.querySelector('.cm-close').addEventListener('click', close);
    // click on the backdrop (outside the card) closes
    dialog.addEventListener('click', function (e) { if (e.target === dialog) close(); });
    dialog.addEventListener('close', function () {
      document.documentElement.classList.remove('cm-lock');
      if (location.hash === '#contact-form') {
        history.replaceState(null, '', location.pathname + location.search);
      }
    });
    form.addEventListener('submit', submit);
  }

  function field(id, label, control) {
    return '<div class="cm-field"><label class="cm-label" for="' + id + '">' + label + '</label>' + control + '</div>';
  }

  function open() {
    if (!dialog) build();
    if (dialog.open) return;
    errorEl.hidden = true;
    dialog.showModal();
    document.documentElement.classList.add('cm-lock');
  }

  function close() { if (dialog && dialog.open) dialog.close(); }

  function submit(e) {
    e.preventDefault();
    errorEl.hidden = true;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    var val = function (n) { return form.elements.namedItem(n).value.trim(); };
    var data = { name: val('name'), phone: val('phone'), email: val('email'), message: val('message') };
    var btn = form.querySelector('.cm-send');
    btn.disabled = true;

    var send = CONTACT_ENDPOINT
      ? fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data)
        }).then(function (r) { if (!r.ok) throw new Error(r.status); })
      : Promise.resolve();

    send.then(function () {
      form.reset();
      showDone();
    }).catch(function () {
      errorEl.textContent = 'Something went wrong. Please try again.';
      errorEl.hidden = false;
    }).then(function () { btn.disabled = false; });
  }

  function showDone() {
    var body = dialog.querySelector('.cm-body');
    var formView = body.querySelector('.cm-form');
    formView.hidden = true;
    var done = document.createElement('div');
    done.className = 'cm-form';
    done.innerHTML = '<p class="cm-done">Thank you! Your message has been sent. We will get back to you soon.</p>' +
      '<button type="button" class="cm-send">Close</button>';
    done.querySelector('button').addEventListener('click', close);
    body.appendChild(done);
    dialog.querySelector('#cm-title').textContent = 'Thank you';
    dialog.addEventListener('close', function reset() {
      dialog.removeEventListener('close', reset);
      done.remove();
      formView.hidden = false;
      dialog.querySelector('#cm-title').textContent = 'Contact form';
    });
  }

  // Delegated, so it works on React-hydrated pages without touching their DOM.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href="#contact-form"]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    open();
  });

  function fromHash() { if (location.hash === '#contact-form') open(); }
  window.addEventListener('hashchange', fromHash);
  if (document.readyState === 'complete') fromHash();
  else window.addEventListener('load', fromHash);

  // Header logo: always do a full reload of the home page, scrolled to the top
  // (instead of Next.js client navigation / restoring the previous scroll).
  // Capture phase so it runs before the Next.js <Link> handler.
  var TOP_FLAG = 'ls-scroll-top';
  window.addEventListener('click', function (e) {
    var logo = e.target.closest && e.target.closest('header a[aria-label="LokalSterne — home"]');
    if (!logo || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    e.stopPropagation();
    try { sessionStorage.setItem(TOP_FLAG, '1'); } catch (err) {}
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    location.assign('/');
  }, true);
  try {
    if (sessionStorage.getItem(TOP_FLAG)) {
      sessionStorage.removeItem(TOP_FLAG);
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      var toTop = function () { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); };
      toTop();
      window.addEventListener('load', function () {
        toTop();
        // hand scroll restoration back to the browser (for normal reloads)
        // only after it has had its chance to restore the old position
        setTimeout(function () {
          toTop();
          if ('scrollRestoration' in history) history.scrollRestoration = 'auto';
        }, 400);
      });
    }
  } catch (err) {}

  // Mobile menu toggle for the static pages (Terms, Privacy) that do not run React.
  if (document.body && document.body.hasAttribute('data-static')) {
    var btn = document.querySelector('[aria-controls="mobile-menu"]');
    var menu = document.getElementById('mobile-menu');
    if (btn && menu) {
      btn.addEventListener('click', function () {
        var isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!isOpen));
        menu.hidden = isOpen;
      });
    }
  }
})();
