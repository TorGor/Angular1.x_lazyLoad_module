/** =========================================================
 * Module: config.js
 * App routes and resources configuration
 ========================================================= */


(function() {

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, RouteHelpersProvider) {

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/page/changePassword');

        // Application Routes
        // -----------------------------------
        $stateProvider
            .state('page', {
                url: '/page',
                templateUrl: 'pages/page.html',
                resolve: RouteHelpersProvider.resolveFor('modernizr', 'icons', 'changePassword')
            })
            .state('page.changePassword', {
                url: '/changePassword',
                title: 'changePassword',
                templateUrl: 'pages/changePassword.html'
            });
    } // routesConfig

})();

