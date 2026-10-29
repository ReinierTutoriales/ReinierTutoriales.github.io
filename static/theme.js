(function () {
  'use strict';
  var root = document.documentElement;
  var initialTheme = function () { return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; };
  var preference = initialTheme();
  var transition;
  var valid = function (value) { return value === 'light' || value === 'dark'; };
  try {
    var stored = window.localStorage.getItem('rt-theme');
    if (valid(stored)) preference = stored;
  } catch (_) { /* Use the initial device appearance if storage is unavailable. */ }
  function apply() {
    var dark = preference === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    var color = document.querySelector('meta[name="theme-color"]');
    if (color) color.setAttribute('content', dark ? '#000000' : '#ffffff');
  }
  apply();
  window.addEventListener('rt-theme-change', function (event) {
    if (!valid(event.detail)) return;
    preference = event.detail;
    try { window.localStorage.setItem('rt-theme', preference); } catch (_) { /* Keep the in-memory preference. */ }
    // Crossfade del cambio de tema con View Transitions cuando está disponible.
    var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (transition) transition.skipTransition();
    if (typeof document.startViewTransition === 'function' && !calm) {
      var current = document.startViewTransition(apply);
      transition = current;
      current.finished.catch(function () {}).then(function () {
        if (transition === current) transition = null;
      });
    } else apply();
  });
  window.addEventListener('storage', function (event) {
    if (event.key !== 'rt-theme' && event.key !== null) return;
    preference = valid(event.newValue) ? event.newValue : initialTheme();
    apply();
  });
})();
