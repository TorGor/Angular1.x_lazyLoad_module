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
        $urlRouterProvider.otherwise('/superAdmin/menu/manage');

        //
        // Application Routes
        // -----------------------------------
        $stateProvider
            .state('superAdmin', {
                url: '/superAdmin',
                abstract: true,
                templateUrl: RouteHelpersProvider.basepath('app.html'),
                resolve: RouteHelpersProvider.resolveFor('modernizr', 'icons', 'screenfull', 'moment', 'xeditable', 'datetimepicker', 'superAdmin')
            })
            .state('superAdmin.menuManage', {
                url: '/menu/manage',
                title: 'Menu Manage',
                controller: 'SuperAdminMenuController',
                templateUrl: RouteHelpersProvider.basepath('superAdmin/menu/menu.html'),
            })
            .state('superAdmin.buttonManage', {
                url: '/button/manage',
                title: 'Button Manage',
                templateUrl: RouteHelpersProvider.basepath('superAdmin/button/button.html'),
                controller: 'SuperAdminButtonController',
            })
            .state('superAdmin.roleInfoManage', {
                url: '/role/manage',
                title: 'Role Manage',
                templateUrl: RouteHelpersProvider.basepath('superAdmin/role/role.html'),
                controller: 'SuperAdminRoleController',
            })
            .state('superAdmin.roleRelationManage', {
                url: '/roleRelation/manage',
                title: 'RoleRelation Manage',
                templateUrl: RouteHelpersProvider.basepath('superAdmin/role/roleRelation.html'),
                controller: 'SuperAdminRoleRelationController',
            })
            .state('superAdmin.adminInfoManage', {
                url: '/superAdmin/manage',
                title: 'Admin Manage',
                templateUrl: RouteHelpersProvider.basepath('superAdmin/admin/admin.html'),
                controller: 'SuperAdminAdminController',
            })
            .state('superAdmin.adminRelationManage', {
                url: '/adminRelation/manage',
                title: 'AdminRelation Manage',
                templateUrl: RouteHelpersProvider.basepath('superAdmin/admin/adminRelation.html'),
                controller: 'SuperAdminAdminRelationController',
            })
        //
        // Single Page Routes
        // -----------------------------------
            .state('page', {
                url: '/page',
                templateUrl: 'pages/page.html',
                resolve: RouteHelpersProvider.resolveFor('modernizr', 'icons'),
                controller: ['$rootScope', function($rootScope) {
                    $rootScope.app.layout.isBoxed = false;
                }]
            })
            .state('page.403', {
                url: '/403',
                title: 'Permission denied',
                templateUrl: 'pages/403.html'
            })
            .state('page.500', {
                url: '/500',
                title: 'Server error',
                templateUrl: 'pages/500.html'
            })
            .state('page.maintenance', {
                url: '/maintenance',
                title: 'Maintenance',
                templateUrl: 'pages/maintenance.html'
            });
        //
        // CUSTOM RESOLVES
        //   Add your own resolves properties
        //   following this object extend
        //   method
        // -----------------------------------
        // .state('app.someroute', {
        //   url: '/some_url',
        //   templateUrl: 'path_to_template.html',
        //   controller: 'someController',
        //   resolve: angular.extend(
        //     RouteHelpersProvider.resolveFor(), {
        //     // YOUR RESOLVES GO HERE
        //     }
        //   )
        // })
    } // routesConfig

})();

