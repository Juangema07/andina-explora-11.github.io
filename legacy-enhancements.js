/* Compatibilidad y arranque seguro de Andina Explora.
   Este archivo evita que el cargador quede bloqueado si algún recurso externo
   o una mejora opcional de JavaScript falla. */
(function () {
  'use strict';

  function releaseLoader() {
    if (document.body) document.body.classList.add('loaded');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', releaseLoader, { once: true });
  } else {
    releaseLoader();
  }

  // Último respaldo: la página nunca debe quedar detrás de la pantalla de carga.
  window.setTimeout(releaseLoader, 3500);
})();
