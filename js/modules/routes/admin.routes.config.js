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
        $urlRouterProvider.otherwise('/page/maintenance');
        //$urlRouterProvider.otherwise('/admin/localeLanguage/manage');

        //
        // Application Routes
        // -----------------------------------
        $stateProvider
            .state('admin', {
                url: '/admin',
                abstract: true,
                templateUrl: RouteHelpersProvider.basepath('app.html'),
                resolve: angular.extend(
                    RouteHelpersProvider.resolveFor('modernizr', 'icons', 'screenfull', 'moment', 'xeditable', 'ui.select', 'datetimepicker', 'admin'),
                    {
                        // YOUR RESOLVES GO HERE
                        userInfo: ['userSelfService', 'EVN', '$timeout', '$rootScope', 'SidebarMenuData', '$q', '$state',function(userSelfService, EVN, $timeout, $rootScope, SidebarMenuData, $q, $state) {
                            var deferred = $q.defer();
                            userSelfService.getUserSelfInfo({}, {}, function(data) {
                                var roles = data.data.roles;
                                window.userInfo = {};
                                window.userInfo.adminId = angular.copy(data.data.adminId);
                                window.userInfo.username = angular.copy(data.data.username);
                                window.userInfo.module = [];
                                window.userInfo.menu = [];
                                $rootScope.user = {
                                    system: 'admin',
                                    name: data.data && data.data.username || ''
                                };

                                var moduleObj = {};
                                SidebarMenuData.admin.map(function(moduleItem) {
                                    moduleObj[moduleItem.module] = moduleItem.sref;
                                });

                                var tempButtonUrl = {};

                                if (window.Array.isArray(roles)) {
                                    roles.map(function(roleItem) {
                                        var tempMenu = {};
                                        tempMenu.text = roleItem.name || '';
                                        if (roleItem.url == null) {
                                            tempMenu.sref = '#';
                                            tempMenu.icon = 'glyphicon glyphicon-th-large';
                                            tempMenu.submenu = [];
                                            if (window.Array.isArray(roleItem.data)) {
                                                roleItem.data.map(function(moduleItem) {
                                                    if (moduleItem.url) {
                                                        var tempSubmenu = {
                                                            text: moduleItem.name || '',
                                                            sref: moduleObj[moduleItem.url]
                                                        };
                                                        tempMenu.submenu.push(tempSubmenu);
                                                        window.userInfo.module.push(moduleItem.url);
                                                        tempButtonUrl[moduleItem.url] = moduleItem.data;
                                                    }
                                                });
                                            }
                                        } else if (roleItem.url) {
                                            tempMenu.sref = moduleObj[moduleItem.url];
                                            tempMenu.icon = 'glyphicon glyphicon-th-large';
                                        }
                                        window.userInfo.menu.push(tempMenu);
                                    });
                                }

                                var URLobj = EVN.URLOBJ;

                                // 配置预设的url
                                $rootScope.URL = {};
                                window.Object.keys(URLobj).map(function(module) {
                                    if (tempButtonUrl[module]) {
                                        if (window.Array.isArray(tempButtonUrl[module])) {
                                            $rootScope.URL[URLobj[module]] = {};
                                            tempButtonUrl[module].map(function(buttonItem) {
                                                if (buttonItem.btnType == 1) {
                                                    if(module == 'affiliates'){
                                                        if (buttonItem.btnUrl.indexOf('Cards') !== -1) {
                                                            $rootScope.URL[URLobj[module]].GETCARDS = buttonItem.btnUrl;
                                                        } else if (buttonItem.btnUrl.indexOf('Summary') !== -1) {
                                                            $rootScope.URL[URLobj[module]].GETPAY = buttonItem.btnUrl;
                                                        } else {
                                                            $rootScope.URL[URLobj[module]].GET = buttonItem.btnUrl;
                                                        }
                                                    }else{
                                                        if (buttonItem.btnUrl.indexOf('Audit') !== -1) {
                                                            $rootScope.URL[URLobj[module]].GETAUDIT = buttonItem.btnUrl;
                                                        } else if (buttonItem.btnUrl.indexOf('Pay') !== -1) {
                                                            $rootScope.URL[URLobj[module]].GETPAY = buttonItem.btnUrl;
                                                        } else if (buttonItem.btnUrl.indexOf('Review') !== -1) {
                                                            $rootScope.URL[URLobj[module]].GETREVIEW = buttonItem.btnUrl;
                                                        } else if (buttonItem.btnUrl.indexOf('Detail') !== -1) {
                                                            $rootScope.URL[URLobj[module]].GETDETAIL = buttonItem.btnUrl;
                                                        } else {
                                                            $rootScope.URL[URLobj[module]].GET = buttonItem.btnUrl;
                                                        }
                                                    }
                                                }
                                                if (buttonItem.btnType == 2) {
                                                    if (module == 'withdraws') {
                                                        if (buttonItem.btnUrl.indexOf('Audit') !== -1) {
                                                            $rootScope.URL[URLobj[module]].POSTAUDIT = buttonItem.btnUrl;
                                                        } else if (buttonItem.btnUrl.indexOf('Pay') !== -1) {
                                                            $rootScope.URL[URLobj[module]].POSTPAY = buttonItem.btnUrl;
                                                        } else if (buttonItem.btnUrl.indexOf('Review') !== -1) {
                                                            $rootScope.URL[URLobj[module]].POSTREVIEW = buttonItem.btnUrl;
                                                        } else {
                                                            $rootScope.URL[URLobj[module]].POST = buttonItem.btnUrl;
                                                        }
                                                    } else if (module == 'applies') {
                                                        if (buttonItem.btnUrl.indexOf('audit') !== -1) {
                                                            $rootScope.URL[URLobj[module]].POSTAUDIT = buttonItem.btnUrl;
                                                        } else if (buttonItem.btnUrl.indexOf('revoke') !== -1) {
                                                            $rootScope.URL[URLobj[module]].POSTREVOKE = buttonItem.btnUrl;
                                                        } else {
                                                            $rootScope.URL[URLobj[module]].POST = buttonItem.btnUrl;
                                                        }
                                                    }  else if (module == 'bigwins') {
                                                        if (buttonItem.btnUrl.indexOf('Audit') !== -1) {
                                                            $rootScope.URL[URLobj[module]].POSTAUDIT = buttonItem.btnUrl;
                                                        } else {
                                                            $rootScope.URL[URLobj[module]].POST = buttonItem.btnUrl;
                                                        }
                                                    } else {
                                                        $rootScope.URL[URLobj[module]].POST = buttonItem.btnUrl;
                                                    }
                                                }
                                                if (buttonItem.btnType == 3) {
                                                    $rootScope.URL[URLobj[module]].PATCH = buttonItem.btnUrl;
                                                }
                                                if (buttonItem.btnType == 4) {
                                                    $rootScope.URL[URLobj[module]].DELETE = buttonItem.btnUrl;
                                                }
                                                if (buttonItem.btnType == 5) {
                                                    $rootScope.URL[URLobj[module]].PUT = buttonItem.btnUrl;
                                                }
                                            });
                                        }
                                    }
                                });

                                console.log($rootScope.URL,'$rootScope.URL')

                                deferred.resolve('userInfo resolved');

                                return true;

                            }, function(error) {
                                window.location.href = '/login.html';
                                deferred.reject('userInfo reject');
                            });

                            return deferred.promise;
                        }]
                    }
                )
            })

            .state('admin.localeLanguage', {
                url: '/localeLanguage/manage',
                title: 'localeLanguage Manage',
                controller: 'LocaleLanguageController',
                templateUrl: RouteHelpersProvider.basepath('admin/localeLanguage/localeLanguage.html'),
                permission: 'locales'
            })

            .state('admin.countriesManage', {
                url: '/countriesManage/manage',
                title: 'countriesManage Manage',
                controller: 'CountriesManageController',
                templateUrl: RouteHelpersProvider.basepath('admin/countriesManage/countriesManage.html'),
                permission: 'countries'
            })
            
            .state('admin.userLevel', {
                url: '/userLevel/manage',
                title: 'userLevel Manage',
                controller: 'UserLevelController',
                templateUrl: RouteHelpersProvider.basepath('admin/userLevel/userLevel.html'),
                permission: 'ranks'
            })

            .state('admin.transactionsDetail', {
                url: '/transactionsDetail/manage',
                title: 'transactionsDetail Manage',
                controller: 'TransactionsDetailController',
                templateUrl: RouteHelpersProvider.basepath('admin/transactionsDetail/transactionsDetail.html'),
                permission: 'transactions'
            })

            //.state('admin.transactionsDetailSearch', {
            //    url: '/transactionsDetail/manage/:_username/:user_id',
            //    title: 'transactionsDetail Manage',
            //    controller: 'TransactionsDetailController',
            //    templateUrl: RouteHelpersProvider.basepath('admin/transactionsDetail/transactionsDetail.html'),
            //    permission: 'transactions'
            //})

            .state('admin.currenciesManage', {
                url: '/currenciesManage/manage',
                title: 'currenciesManage Manage',
                controller: 'CurrenciesManageController',
                templateUrl: RouteHelpersProvider.basepath('admin/currenciesManage/currenciesManage.html'),
                permission: 'currencies'
            })
            
            .state('admin.blackLists', {
                url: '/blackLists/manage',
                title: 'blackLists Manage',
                controller: 'BlackListsController',
                templateUrl: RouteHelpersProvider.basepath('admin/blackLists/blackLists.html'),
                permission: 'blacklists'
            })
            
            .state('admin.ordersManage', {
                url: '/ordersManage/manage',
                title: 'ordersManage Manage',
                controller: 'OrdersManageController',
                templateUrl: RouteHelpersProvider.basepath('admin/ordersManage/ordersManage.html'),
                permission: 'orders'
            })
            
            .state('admin.paymentMethods', {
                url: '/paymentMethods/manage',
                title: 'paymentMethods Manage',
                controller: 'PaymentMethodsController',
                templateUrl: RouteHelpersProvider.basepath('admin/paymentMethods/paymentMethods.html'),
                permission: 'methods'
            })
            
            .state('admin.appliesUse', {
                url: '/appliesUse/manage',
                title: 'appliesUse Manage',
                controller: 'AppliesUseController',
                templateUrl: RouteHelpersProvider.basepath('admin/appliesUse/appliesUse.html'),
                permission: 'applies'
            })
            
            .state('admin.gameBrands', {
                url: '/gameBrands/manage',
                title: 'gameBrands Manage',
                controller: 'GameBrandsController',
                templateUrl: RouteHelpersProvider.basepath('admin/gameBrands/gameBrands.html'),
                permission: 'brands'
            })
            
            .state('admin.gameCategories', {
                url: '/gameCategories/manage',
                title: 'gameCategories Manage',
                controller: 'GameCategoriesController',
                templateUrl: RouteHelpersProvider.basepath('admin/gameCategories/gameCategories.html'),
                permission: 'categories'
            })
            
            .state('admin.couponsManage', {
                url: '/couponsManage/manage',
                title: 'couponsManage Manage',
                controller: 'CouponsManageController',
                templateUrl: RouteHelpersProvider.basepath('admin/couponsManage/couponsManage.html'),
                permission: 'coupons'
            })
            
            .state('admin.gamesManage', {
                url: '/gamesManage/manage',
                title: 'gamesManage Manage',
                controller: 'GamesManageController',
                templateUrl: RouteHelpersProvider.basepath('admin/gamesManage/gamesManage.html'),
                permission: 'games'
            })
            
            .state('admin.gamesProducts', {
                url: '/gamesProducts/manage',
                title: 'gamesProducts Manage',
                controller: 'GamesProductsController',
                templateUrl: RouteHelpersProvider.basepath('admin/gamesProducts/gamesProducts.html'),
                permission: 'products'
            })
            
            .state('admin.pspsManage', {
                url: '/pspsManage/manage',
                title: 'pspsManage Manage',
                controller: 'PspsManageController',
                templateUrl: RouteHelpersProvider.basepath('admin/pspsManage/pspsManage.html'),
                permission: 'psps'
            })
            
            .state('admin.withdrawsManage', {
                url: '/withdrawsManage/manage',
                title: 'withdrawsManage Manage',
                controller: 'WithdrawsManageController',
                templateUrl: RouteHelpersProvider.basepath('admin/withdrawsManage/withdrawsManage.html'),
                permission: 'withdraws'
            })
            
            .state('admin.promotionsManage', {
                url: '/promotionsManage/manage',
                title: 'promotionsManage Manage',
                controller: 'PromotionsManageController',
                templateUrl: RouteHelpersProvider.basepath('admin/promotionsManage/promotionsManage.html'),
                resolve: RouteHelpersProvider.resolveFor('summernote'),
                permission: 'promotions'
            })
            
            .state('admin.rebatesList', {
                url: '/rebatesList/manage',
                title: 'rebatesList Manage',
                controller: 'RebatesListController',
                templateUrl: RouteHelpersProvider.basepath('admin/rebatesList/rebatesList.html'),
                permission: 'rebates'
            })
            
            .state('admin.reliefsList', {
                url: '/reliefsList/manage',
                title: 'reliefsList Manage',
                controller: 'ReliefsListController',
                templateUrl: RouteHelpersProvider.basepath('admin/reliefsList/reliefsList.html'),
                permission: 'reliefs'
            })
            
            .state('admin.transfersList', {
                url: '/transfersList/manage',
                title: 'transfersList Manage',
                controller: 'TransfersListController',
                templateUrl: RouteHelpersProvider.basepath('admin/transfersList/transfersList.html'),
                permission: 'transfers'
            })
            
            .state('admin.gameRecords', {
                url: '/gameRecords/manage',
                title: 'gameRecords Manage',
                controller: 'GameRecordsController',
                templateUrl: RouteHelpersProvider.basepath('admin/gameRecords/gameRecords.html'),
                permission: 'records'
            })
            
            .state('admin.usersManage', {
                url: '/usersManage/manage',
                title: 'usersManage Manage',
                controller: 'UsersManageController',
                templateUrl: RouteHelpersProvider.basepath('admin/usersManage/usersManage.html'),
                permission: 'users'
            })
            
            .state('admin.walletsManage', {
                url: '/walletsManage/manage',
                title: 'walletsManage Manage',
                controller: 'WalletsManageController',
                templateUrl: RouteHelpersProvider.basepath('admin/walletsManage/walletsManage.html'),
                permission: 'wallets'
            })
            
            .state('admin.bigwinsManage', {
                url: '/bigwinsManage/manage',
                title: 'bigwinsManage Manage',
                controller: 'BigwinsManageController',
                templateUrl: RouteHelpersProvider.basepath('admin/bigwinsManage/bigwinsManage.html'),
                permission: 'bigwins'
            })
            
            .state('admin.domainsManage', {
                url: '/domainsManage/manage',
                title: 'domainsManage Manage',
                controller: 'DomainsManageController',
                templateUrl: RouteHelpersProvider.basepath('admin/domainsManage/domainsManage.html'),
                permission: 'domains'
            })
            
            .state('admin.affiliatesManage', {
                url: '/affiliatesManage/manage',
                title: 'affiliatesManage Manage',
                controller: 'AffiliatesManageController',
                templateUrl: RouteHelpersProvider.basepath('admin/affiliatesManage/affiliatesManage.html'),
                permission: 'affiliates'
            })
            
            .state('admin.affiliatesPlans', {
                url: '/affiliatesPlans/manage',
                title: 'affiliatesPlans Manage',
                controller: 'AffiliatesPlansController',
                templateUrl: RouteHelpersProvider.basepath('admin/affiliatesPlans/affiliatesPlans.html'),
                permission: 'plans'
            })
            
            .state('admin.bankCards', {
                url: '/bankCards/manage',
                title: 'bankCards Manage',
                controller: 'BankCardsController',
                templateUrl: RouteHelpersProvider.basepath('admin/bankCards/bankCards.html'),
                permission: 'users'
            })
            
            //new route name will be append here
            
            
            
            
            
            
            
            
            
            
            // Single Page Routes
            // -----------------------------------
            .state('page', {
                url: '/page',
                templateUrl: 'pages/page.html',
                resolve: RouteHelpersProvider.resolveFor('modernizr', 'icons'),
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
                templateUrl: 'pages/maintenance.html',
                resolve: angular.extend(
                    RouteHelpersProvider.resolveFor('admin'),
                    {
                        // YOUR RESOLVES GO HERE
                        userInfo: ['userSelfService', 'EVN', '$timeout', '$rootScope', 'SidebarMenuData', '$q', '$state', function(userSelfService, EVN, $timeout, $rootScope, SidebarMenuData, $q, $state) {
                            var deferred = $q.defer();
                            userSelfService.getUserSelfInfo({}, {}, function(data) {
                                var roles = data.data.roles;
                                window.userInfo = {};
                                window.userInfo.adminId = angular.copy(data.data.adminId);
                                window.userInfo.username = angular.copy(data.data.username);
                                window.userInfo.module = [];
                                window.userInfo.menu = [];
                                $rootScope.user = {
                                    system: 'admin',
                                    name: data.data && data.data.username || ''
                                };

                                var moduleObj = {};
                                SidebarMenuData.admin.map(function(moduleItem) {
                                    moduleObj[moduleItem.module] = moduleItem.sref;
                                });

                                if (window.Array.isArray(roles)) {
                                    roles.map(function(roleItem) {
                                        var tempMenu = {};
                                        tempMenu.text = roleItem.name || '';
                                        if (roleItem.url == null) {
                                            tempMenu.sref = '#';
                                            tempMenu.icon = 'glyphicon glyphicon-th-large';
                                            tempMenu.submenu = [];
                                            if (window.Array.isArray(roleItem.data)) {
                                                roleItem.data.map(function(moduleItem) {
                                                    if (moduleItem.url) {
                                                        var tempSubmenu = {
                                                            text: moduleItem.name || '',
                                                            sref: moduleObj[moduleItem.url]
                                                        };
                                                        tempMenu.submenu.push(tempSubmenu);
                                                        window.userInfo.module.push(moduleItem.url);
                                                    }
                                                });
                                            }
                                        } else if (roleItem.url) {
                                            tempMenu.sref = moduleObj[moduleItem.url];
                                            tempMenu.icon = 'glyphicon glyphicon-th-large';
                                        }
                                        window.userInfo.menu.push(tempMenu);
                                    });
                                }

                                for(var i = 0,j=window.userInfo.menu.length;i<j;i++){
                                    if(window.userInfo.menu[i].sref !== '#'){
                                        $timeout(function() {
                                            $state.go(window.userInfo.menu[i].sref);
                                        },10)
                                        break;
                                    }else if(window.userInfo.menu[i]['submenu'].length){
                                        $timeout(function() {
                                            $state.go(window.userInfo.menu[i]['submenu'][0]['sref']);
                                        },10)
                                        break;
                                    }
                                }

                                deferred.resolve('userInfo resolved');

                                return true;

                            }, function(error) {
                                window.location.href = '/login.html';
                                deferred.reject('userInfo reject');
                                return;
                            });

                            return deferred.promise;
                        }]
                    }
                )
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

