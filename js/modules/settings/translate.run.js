(function () {
    'use strict';

    angular
        .module('app.translate')
        .run(translateRun);

    translateRun.$inject = ['$rootScope', '$translate', '$window'];

    function translateRun($rootScope, $translate, $window) {
        // Internationalization
        // ----------------------

        $rootScope.language = {
            // display always the current ui language
            init: function () {
                var proposedLanguage = $translate.proposedLanguage() || $translate.use();
                var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
                $rootScope.language.selected = proposedLanguage || preferredLanguage;
            },
            set: function (localeId) {
                // Set the new idiom
                $translate.use(localeId);

                window.localStorage.setItem('NG_TRANSLATE_LANG_KEY',localeId);
                // save a reference for the current language
                $rootScope.language.selected = localeId;

                $window.location.reload();
            }
        };

        $rootScope.language.init();

    }
})();