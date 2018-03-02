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
        $urlRouterProvider.otherwise('/admin/localLanguage/manage');

        //
        // Application Routes
        // -----------------------------------
        $stateProvider
            .state('admin', {
                url: '/admin',
                abstract: true,
                templateUrl: RouteHelpersProvider.basepath('app.html'),
                resolve: angular.extend(
                    RouteHelpersProvider.resolveFor('modernizr', 'icons', 'screenfull', 'moment', 'xeditable', 'datetimepicker', 'admin'), {
                        // YOUR RESOLVES GO HERE
                        userInfo: ['$http', 'EVN', '$timeout', function($http, EVN, $timeout) {
                            // $http.get(EVN.server + '/user/getUserInfo' + EVN.suffix, {}).then(function(data) {
                            //     window.userInfo = angular.copy(data.data);
                            //     return angular.copy(data.data);
                            // }, function(error) {
                            //     $timeout(function() {
                            //         window.location.href = '/login.html';
                            //     }, 10);
                            //     return '';
                            // });
                            return ''
                        }]
                    }
                )
            })
            .state('admin.localLanguage', {
                url: '/localLanguage/manage',
                title: 'localLanguage Manage',
                controller: 'AdminLocalLanguageController',
                templateUrl: RouteHelpersProvider.basepath('admin/localLanguage/localLanguage.html'),
                permission: ''
            })
            .state('admin.buttonManage', {
                url: '/button/manage',
                title: 'Button Manage',
                templateUrl: RouteHelpersProvider.basepath('admin/button/button.html'),
                controller: 'adminButtonController',
            })
            .state('admin.roleInfoManage', {
                url: '/role/manage',
                title: 'Role Manage',
                templateUrl: RouteHelpersProvider.basepath('admin/role/role.html'),
                controller: 'adminRoleController',
            })
            .state('admin.roleRelationManage', {
                url: '/roleRelation/manage',
                title: 'RoleRelation Manage',
                templateUrl: RouteHelpersProvider.basepath('admin/role/roleRelation.html'),
                controller: 'adminRoleRelationController',
            })
            .state('admin.adminInfoManage', {
                url: '/admin/manage',
                title: 'Admin Manage',
                templateUrl: RouteHelpersProvider.basepath('admin/admin/admin.html'),
                controller: 'adminAdminController',
            })
            .state('admin.adminRelationManage', {
                url: '/adminRelation/manage',
                title: 'AdminRelation Manage',
                templateUrl: RouteHelpersProvider.basepath('admin/admin/adminRelation.html'),
                controller: 'adminAdminRelationController',
            })
        //
        // Single Page Routes
        // -----------------------------------
            .state('page', {
                url: '/page',
                templateUrl: 'pages/page.html',
                resolve: RouteHelpersProvider.resolveFor('modernizr', 'icons')
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
