/*
 * Animated illustrations for the "More customers with intelligent reviews"
 * cards (#features). Rebuilt from the Figma prototype: each card's image is
 * layered markup whose layers interpolate between the two component
 * variants while the card is hovered (see features-anim.css).
 *
 * The page is a hydrated Next.js export, so the layers are mounted only
 * after React has hydrated the card images; the original static PNG stays
 * in the DOM (hidden) and remains the fallback if this script fails.
 */
(function () {
  'use strict';

  var A = '/features/anim/';
  var CX = 415.67 / 2;
  var CY = 275 / 2;

  function n(v) { return Math.round(v * 1000) / 1000 + 'px'; }

  /* Static absolutely-positioned box. */
  function S(cls, x, y, w, h, inner, extraStyle) {
    return '<div class="fa-s ' + (cls || '') + '" style="left:' + n(x) + ';top:' + n(y) +
      ';width:' + n(w) + ';height:' + n(h) + ';' + (extraStyle || '') + '">' + (inner || '') + '</div>';
  }

  /* Animated layer: `a` = variant 1, `b` = overrides for variant 2. */
  function L(cls, a, b, inner) {
    b = b || {};
    var keys = ['x', 'y', 'w', 'h'];
    var st = '';
    keys.forEach(function (k) {
      st += '--' + k + '1:' + n(a[k]) + ';--' + k + '2:' + n(k in b ? b[k] : a[k]) + ';';
    });
    var o1 = 'o' in a ? a.o : 1;
    st += '--o1:' + o1 + ';--o2:' + ('o' in b ? b.o : o1) + ';';
    var t1 = a.t || 'none';
    st += '--t1:' + t1 + ';--t2:' + (b.t || t1) + ';';
    return '<div class="fa-l ' + (cls || '') + '" style="' + st + '">' + (inner || '') + '</div>';
  }

  /* Same, positioned by centre offset from the stage centre. */
  function C(cls, a, b, inner) {
    function conv(s, base) {
      var r = {};
      for (var k in s) r[k] = s[k];
      var w = 'w' in s ? s.w : base.w, h = 'h' in s ? s.h : base.h;
      if ('cx' in s || 'w' in s) r.x = CX + ('cx' in s ? s.cx : base.cx) - w / 2;
      if ('cy' in s || 'h' in s) r.y = CY + ('cy' in s ? s.cy : base.cy) - h / 2;
      return r;
    }
    return L(cls, conv(a, a), b ? conv(b, a) : null, inner);
  }

  function img(src, cls, style) {
    return '<img alt="" src="' + A + src + '"' + (cls ? ' class="' + cls + '"' : '') +
      (style ? ' style="' + style + '"' : '') + '>';
  }
  function fill(src) { return img(src, 'fa-fill'); }
  function xfade(a, b) { return img(a, 'fa-fill fa-xa') + img(b, 'fa-fill fa-xb'); }
  function crop(src, l, t, w, h) {
    return img(src, 'fa-crop', 'left:' + l + '%;top:' + t + '%;width:' + w + '%;height:' + h + '%');
  }

  function map(src, cx, cy, size) {
    var w = size * 1.73205; // width of the rotated + skewed box (Figma export)
    return S('fa-map', CX + cx - w / 2, CY + cy - size / 2, w, size,
      '<div style="width:' + n(size) + ';height:' + n(size) + '">' + fill(src) + '</div>');
  }

  /* ------------------------------------------------------------------ */
  /* Card 1 — More visibility                                            */
  /* ------------------------------------------------------------------ */
  function visibility() {
    var av = [
      // [src, size, x1, y1, x2, y2] (relative to Frame 154 at 37,26)
      ['v-avatar1.jpg', 43, 0, 36, 0, 66],
      ['v-avatar2.jpg', 56, 99, -50, 89, 0],
      ['v-avatar3.jpg', 51, 25, 189, 55, 170, [-22.55, -23.68, 145.1, 217.65]],
      ['v-avatar4.jpg', 56, 302, 174, 252, 159],
      ['v-avatar5.jpg', 41, 289, 8, 247, 33]
    ].map(function (a) {
      var inner = a[6] ? crop(a[0], a[6][0], a[6][1], a[6][2], a[6][3]) : img(a[0]);
      return L('fa-av', { x: 37 + a[2], y: 26 + a[3], w: a[1], h: a[1] },
        { x: 37 + a[4], y: 26 + a[5] }, inner);
    }).join('');

    var pinS = 38.919 / 56;
    return '<div class="fa-s fa-v" style="inset:0"></div>' +
      map('v-map.svg', 0.17, 0.42, 628.34) +
      L('', { x: 56, y: 5, w: 305, h: 305, o: 0 }, { o: 1 }, fill('v-e20-b.svg')) +
      L('', { x: 38, y: -13, w: 341, h: 341, o: 0 }, { o: 1 }, fill('v-e19-b.svg')) +
      L('', { x: 98, y: 47, w: 221, h: 221 }, null, xfade('v-e16-a.svg', 'v-e16-b.svg')) +
      L('fa-ring', { x: 178, y: 127, w: 61, h: 61, o: 0.5 }, { x: -55, y: -106, w: 527, h: 527, o: 1 }) +
      L('fa-ring', { x: 164, y: 113, w: 89, h: 89, o: 0.5 }, { x: -118, y: -169, w: 653, h: 653, o: 1 }) +
      L('', { x: 145, y: 94, w: 127, h: 127 }, { x: 133, y: 82, w: 151, h: 151 },
        xfade('v-e17-a.svg', 'v-e17-b.svg')) +
      av +
      C('fa-vig-v', { cx: -0.33, cy: 5.5, w: 429, h: 298 }, { w: 559, h: 388 }) +
      C('fa-pin', { cx: 0.17, cy: 12.1, w: 56, h: 56, t: 'translateY(1.92px) scale(' + pinS + ') rotate(45deg)' },
        { t: 'translateY(0px) scale(1) rotate(45deg)' }, img('v-pin.svg'));
  }

  /* ------------------------------------------------------------------ */
  /* Card 2 — Powerful insights                                          */
  /* ------------------------------------------------------------------ */
  function insights() {
    var chartSvg =
      '<svg viewBox="0 0 337 100" preserveAspectRatio="none" aria-hidden="true">' +
      '<defs><linearGradient id="fa-chart-grad" gradientUnits="userSpaceOnUse" x1="160.314" y1="22.541" x2="164.751" y2="96.602">' +
      '<stop stop-color="#2600FF" stop-opacity="0.34"/><stop offset="1" stop-color="#2600FF" stop-opacity="0"/></linearGradient></defs>' +
      '<path fill="url(#fa-chart-grad)" d="M 35.459 79.382 L 0 100 H 337 V 0 L 295.382 8.246 C 285.366 10.23 275.918 15.079 267.869 22.366 L 248.914 39.526 C 242.138 45.66 234.356 50.079 226.058 52.505 L 213.165 56.275 C 201.498 59.687 189.24 59.034 177.883 54.397 L 169.921 51.146 C 153.146 44.297 134.681 46.238 119.205 56.476 L 110.146 62.469 C 100.868 68.607 90.402 71.831 79.758 71.831 H 62.93 C 53.402 71.831 44.002 74.415 35.459 79.382 Z"/>' +
      '<path fill="none" stroke="#2600FF" stroke-width="5" stroke-linecap="round" vector-effect="non-scaling-stroke" d="M 0.938 100 L 36.08 79.453 C 44.654 74.44 54.098 71.831 63.673 71.831 H 80.088 C 90.782 71.831 101.295 68.577 110.604 62.384 L 119.251 56.632 C 134.784 46.3 153.348 44.342 170.195 51.258 L 177.659 54.322 C 189.069 59.007 201.394 59.666 213.119 56.219 L 225.642 52.537 C 233.965 50.09 241.766 45.638 248.551 39.461 L 267.242 22.447 C 275.304 15.108 284.781 10.22 294.832 8.218 L 336.081 0"/>' +
      '</svg>';

    var G = 'i-google.svg', T = 'i-trustpilot.svg';
    var pins = [
      // [icon, scale, c1, c2]
      [T, 77 / 64, [-34.33, 10.46], [-137.33, -72.54]],
      [G, 1, [40.17, -6.12], [-39.83, -76.12]],
      [T, 1, [-139.83, -76.12], [-139.83, -76.12]],
      [G, 1, [-71.83, -54.12], [-41.83, -74.12]],
      [G, 1, [86.17, -82.12], [-43.83, -72.12]],
      [G, 55.341 / 64, [-118.83, 13.5], [-39.16, -74.5]],
      [T, 1, [-4.83, -83.12], [-136.83, -75.12]]
    ].map(function (p) {
      var icon = p[0] === G ? img(G, '', 'width:16px;height:16px') : img(T, '', 'width:18.286px;height:16.762px');
      var html = '<div class="fa-mpin-drop"><div></div></div><div class="fa-mpin-disc">' + icon + '</div>';
      var inner = p[1] === 1 ? html :
        '<div class="fa-fill" style="scale:' + p[1] + '">' + html + '</div>';
      return C('', { cx: p[2][0], cy: p[2][1], w: 64, h: 64.762 }, { cx: p[3][0], cy: p[3][1], o: 0 }, inner);
    }).join('');

    function badge(icon, iw, ih, pl2, lines, top1) {
      return '<div class="fa-badge" style="--pl2:' + pl2 + 'px">' +
        img(icon, '', 'width:' + iw + 'px;height:' + ih + 'px') +
        '<div class="fa-num">' +
        L('fa-num-t', { x: 0, y: top1, w: 30, h: lines.length * 20 }, { y: 5 }, lines.join('\n')) +
        '<div class="fa-num-fade"></div></div></div>';
    }
    var badges = L('fa-badges', { x: 40, y: 40, w: 104, h: 48, o: 0 }, { o: 1, t: 'scale(1.0625)' },
      '<div class="fa-badges-row">' +
      badge('i-badge-google.svg', 26, 26, 6,
        ['102', '95', '88', '65', '60', '58', '​', '54', '48', '40', '44', '42', '32', '28', '12', '05'], -297) +
      badge('i-badge-trustpilot.svg', 28, 26.158, 5,
        ['144', '95', '88', '65', '60', '58', '54', '48', '40', '44', '42', '32', '28', '21', '09'], -275) +
      '</div>');

    return map('i-map.svg', -103.42, -80.81, 395.382) +
      S('fa-chart', -1, 18, 417, 254,
        L('', { x: 40, y: 145, w: 337, h: 85 }, { y: 72, h: 158 }, chartSvg)) +
      C('fa-vig-i', { cx: -5.33, cy: 0.5, w: 427, h: 284 }) +
      pins +
      badges;
  }

  /* ------------------------------------------------------------------ */
  /* Card 3 — More customers                                             */
  /* ------------------------------------------------------------------ */
  function customers() {
    var MX = -102.33, MY = -167; // mask group origin
    var av = [
      // [src, size, x1, y1, x2, y2, crop?, src2?] (stage coordinates)
      ['c-avatar1.jpg', 43, 85.67, 1, 175.67, 171],
      ['c-avatar2.jpg', 37, 302.67, 1, 192.67, 181],
      ['c-avatar3.jpg', 48, 191.67, -9, 191.67, 171, [-29.86, -35.89, 159.72, 239.58]],
      ['c-avatar4.jpg', 51, 138.67, 38, 178.67, 168, [-0.65, -0.65, 101.3, 152.43], 'c-avatar4-b.jpg'],
      ['c-avatar5.jpg', 52, 189.67, 86, 189.67, 196],
      ['c-avatar6.jpg', 41, 248.67, 38, 198.67, 178],
      ['c-avatar7.jpg', 43, 121, -138, 81, -22],
      ['c-avatar8.jpg', 37, 213, -108, 203, 12],
      ['c-avatar9.jpg', 48, 300, -95, 280, -5],
      ['c-avatar10.jpg', 51, 60, -77, 110, 33, [0, -0.84, 100, 150]],
      ['c-avatar11.jpg', 52, 143, -71, 173, 78],
      ['c-avatar12.jpg', 41, 259, -55, 249, 55]
    ].map(function (a) {
      var c = a[6];
      var inner = c ? crop(a[0], c[0], c[1], c[2], c[3]) : img(a[0]);
      if (a[7]) {
        inner = '<div class="fa-fill fa-xa">' + inner + '</div>' +
          img(a[7], 'fa-xb', 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover');
      }
      return L('fa-av', { x: a[2] - MX, y: a[3] - MY, w: a[1], h: a[1] },
        { x: a[4] - MX, y: a[5] - MY }, inner);
    }).join('');

    var arc = '<svg viewBox="0 6.1309 112 112" aria-hidden="true"><path fill="#2600FF" d="M56 11.8306C56 8.68277 58.5583 6.1009 61.6899 6.42074C67.0918 6.97246 72.395 8.308 77.4303 10.3937C84.2245 13.2079 90.3979 17.3329 95.598 22.533C100.798 27.733 104.923 33.9064 107.737 40.7007C109.823 45.736 111.158 51.0392 111.71 56.441C112.03 59.5726 109.448 62.1309 106.3 62.1309C103.152 62.1309 100.638 59.5689 100.237 56.4467C99.7353 52.5431 98.7181 48.7146 97.2056 45.063C94.9642 39.6518 91.679 34.7351 87.5374 30.5935C83.3959 26.452 78.4791 23.1667 73.0679 20.9253C69.4164 19.4128 65.5879 18.3956 61.6842 17.894C58.5621 17.4928 56 14.9785 56 11.8306Z"/></svg>';
    function arcL(deg) {
      return L('fa-arc', { x: 0, y: 0, w: 112, h: 112, t: 'rotate(0deg)' }, { t: 'rotate(' + deg + 'deg)' }, arc);
    }

    var counter = ['+120', '+100', '+90', '+80', '+70', '+60', '+50', '+40', '+40', '+30', '+20', '+'];

    return S('', MX, MY, 619, 442, fill('c-funnel.svg')) +
      S('fa-funnel-mask', MX, MY, 619, 442, av + fill('c-funnel-overlay.svg')) +
      C('fa-vig-c', { cx: 0.33, cy: -1.5, w: 429, h: 284 }, { cx: 0.17, w: 574, h: 380 }) +
      S('', 150.67, 151, 112, 112, xfade('c-e23-a.svg', 'c-e23-b.svg')) +
      S('fa-progress', 151, 151, 112, 112, arcL(0) + arcL(75) + arcL(135) + arcL(135)) +
      L('fa-disc', { x: 163.67, y: 164, w: 86, h: 86 }, { x: 162, y: 162, w: 90, h: 90 }) +
      L('', { x: 178.67, y: 191, w: 56, h: 61.865 }, { y: 182 },
        img('c-user.svg', '', 'position:absolute;left:16.704px;top:0;width:22.593px;height:27.865px') +
        L('fa-cbox', { x: 0, y: 27.865, w: 56, h: 34, o: 0 }, { o: 1 },
          L('fa-num-t', { x: 3, y: -518.9, w: 47, h: 612 }, { y: -9.9 }, counter.join('\n'))));
  }

  var BUILDERS = {
    'visibility.png': visibility,
    'insights.png': insights,
    'customers.png': customers
  };

  /* ------------------------------------------------------------------ */

  function isHydrated(el) {
    for (var k in el) if (k.indexOf('__reactFiber') === 0 || k.indexOf('__reactProps') === 0) return true;
    return false;
  }

  function mount(card, pic, build) {
    var host = pic.parentElement;
    var stage = document.createElement('div');
    stage.className = 'fa-stage';
    stage.setAttribute('aria-hidden', 'true');
    stage.innerHTML = build();
    host.appendChild(stage);
    card.classList.add('fa-card');

    function fit() { stage.style.setProperty('--fa-scale', host.clientWidth / 415.67); }
    fit();
    if (window.ResizeObserver) new ResizeObserver(fit).observe(host);
    else window.addEventListener('resize', fit);

    // Reveal once the layer images are decoded (no half-drawn flash over the
    // static PNG); never wait longer than 2.5s, decode() can stall offscreen.
    var imgs = Array.prototype.slice.call(stage.querySelectorAll('img'));
    var ready = function () { host.classList.add('fa-ready'); };
    Promise.all(imgs.map(function (i) {
      return i.decode ? i.decode().catch(function () {}) : null;
    })).then(ready);
    setTimeout(ready, 2500);

    // Touch screens have no hover: play the variant change when the card
    // scrolls into view instead.
    if (window.matchMedia && window.matchMedia('(hover: none)').matches && window.IntersectionObserver) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { card.classList.toggle('fa-on', e.intersectionRatio >= 0.6); });
      }, { threshold: [0, 0.6, 1] }).observe(card);
    }
  }

  function init() {
    var section = document.getElementById('features');
    if (!section) return;
    var pics = Array.prototype.slice.call(section.querySelectorAll('li img'));
    var jobs = [];
    pics.forEach(function (pic) {
      var file = (pic.getAttribute('src') || '').split('/').pop().split('?')[0];
      var build = BUILDERS[file];
      var card = pic.closest('li');
      if (build && card && !card.classList.contains('fa-card')) jobs.push([card, pic, build]);
    });
    if (!jobs.length) return;

    // Wait for React hydration so the injected nodes never cause a
    // hydration mismatch (give up waiting after ~8s and mount anyway).
    var tries = 0;
    (function wait() {
      if (isHydrated(jobs[0][1]) || tries++ > 80) {
        jobs.forEach(function (j) { mount(j[0], j[1], j[2]); });
      } else {
        setTimeout(wait, 100);
      }
    })();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
