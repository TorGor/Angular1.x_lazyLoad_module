/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, RouteHelpersProvider){

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
              resolve: RouteHelpersProvider.resolveFor('modernizr', 'icons', 'screenfull', 'moment', 'ui.select', 'xeditable', 'datetimepicker', 'superAdmin')
          })
          .state('superAdmin.menuManage', {
              url: '/menu/manage',
              title: '菜单维护',
              controller: 'SuperAdminMenuController',
              templateUrl: RouteHelpersProvider.basepath('superAdmin/menu/menu.html'),
          })
          .state('superAdmin.buttonManage', {
              url: '/button/manage',
              title: '按钮维护',
              templateUrl: RouteHelpersProvider.basepath('superAdmin/button/button.html'),
              controller: 'SuperAdminButtonController',
          })
          .state('superAdmin.roleInfoManage', {
              url: '/role/manage',
              title: '角色信息维护',
              templateUrl: RouteHelpersProvider.basepath('superAdmin/role/role.html'),
              controller: 'SuperAdminRoleController',
          })
          .state('superAdmin.roleRelationManage', {
              url: '/roleRelation/manage',
              title: '角色信息维护',
              templateUrl: RouteHelpersProvider.basepath('superAdmin/role/roleRelation.html'),
              controller: 'SuperAdminRoleRelationController',
          })
          .state('superAdmin.adminInfoManage', {
              url: '/admin/manage',
              title: '管理员信息维护',
              templateUrl: RouteHelpersProvider.basepath('superAdmin/admin/admin.html'),
              controller: 'SuperAdminAdminController',
          })
          .state('superAdmin.adminRelationManage', {
              url: '/adminRelation/manage',
              title: '管理员关联角色',
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
          .state('page.login', {
              url: '/login',
              title: 'Login',
              templateUrl: 'pages/login.html'
          })
          .state('page.register', {
              url: '/register',
              title: 'Register',
              templateUrl: 'pages/register.html'
          })
          .state('page.recover', {
              url: '/recover',
              title: 'Recover',
              templateUrl: 'pages/recover.html'
          })
          .state('page.lock', {
              url: '/lock',
              title: 'Lock',
              templateUrl: 'pages/lock.html'
          })
          .state('page.404', {
              url: '/404',
              title: 'Not Found',
              templateUrl: 'pages/404.html'
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
          })
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
          ;

    } // routesConfig

})();

