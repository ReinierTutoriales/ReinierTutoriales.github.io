(function () {
  'use strict';
  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');
  var preference = 'system';
  var transition;
  var valid = function (value) { return value === 'light' || value === 'dark' || value === 'system'; };
  try {
    var stored = window.localStorage.getItem('rt-theme');
    if (valid(stored)) preference = stored;
  } catch (_) { /* The system theme still works if storage is unavailable. */ }
  function apply() {
    var dark = preference === 'dark' || (preference === 'system' && media.matches);
    root.dataset.theme = dark ? 'dark' : 'light';
    root.dataset.themePreference = preference;
    var color = document.querySelector('meta[name="theme-color"]');
    if (color) color.setAttribute('content', dark ? '#000000' : '#ffffff');
  }
  apply();
  media.addEventListener('change', apply);
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
    preference = valid(event.newValue) ? event.newValue : 'system';
    apply();
  });
})();
