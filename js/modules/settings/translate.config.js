(function() {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig)
        ;
    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider){

      $translateProvider.useStaticFilesLoader({
          prefix : 'i18n/',
          suffix : '.json'
      });

      $translateProvider.preferredLanguage((window.navigator.language || window.navigator.language).indexOf('zh') !== -1 ? 'zh-CN' : 'en');
      $translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

    }
})();