(function() {


    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = [
        '$rootScope',
        '$state',
        '$stateParams',
        '$window',
        '$templateCache',
        'Colors',
        '$translate',
        'SweetAlert',
        'toaster'
    ];

    function appRun(
        $rootScope,
        $state,
        $stateParams,
        $window,
        $templateCache,
        Colors,
        $translate,
        SweetAlert,
        toaster
    ) {

        // Hook into ocLazyLoad to setup AngularGrid before inject into the app
        // See "Creating the AngularJS Module" at
        // https://www.ag-grid.com/best-angularjs-data-grid/index.php
        var offevent = $rootScope.$on('ocLazyLoad.fileLoaded', function(e, file) {
            if (file.indexOf('ag-grid.js') > -1) {
                agGrid.initialiseAgGridWithAngular1(angular);
                offevent();
            }
        });

        // Set reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$translate = $translate;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$storage = $window.localStorage;

        // Uncomment this to disable template cache
        // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        //     if (typeof(toState) !== 'undefined'){
        //       $templateCache.remove(toState.templateUrl);
        //     }
        // });

        // Allows to use branding color with interpolation
        // {{ colorByName('primary') }}
        $rootScope.colorByName = Colors.byName;

        // cancel click event easily
        $rootScope.cancel = function($event) {
            $event.stopPropagation();
        };

        // Hooks Example
        // -----------------------------------

        // Hook not start
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {
                if(toState.permission){
                    if(window.userInfo && window.userInfo.module && window.userInfo.module.indexOf(toState.permission) == -1){
                        $state.go('page.403')
                    }
                }

            });

        // Hook not found
        $rootScope.$on('$stateNotFound',
            function(event, unfoundState /* , fromState, fromParams */) {
                $state.go('page.maintenance')
            });
        // Hook error
        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error) {
                event.preventDefault();
                $state.go("page.maintenance");
            });
        // Hook success
        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
                // display new view from top
                $window.scrollTo(0, 0);
                // Save the route title
                // $rootScope.currTitle = $state.current.title;
                $window.document.title = $state.current.title;
            });

        // Load a title dynamically
        // $rootScope.currTitle = $state.current.title;
        // $rootScope.pageTitle = function() {
        //     var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        //     document.title = title;
        //     return title;
        // };

        $window.document.title = '';

    }

})();