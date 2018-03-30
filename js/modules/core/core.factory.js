(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('customeInterceptor', customeInterceptor);

    customeInterceptor.$inject = ['$rootScope', '$timeout', '$injector', '$q','$window'];

    function customeInterceptor($rootScope, $timeout, $injector, $q, $window) {
        var requestInitiated;

        function showLoadingText() {
            $rootScope.isShowLoadingSpinner = true;
        };

        function hideLoadingText() {
            $rootScope.isShowLoadingSpinner = false;
        };

        return {
            request: function (config) {
                if(config.method !== "GET"){
                    requestInitiated = true;
                    showLoadingText();
                }
                return config;
            },
            response: function (response) {
                requestInitiated = false;

                // Show delay of 300ms so the popup will not appear for multiple http request
                $timeout(function () {

                    if (requestInitiated) return;
                    hideLoadingText();

                }, 300);

                return response;
            },
            requestError: function (err) {
                hideLoadingText();
                return err;
            },
            responseError: function (err) {
                hideLoadingText();
                return $q.reject(err);
            }
        }
    }

})();