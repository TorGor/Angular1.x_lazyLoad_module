/** =========================================================
 * Module: config.js
 * App routes and resources configuration
 ========================================================= */


(function () {

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];

    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, RouteHelpersProvider) {

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/admin/localeLanguage/manage');

        //
        // Application Routes
        // -----------------------------------
        $stateProvider
            .state('admin', {
                url: '/admin',
                abstract: true,
                templateUrl: RouteHelpersProvider.basepath('app.html'),
                resolve: angular.extend(
                    RouteHelpersProvider.resolveFor('modernizr', 'icons', 'screenfull', 'moment', 'xeditable','ui.select','datetimepicker', 'admin'), {
                        // YOUR RESOLVES GO HERE
                        userInfo: ['userSelfService', 'EVN', '$timeout','$rootScope', function (userSelfService, EVN, $timeout,$rootScope) {
                            userSelfService.getUserSelfInfo({},{},function (data) {
                                window.userInfo = angular.copy(data.data);
                                $rootScope.user = {
                                    system: 'admin',
                                    name: data.data && data.data.username || ''
                                };
                            },function (error) {
                                // $timeout(function() {
                                //     window.location.href = '/login.html';
                                // }, 10);
                                return 'get User Info failed';
                            });
                        }]
                    }
                )
            })

            .state('admin.localeLanguage', {
                url: '/localeLanguage/manage',
                title: 'localeLanguage Manage',
                controller: 'LocaleLanguageController',
                templateUrl: RouteHelpersProvider.basepath('admin/localeLanguage/localeLanguage.html'),
                permission: 'localeLanguage'
            })

            .state('admin.countriesManage', {
                url: '/countriesManage/manage',
                title: 'countriesManage Manage',
                controller: 'CountriesManageController',
                templateUrl: RouteHelpersProvider.basepath('admin/countriesManage/countriesManage.html'),
                permission: 'countriesManage'
            })
            
            .state('admin.userLevel', {
                url: '/userLevel/manage',
                title: 'userLevel Manage',
                controller: 'UserLevelController',
                templateUrl: RouteHelpersProvider.basepath('admin/userLevel/userLevel.html'),
                permission: 'userLevel'
            })
            
            .state('admin.conditionsModal', {
                url: '/conditionsModal/manage',
                title: 'conditionsModal Manage',
                controller: 'ConditionsModalController',
                templateUrl: RouteHelpersProvider.basepath('admin/conditionsModal/conditionsModal.html'),
                permission: 'conditionsModal'
            })
            
            .state('admin.treatmentsModal', {
                url: '/treatmentsModal/manage',
                title: 'treatmentsModal Manage',
                controller: 'TreatmentsModalController',
                templateUrl: RouteHelpersProvider.basepath('admin/treatmentsModal/treatmentsModal.html'),
                permission: 'treatmentsModal'
            })
            
            .state('admin.rebatesModal', {
                url: '/rebatesModal/manage',
                title: 'rebatesModal Manage',
                controller: 'RebatesModalController',
                templateUrl: RouteHelpersProvider.basepath('admin/rebatesModal/rebatesModal.html'),
                permission: 'rebatesModal'
            })
            
            .state('admin.transactionsDetail', {
                url: '/transactionsDetail/manage',
                title: 'transactionsDetail Manage',
                controller: 'TransactionsDetailController',
                templateUrl: RouteHelpersProvider.basepath('admin/transactionsDetail/transactionsDetail.html'),
                permission: 'transactionsDetail'
            })
            
            .state('admin.currenciesManage', {
                url: '/currenciesManage/manage',
                title: 'currenciesManage Manage',
                controller: 'CurrenciesManageController',
                templateUrl: RouteHelpersProvider.basepath('admin/currenciesManage/currenciesManage.html'),
                permission: 'currenciesManage'
            })
            
            .state('admin.blackLists', {
                url: '/blackLists/manage',
                title: 'blackLists Manage',
                controller: 'BlackListsController',
                templateUrl: RouteHelpersProvider.basepath('admin/blackLists/blackLists.html'),
                permission: 'blackLists'
            })
            
            .state('admin.ordersManage', {
                url: '/ordersManage/manage',
                title: 'ordersManage Manage',
                controller: 'OrdersManageController',
                templateUrl: RouteHelpersProvider.basepath('admin/ordersManage/ordersManage.html'),
                permission: 'ordersManage'
            })
            
            .state('admin.paymentMethods', {
                url: '/paymentMethods/manage',
                title: 'paymentMethods Manage',
                controller: 'PaymentMethodsController',
                templateUrl: RouteHelpersProvider.basepath('admin/paymentMethods/paymentMethods.html'),
                permission: 'paymentMethods'
            })
            
            .state('admin.appliesUse', {
                url: '/appliesUse/manage',
                title: 'appliesUse Manage',
                controller: 'AppliesUseController',
                templateUrl: RouteHelpersProvider.basepath('admin/appliesUse/appliesUse.html'),
                permission: 'appliesUse'
            })
            
            .state('admin.gameBrands', {
                url: '/gameBrands/manage',
                title: 'gameBrands Manage',
                controller: 'GameBrandsController',
                templateUrl: RouteHelpersProvider.basepath('admin/gameBrands/gameBrands.html'),
                permission: 'gameBrands'
            })
            
            .state('admin.gameCategories', {
                url: '/gameCategories/manage',
                title: 'gameCategories Manage',
                controller: 'GameCategoriesController',
                templateUrl: RouteHelpersProvider.basepath('admin/gameCategories/gameCategories.html'),
                permission: 'gameCategories'
            })
            
            .state('admin.couponsManage', {
                url: '/couponsManage/manage',
                title: 'couponsManage Manage',
                controller: 'CouponsManageController',
                templateUrl: RouteHelpersProvider.basepath('admin/couponsManage/couponsManage.html'),
                permission: 'couponsManage'
            })
            
            .state('admin.gamesManage', {
                url: '/gamesManage/manage',
                title: 'gamesManage Manage',
                controller: 'GamesManageController',
                templateUrl: RouteHelpersProvider.basepath('admin/gamesManage/gamesManage.html'),
                permission: 'gamesManage'
            })
            
            .state('admin.gamesProducts', {
                url: '/gamesProducts/manage',
                title: 'gamesProducts Manage',
                controller: 'GamesProductsController',
                templateUrl: RouteHelpersProvider.basepath('admin/gamesProducts/gamesProducts.html'),
                permission: 'gamesProducts'
            })
            
            .state('admin.pspsManage', {
                url: '/pspsManage/manage',
                title: 'pspsManage Manage',
                controller: 'PspsManageController',
                templateUrl: RouteHelpersProvider.basepath('admin/pspsManage/pspsManage.html'),
                permission: 'pspsManage'
            })
            
            .state('admin.withdrawsManage', {
                url: '/withdrawsManage/manage',
                title: 'withdrawsManage Manage',
                controller: 'WithdrawsManageController',
                templateUrl: RouteHelpersProvider.basepath('admin/withdrawsManage/withdrawsManage.html'),
                permission: 'withdrawsManage'
            })
            
            //new route name will be append here
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            


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

