(function() {

    angular
        .module('admin', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.core',
			'admin.localeLanguage',
			'admin.countriesManage',
			'admin.userLevel',
			'admin.transactionsDetail',
			'admin.currenciesManage',
			'admin.blackLists',
			'admin.ordersManage',
			'admin.paymentMethods',
			'admin.appliesUse',
			'admin.gameBrands',
			'admin.gameCategories',
			'admin.couponsManage',
			'admin.gamesManage',
			'admin.gamesProducts',
			'admin.pspsManage',
			'admin.withdrawsManage',
			'admin.promotionsManage',
			'admin.rebatesList',
			'admin.reliefsList',
			'admin.transfersList',
			'admin.gameRecords',
			'admin.usersManage',
			'admin.walletsManage',
			'admin.bigwinsManage',
			'admin.domainsManage',
			'admin.affiliatesManage',
			'admin.affiliatesPlans',
			'admin.bankCards',
			'admin.mediaCategories',
			'admin.mediaFiles',
			'admin.admin',
			'admin.button',
			'admin.menu',
			'admin.role',
			//new module name will be append here

        ]);
})();
(function() {

    angular
        .module('admin.affiliatesManage', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.admin', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.affiliatesPlans', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.appliesUse', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.bankCards', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.bigwinsManage', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.blackLists', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.button', [
            'app.core',
            /* ... */
        ]);
})();
(function() {

    angular
        .module('admin.countriesManage', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.couponsManage', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.currenciesManage', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.summaryAffiliates', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.domainsManage', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.gameBrands', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.gameCategories', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.gameRecords', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.gamesManage', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.localeLanguage', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.gamesProducts', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.mediaCategories', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.mediaFiles', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.menu', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.ordersManage', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.promotionsManage', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.paymentMethods', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.pspsManage', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.rebatesList', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.reliefsList', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.role', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.transactionsDetail', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.transfersList', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.userLevel', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.usersManage', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.walletsManage', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.withdrawsManage', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin')
        // .constant();
})();
(function() {

    angular
        .module('admin')
        .run(appRun);

    appRun.$inject = [
        '$pusher',
        '$rootScope',
        '$timeout',
        'adminService',
        '$translate'
    ];

    function appRun(
        $pusher,
        $rootScope,
        $timeout,
        adminService,
        $translate
    ) {
        // var client = new Pusher('78546555ea941f0a68b8');
        var client = new Pusher('34cab385c00810dc35d2', {
            cluster: 'ap2',
            encrypted: true
        });
        var pusher = $pusher(client);


        var aoboTech = pusher.subscribe('aobo-tech');
        ['summary.success','summary.failed','log.failed','media.upload.success','media.upload.failed','media.delete.success','media.delete.failed'].forEach(function (Event) {
            aoboTech.bind(Event,function(data) {
                    $rootScope.socketMessages.push(window.Object.assign(data,{
                        pusherType:'aobo-tech',
                        pusherEvent:Event,
                        pusherTitle:data.name||'',
                        pusherMsg:(data.param||data.error||'').toString(),
                    }));
                }
            );
        });

        function aoboWithdrawContent(data) {
            var tempStr = '';
            if(typeof data == 'object'){
                var tempObj = angular.copy(data);
                if(tempObj.id){
                   delete tempObj.id
                }
                window.Object.keys(tempObj).map(function (item) {
                    tempStr = tempStr + item + ':' + tempObj[item].toString()+','
                });
                return tempStr;
            }else if(typeof data == 'string'){
                return data;
            }
            return '';
        }

        var aoboWithdraw = pusher.subscribe('aobo-withdraw');
        ['withdraw.created','withdraw.declined','withdraw.approved','withdraw.paid'].forEach(function (Event) {
            aoboWithdraw.bind(Event,function(data) {
                    $rootScope.socketMessages.push(window.Object.assign(data,{
                        pusherType:'aobo-withdraw',
                        pusherEvent:Event,
                        pusherTitle:Event||'',
                        pusherMsg:aoboWithdrawContent(data),
                    }));
                }
            );
        });

        var aoboCoupon = pusher.subscribe('aobo-coupon');
        ['coupon.applied','coupon.failed'].forEach(function (Event) {
            aoboCoupon.bind(Event,function(data) {
                    $rootScope.socketMessages.push(window.Object.assign(data,{
                        pusherType:'aobo-coupon',
                        pusherEvent:Event,
                        pusherTitle:Event||'',
                        pusherMsg:aoboWithdrawContent(data),
                    }));
                }
            );
        });

        var aoboDeposit = pusher.subscribe('aobo-deposit');
        ['deposit.failed'].forEach(function (Event) {
            aoboDeposit.bind(Event,function(data) {
                    $rootScope.socketMessages.push(window.Object.assign(data,{
                        pusherType:'aobo-deposit',
                        pusherEvent:Event,
                        pusherTitle:Event||'',
                        pusherMsg:aoboWithdrawContent(data),
                    }));
                }
            );
        });

        var aoboBigwin = pusher.subscribe('aobo-bigwin');
        ['bigwin.created','bigwin.failed'].forEach(function (Event) {
            aoboBigwin.bind(Event,function(data) {
                    $rootScope.socketMessages.push(window.Object.assign(data,{
                        pusherType:'aobo-bigwin',
                        pusherEvent:Event,
                        pusherTitle:Event||'',
                        pusherMsg:aoboWithdrawContent(data),
                    }));
                }
            );
        });

        $rootScope.socketMessages = [
            {
                pusherType:'aobo-tech',
                pusherEvent:'summary.success',
                pusherTitle:'标题',
                pusherMsg:'summary.success',
            }
        ];

        $rootScope.socketMessagesHandelClick = function(item,index){
            var tempData = {
                "userId": window.userInfo.adminId || "",
                "username": window.userInfo.username || "",
                "pusherMsg":item.pusherMsg||"",
                "pusherType":item.pusherType||"",
                "pusherEvent":item.pusherEvent||"",
            };
            adminService.postReq('/admin/savePusher', {}, tempData).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $rootScope.socketMessages.splice(index,1);
                        $rootScope.toasterSuccess(res.data.msg);
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                        return '';
                    }
                }
            });
        };

        $rootScope.adminSelect012 = {
            // 0-禁用；1-启用；
            options: [
                {
                    label: $translate.instant('options.forbid'),
                    value: '0'
                },
                {
                    label: $translate.instant('options.enable'),
                    value: '1'
                }
            ],
            // 0-禁用；1-启用；2-删除；''-全部；
            optionsSearch: [
                {
                    label: $translate.instant('options.all'),
                    value: ''
                },
                {
                    label: $translate.instant('options.forbid'),
                    value: '0'
                },
                {
                    label: $translate.instant('options.enable'),
                    value: '1'
                },
                {
                    label: $translate.instant('options.delete'),
                    value: '2'
                }
            ]
        };

        $rootScope.superAdminSelect012 = {
            // 0-禁用；1-启用；
            options: [
                {
                    label: $translate.instant('options.forbid'),
                    value: '0'
                },
                {
                    label: $translate.instant('options.enable'),
                    value: '1'
                }
            ],
            // 0-禁用；1-启用；2-删除；''-全部；
            optionsSearch: [
                {
                    label: $translate.instant('options.all'),
                    value: ''
                },
                {
                    label: $translate.instant('options.forbid'),
                    value: '0'
                },
                {
                    label: $translate.instant('options.enable'),
                    value: '1'
                },
                {
                    label: $translate.instant('options.delete'),
                    value: '2'
                }
            ]
        };

    }

})();
(function (angular) {


    angular
        .module('admin')
        .factory('superAdminService', superAdminService)
        .factory('adminService', adminService);

    adminService.$inject = ['$http', 'EVN'];

    /* @ngInject */
    function adminService($http, EVN) {
        return {

            // 所有get请求
            /**
             *
             * @param url 请求的url
             * @param params 请求的参数
             * @param data 请求的数据
             * @param header 请求的 header
             * @returns $promise
             */
            getReq: function (url, params, data, header) {
                return $http({
                    method: 'GET',
                    url: EVN.debug ? (EVN.server + url + EVN.suffix) : url,
                    params: params||{},
                    headers: header||{},
                    // data: data||{}
                })
            },

            // 所有添加请求
            /**
             *
             * @param url 请求的url
             * @param params 请求的参数
             * @param data 请求的数据
             * @returns $promise
             */
            postReq: function (url, params, data) {
                return $http({
                    method: 'POST',
                    url: EVN.debug ? (EVN.server + url + EVN.suffix) : url,
                    params: params||{},
                    // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: data ? camelCaseKeysToUnderscore(data) : {}
                });
            },

            // 所有修改请求
            /**
             *
             * @param url 请求的url
             * @param params 请求的参数
             * @param data 请求的数据
             * @returns $promise
             */
            patchReq: function (url, params, data) {
                return $http({
                    method: 'PATCH',
                    url: EVN.debug ? (EVN.server + url + EVN.suffix) : url,
                    params: params||{},
                    // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: data ? camelCaseKeysToUnderscore(data) : {}
                });
            },

            // 所有恢复请求
            /**
             *
             * @param url 请求的url
             * @param params 请求的参数
             * @param data 请求的数据
             * @returns $promise
             */
            putReq: function (url, params, data) {
                return $http({
                    method: 'PUT',
                    url: EVN.debug ? (EVN.server + url + EVN.suffix) : url,
                    params: params||{},
                    // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: data ? camelCaseKeysToUnderscore(data) : {}
                });
            },

            // 所有删除请求
            /**
             *
             * @param url 请求的url
             * @param params 请求的参数
             * @param data 请求的数据
             * @returns $promise
             */
            deleteReq: function (url, params, data) {
                return $http({
                    method: 'DELETE',
                    url: EVN.debug ? (EVN.server + url + EVN.suffix) : url,
                    params: params||{},
                    // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: data ? camelCaseKeysToUnderscore(data) : {}
                });
            },
        };
    }

    function camelCaseKeysToUnderscore(obj) {

        var newName;

        if (typeof(obj) != 'object') return obj;

        for (var oldName in obj) {

            // Camel to underscore
            newName = oldName.replace(/([a-z0-9][A-Z])/g, function ($1) {
                return $1.toLowerCase().substr(0, 1) + '_' + $1.toLowerCase().substr(1);
            });

            // Only process if names are different
            if (newName != oldName) {
                // Check for the old property name to avoid a ReferenceError in strict mode.
                if (obj.hasOwnProperty(oldName)) {
                    obj[newName] = obj[oldName];
                    delete obj[oldName];
                }
            }

            // Recursion
            if (typeof(obj[newName]) == 'object') {
                obj[newName] = camelCaseKeysToUnderscore(obj[newName]);
            }

        }
        return obj;
    }


    superAdminService.$inject = ['$http', 'EVN', '$q'];

    /* @ngInject */
    function superAdminService($http, EVN, $q) {
        return {

            // 所有get请求
            /**
             *
             * @param url 请求的url
             * @param params 请求的参数
             * @param data 请求的数据
             * @param header 请求的 header
             * @returns $promise
             */
            getReq: function (url, params, data, header) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: EVN.debug ? (EVN.server + url + EVN.suffix) : url,
                    params: params||{},
                    headers: header||{},
                    // data: data||{}
                }).then(function (data) {
                    deferred.resolve(data.data)
                },function () {
                    deferred.reject(data.data)
                });
                return deferred.promise;
            },

            // 所有添加请求
            /**
             *
             * @param url 请求的url
             * @param params 请求的参数
             * @param data 请求的数据
             * @returns $promise
             */
            postReq: function (url, params, data) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: EVN.debug ? (EVN.server + url + EVN.suffix) : url,
                    params: params||{},
                    data: data||{}
                }).then(function (data) {
                    deferred.resolve(data.data)
                },function () {
                    deferred.reject(data.data)
                });
                return deferred.promise;
            },

            // 所有修改请求
            /**
             *
             * @param url 请求的url
             * @param params 请求的参数
             * @param data 请求的数据
             * @returns $promise
             */
            patchReq: function (url, params, data) {
                var deferred = $q.defer();
                $http({
                    method: 'PATCH',
                    url: EVN.debug ? (EVN.server + url + EVN.suffix) : url,
                    params: params||{},
                    // headers: header||{},
                    data: data||{}
                }).then(function (data) {
                    deferred.resolve(data.data)
                },function () {
                    deferred.reject(data.data)
                });
                return deferred.promise;
            },

            // 所有恢复请求
            /**
             *
             * @param url 请求的url
             * @param params 请求的参数
             * @param data 请求的数据
             * @returns $promise
             */
            putReq: function (url, params, data) {
                var deferred = $q.defer();
                $http({
                    method: 'PUT',
                    url: EVN.debug ? (EVN.server + url + EVN.suffix) : url,
                    params: params||{},
                    // headers: header||{},
                    data: data||{}
                }).then(function (data) {
                    deferred.resolve(data.data)
                },function () {
                    deferred.reject(data.data)
                });
                return deferred.promise;
            },

            // 所有删除请求
            /**
             *
             * @param url 请求的url
             * @param params 请求的参数
             * @param data 请求的数据
             * @returns $promise
             */
            deleteReq: function (url, params, data) {
                var deferred = $q.defer();
                $http({
                    method: 'DELETE',
                    url: EVN.debug ? (EVN.server + url + EVN.suffix) : url,
                    params: params||{},
                    // headers: header||{},
                    // data: data||{}
                }).then(function (data) {
                    deferred.resolve(data.data)
                },function () {
                    deferred.reject(data.data)
                });
                return deferred.promise;
            },
        };
    }
    /* @ngInject */
    // function superAdminService($resource, EVN) {
    //     return $resource(EVN.server + '/admin/:action0/:action',
    //         {},
    //         {
    //             // 菜单维护模块
    //
    //             // 3.1 查询一级菜单
    //             getFindRootMenuInfo: {
    //                 method: 'GET',
    //                 params: {
    //                     action: 'findRootMenuInfo' + EVN.suffix
    //                 }
    //             },
    //
    //             // 3.2 查询子菜单
    //             getFindSecMenuInfo: {
    //                 method: 'GET',
    //                 params: {
    //                     action: 'findSecMenuInfo' + EVN.suffix
    //                 }
    //             },
    //
    //             // 3.3 保存菜单
    //             postSaveMenuInfo: {
    //                 method: 'POST',
    //                 params: {
    //                     action: 'saveMenuInfo' + EVN.suffix
    //                 }
    //             },
    //
    //             // 3.4 更新菜单
    //             postUpdateMenuInfo: {
    //                 method: 'POST',
    //                 params: {
    //                     action: 'updateMenuInfo' + EVN.suffix
    //                 }
    //             },
    //
    //             // 3.5 删除一级菜单
    //             getDeleteMenuInfoById: {
    //                 method: 'GET',
    //                 params: {
    //                     action: 'deleteMenuInfoById' + EVN.suffix
    //                 }
    //             },
    //
    //             // 3.5 删除二级菜单
    //             getDeleteSecondMenuInfoById: {
    //                 method: 'GET',
    //                 params: {
    //                     action: 'deleteSecMenuInfoById' + EVN.suffix
    //                 }
    //             },
    //
    //             // 按钮维护模块
    //
    //             // 3.1 查找所有菜单
    //             getFindAllMenuInfo: {
    //                 method: 'GET',
    //                 params: {
    //                     action: 'findAllMenuInfo' + EVN.suffix
    //                 }
    //             },
    //
    //             // 3.2 更新按钮
    //             postUpdateButtonInfo: {
    //                 method: 'POST',
    //                 params: {
    //                     action: 'updateButtonInfo' + EVN.suffix
    //                 }
    //             },
    //
    //             // 3.3 根据菜单ID查询按钮
    //             getFindButtonInfoByMenuId: {
    //                 method: 'GET',
    //                 params: {
    //                     action: 'findButtonInfoByMenuId' + EVN.suffix
    //                 }
    //             },
    //
    //             // 3.4 保存按钮
    //             postSaveButtonInfo: {
    //                 method: 'POST',
    //                 params: {
    //                     action: 'saveButtonInfo' + EVN.suffix
    //                 }
    //             },
    //
    //             // 3.5 删除按钮
    //             getDeleteButtonInfoById: {
    //                 method: 'GET',
    //                 params: {
    //                     action: 'deleteButtonInfoById' + EVN.suffix
    //                 }
    //             },
    //
    //             // 角色维护模块
    //
    //             // 3.1 查询角色
    //             getFindPageRoleInfo: {
    //                 method: 'GET',
    //                 params: {
    //                     action: 'findPageRoleInfo' + EVN.suffix
    //                 }
    //             },
    //             // 3.1 查询未删除的角色
    //             getFindRoleInfoList: {
    //                 method: 'GET',
    //                 params: {
    //                     action: 'findRoleInfoList' + EVN.suffix
    //                 }
    //             },
    //
    //             // 3.2 保存角色
    //             postSaveRoleInfo: {
    //                 method: 'POST',
    //                 params: {
    //                     action: 'saveRoleInfo' + EVN.suffix
    //                 }
    //             },
    //
    //             // 3.3 更新角色
    //             postUpdateRoleInfo: {
    //                 method: 'POST',
    //                 params: {
    //                     action: 'updateRoleInfo' + EVN.suffix
    //                 }
    //             },
    //
    //             // 3.4 删除角色
    //             getDeleteRoleInfoById: {
    //                 method: 'GET',
    //                 params: {
    //                     action: 'deleteRoleInfoById' + EVN.suffix
    //                 }
    //             },
    //
    //             // 3.1 查找菜单树
    //             getFindMenuByRoleId: {
    //                 method: 'GET',
    //                 params: {
    //                     action: 'findMenuByRoleId' + EVN.suffix
    //                 }
    //             },
    //
    //             // 3.2 添加角色菜单按钮关系
    //             postAddRoleAndMenuAndBtn: {
    //                 method: 'POST',
    //                 params: {
    //                     action: 'addRoleAndMenuAndBtn' + EVN.suffix
    //                 }
    //             },
    //
    //             // 3.3 删除角色菜单按钮关系
    //             getDeleteRoleAndMenuAndBtn: {
    //                 method: 'GET',
    //                 params: {
    //                     action: 'deleteRoleAndMenuAndBtn' + EVN.suffix
    //                 }
    //             },
    //
    //             // 3.4 查找按钮
    //             getFindButtonInfoList: {
    //                 method: 'GET',
    //                 params: {
    //                     action: 'findButtonInfoList' + EVN.suffix
    //                 }
    //             },
    //
    //             // 管理员模块
    //
    //             // 3.1 查询用户
    //             getFindUserLog: {
    //                 method: 'GET',
    //                 params: {
    //                     action0:'log',
    //                     action: 'findLogListByParams' + EVN.suffix
    //                 }
    //             },
    //
    //             // 3.1 查询用户
    //             getFindUserInfo: {
    //                 method: 'GET',
    //                 params: {
    //                     action: 'findUserInfo' + EVN.suffix
    //                 }
    //             },
    //
    //             // 3.2 保存用户
    //             postSaveUserInfo: {
    //                 method: 'POST',
    //                 params: {
    //                     action: 'saveUserInfo' + EVN.suffix
    //                 }
    //             },
    //
    //             // 3.3 更新用户
    //             postUpdateUserInfo: {
    //                 method: 'POST',
    //                 params: {
    //                     action: 'updateUserInfo' + EVN.suffix
    //                 }
    //             },
    //
    //             // 3.4 删除用户
    //             getDeleteUserById: {
    //                 method: 'GET',
    //                 params: {
    //                     action: 'deleteUserById' + EVN.suffix
    //                 }
    //             },
    //
    //             // 3.1 菜单按钮
    //             getFindRoleMenuByRoleId: {
    //                 method: 'GET',
    //                 params: {
    //                     action: 'findRoleMenuByRoleId' + EVN.suffix
    //                 }
    //             },
    //         }
    //     );
    // }

})(angular);


/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('admin')
        .directive('inputSelect', inputSelect);

    inputSelect.$inject=['$rootScope','adminService','$timeout'];
    /* @ngInject */
    function inputSelect($rootScope, adminService, $timeout) {
        return{
            restrict: 'EA',
            template:
            '<div>'+
            '<ui-select\n' +
            '                                ng-model="searchValue.select"\n' +
            '                                on-select="handelSelect($item, $model)"\n' +
            '                                theme="bootstrap"\n' +
            '                            >\n' +
            '                                <ui-select-match placeholder="{{inputPlaceholder}}">\n' +
            '                                    <span ng-bind="$select.selected._label"></span>\n' +
            '                                </ui-select-match>\n' +
            '                                <ui-select-choices repeat="item._label as item in allItems | filter: {\'_label\':$select.search}">\n' +
            '                                    <span ng-bind="item._label"></span>\n' +
            '                                </ui-select-choices>\n' +
            '                            </ui-select></div>',
            replace:true,
            scope:{
                inputPlaceholder:'@',
                initPlaceholder:'@',
                inputkey:'@',
                outputkey:'@',
                searchkey:'@',
                url:'@',
                minLength:'@',
                outputValue:'='
            },
            link:function($scope,$element,$attrs){
                var timer = null;

                $scope.allItems = [];

                if(!$scope.outputkey){
                    $scope.outputkey = ''
                }
                if(!$scope.searchkey){
                    $scope.searchkey = $scope.outputValue
                }
                if(!$scope.inputPlaceholder){
                    $scope.inputPlaceholder = 'search value'
                }

                $scope.searchValue = {};
                $scope.once = true;
                $scope.inputStatu=$scope.inputStatu||false;
                $scope.searchDataFromServer = function (value) {
                    var temAoData = {
                        page: 1,
                        pageSize: 25
                    };
                    if($scope.searchkey && typeof value !== 'object'){
                        temAoData[$scope.searchkey] = value||'';
                    }else{
                        window.Object.assign(temAoData,value)
                    }
                    adminService.getReq($scope.url,temAoData,{},{_loading:false}).then(function (data){
                        var result = data.data && data.data.data;
                        if(result && result.data && result.meta){
                            if(window.Array.isArray(result.data)){
                                $scope.allItems = [];
                                result.data.forEach(function(dataItem) {
                                    var tempObj={};
                                    if(window.Array.isArray(dataItem[$scope.inputkey])){
                                        tempObj['_label'] = $rootScope.showArrayName(dataItem[$scope.inputkey])
                                    }else{
                                        tempObj['_label']=dataItem[$scope.inputkey]||'';
                                    }
                                    tempObj['_value']=dataItem[$scope.outputkey]||'';
                                    $scope.allItems.push(tempObj)
                                    if($scope.once&&$scope.allItems[0]){
                                        $scope.searchValue.select = $scope.allItems[0];
                                        $($element).find('.ui-select-search').val($scope.searchValue.select['_label']);
                                        $scope.initPlaceholder = false;
                                    }
                                    $scope.once = false;
                                })
                            }
                        }else{
                            $scope.allItems=[];
                        }
                    });
                };
                $scope.handelSelect = function($item, $model) {
                    $scope.initPlaceholder = false;
                    $scope.outputValue = $item['_value']||'';
                    $($element).find('.ui-select-search').val($model)
                };

                if(!$scope.outputValue){
                    $scope.outputValue = ''
                }else {
                    if($scope.outputkey=='affiliateId'){
                        $scope.searchDataFromServer({
                            'affiliate_id':$scope.outputValue
                        })
                    }else if($scope.outputkey=='userId'){
                        $scope.searchDataFromServer({
                            'username':$scope.initPlaceholder
                        })
                    }
                    console.log($scope.outputValue,'$scope.outputValue')
                }

                $scope.$watch('outputValue',function(newValue, oldValue) {
                    if(newValue!==oldValue){
                        if(!newValue){
                            $($element).find('.ui-select-search').val('');
                            $scope.searchValue.select = undefined;
                        }
                    }
                });

                $timeout(function() {
                    $($element).find('.ui-select-search').bind('keyup', function(e) {
                        var tempvalue = e.target.value;
                        if(!tempvalue){
                            $scope.outputValue = '';
                            console.log($scope.outputValue)
                            return;
                        }
                        if($scope.minLength){
                            if(tempvalue.length<parseInt($scope.minLength)){
                                return;
                            }
                        }
                        if (timer) {
                            $timeout.cancel(timer);
                        }
                        timer = $timeout(function() {
                            $scope.searchDataFromServer(tempvalue);
                        }, 300);
                    });
                },10)
            }
        }
    }

})();

(function() {

    angular
        .module('admin.affiliatesManage')
        .controller('AffiliatesManageController', AffiliatesManageController);

    AffiliatesManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        '$translate',
        'adminService'
    ];

    function AffiliatesManageController(
        $scope,
        $rootScope,
        $uibModal,
        $translate,
        adminService
    ) {

        $scope.currencyOptions = [];

        $scope.initCurrenciesManageData = function () {
            $scope.currencyOptions = [];
            adminService.getReq($rootScope.URL.CURRENCIESMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.name||'',
                                    value:objItem.code||''
                                };
                                if(objItem.supported){
                                    $scope.currencyOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        $scope.genderOptions = [
            {
                label:'male',
                value:'M'
            },
            {
                label:'female',
                value:'F'
            },
            {
                label:'unknown',
                value:'U'
            },
        ];

        $scope.booleanOptons = [
            {
                label: 'Yes',
                value: true
            },
            {
                label: 'No',
                value: false
            }
        ];

        $scope.affiliatesManageUrl = $scope.URL.AFFILIATESMANAGE.GET;

        // 原始的数据
        $scope.affiliatesManage = [];
        $scope.affiliatesManageReload = 1;
        $scope.affiliatesManageAoData = {};
        $scope.tempAffiliatesManageAoData = {};

        $scope.trigerSearch = function() {
            if($scope.tempAffiliatesManageAoData.username&&$scope.tempAffiliatesManageAoData.username.length&&($scope.tempAffiliatesManageAoData.username.length<3||$scope.tempAffiliatesManageAoData.username.length>11)){
                $rootScope.alertErrorMsg('username char length should between 3 and 11');
                return;
            }
            $scope.tempAffiliatesManageAoData = Object.assign($scope.tempAffiliatesManageAoData,$scope.affiliatesManageAoData)
            $scope.affiliatesManageReload++
        };

        $scope.resetSearch = function() {
            $scope.affiliatesManageAoData = {};
            $scope.searchTimeStart = undefined;
            $scope.searchTimeEnd = undefined;
            var tempData = $scope.tempAffiliatesManageAoData;
            $scope.tempAffiliatesManageAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.affiliatesManageReload++
        };

        // 初始化table数据
        $scope.initAffiliatesManageData = function () {
            $scope.affiliatesManageReload++;
        };


        // 保存
        /**
         *
         * @param affiliatesManage AFFILIATESMANAGETITLE数据对象
         * @param item
         */

        $scope.saveAffiliatesManage = function (affiliatesManage, item) {
            var tempData = angular.extend({}, affiliatesManage, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.AFFILIATESMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initAffiliatesManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && affiliatesManage.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.AFFILIATESMANAGE.PATCH+'/'+affiliatesManage.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initAffiliatesManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除affiliatesManage
        /**
         * @param affiliatesManage AFFILIATESMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteAffiliatesManage = function (affiliatesManage) {
            if (!$scope.validIsNew(affiliatesManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.AFFILIATESMANAGE.DELETE+'/'+affiliatesManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initAffiliatesManageData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        $scope.showAffiliatesModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/affiliatesManage/affiliatesManageModal.html',
                controller: 'affiliatesManageModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit:edit,
                    modalItem: item,
                    hasPower:$scope.validPower("AFFILIATESMANAGE", ["PATCH"]) && edit !== 1,
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initAffiliatesManageData();
            }, function (data) {

            });
        };

        // 恢复affiliatesManage
        /**
         * @param affiliatesManage AFFILIATESMANAGETITLE数据对象
         * @return null
         */
        $scope.recoverAffiliatesManage = function (affiliatesManage) {
            if (!$scope.validIsNew(affiliatesManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.AFFILIATESMANAGE.PUT+'/'+affiliatesManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initAffiliatesManageData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                }, 'recover');
            }
        };

        $scope.openNewTab = function(item,state) {
            if(state === 'bankCardsUser'){
                adminService.getReq($rootScope.URL.AFFILIATESMANAGE.SELECTCARDS+'/'+item.userId, {}, {}).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            var modalInstance = $uibModal.open({
                                animation: true,
                                ariaLabelledBy: 'modal-title',
                                ariaDescribedBy: 'modal-body',
                                templateUrl: '/views/admin/bankCards/userBankCardsModal.html',
                                controller: 'UserBankCardsModalController',
                                size: 'lg',
                                scope:$scope,
                                windowClass: 'full-screen-modal-window',
                                resolve: {
                                    modalItem: res.data,
                                }
                            });
                            modalInstance.result.then(function (data) {

                            }, function (data) {

                            });
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
                return;
            }
            if(state === 'summaryAffiliates'){
                adminService.getReq($rootScope.URL.AFFILIATESMANAGE.SELECTSUMMARY+'/'+item.userId, {}, {}).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            var modalInstance = $uibModal.open({
                                animation: true,
                                ariaLabelledBy: 'modal-title',
                                ariaDescribedBy: 'modal-body',
                                templateUrl: '/views/admin/dataPort/summaryAffiliatesModal.html',
                                controller: 'summaryAffiliatesModalController',
                                size: 'lg',
                                scope:$scope,
                                windowClass: 'full-screen-modal-window',
                                resolve: {
                                    modalItem: angular.copy(res.data.data),
                                }
                            });
                            modalInstance.result.then(function (data) {

                            }, function (data) {

                            });
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
                return;
            }
            if(state === 'usersManage'){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/admin/usersManage/userManageFilterEditModal.html',
                    controller: 'usersManageFilterModalController',
                    size: 'lg',
                    windowClass: 'full-screen-modal-window',
                    scope:$scope,
                    resolve: {
                        filter: {
                            affiliate_id:item.userId
                        },
                    }
                });
                modalInstance.result.then(function (data) {

                }, function (data) {

                });
            }
            if(state === 'ordersManage'){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/admin/ordersManage/orderManageFilterModal.html',
                    controller: 'OrderManageFilterModalController',
                    size: 'lg',
                    windowClass: 'full-screen-modal-window',
                    scope:$scope,
                    resolve: {
                        filter: {
                            affiliate_id:item.userId
                        },
                    }
                });
                modalInstance.result.then(function (data) {

                }, function (data) {

                });
            }
            if(state === 'withdrawsManage'){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/admin/withdrawsManage/withdrawsManageFilterModal.html',
                    controller: 'WithdrawsManageFilterModalController',
                    size: 'lg',
                    windowClass: 'full-screen-modal-window',
                    scope:$scope,
                    resolve: {
                        filter: {
                            affiliate_id:item.userId
                        },
                    }
                });
                modalInstance.result.then(function (data) {

                }, function (data) {

                });
            }
            if(state === 'rebatesList'){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/admin/rebatesList/rebatesListFilterModal.html',
                    controller: 'RebatesListFilterModalController',
                    size: 'lg',
                    windowClass: 'full-screen-modal-window',
                    scope:$scope,
                    resolve: {
                        filter: {
                            affiliate_id:item.userId
                        },
                    }
                });
                modalInstance.result.then(function (data) {

                }, function (data) {

                });
            }
            if(state === 'appliesUse'){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/admin/appliesUse/appliesUseFilterModal.html',
                    controller: 'AppliesUseFilterModalController',
                    size: 'lg',
                    windowClass: 'full-screen-modal-window',
                    scope:$scope,
                    resolve: {
                        filter: {
                            affiliate_id:item.userId
                        },
                    }
                });
                modalInstance.result.then(function (data) {

                }, function (data) {

                });
            }
            // var url = window.location.pathname+$rootScope.$state.href(state)+'?_username='+(item.username||'')+'&user_id='+(item.userId||'');
            // window.open(url,'_blank');
        };

        $scope.showDescriptionDetail = function (data) {
            var tempStr = '';
            if (typeof data == 'object') {
                window.Object.keys(data).map(function (item) {
                    if(typeof data[item] == 'boolean'){
                        tempStr = tempStr + '<span style="width: 180px;text-align: left">'+$translate.instant(item)+'</span>'  + ':' + (data[item]?'Yes':'No') + '</br>'
                    }
                })
            }
            return tempStr;
        };

        // 页面加载执行的函数

        $scope.initCurrenciesManageData();
    }
})();

(function() {

    angular
        .module('admin.affiliatesManage')
        .controller('affiliatesManageModalController', affiliatesManageModalController);

    affiliatesManageModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'hasPower',
        'edit',
        'modalItem'
    ];

    function affiliatesManageModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        hasPower,
        edit,
        modalItem
    ) {

        $scope.hasPower = hasPower;

        $scope.edit = edit;

        $scope.modalItem = angular.copy(modalItem);

        $scope.showMethodsNameModal = [];
        $scope.methodsNameModalReload = 1;
        $scope.methodsNameModalAoData = {};
        $scope.methodsNameModalSearch = '';

        // 初始化table数据
        $scope.initMethodsNameModalData = function () {
            if(edit == 2){
                $scope.modalItem = {

                }
            }else{

            }
        };

        $scope.confirmModal = function () {
            var tempData = {
                name:$scope.modalItem.name,
                phone:$scope.modalItem.phone,
                approved:$scope.modalItem.isApproved,
                locked:$scope.modalItem.isLocked,
                nameVerified:$scope.modalItem.verifications.name,
                phoneVerified:$scope.modalItem.verifications.phone
            };
            adminService.patchReq($rootScope.URL.AFFILIATESMANAGE.PATCH+'/'+modalItem.userId, {}, tempData).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $uibModalInstance.close('OK');
                        $rootScope.toasterSuccess(res.data.msg);
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initMethodsNameModalData();

    }
})();

(function() {


    angular
        .module('admin.admin')
        .controller('SuperAdminAdminController', SuperAdminAdminController);

    SuperAdminAdminController.$inject = [
        '$scope',
        '$rootScope',
        'superAdminService'
    ];

    function SuperAdminAdminController(
        $scope,
        $rootScope,
        superAdminService
    ) {

        $scope.superAdminSelect012 = $rootScope.superAdminSelect012;

        // 原始的二级数据
        $scope.admins = [];

        // 过滤出来的二级数据
        $scope.adminsReload = 1;
        $scope.adminsAoData = {
            status: ''
        };
        $scope.tempAdminsAoData = {
            status: ''
        };

        $scope.trigerSearch = function() {
            $scope.tempAdminsAoData = Object.assign($scope.tempAdminsAoData,$scope.adminsAoData);
            $scope.adminsReload++;
        };

        $scope.resetSearch = function() {
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            $scope.adminsAoData = {
                status: ''
            };
            var tempData = $scope.tempAdminsAoData;
            $scope.tempAdminsAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize,
                status: ''
            };
            $scope.adminsReload++;
        };

        /**
         * 校验密码长度
         *
         * @param {any} str 字符串
         */
        $scope.checkPassword = function(str) {
            if (typeof str === 'string') {
                var tempStr = $scope.checkRequiredData(str);
                if(typeof tempStr === 'string' && tempStr.length){
                    return tempStr;
                }
                if(str.length<6 || str.length>16){
                    return 'password length should be between 6 and 16!';
                }else{
                    return true;
                }
            }
            return 'password should be string';
        };

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.adminsAoData.start = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.adminsAoData.start) {
                        $scope.adminsAoData.start = '';
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.adminsAoData.end = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.adminsAoData.end) {
                        $scope.adminsAoData.end = '';
                    }
                }
            }
        });

        // 保存管理员
        /**
         * @param admin 管理员对象
         * @param item 显示输入的数据对象
         * @return null
         */
        $scope.saveAdmin = function (admin, item) {
            var tempData = angular.extend({}, admin, item);
            if (!tempData.id) {
                if(!$scope.validPower("MANAGEADMINUSER", ["POST"])){
                    return '';
                }
                delete tempData.id;
                superAdminService.postReq($rootScope.URL.MANAGEADMINUSER.POST, {}, tempData).then(function (data) {
                    console.log(data);
                    $scope.adminsReload++;
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            } else if (tempData.id) {
                if(!$scope.validPower("MANAGEADMINUSER", ["PATCH"])){
                    return '';
                }
                superAdminService.patchReq($rootScope.URL.MANAGEADMINUSER.PATCH, {}, tempData).then(function (data) {
                    console.log(data);
                    $scope.adminsReload++;
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }
            return '';

        };

        // 删除admin
        /**
         * @param admin 管理员数据对象
         * @return null
         */
        $scope.deleteAdmin = function (admin) {
            if(!$scope.validPower("MANAGEADMINUSER", ["DELETE"])){
                return '';
            }
            if (admin.id) {
                $rootScope.alertConfirm(function () {
                    superAdminService.deleteReq($rootScope.URL.MANAGEADMINUSER.DELETE, { id: admin.id }, {}).then(function (data) {
                        if (typeof data.success === 'boolean') {
                            if (data.success) {
                                $rootScope.toasterSuccess(data.msg);
                                $scope.adminsReload++;
                            } else {
                                $rootScope.alertErrorMsg(data.msg);
                            }
                        }
                    });
                });
            }
        };

        $scope.changePasswordNull = function(arr) {
            arr.forEach(function (adminItem, adminIndex) {
                adminItem.password = '';
            });
            return arr;
        };

        // 添加按钮
        $scope.addAdmins = function () {
            $scope.admins.unshift({
                'id': null,
                'username': '',
                'password': '',
                'status': '1',
                'level': null,
                'createTime': null,
                'optTime': null,
                'roleId': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的对象
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.admins.splice(index, 1);
            }
        };

        // 页面加载执行的函数
    }
})();

(function() {

    angular
        .module('admin.admin')
        .controller('SuperAdminAdminRelationController', SuperAdminAdminRelationController);

    SuperAdminAdminRelationController.$inject = [
        '$scope',
        '$rootScope',
        'superAdminService',
        '$timeout'
    ];

    function SuperAdminAdminRelationController(
        $scope,
        $rootScope,
        superAdminService,
        $timeout
    ) {

        $scope.roles = [];

        $scope.admins = [];

        $scope.currentAdmin = {};

        $scope.roleMenuAndBtn = [];

        $scope.initRolesData = function () {
            superAdminService.getReq($rootScope.URL.MANAGEADMINROLE.MIDGET, { 'pageSize': 100, 'curPage': 1 }, {}).then(function (data) {
                console.log(data, 'initRolesData');
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        $scope.roles = angular.copy(data.data);
                    } else {
                        $rootScope.alertErrorMsg(data.msg);
                    }
                }
            });
        };

        $scope.initAdminsData = function (userName) {
            superAdminService.getReq($rootScope.URL.MANAGEADMINROLE.LEFTGET, { 'pageSize': 100, 'curPage': 1, 'status': 1, 'userName': userName || '' }, {}).then(function (data) {
                console.log(data);
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        $scope.admins = angular.copy(data.data.list);
                        if (!$scope.currentAdmin.id) {
                            if ($scope.admins.length > 0) {
                                $scope.currentAdmin = angular.copy($scope.admins[0]);
                                $scope.getRoleMenuAndBtn($scope.currentAdmin.roleId);
                            }
                        }
                    } else {
                        $rootScope.alertErrorMsg(data.msg);
                    }
                }
            });
        };

        // 获取用户的menu和button
        /**
         * @param id 角色对象的id
         * @return null
         */
        $scope.getRoleMenuAndBtn = function (id) {
            $scope.roleMenuAndBtn = [];
            if (id) {
                superAdminService.getReq($rootScope.URL.MANAGEADMINROLE.RIGHTGET, { 'roleId': id }, {}).then(function (data) {
                    console.log(data, 'getRoleMenuAndBtn');
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.roleMenuAndBtn = angular.copy(data.data);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }else{

            }
        };

        // 获取用户的menu和button
        /**
         * @param admin 管理员对象
         * @return null
         */
        $scope.setCurrentAdmin = function (admin) {
            $scope.currentAdmin = angular.copy(admin);
            $scope.getRoleMenuAndBtn(admin.roleId);
        };

        // 设置用户的roleId
        /**
         * @param role 角色对象
         * @return null
         */
        $scope.setAdminRoleId = function (role) {
            if ($scope.currentAdmin.id) {
                var tempData = angular.copy($scope.currentAdmin);
                tempData.roleId = role.id;
                superAdminService.patchReq($rootScope.URL.MANAGEADMINROLE.MIDPATCH, {}, tempData).then(function (data) {
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $rootScope.toasterSuccess(data.msg);
                            $scope.currentAdmin.roleId = role.id;
                            $scope.admins.forEach(function (admin) {
                                if (admin.id == $scope.currentAdmin.id) {
                                    admin.roleId = role.id;
                                }
                            });
                            $scope.getRoleMenuAndBtn(role.id);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            } else {
                $rootScope.alertErrorMsg('select admin first!');
                return;
            }
        };

        var timer = null;

        $scope.$watch('userName', function (newValue, oldValue) {
            if (newValue != oldValue) {
                if (timer) {
                    $timeout.cancel(timer);
                }
                timer = $timeout(function() {
                    $scope.initAdminsData($scope.userName);
                }, 200);
            }
        });

        // 页面加载执行的函数

        $scope.initRolesData();

        $scope.initAdminsData();
    }
})();

(function() {


    angular
        .module('admin.admin')
        .controller('SuperAdminAdminLogController', SuperAdminAdminLogController);

    SuperAdminAdminLogController.$inject = [
        '$scope',
        '$rootScope',
        '$translate',
        'superAdminService'
    ];

    function SuperAdminAdminLogController(
        $scope,
        $rootScope,
        $translate,
        superAdminService
    ) {

        $scope.methodTypeOptions = [
            {
                label:'All',
                value:''
            },
            {
                label:'GET',
                value:'GET'
            },
            {
                label:'POST',
                value:'POST'
            },
            {
                label:'PATCH',
                value:'PATCH'
            },
            {
                label:'DELETE',
                value:'DELETE'
            },
            {
                label:'PUT',
                value:'PUT'
            },
        ];

        $scope.adminsLog = [];
        $scope.adminsLogReload = 1;
        $scope.tempAdminsLogAoData = {};
        $scope.adminsLogAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempAdminsLogAoData = Object.assign($scope.tempAdminsLogAoData,$scope.adminsLogAoData);
            $scope.adminsLogReload++;
        };

        $scope.resetSearch = function() {
            $scope.adminsLogAoData = {};
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempAdminsLogAoData;
            $scope.tempAdminsLogAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.adminsLogReload++;
        };

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.adminsLogAoData.beginTime = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.adminsLogAoData.beginTime) {
                        $scope.adminsLogAoData.beginTime = '';
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.adminsLogAoData.endTime = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.adminsLogAoData.endTime) {
                        $scope.adminsLogAoData.endTime = '';
                    }
                }
            }
        });

        $scope.showDescriptionDetail = function (data) {
            var tempStr = '';
            var tempObj = JSON.parse(data);
            if (typeof tempObj == 'object') {
                window.Object.keys(tempObj).map(function (item) {
                    tempStr = tempStr + '<span style="max-width: 180px;text-align: left">'+$translate.instant(item)+'</span>'  + ':' + tempObj[item].toString() + '</br>'
                })
            }
            return tempStr;
        };


        // 页面加载执行的函数
    }
})();

(function() {

    angular
        .module('admin.affiliatesPlans')
        .controller('AffiliatesPlansController', AffiliatesPlansController);

    AffiliatesPlansController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function AffiliatesPlansController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        // 原始的数据
        $scope.affiliatesPlans = [];

        // 过滤出来的数据
        $scope.showAffiliatesPlans = [];
        $scope.affiliatesPlansReload = 1;
        $scope.affiliatesPlansAoData = {};
        $scope.affiliatesPlansSearch = '';

        // 初始化table数据
        $scope.initAffiliatesPlansData = function () {
            adminService.getReq($rootScope.URL.AFFILIATESPLANS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.affiliatesPlans = angular.copy(res.data.data);
                        $scope.affiliatesPlans.forEach(function (affiliatesPlansItem, affiliatesPlansIndex) {
                            affiliatesPlansItem._id = affiliatesPlansIndex +1;
                        });
                        $scope.affiliatesPlansReload++;
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.showAffiliatesPlansModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/affiliatesPlans/affiliatesPlansModal.html',
                controller: 'affiliatesPlansModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit:edit,
                    modalItem: item,
                    hasPower:$scope.validPower("AFFILIATESPLANS", ["PATCH", "POST"]) && edit !== 1,
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initAffiliatesPlansData();
            }, function (data) {

            });
        };

        // 删除affiliatesPlans
        /**
         * @param affiliatesPlans AFFILIATESPLANSTITLE数据对象
         * @return null
         */
        $scope.deleteAffiliatesPlans = function (affiliatesPlans) {
            if (!$scope.validIsNew(affiliatesPlans._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.AFFILIATESPLANS.DELETE+'/'+affiliatesPlans.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initAffiliatesPlansData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        // 恢复affiliatesPlans
        /**
         * @param affiliatesPlans AFFILIATESPLANSTITLE数据对象
         * @return null
         */
        $scope.recoverAffiliatesPlans = function (affiliatesPlans) {
            if (!$scope.validIsNew(affiliatesPlans._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.putReq($rootScope.URL.AFFILIATESPLANS.PUT+'/'+affiliatesPlans.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initAffiliatesPlansData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                }, 'recover');
            }
        };

        // 页面加载执行的函数

        $scope.initAffiliatesPlansData();
    }
})();

(function() {

    angular
        .module('admin.affiliatesPlans')
        .controller('affiliatesPlansModalController', affiliatesPlansModalController);

    affiliatesPlansModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'hasPower',
        'edit',
        'modalItem'
    ];

    function affiliatesPlansModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        hasPower,
        edit,
        modalItem
    ) {

        $scope.hasPower = hasPower;

        $scope.edit = edit;

        $scope.modalItem = angular.copy(modalItem);

        // 原始的数据
        $scope.methodsNameModal = [];

        // 过滤出来的数据
        $scope.showMethodsNameModal = [];
        $scope.methodsNameModalReload = 1;
        $scope.methodsNameModalAoData = {};
        $scope.methodsNameModalSearch = '';

        // 初始化table数据
        $scope.initMethodsNameModalData = function () {
            if(edit == 2){
                $scope.modalItem = {
                    "code": "",
                    "level": "",
                    "stages": []
                }
            }else{
                if($scope.modalItem['stages']&&$scope.modalItem['stages'].length){
                    $scope.methodsNameModal = $scope.modalItem['stages'];
                    $scope.methodsNameModal.forEach(function (methodsNameItem, methodsNameIndex) {
                        methodsNameItem.id = methodsNameIndex + 1;
                        if(methodsNameItem.profit){
                            methodsNameItem.minProfit = methodsNameItem.profit.min || '';
                            methodsNameItem.maxProfit = methodsNameItem.profit.max || '';
                        }
                    })
                }
            }
        };

        $scope.checkStagesDataActiveUsers = function(data) {
            if(!data){
                return $scope.checkRequiredData(data)
            }
            if(/^[1-9][0-9]?$/.test(data)&&window.parseInt(data)>4){

            }else{
                return 'integer number min 5'
            }
        };

        $scope.checkStagesDataRate = function(data) {
            var tempData = window.parseFloat(data).toFixed(2);
            if(!data){
                return $scope.checkRequiredData(data)
            }
            if(tempData<0.01||tempData>0.6){
                return '0.01-0.6'
            }
        };

        // 保存
        /**
         *
         * @param methodsNameModal 渠道名称数据对象
         * @param data
         */

        $scope.saveMethodsNameModal = function (methodsNameModal, data) {
            if(window.parseInt(data.minProfit)>window.parseInt(data.maxProfit)){
                $rootScope.alertErrorMsg('maxProfit should greater than minProfit');
                return '';
            }
            $scope.methodsNameModal.forEach(function (methodsNameModalItem) {
                if(methodsNameModalItem.id == methodsNameModal.id){
                    window.Object.assign(methodsNameModalItem, data);
                    if($scope.validIsNew(methodsNameModalItem.id)){
                        methodsNameModalItem.id = window.parseInt(methodsNameModalItem.id, 10)
                        $scope.methodsNameModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param methodsNameModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteMethodsNameModal = function (methodsNameModal, index) {
            $scope.methodsNameModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addMethodsNameModal = function () {
            $scope.methodsNameModalAoData = {};
            $scope.methodsNameModalSearch = '';
            $scope.methodsNameModal.unshift({
                'id': ($scope.methodsNameModal.length+1) + 'null',
                'level':'',
                'minProfit':'',
                'maxProfit':'',
                'rate':'',
            });
        };

        /**
         *
         * @param modalItem 添加的渠道名称
         * @param index 添加的index
         */

        $scope.cancelSaveModal = function (item, index) {
            if ($scope.validIsNew(item.id)) {
                $scope.methodsNameModal.splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            if($scope.methodsNameModal && $scope.methodsNameModal.length){
                var tempObj = {};
                var sameKey = false;
                $scope.methodsNameModal.map(function(nameItem) {
                    if(tempObj[nameItem.level]){
                        sameKey = true
                    }
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same level,just remove one');
                    return '';
                }
            }
            var tempData = angular.copy($scope.modalItem);
            tempData.stages = angular.copy($scope.showMethodsNameModal);

            tempData.stages.forEach(function(stagesItem) {
                if(stagesItem.id){
                    delete stagesItem.id;
                }
            })
            if(tempData._id){
                delete tempData._id;
            }
            if(edit ==2){
                adminService.postReq($rootScope.URL.AFFILIATESPLANS.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }else if(edit == 3){
                adminService.patchReq($rootScope.URL.AFFILIATESPLANS.PATCH+'/'+tempData.code, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initMethodsNameModalData();

    }
})();

(function() {

    angular
        .module('admin.appliesUse')
        .controller('AppliesUseAuditModalController', AppliesUseAuditModalController);

    AppliesUseAuditModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        'item',
        '$translate'
    ];

    function AppliesUseAuditModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        item,
        $translate
    ) {
        $scope.resultOptions = [
            {
                label:'pass',
                value:'pass'
            },
            {
                label:'rejected',
                value:'rejected'
            },
            {
                label:'pending',
                value:'pending'
            }
        ];

        $scope.appliesUseSaveAudit = {
            result: $scope.resultOptions[0].value,
            comment: '',
            adminId: window.userInfo && window.userInfo.adminId || '',
            adminname: window.userInfo && window.userInfo.username || '',
        };

        $scope.confirmModal = function () {
            adminService.postReq($rootScope.URL.APPLIESUSE.POSTAUDIT+'/'+item.id, {}, $scope.appliesUseSaveAudit).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $uibModalInstance.close('success');
                        $rootScope.toasterSuccess(res.data.msg);
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

    }
})();

(function() {

    angular
        .module('admin.appliesUse')
        .controller('AppliesUseFilterModalController', AppliesUseFilterModalController);

    AppliesUseFilterModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        'filter',
        '$translate'
    ];

    function AppliesUseFilterModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        filter,
        $translate
    ) {

        $scope.walletOptions = [];

        $scope.initWalletOptionsData = function () {
            $scope.walletOptions = [];
            adminService.getReq($rootScope.URL.WALLETSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.walletOptions.push(tempObj)
                                //if(!objItem.disabled){
                                //    $scope.walletOptions.push(tempObj)
                                //}
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.search = {
            products: [],
            status: [],
            brands: [],
            wallets: [],
        };

        $scope.statusOptions = [
            {
                label:'pending',
                value:'pending'
            },
            {
                label:'succeed',
                value:'succeed'
            },
            {
                label:'failed',
                value:'failed'
            },
            {
                label:'revoked',
                value:'revoked'
            },
            {
                label:'processing',
                value:'processing'
            }
        ];

        $scope.brandOptions = [];

        $scope.initBrandOptionsData = function () {
            $scope.brandOptions = [];
            adminService.getReq($rootScope.URL.GAMEBRANDS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.brandOptions.push(tempObj)
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.productOptions = [];
        $scope.productSearchOptions = [];

        $scope.initProductManageData = function () {
            $scope.productOptions = [];
            $scope.productSearchOptions = [];
            adminService.getReq($rootScope.URL.GAMESPRODUCTS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.productSearchOptions.push(tempObj)
                                if(objItem.disabled == false){
                                    $scope.productOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.appliesUseUrl = $rootScope.URL.APPLIESUSE.GET;

        // 原始的数据
        $scope.appliesUse = [];

        // 过滤出来的数据
        $scope.showAppliesUse = [];
        $scope.appliesUseReload = 1;
        $scope.appliesUseAoData = {};
        $scope.tempAppliesUseAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempAppliesUseAoData = Object.assign($scope.tempAppliesUseAoData,$scope.appliesUseAoData)
            $scope.appliesUseReload++;
        };

        $scope.resetSearch = function() {
            $scope.search = {
                products: [],
                status: [],
                brands: [],
                wallets: [],
            };
            $scope.appliesUseAoData = {};
            var tempData = $scope.tempAppliesUseAoData;
            $scope.tempAppliesUseAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            }
            $scope.appliesUseReload++;
        };

        // 初始化table数据
        $scope.initAppliesUseData = function () {
            $scope.appliesUseReload++;
        };

        // 页面加载执行的函数

        $scope.initWalletOptionsData();

        $scope.initBrandOptionsData();

        $scope.initProductManageData();

        $scope.$watch('search.products.length+search.status.length+search.brands.length+search.wallets.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.appliesUseAoData.products = $scope.search.products.join(',');
                $scope.appliesUseAoData.status = $scope.search.status.join(',');
                $scope.appliesUseAoData.brands = $scope.search.brands.join(',');
                $scope.appliesUseAoData.wallets = $scope.search.wallets.join(',');
            }
        });

        $scope.filter = filter;

        $scope.urlUsername = $scope.filter.username||'';

        if($scope.filter.username){
            delete $scope.filter.username
        }

        $scope.appliesUseAoData = window.Object.assign($scope.appliesUseAoData, $scope.filter)
        $scope.tempAppliesUseAoData = window.Object.assign($scope.tempAppliesUseAoData, $scope.filter)

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

    }
})();

(function() {

    angular
        .module('admin.appliesUse')
        .controller('AppliesUseRevokeModalController', AppliesUseRevokeModalController);

    AppliesUseRevokeModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        'item',
        '$translate'
    ];

    function AppliesUseRevokeModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        item,
        $translate
    ) {
        $scope.resultOptions = [
            {
                label:'revoked',
                value:'revoked'
            },
            {
                label:'succeed',
                value:'succeed'
            }
        ];

        $scope.appliesUseSaveRevoke = {
            result: $scope.resultOptions[0].value,
            comment: '',
            adminId: window.userInfo && window.userInfo.adminId || '',
            adminname: window.userInfo && window.userInfo.username || '',
        };

        $scope.confirmModal = function () {
            adminService.postReq($rootScope.URL.APPLIESUSE.POSTREVOKE+'/'+item.id, {}, $scope.appliesUseSaveRevoke).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $uibModalInstance.close('success');
                        $rootScope.toasterSuccess(res.data.msg);
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

    }
})();

(function() {

    angular
        .module('admin.appliesUse')
        .controller('AppliesUseController', AppliesUseController);

    AppliesUseController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function AppliesUseController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.walletOptions = [];

        $scope.initWalletOptionsData = function () {
            $scope.walletOptions = [];
            adminService.getReq($rootScope.URL.WALLETSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.walletOptions.push(tempObj)
                                //if(!objItem.disabled){
                                //    $scope.walletOptions.push(tempObj)
                                //}
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.search = {
            products: [],
            status: [],
            brands: [],
            wallets: [],
        };

        $scope.statusOptions = [
            {
                label:'pending',
                value:'pending'
            },
            {
                label:'succeed',
                value:'succeed'
            },
            {
                label:'failed',
                value:'failed'
            },
            {
                label:'revoked',
                value:'revoked'
            },
            {
                label:'processing',
                value:'processing'
            }
        ];

        $scope.brandOptions = [];

        $scope.initBrandOptionsData = function () {
            $scope.brandOptions = [];
            adminService.getReq($rootScope.URL.GAMEBRANDS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.brandOptions.push(tempObj)
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.productOptions = [];
        $scope.productSearchOptions = [];

        $scope.initProductManageData = function () {
            $scope.productOptions = [];
            $scope.productSearchOptions = [];
            adminService.getReq($rootScope.URL.GAMESPRODUCTS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.productSearchOptions.push(tempObj)
                                if(objItem.disabled == false){
                                    $scope.productOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.appliesUseUrl = $rootScope.URL.APPLIESUSE.GET;

        // 原始的数据
        $scope.appliesUse = [];

        // 过滤出来的数据
        $scope.showAppliesUse = [];
        $scope.appliesUseReload = 1;
        $scope.appliesUseAoData = {};
        $scope.tempAppliesUseAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempAppliesUseAoData = Object.assign($scope.tempAppliesUseAoData,$scope.appliesUseAoData)
            $scope.appliesUseReload++;
        };

        $scope.resetSearch = function() {
            $scope.search = {
                products: [],
                status: [],
                brands: [],
                wallets: [],
            };
            $scope.appliesUseAoData = {};
            var tempData = $scope.tempAppliesUseAoData;
            $scope.tempAppliesUseAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            }
            $scope.appliesUseReload++;
        };

        // 初始化table数据
        $scope.initAppliesUseData = function () {
            $scope.appliesUseReload++;
        };

        $scope.appliesUseAudit = function (item) {
            if(!item.id){
                $rootScope.alertErrorMsg('server data error');
                return;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/appliesUse/appliesUseAuditModal.html',
                controller: 'AppliesUseAuditModalController',
                resolve: {
                    item: item
                },
                size: 'lg',
            });
            modalInstance.result.then(function(data) {
                $scope.initAppliesUseData()
            }, function(data) {
            });
        };


        $scope.appliesUseRevoke = function (item) {
            if(!item.id){
                $rootScope.alertErrorMsg('server data error');
                return;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/appliesUse/appliesUseRevokeModal.html',
                controller: 'AppliesUseRevokeModalController',
                resolve: {
                    item: item
                },
                size: 'lg',
            });
            modalInstance.result.then(function(data) {
                $scope.initAppliesUseData()
            }, function(data) {
            });
        };

        // 页面加载执行的函数

        $scope.initWalletOptionsData();

        $scope.initBrandOptionsData();

        $scope.initProductManageData();

        $scope.$watch('search.products.length+search.status.length+search.brands.length+search.wallets.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.appliesUseAoData.products = $scope.search.products.join(',');
                $scope.appliesUseAoData.status = $scope.search.status.join(',');
                $scope.appliesUseAoData.brands = $scope.search.brands.join(',');
                $scope.appliesUseAoData.wallets = $scope.search.wallets.join(',');
            }
        });

        $scope.urlUsername = '';

        // try {
        //     var urlParams = $scope.getUrlParams();
        //     if(urlParams._username){
        //         $scope.urlUsername = urlParams._username;
        //     }
        //     if(urlParams.user_id){
        //         $scope.tempAppliesUseAoData.user_id = urlParams.user_id;
        //     }
        // }catch (e){
        //     console.error(e)
        // }
    }
})();

(function() {

    angular
        .module('admin.bankCards')
        .controller('BankCardsController', BankCardsController);

    BankCardsController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function BankCardsController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        // 原始的数据
        $scope.bankCards = [];
        $scope.bankCardsReload = 1;
        $scope.bankCardsAoData = {};
        $scope.tempBankCardsAoData = {};

        $scope.bankCardsUrl = $rootScope.URL.BANKCARDS.GET;

        $scope.trigerSearch = function() {
            if($scope.bankCardsAoData.account_number){
                if($scope.bankCardsAoData.account_number.length<3||$scope.bankCardsAoData.account_number.length>20){
                    $rootScope.alertErrorMsg('account number length should between 3 and 20');
                    return;
                }
            }
            $scope.tempBankCardsAoData = Object.assign($scope.tempBankCardsAoData,$scope.bankCardsAoData)
            $scope.bankCardsReload++;
        };

        $scope.resetSearch = function() {
            $scope.bankCardsAoData = {};
            var tempData = $scope.tempBankCardsAoData;
            $scope.tempBankCardsAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            }
            $scope.bankCardsReload++;
        };

        // 初始化table数据
        $scope.initBankCardsData = function () {
            $scope.bankCardsReload++;
        };

        // 保存
        /**
         *
         * @param bankCards BANKCARDSTITLE数据对象
         * @param item
         */

        $scope.saveBankCards = function (bankCards, item) {
            var tempData = angular.extend({}, bankCards, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.BANKCARDS.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initBankCardsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && bankCards.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.BANKCARDS.PATCH+'/'+bankCards.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initBankCardsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除bankCards
        /**
         * @param bankCards BANKCARDSTITLE数据对象
         * @return null
         */
        $scope.deleteBankCards = function (bankCards) {
            if (!$scope.validIsNew(bankCards._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.BANKCARDS.DELETE+'/'+bankCards.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initBankCardsData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        // 恢复bankCards
        /**
         * @param bankCards BANKCARDSTITLE数据对象
         * @return null
         */
        $scope.recoverBankCards = function (bankCards) {
            if (!$scope.validIsNew(bankCards._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.BANKCARDS.PUT+'/'+bankCards.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initBankCardsData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                }, 'recover');
            }
        };

        // 页面加载执行的函数
    }
})();

(function() {

    angular
        .module('admin.bankCards')
        .controller('BankCardsFilterModalController', BankCardsFilterModalController);

    BankCardsFilterModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'filter',
        'adminService'
    ];

    function BankCardsFilterModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        filter,
        adminService
    ) {

        // 原始的数据
        $scope.bankCards = [];
        $scope.bankCardsReload = 1;
        $scope.bankCardsAoData = {};
        $scope.tempBankCardsAoData = {};

        $scope.trigerSearch = function() {
            if($scope.bankCardsAoData.account_number){
                if($scope.bankCardsAoData.account_number.length<3||$scope.bankCardsAoData.account_number.length>20){
                    $rootScope.alertErrorMsg('account number length should between 3 and 20');
                    return;
                }
            }
            $scope.tempBankCardsAoData = Object.assign($scope.tempBankCardsAoData,$scope.bankCardsAoData)
            $scope.bankCardsReload++;
        };

        $scope.resetSearch = function() {
            $scope.bankCardsAoData = {};
            var tempData = $scope.tempBankCardsAoData;
            $scope.tempBankCardsAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            }
            $scope.bankCardsReload++;
        };

        // 初始化table数据
        $scope.initBankCardsData = function () {
            $scope.bankCardsReload++;
        };

        $scope.filter = filter;

        $scope.bankCardsUrl = $rootScope.URL.USERSMANAGE.SELECTCARDS+'/'+$scope.filter.user_id||'';

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };
        // 页面加载执行的函数
    }
})();

(function() {

    angular
        .module('admin.bankCards')
        .controller('UserBankCardsModalController', UserBankCardsModalController);

    UserBankCardsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'modalItem'
    ];

    function UserBankCardsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        modalItem
    ) {

        // 原始的数据
        $scope.userBankCards = [];
        $scope.showUserBankCards = [];
        $scope.userBankCardsReload = 1;
        $scope.userBankCardsAoData = {};
        $scope.userBankCardsSearch = '';

        // 初始化table数据
        $scope.initBankCardsData = function () {
            $scope.userBankCards = modalItem.data
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数
        $scope.initBankCardsData();
    }
})();

(function() {

    angular
        .module('admin.bigwinsManage')
        .controller('BigwinsManageController', BigwinsManageController);

    BigwinsManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function BigwinsManageController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.brandOptions = [];

        $scope.initBrandOptionsData = function () {
            $scope.brandOptions = [];
            adminService.getReq($rootScope.URL.GAMEBRANDS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.brandOptions.push(tempObj)
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.statusOptions = [
            {
                label:'pending',
                value:'pending'
            },
            {
                label:'approved',
                value:'approved'
            },
            {
                label:'reviewing',
                value:'reviewing'
            },
            {
                label:'succeed',
                value:'succeed'
            },
            {
                label:'revoked',
                value:'revoked'
            }
        ];

        $scope.bigwinsManageUrl = $rootScope.URL.BIGWINSMANAGE.GET;

        // 原始的数据
        $scope.bigwinsManage = [];
        $scope.bigwinsManageReload = 1;
        $scope.bigwinsManageAoData = {};
        $scope.tempBigwinsManageAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempBigwinsManageAoData = Object.assign($scope.tempBigwinsManageAoData,$scope.bigwinsManageAoData);
            $scope.bigwinsManageReload++;
        };

        $scope.resetSearch = function() {
            $scope.bigwinsManageAoData = {};
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempBigwinsManageAoData;
            $scope.tempBigwinsManageAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.bigwinsManageReload++;
        };

        // 初始化table数据
        $scope.initBigwinsManageData = function () {
            $scope.bigwinsManageReload++;
        };


        $scope.auditBigwinsManage = function (item) {
            if(!item.id){
                $rootScope.alertErrorMsg('server data error');
                return;
            }
            adminService.getReq($rootScope.URL.BIGWINSMANAGE.GETAUDIT + '/' + item.id, {admin_id:(window.userInfo.adminId || ''),adminname: (window.userInfo && window.userInfo.username || ''),}, {}).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    console.log(res.data.data)
                    var tempData = {
                        data: res.data.data,
                        _itemId:item.id
                    };
                    if (res.data.success) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: '/views/admin/bigwinsManage/bigwinsManageModal.html',
                            controller: 'bigwinsManageModalController',
                            resolve: {
                                modalItem: tempData,
                            },
                            size: 'lg',
                        });
                        modalInstance.result.then(function(data) {
                            $scope.initBigwinsManageData();
                        }, function(data) {
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        // 页面加载执行的函数

        $scope.initBrandOptionsData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.bigwinsManageAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.bigwinsManageAoData.start_time) {
                        $scope.bigwinsManageAoData.start_time = '';
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.bigwinsManageAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.bigwinsManageAoData.end_time) {
                        $scope.bigwinsManageAoData.end_time = '';
                    }
                }
            }
        });

    }
})();

(function() {

    angular
        .module('admin.bigwinsManage')
        .controller('bigwinsManageModalController', bigwinsManageModalController);

    bigwinsManageModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        'modalItem',
        '$translate'
    ];

    function bigwinsManageModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        modalItem,
        $translate
    ) {

        $scope.resultOptions = [
            {
                label:'pending',
                value:'pending'
            },
            {
                label:'approved',
                value:'approved'
            },
            {
                label:'declined',
                value:'declined'
            },
        ];

        $scope.item = {
            result:$scope.resultOptions[0].value,
            comment:''
        };

        $scope.confirmModal = function () {
            var tempData = angular.copy($scope.item);
            tempData.adminId = modalItem.data.adminId;
            tempData.adminname=window.userInfo && window.userInfo.username || '',
            adminService.postReq($rootScope.URL.BIGWINSMANAGE.POSTAUDIT+'/'+modalItem._itemId+'/'+modalItem.data.id, {}, tempData).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $uibModalInstance.close('success');
                        $rootScope.toasterSuccess(res.data.msg);
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

    }
})();

(function() {

    angular
        .module('admin.blackLists')
        .controller('BlackListsController', BlackListsController);

    BlackListsController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function BlackListsController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.typeOptions = [
            {
                label:'fraud',
                value:'fraud'
            },
            {
                label:'suspicious',
                value:'suspicious'
            }
        ];

        $scope.isDeletedOptions = [
            {
                label:'All',
                value:''
            },
            {
                label:'Deleted',
                value:'1'
            },
            {
                label:'No Deleted',
                value:'0'
            }
        ];

        $scope.typeOptionsSearch = [
            {
                label:'Fraud',
                value:'fraud'
            },
            {
                label:'Suspicious',
                value:'suspicious'
            }
        ];

        // 原始的数据
        $scope.blackLists = [];

        $scope.blackListsReload = 1;
        $scope.blackListsAoData = {};
        $scope.tempBlackListsAoData = {};
        $scope.blackListsSearch = '';

        $scope.trigerSearch = function() {
            $scope.tempBlackListsAoData = Object.assign($scope.tempBlackListsAoData,$scope.blackListsAoData)
            $scope.blackListsReload++;
        };

        $scope.resetSearch = function() {
            $scope.blackListsAoData = {};
            var tempData = $scope.tempBlackListsAoData;
            $scope.tempBlackListsAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            }
            $scope.blackListsReload++;
        };

        $scope.blackListsUrl = $rootScope.URL.BLACKLISTS.GET;

        // 初始化table数据
        $scope.initBlackListsData = function () {
            $scope.blackListsReload++;
        };

        $scope.showCountriesManageModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/blackLists/blackListsModal.html',
                controller: 'blackListsModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit:edit,
                    modalItem: item,
                    hasPower:$scope.validPower("BLACKLISTS", ["PATCH", "POST"]) && edit !== 1,
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initBlackListsData();
            }, function (data) {

            });
        };

        // 删除blackLists
        /**
         * @param blackLists BLACKLISTSTITLE数据对象
         * @return null
         */
        $scope.deleteBlackLists = function (blackLists) {
            if (blackLists.accountNumber) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.BLACKLISTS.DELETE+'/'+blackLists.accountNumber, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initBlackListsData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        // 恢复blackLists
        /**
         * @param blackLists BLACKLISTSTITLE数据对象
         * @return null
         */
        $scope.recoverBlackLists = function (blackLists) {
            if (blackLists.accountNumber) {
                $rootScope.alertConfirm(function () {
                    adminService.putReq($rootScope.URL.BLACKLISTS.PUT+'/'+blackLists.accountNumber, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initBlackListsData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                },'recover');
            }
        };

    }
})();

(function() {

    angular
        .module('admin.blackLists')
        .controller('blackListsModalController', blackListsModalController);

    blackListsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'hasPower',
        'edit',
        'modalItem'
    ];

    function blackListsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        hasPower,
        edit,
        modalItem
    ) {

        $scope.edit = edit;
        $scope.hasPower = hasPower;
        $scope.modalItem = angular.copy(modalItem);

        // 初始化table数据
        $scope.initMethodsNameModalData = function () {
            if(edit==2){
                $scope.modalItem = {
                    "accountNumber": "",
                    "type": $scope.typeOptions[0].value,
                    "comment":"",
                    "isDeleted":$scope.isDeletedOptions[2].value
                }
            }
            $scope.modalItem.adminId = window.userInfo && window.userInfo.adminId
        };

        $scope.confirmModal = function () {
            var tempData = angular.copy($scope.modalItem);
            if (edit==2) {
                adminService.postReq($rootScope.URL.BLACKLISTS.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (edit==3) {
                adminService.patchReq($rootScope.URL.BLACKLISTS.PATCH+'/'+tempData.accountNumber, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }

        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initMethodsNameModalData();

    }
})();

(function() {

    angular
        .module('admin.button')
        .controller('SuperAdminButtonController', SuperAdminButtonController);

    SuperAdminButtonController.$inject = [
        '$scope',
        '$rootScope',
        '$translate',
        'superAdminService'
    ];

    function SuperAdminButtonController(
        $scope,
        $rootScope,
        $translate,
        superAdminService
    ) {

        $scope.buttonsOptions = [
            {
                label: $translate.instant('table.button.search'),
                value: '1'
            },
            {
                label: $translate.instant('table.button.add'),
                value: '2'
            },
            {
                label: $translate.instant('table.button.edit'),
                value: '3'
            },
            {
                label: $translate.instant('table.button.delete'),
                value: '4'
            },
            {
                label: $translate.instant('table.button.recover'),
                value: '5'
            }
        ];

        /**
         *
         * @param btnType 1234数字
         * @returns {string} 显示的内容
         */
        $scope.showBtnType = function (btnType) {
            var tempBtnArray = $scope.buttonsOptions.filter(function (optionsItem) {
                return optionsItem.value == btnType;
            });
            if(tempBtnArray.length){
                return tempBtnArray[0].label;
            }
            return '';
        };

        $scope.superAdminSelect012 = $rootScope.superAdminSelect012;

        $scope.oneLevelMenus = [];

        // 原始的二级数据
        $scope.buttons = [];

        // 过滤出来的二级数据
        $scope.showButtons = [];
        $scope.buttonsReload = 1;
        $scope.buttonsAoData = {};

        $scope.currentSelectMenu = {};

        // 初始化一级菜单
        $scope.initOneLevelMenus = function () {
            if(!$scope.validPower("MANAGEBUTTON", ["LEFTGET"])){
                return '';
            }
            superAdminService.getReq($rootScope.URL.MANAGEBUTTON.LEFTGET,{}, {}).then(function (data) {
                console.log(data);
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        var allMenus = angular.copy(data.data);
                        $scope.oneLevelMenus = allMenus.filter(function (allMenusItem) {
                            return allMenusItem.parentId == 'root';
                        });
                        $scope.oneLevelMenus = angular.copy($scope.oneLevelMenus);
                        $scope.oneLevelMenus.forEach(function (oneLevelMenusItem) {
                            oneLevelMenusItem.showSecond = false;
                            oneLevelMenusItem.secondLevelMenus = angular.copy(allMenus.filter(function (allMenusItem) {
                                return allMenusItem.parentId == oneLevelMenusItem.id;
                            }));
                        });
                        if (!$scope.currentSelectMenu.id) {
                            for (var i = 0, j = $scope.oneLevelMenus.length; i < j; i++) {
                                if ($scope.oneLevelMenus[i]['secondLevelMenus'][0]) {
                                    $scope.oneLevelMenus[i]['showSecond'] = true;
                                    $scope.currentSelectMenu = angular.copy($scope.oneLevelMenus[i]['secondLevelMenus'][0]);
                                    $scope.getSecondLevelButtons($scope.currentSelectMenu);
                                    break;
                                }
                            }
                        }
                    } else {
                        $rootScope.alertErrorMsg(data.msg);
                    }
                }
            });
        };

        // 获取buttons
        /**
         * @param secondLevelMenu 二级菜单对象
         * @return null
         */
        $scope.getSecondLevelButtons = function (secondLevelMenu, $event) {
            if ($event) {
                $event.stopPropagation();
            }
            if(!$scope.validPower("MANAGEBUTTON", ["RIGHTGET"])){
                return '';
            }
            // $scope.buttons = [];
            console.log(secondLevelMenu, 'getSecondLevelButtons');
            $scope.currentSelectMenu = angular.copy(secondLevelMenu);
            if (secondLevelMenu.id) {
                // $scope.buttons = [];
                superAdminService.getReq($rootScope.URL.MANAGEBUTTON.RIGHTGET,{ 'menuId': secondLevelMenu.id }, {}).then(function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.buttons = angular.copy(data.data);
                            $scope.buttonsReload++;
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }
        };

        // 保存按钮
        /**
         * @param button 按钮数据对象
         * @param item 显示输入的数据
         * @return null
         */
        $scope.saveButton = function (button, item) {
            var tempData = angular.extend({}, button, item);
            if (!tempData.id) {
                if(!$scope.validPower("MANAGEBUTTON", ["RIGHTPOST"])){
                    return '';
                }
                delete tempData.id;
                superAdminService.postReq($rootScope.URL.MANAGEBUTTON.RIGHTPOST,{}, tempData).then(function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.getSecondLevelButtons($scope.currentSelectMenu);
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            } else if (tempData.id) {
                if(!$scope.validPower("MANAGEBUTTON", ["RIGHTPATCH"])){
                    return '';
                }
                superAdminService.patchReq($rootScope.URL.MANAGEBUTTON.RIGHTPATCH,{}, tempData).then(function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.getSecondLevelButtons($scope.currentSelectMenu);
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除按钮
        /**
         * @param button 按钮数据对象
         * @return null
         */
        $scope.deleteButton = function (button) {
            if(!$scope.validPower("MANAGEBUTTON", ["RIGHTDELETE"])){
                return '';
            }
            if (button.id) {
                $rootScope.alertConfirm(function () {
                    superAdminService.deleteReq($rootScope.URL.MANAGEBUTTON.RIGHTDELETE,{ id: button.id }, {}).then(function (data) {
                        if (typeof data.success === 'boolean') {
                            if (data.success) {
                                $scope.getSecondLevelButtons($scope.currentSelectMenu);
                                $rootScope.toasterSuccess(data.msg);
                            } else {
                                $rootScope.alertErrorMsg(data.msg);
                            }
                        }
                    });
                });
            }
        };

        // 添加按钮
        $scope.addButtons = function () {
            if ($scope.currentSelectMenu.id) {
                $scope.buttonsAoData = {};
                $scope.buttons.unshift({
                    'id': null,
                    'btnName': '',
                    'btnType': '',
                    'btnCode': '',
                    'btnUrl': '',
                    'btnStatus': '1',
                    'createTime': null,
                    'optTime': null,
                    'menuId': $scope.currentSelectMenu.id,
                    'isShowTrEdit': true
                });
            }
        };

        /**
         *
         * @param item 添加的对象
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.buttons.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initOneLevelMenus();
    }
})();

(function() {

    angular
        .module('admin.countriesManage')
        .controller('CountriesManageController', CountriesManageController);

    CountriesManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function CountriesManageController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.currencyOptions = [];

        $scope.initCurrenciesManageData = function () {
            $scope.currencyOptions = [];
            adminService.getReq($rootScope.URL.CURRENCIESMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.name||'',
                                    value:objItem.code||''
                                };
                                if(objItem.supported){
                                    $scope.currencyOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        // 原始的数据
        $scope.countriesManage = [];

        // 过滤出来的数据
        $scope.showCountriesManage = [];
        $scope.countriesManageReload = 1;
        $scope.countriesManageAoData = {};
        $scope.countriesManageSearch = '';

        // 初始化table数据
        $scope.initCountriesManageData = function () {
            //$scope.countriesManage = [];
            adminService.getReq($rootScope.URL.COUNTRIESMANAGE.GET).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.countriesManage = angular.copy(res.data.data);
                        $scope.countriesManage.forEach(function (countriesManageItem, countriesManageIndex) {
                            countriesManageItem.currencyCode = countriesManageItem.currency && countriesManageItem.currency.code || '';
                            countriesManageItem.numcode = countriesManageItem.numCode || '';
                            if(countriesManageItem.numCode){
                                delete countriesManageItem.numCode
                            }
                            if(countriesManageItem.currency){
                                delete countriesManageItem.currency
                            }
                        });
                        $scope.countriesManageReload++;
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        $scope.showCountriesManageModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/countriesManage/countriesManageModal.html',
                controller: 'countriesManageModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit:edit,
                    modalItem: item,
                    hasPower:$scope.validPower("COUNTRIESMANAGE", ["PATCH", "POST"]) && edit !== 1,
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initCountriesManageData();
            }, function (data) {

            });
        };

        // 删除countriesManage
        /**
         * @param countriesManage 国家管理数据对象
         * @return null
         */
        $scope.deleteCountriesManage = function (countriesManage) {
            if (countriesManage.iso) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.COUNTRIESMANAGE.DELETE+'/'+countriesManage.iso, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initCountriesManageData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        // 页面加载执行的函数

        $scope.initCountriesManageData();

        if($scope.validPower("COUNTRIESMANAGE", ["PATCH"])){
            $scope.initCurrenciesManageData();
        }
    }
})();

(function() {

    angular
        .module('admin.countriesManage')
        .controller('countriesManageModalController', countriesManageModalController);

    countriesManageModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'hasPower',
        'edit',
        'modalItem'
    ];

    function countriesManageModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        hasPower,
        edit,
        modalItem
    ) {

        $scope.edit = edit;
        $scope.hasPower = hasPower;
        $scope.modalItem = angular.copy(modalItem);

        // 初始化table数据
        $scope.initMethodsNameModalData = function () {
            if(edit==2){
                $scope.modalItem = {
                    "iso": "",
                    "iso3": "",
                    "numcode": '',
                    "name": "",
                    "phoneCode": '',
                    "currencyCode": $scope.currencyOptions[0].value,
                    "niceName": "",
                }
            }
        };

        //$rootScope.toasterSuccess(res.data.msg);;
        $scope.confirmModal = function () {
            var tempData = angular.copy($scope.modalItem);
            if (edit==2) {
                adminService.postReq($rootScope.URL.COUNTRIESMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (edit==3) {
                adminService.patchReq($rootScope.URL.COUNTRIESMANAGE.PATCH+'/'+tempData.iso, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }

        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initMethodsNameModalData();

    }
})();

(function() {

    angular
        .module('admin.couponsManage')
        .controller('CouponsManageController', CouponsManageController);

    CouponsManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function CouponsManageController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.currencyOptions = [];

        $scope.initCurrenciesManageData = function () {
            $scope.currencyOptions = [];
            adminService.getReq($rootScope.URL.CURRENCIESMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.name||'',
                                    value:objItem.code||''
                                };
                                if(objItem.supported){
                                    $scope.currencyOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.brandOptions = [];

        $scope.initBrandOptionsData = function () {
            $scope.brandOptions = [];
            adminService.getReq($rootScope.URL.GAMEBRANDS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.brandOptions.push(tempObj)
                                // if(objItem.supported){
                                //     $scope.brandOptions.push(tempObj)
                                // }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.productOptions = [];

        $scope.initProductManageData = function () {
            $scope.productOptions = [];
            adminService.getReq($rootScope.URL.GAMESPRODUCTS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                if(objItem.disabled == false){
                                    $scope.productOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.ranksOptions = [];

        $scope.initRanksOptionsData = function () {
            $scope.ranksOptions = [];
            adminService.getReq($rootScope.URL.USERLEVEL.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                if(objItem.isDeleted == false){
                                    $scope.ranksOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.walletOptions = [];

        $scope.initWalletOptionsData = function () {
            $scope.walletOptions = [];
            adminService.getReq($rootScope.URL.WALLETSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                if(!objItem.disabled){
                                    $scope.walletOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.typeOptions = [
            {
                label:'deposit',
                value:'deposit'
            },
            {
                label:'transfer',
                value:'transfer'
            },
            {
                label:'all',
                value:'all'
            }
        ];

        $scope.conditionsTypeOptions = [
            {
                label:'bets',
                value:'bets'
            },
            {
                label:'principal',
                value:'principal'
            }
        ];

        $scope.conditionsValueTypeOptions = [
            {
                label:'amount',
                value:'amount'
            },
            {
                label:'times',
                value:'times'
            }
        ];

        $scope.treatmentsTypeOptions = [
            {
                label:'amount',
                value:'amount'
            },
            {
                label:'times',
                value:'times'
            }
        ];

        $scope.booleanOptons = [
            {
                label: 'Yes',
                value: true
            },
            {
                label: 'No',
                value: false
            }
        ];

        $scope.couponsManageUrl = $rootScope.URL.COUPONSMANAGE.GET;

        // 原始的数据
        $scope.couponsManage = [];

        // 过滤出来的数据
        $scope.showCouponsManage = [];
        $scope.couponsManageReload = 1;
        $scope.couponsManageAoData = {
            code:'',
            currency:''
        };

        $scope.tempCouponsManageAoData = {
            code:'',
            currency:''
        };

        $scope.trigerSearch = function() {
            $scope.tempCouponsManageAoData = Object.assign($scope.tempCouponsManageAoData,$scope.couponsManageAoData);
            $scope.couponsManageReload++;
        };

        $scope.resetSearch = function() {
            $scope.couponsManageAoData = {};
            var tempData = $scope.tempCouponsManageAoData;
            $scope.tempCouponsManageAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.couponsManageReload++;
        };

        // 初始化table数据
        $scope.initCouponsManageData = function () {
            $scope.couponsManageReload++
        };

        $scope.showCouponsManageModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/couponsManage/couponsManageModal.html',
                controller: 'addCouponsController',
                scope: $scope,
                size: 'lg',
                resolve:{
                    couponsItem:item,
                    edit:edit,
                    hasPower:$scope.hasPower&&edit!==1
                }
            });
            modalInstance.result.then(function(data) {
                $scope.initCouponsManageData()
            }, function(data) {
            });
        };

        // 删除couponsManage
        /**
         * @param couponsManage COUPONSMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteCouponsManage = function (couponsManage) {
            if (couponsManage.code) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.COUPONSMANAGE.DELETE+'/'+couponsManage.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initCouponsManageData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        // 恢复couponsManage
        /**
         * @param couponsManage COUPONSMANAGETITLE数据对象
         * @return null
         */
        $scope.recoverCouponsManage = function (couponsManage) {
            if (couponsManage.code) {
                $rootScope.alertConfirm(function () {
                    adminService.putReq($rootScope.URL.COUPONSMANAGE.PUT+'/'+couponsManage.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initCouponsManageData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                }, 'recover');
            }
        };

        /**
         *
         * @param item 添加的COUPONSMANAGETITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.couponsManage.splice(index, 1);
            }
        };

        $scope.hasPower = $scope.validPower("COUPONSMANAGE", ["PATCH", "PUT"])

        // 页面加载执行的函数

        $scope.initCouponsManageData();

        if($scope.hasPower){

            $scope.initCurrenciesManageData();

            $scope.initProductManageData();

            $scope.initBrandOptionsData();

            $scope.initRanksOptionsData();

            $scope.initWalletOptionsData();
        }
    }
})();

(function() {

    angular
        .module('admin.couponsManage')
        .controller('addCouponsController', addCouponsController);

    addCouponsController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        'couponsItem',
        'edit',
        'hasPower',
        '$translate'
    ];

    function addCouponsController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        couponsItem,
        edit,
        hasPower,
        $translate
    ) {

        $scope.edit = edit;

        $scope.hasPower = hasPower;



        if(edit==3||edit==1){
            $scope.couponsItem = angular.copy(couponsItem)
            if(!$scope.couponsItem.treatments || !$scope.couponsItem.treatments.length){
                $scope.couponsItem.treatments = [
                    {
                        type:$scope.treatmentsTypeOptions[0] && $scope.treatmentsTypeOptions[0].value || '',
                        value:'',
                        maxBonus:''
                    }
                ]
            }
            if(window.Array.isArray($scope.couponsItem.conditions)){
                $scope.couponsItem.conditions.forEach(function(conditionsItem) {
                    if(conditionsItem.value){
                        conditionsItem.valueType = conditionsItem.value.type || '';
                        conditionsItem.value = conditionsItem.value.value || '';
                    }
                })
            }
            if(window.Array.isArray($scope.couponsItem.treatments)){
                $scope.couponsItem.treatments.forEach(function(treatmentsItem) {
                    if(treatmentsItem.max){
                        treatmentsItem.maxBonus = treatmentsItem.max || '';
                        delete treatmentsItem.max
                    }
                })
            }
        }else if (edit==2){
            $scope.couponsItem = {
                code: '',
                name: '',
                currency: $scope.currencyOptions[0] && $scope.currencyOptions[0].value || '',
                brand: $scope.brandOptions[0] && $scope.brandOptions[0].value || '',
                wallet: $scope.walletOptions[0] && $scope.walletOptions[0].value || '',
                product: $scope.productOptions[0] && $scope.productOptions[0].value || '',
                type: $scope.typeOptions[0] && $scope.typeOptions[0].value || '',
                startTime: '',
                endTime: '',
                needAudit: $scope.booleanOptons[0] && $scope.booleanOptons[0].value || 'true',
                multipleUse: $scope.booleanOptons[0] && $scope.booleanOptons[0].value || 'true',
                needCertification: $scope.booleanOptons[0] && $scope.booleanOptons[0].value || 'true',
                ranks: [],
                codeOnly: $scope.booleanOptons[0] && $scope.booleanOptons[0].value || 'true',
                isDeleted: $scope.booleanOptons[1] && $scope.booleanOptons[1].value,
                conditions: [],
                treatments: [],
                enabled: $scope.booleanOptons[0].value,
            };
        }

        if($scope.couponsItem.period){
            $scope.couponsItem.startTime = $scope.couponsItem.period.from ? $scope.formatTime($scope.couponsItem.period.from) : '';
            $scope.couponsItem.endTime = $scope.couponsItem.period.to ? $scope.formatTime($scope.couponsItem.period.to) : '';
            delete $scope.couponsItem.period
        }

        $scope.timeStart = $scope.couponsItem.startTime || '';
        $scope.timeEnd = $scope.couponsItem.endTime || '';

        /**
         * 点击复选框
         * @param value value值
         * @param $event 点击事件
         */
        $scope.selectRank = function(value, $event) {
            if($event.target.checked){
                if($scope.couponsItem.ranks.indexOf(value) === -1){
                    $scope.couponsItem.ranks.push(value)
                }
            }else{
                $scope.couponsItem.ranks.splice($scope.couponsItem.ranks.indexOf(value), 1)
            }
        };

        // 过滤出来的数据
        $scope.showConditionsModal = [];
        $scope.conditionsModalReload = 1;
        $scope.conditionsModalAoData = {};
        $scope.conditionsModalSearch = '';

        // 初始化table数据
        $scope.initConditionsModalData = function () {
            $scope.couponsItem['conditions'].forEach(function (conditionsItem, conditionsIndex) {
                conditionsItem.id = conditionsIndex + 1;
            })
        };


        // 保存
        /**
         *
         * @param conditionsModal 渠道名称数据对象
         * @param data
         */

        $scope.saveConditionsModal = function (conditionsModal, data) {
            $scope.couponsItem['conditions'].forEach(function (conditionsModalItem) {
                if(conditionsModalItem.id == conditionsModal.id){
                    window.Object.assign(conditionsModalItem, data);
                    if($scope.validIsNew(conditionsModalItem.id)){
                        conditionsModalItem.id = window.parseInt(conditionsModalItem.id, 10)
                        $scope.conditionsModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param conditionsModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteConditionsModal = function (conditionsModal, index) {
            $scope.couponsItem['conditions'].splice(index, 1)
        };

        // 添加按钮
        $scope.addConditionsModal = function () {
            $scope.conditionsModalAoData = {};
            $scope.conditionsModalSearch = '';
            $scope.couponsItem['conditions'].unshift({
                'id': ($scope.couponsItem['conditions'].length+1) + 'null',
                "type": $scope.conditionsTypeOptions[0] ? $scope.conditionsTypeOptions[0].value : '',
                "valueType": $scope.conditionsValueTypeOptions[0] ? $scope.conditionsValueTypeOptions[0].value : '',
                "value": ''
            });
        };

        /**
         *
         * @param conditionsItem 条件项目
         * @param index 添加的index
         */

        $scope.cancelSaveConditionsModal = function (conditionsItem, index) {
            if ($scope.validIsNew(conditionsItem.id)) {
                $scope.couponsItem['conditions'].splice(index, 1);
            }
        };


        // 过滤出来的数据
        $scope.showTreatmentsModal = [];
        $scope.treatmentsModalReload = 1;
        $scope.treatmentsModalAoData = {};
        $scope.treatmentsModalSearch = '';


        // 初始化table数据
        $scope.initTreatmentsModalData = function () {
            $scope.couponsItem['treatments'].forEach(function (treatmentsItem, treatmentsIndex) {
                treatmentsItem.id = treatmentsIndex + 1;
            })
        };


        // 保存
        /**
         *
         * @param treatmentsModal 处理对象数据对象
         * @param data
         */

        $scope.saveTreatmentsModal = function (treatmentsModal, data) {
            $scope.couponsItem['treatments'].forEach(function (treatmentsModalItem) {
                if(treatmentsModalItem.id == treatmentsModal.id){
                    window.Object.assign(treatmentsModalItem, data);
                    if($scope.validIsNew(treatmentsModalItem.id)){
                        treatmentsModalItem.id = window.parseInt(treatmentsModalItem.id, 10)
                        $scope.treatmentsModalReload ++
                    }
                }
            });
        };

        // 删除处理对象Modal
        /**
         * @param treatmentsModal 处理对象
         * @param index 位置
         * @return null
         */
        $scope.deleteTreatmentsModal = function (treatmentsModal, index) {
            $scope.couponsItem['treatments'].splice(index, 1)
        };

        // 添加按钮
        $scope.addTreatmentsModal = function () {
            $scope.treatmentsModalAoData = {};
            $scope.treatmentsModalSearch = '';
            $scope.couponsItem['treatments'].unshift({
                'id': ($scope.couponsItem['treatments'].length+1) + 'null',
                type:$scope.treatmentsTypeOptions[0] && $scope.treatmentsTypeOptions[0].value || '',
                value:'',
                maxBonus:''
            });
        };

        /**
         *
         * @param treatmentsItem 处理项目
         * @param index 添加的index
         */

        $scope.cancelSaveTreatmentsModal = function (treatmentsItem, index) {
            if ($scope.validIsNew(treatmentsItem.id)) {
                $scope.couponsItem['treatments'].splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            if(!(/[A-Z0-9]{1,20}/.test($scope.couponsItem))){
                $rootScope.alertErrorMsg('code should be A-Z0-9 max 20 char');
                return;
            }
            var tempData = angular.copy($scope.couponsItem);
            tempData['conditions'] = tempData['conditions'].filter(function (item) {
                return !$scope.validIsNew(item.id);
            });
            if(window.Array.isArray(tempData['conditions'])){
                tempData['conditions'].forEach(function(conditionsItem) {
                    if(conditionsItem.id){
                        delete conditionsItem.id;
                    }
                })
            }
            tempData['treatments'] = tempData['treatments'].filter(function (item) {
                return !$scope.validIsNew(item.id);
            });
            if(window.Array.isArray(tempData['treatments'])){
                tempData['treatments'].forEach(function(treatmentsItem) {
                    if(treatmentsItem.id){
                        delete treatmentsItem.id;
                    }
                })
            }
            if (edit==2) {
                adminService.postReq($rootScope.URL.COUPONSMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('success');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (edit==3) {
                adminService.patchReq($rootScope.URL.COUPONSMANAGE.PATCH+'/'+couponsItem.code, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('success');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.checkConditionsMinData = function(data) {
            var temp = window.parseFloat(data);
            if(!data || data<0.01){
                return 'min 0.01';
            }
            return true;
        };

        // 页面加载执行的函数

        $scope.initConditionsModalData();

        $scope.initTreatmentsModalData();

        $scope.$watch('timeStart+timeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.timeStart) {
                    $scope.couponsItem.startTime = $scope.timeStart.format && $scope.timeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    $scope.couponsItem.startTime = '';
                }
                if ($scope.timeEnd) {
                    $scope.couponsItem.endTime = $scope.timeEnd.format && $scope.timeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    $scope.couponsItem.endTime = '';
                }
            }
        });

    }
})();

(function() {

    angular
        .module('admin.currenciesManage')
        .controller('currenciesManageModalController', currenciesManageModalController);

    currenciesManageModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'hasPower',
        'edit',
        'modalItem'
    ];

    function currenciesManageModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        hasPower,
        edit,
        modalItem
    ) {

        $scope.edit = edit;
        $scope.hasPower = hasPower;
        $scope.modalItem = angular.copy(modalItem);

        // 初始化table数据
        $scope.initMethodsNameModalData = function () {
            if(edit==2){
                $scope.modalItem = {
                    'code': '',
                    'name': '',
                    'symbol': '',
                    'symbolAfter': $scope.options[0].value,
                    'supported': $scope.options[1].value
                }
            }
        };

        //$rootScope.toasterSuccess(res.data.msg);;
        $scope.confirmModal = function () {
            var tempData = angular.copy($scope.modalItem);
            if (edit==2) {
                adminService.postReq($rootScope.URL.CURRENCIESMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (edit==3) {
                adminService.patchReq($rootScope.URL.CURRENCIESMANAGE.PATCH+'/'+tempData.code, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }

        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initMethodsNameModalData();

    }
})();

(function() {

    angular
        .module('admin.currenciesManage')
        .controller('CurrenciesManageController', CurrenciesManageController);

    CurrenciesManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        '$translate',
        'adminService'
    ];

    function CurrenciesManageController(
        $scope,
        $rootScope,
        $uibModal,
        $translate,
        adminService
    ) {

        $scope.options = [
            {
                value:'0',
                label:$translate.instant('table.localeLanguage.th3ShowFalse')
            },
            {
                value:'1',
                label:$translate.instant('table.localeLanguage.th3ShowTrue')
            }
        ];

        // 原始的数据
        $scope.currenciesManage = [];

        // 过滤出来的数据
        $scope.showCurrenciesManage = [];
        $scope.currenciesManageReload = 1;
        $scope.currenciesManageAoData = {};
        $scope.currenciesManageSearch = '';

        // 初始化table数据
        $scope.initCurrenciesManageData = function () {
            //$scope.currenciesManage = [];
            adminService.getReq($rootScope.URL.CURRENCIESMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.currenciesManage = angular.copy(res.data.data);
                        $scope.currenciesManage.forEach(function (currenciesManageItem, currenciesManageIndex) {
                            currenciesManageItem.supported = currenciesManageItem.supported ? '1' : '0';
                            currenciesManageItem.symbolAfter = currenciesManageItem.symbolAfter ? '1' : '0';
                        });
                        $scope.currenciesManageReload++;
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        $scope.showCurrenciesManageModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/currenciesManage/currenciesManageModal.html',
                controller: 'currenciesManageModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit:edit,
                    modalItem: item,
                    hasPower:$scope.validPower("CURRENCIESMANAGE", ["PATCH", "POST"]) && edit !== 1,
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initCurrenciesManageData();
            }, function (data) {

            });
        };

        // 删除currenciesManage
        /**
         * @param currenciesManage 货币管理数据对象
         * @return null
         */
        $scope.deleteCurrenciesManage = function (currenciesManage) {
            if (currenciesManage.code) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.CURRENCIESMANAGE.DELETE+'/'+currenciesManage.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initCurrenciesManageData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        // 页面加载执行的函数

        $scope.initCurrenciesManageData();
    }
})();

(function() {

    angular
        .module('admin.summaryAffiliates')
        .controller('summaryAffiliatesModalController', summaryAffiliatesModalController);

    summaryAffiliatesModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        'modalItem'
    ];

    function summaryAffiliatesModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        modalItem
    ) {

        // 初始化table数据
        $scope.initSummaryAffiliatesData = function () {
            $scope.modalItem = modalItem;
            console.log($scope.modalItem)
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initSummaryAffiliatesData();
    }
})();

(function() {

    angular
        .module('admin.domainsManage')
        .controller('DomainsManageController', DomainsManageController);

    DomainsManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function DomainsManageController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        // 原始的数据
        $scope.domainsManage = [];

        // 过滤出来的数据
        $scope.showDomainsManage = [];
        $scope.domainsManageReload = 1;
        $scope.domainsManageAoData = {};
        $scope.domainsManageSearch = '';

        // 初始化table数据
        $scope.initDomainsManageData = function () {
            adminService.getReq($rootScope.URL.DOMAINSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.domainsManage = angular.copy(res.data.data);
                        $scope.domainsManage.forEach(function (domainsManageItem, domainsManageIndex) {
                            domainsManageItem._id = domainsManageIndex +1;
                        });
                        $scope.domainsManageReload++;
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        $scope.showDomainsManageModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/domainsManage/domainsManageModal.html',
                controller: 'domainsManageModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit:edit,
                    modalItem: item,
                    hasPower:$scope.validPower("DOMAINSMANAGE", ["PATCH", "POST"]) && edit !== 1,
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initDomainsManageData();
            }, function (data) {

            });
        };

        // 删除domainsManage
        /**
         * @param domainsManage DOMAINSMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteDomainsManage = function (domainsManage) {
            if (!$scope.validIsNew(domainsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.DOMAINSMANAGE.DELETE+'/'+domainsManage.domain, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initDomainsManageData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        // 恢复domainsManage
        /**
         * @param domainsManage DOMAINSMANAGETITLE数据对象
         * @return null
         */
        $scope.recoverDomainsManage = function (domainsManage) {
            if (!$scope.validIsNew(domainsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.DOMAINSMANAGE.PUT+'/'+domainsManage.domain, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initDomainsManageData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                }, 'recover');
            }
        };

        // 页面加载执行的函数

        $scope.initDomainsManageData();
    }
})();

(function() {

    angular
        .module('admin.domainsManage')
        .controller('domainsManageModalController', domainsManageModalController);

    domainsManageModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'hasPower',
        'edit',
        'modalItem'
    ];

    function domainsManageModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        hasPower,
        edit,
        modalItem
    ) {

        $scope.edit = edit;
        $scope.hasPower = hasPower;
        $scope.modalItem = angular.copy(modalItem);

        $scope.typeOptions = [
            {
                label:'user',
                value:'user'
            },
            {
                label:'affiliate',
                value:'affiliate'
            },
        ];

        // 初始化table数据
        $scope.initMethodsNameModalData = function () {
            if(edit==2){
                $scope.modalItem = {
                    type:$scope.typeOptions[0].value
                }
            }
        };

        //$rootScope.toasterSuccess(res.data.msg);;
        $scope.confirmModal = function () {
            var tempData = angular.copy($scope.modalItem);
            if (edit==2) {
                adminService.postReq($rootScope.URL.DOMAINSMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (edit==3) {
                adminService.patchReq($rootScope.URL.DOMAINSMANAGE.PATCH+'/'+tempData.domain, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }

        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initMethodsNameModalData();

    }
})();

(function() {

    angular
        .module('admin.gameBrands')
        .controller('GameBrandsController', GameBrandsController);

    GameBrandsController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function GameBrandsController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.localesOptions = [];

        $scope.initLocalesOptionsData = function () {
            $scope.localesOptions = [];
            adminService.getReq($rootScope.URL.LOCALELANGUAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.name||'',
                                    value:objItem.code||''
                                };
                                if(objItem.supported){
                                    $scope.localesOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.walletOptions = [];

        $scope.initWalletOptionsData = function () {
            $scope.walletOptions = [];
            adminService.getReq($rootScope.URL.WALLETSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                if(!objItem.disabled){
                                    $scope.walletOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.currencyOptions = [];

        $scope.initCurrenciesManageData = function () {
            $scope.currencyOptions = [];
            adminService.getReq($rootScope.URL.CURRENCIESMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.name||'',
                                    value:objItem.code||''
                                };
                                if(objItem.supported){
                                    $scope.currencyOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.productOptions = [];

        $scope.initProductManageData = function () {
            $scope.productOptions = [];
            adminService.getReq($rootScope.URL.GAMESPRODUCTS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                if(objItem.disabled === false){
                                    $scope.productOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        // 原始的数据
        $scope.gameBrands = [];

        // 过滤出来的数据
        $scope.showGameBrands = [];
        $scope.gameBrandsReload = 1;
        $scope.gameBrandsAoData = {};
        $scope.gameBrandsSearch = '';

        // 初始化table数据
        $scope.initGameBrandsData = function () {
            //$scope.gameBrands = [];
            adminService.getReq($rootScope.URL.GAMEBRANDS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.gameBrands = angular.copy(res.data.data);
                        $scope.gameBrands.forEach(function (gameBrandsItem, gameBrandsIndex) {
                            gameBrandsItem.langs = [];
                            if(gameBrandsItem.languageMap && window.Array.isArray(gameBrandsItem.languageMap) ){
                                gameBrandsItem.languageMap.forEach(function(languageMapItem) {
                                    var tempLangs = {};
                                    tempLangs.our_locale = languageMapItem.local || '';
                                    tempLangs.brand_locale = languageMapItem.brand || '';
                                    gameBrandsItem.langs.push(tempLangs);
                                });
                                delete gameBrandsItem.languageMap;
                            }
                            gameBrandsItem.products = gameBrandsItem.products.map(function(productsItem) {
                                var tempProducts = {};
                                tempProducts.code = productsItem.code;
                                tempProducts.osx_url = productsItem && productsItem.urls && productsItem.urls.osx || '';
                                tempProducts.windows_url = productsItem && productsItem.urls && productsItem.urls.windows || '';
                                tempProducts.ios_url = productsItem && productsItem.urls && productsItem.urls.ios || '';
                                tempProducts.android_url = productsItem && productsItem.urls && productsItem.urls.android || '';
                                return tempProducts;
                            })
                        });
                        $scope.gameBrandsReload++;
                        console.log($scope.gameBrands)
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        // 展示Products弹窗
        $scope.showGameBrandsModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/gameBrands/gameBrandsModal.html',
                controller: 'GameBrandsModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    modalItem: item,
                    edit: edit,
                    hasPower: $scope.hasPower&&edit!==1,
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initGameBrandsData()
            }, function (data) {

            });
        };


        // 删除gameBrands
        /**
         * @param gameBrands GAMEBRANDSTITLE数据对象
         * @return null
         */
        $scope.deleteGameBrands = function (gameBrands) {
            if (!$scope.validIsNew(gameBrands._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.GAMEBRANDS.DELETE+'/'+gameBrands.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initGameBrandsData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        $scope.hasPower = $scope.validPower("GAMEBRANDS", ["POST", "PATCH"]);

        // 页面加载执行的函数

        $scope.initGameBrandsData();

        if($scope.hasPower){

            $scope.initCurrenciesManageData();

            $scope.initLocalesOptionsData();

            $scope.initProductManageData();

            $scope.initWalletOptionsData();
        }
    }
})();

(function() {

    angular
        .module('admin.gameBrands')
        .controller('GameBrandsModalController', GameBrandsModalController);

    GameBrandsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'edit',
        'hasPower',
        'modalItem'
    ];

    function GameBrandsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        edit,
        hasPower,
        modalItem
    ) {

        $scope.hasPower = hasPower;

        $scope.edit = edit;

        $scope.modalItem = angular.copy(modalItem);

        $scope.methodsNameModal = [];
        $scope.brandsLangsModal = [];
        $scope.brandsProductsModal = [];
        $scope.brandsCurrenciesModal = [];

        //初始化数据

        $scope.initGameBrandModalData = function () {
            if(edit == 2){
                $scope.modalItem = {
                    'code': '',
                    'wallet': $scope.walletOptions[0]&&$scope.walletOptions[0].value||'',
                    'status': 'OPEN',
                    'currencies': [],
                    'langs': [],
                    'products': []
                }
            }else{

            }
            if(!$scope.modalItem.jackpotUrl){
                $scope.modalItem.jackpotUrl = '';
            }
            if($scope.modalItem['name']&&$scope.modalItem['name'].length){
                $scope.methodsNameModal = $scope.modalItem['name'];
                $scope.methodsNameModal.forEach(function (methodsNameItem, methodsNameIndex) {
                    methodsNameItem.id = methodsNameIndex + 1;
                })
            }else{
                $scope.methodsNameModal = [];
            }
            if($scope.modalItem['langs']&&$scope.modalItem['langs'].length){
                $scope.brandsLangsModal = $scope.modalItem['langs'];
                $scope.brandsLangsModal.forEach(function (modalItem, brandsLangsIndex) {
                    modalItem.id = brandsLangsIndex + 1;
                })
            }else{
                $scope.brandsLangsModal = [];
            }
            if($scope.modalItem['products']&&$scope.modalItem['products'].length){
                $scope.brandsProductsModal = $scope.modalItem['products'];
                $scope.brandsProductsModal.forEach(function (modalItem, brandsProductsIndex) {
                    modalItem.id = brandsProductsIndex + 1;
                })
            }else{
                $scope.brandsProductsModal = [];
            }
            if($scope.modalItem['currencies']){
                $scope.brandsCurrenciesModal = $scope.modalItem['currencies'];
            }else {
                $scope.brandsCurrenciesModal = [];
            }
        };


        //名称列表开始



        // 原始的数据
        $scope.methodsNameModal = [];

        // 过滤出来的数据
        $scope.showMethodsNameModal = [];
        $scope.methodsNameModalReload = 1;
        $scope.methodsNameModalAoData = {};
        $scope.methodsNameModalSearch = '';


        // 保存
        /**
         *
         * @param methodsNameModal 渠道名称数据对象
         * @param data
         */

        $scope.saveMethodsNameModal = function (methodsNameModal, data) {
            $scope.methodsNameModal.forEach(function (methodsNameModalItem) {
                if(methodsNameModalItem.id == methodsNameModal.id){
                    window.Object.assign(methodsNameModalItem, data);
                    if($scope.validIsNew(methodsNameModalItem.id)){
                        methodsNameModalItem.id = window.parseInt(methodsNameModalItem.id, 10)
                        $scope.methodsNameModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param methodsNameModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteMethodsNameModal = function (methodsNameModal, index) {
            $scope.methodsNameModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addMethodsNameModal = function () {
            $scope.methodsNameModalAoData = {};
            $scope.methodsNameModalSearch = '';
            $scope.methodsNameModal.unshift({
                'id': ($scope.methodsNameModal.length+1) + 'null',
                "locale": $scope.localesOptions[0] ? $scope.localesOptions[0].value : '',
                "value": ''
            });
        };

        /**
         *
         * @param modalItem 添加的渠道名称
         * @param index 添加的index
         */

        $scope.cancelSaveNameModal = function (item, index) {
            if ($scope.validIsNew(item.id)) {
                $scope.methodsNameModal.splice(index, 1);
            }
        };

        //名称列表结束


        //语言列表开始


        // 原始的数据
        $scope.brandsLangsModal = [];

        // 过滤出来的数据
        $scope.showBrandsLangsModal = [];
        $scope.brandsLangsModalReload = 1;
        $scope.brandsLangsModalAoData = {};
        $scope.brandsLangsModalSearch = '';

        // 保存
        /**
         *
         * @param brandsLangsModal 渠道名称数据对象
         * @param data
         */

        $scope.saveBrandsLangsModal = function (brandsLangsModal, data) {
            $scope.brandsLangsModal.forEach(function (brandsLangsModalItem) {
                if(brandsLangsModalItem.id == brandsLangsModal.id){
                    window.Object.assign(brandsLangsModalItem, data);
                    if($scope.validIsNew(brandsLangsModalItem.id)){
                        brandsLangsModalItem.id = window.parseInt(brandsLangsModalItem.id, 10)
                        $scope.brandsLangsModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param brandsLangsModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteBrandsLangsModal = function (brandsLangsModal, index) {
            $scope.brandsLangsModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addBrandsLangsModal = function () {
            $scope.brandsLangsModalAoData = {};
            $scope.brandsLangsModalSearch = '';
            $scope.brandsLangsModal.unshift({
                'id': ($scope.brandsLangsModal.length+1) + 'null',
                "our_locale": $scope.localesOptions[0] ? $scope.localesOptions[0].value : '',
                "brand_locale": ''
            });
        };

        /**
         *
         * @param modalItem 添加的渠道名称
         * @param index 添加的index
         */

        $scope.cancelSaveLangsModal = function (modalItem, index) {
            if ($scope.validIsNew(modalItem.id)) {
                $scope.brandsLangsModal.splice(index, 1);
            }
        };

        //语言列表结束

        //产品列表开始
        // 原始的数据
        $scope.brandsProductsModal = [];

        // 过滤出来的数据
        $scope.showBrandsProductsModal = [];
        $scope.brandsProductsModalReload = 1;
        $scope.brandsProductsModalAoData = {};
        $scope.brandsProductsModalSearch = '';

        // 保存
        /**
         *
         * @param brandsProductsModal 渠道名称数据对象
         * @param data
         */

        $scope.saveBrandsProductsModal = function (brandsProductsModal, data) {
            $scope.brandsProductsModal.forEach(function (brandsProductsModalItem) {
                if(brandsProductsModalItem.id == brandsProductsModal.id){
                    window.Object.assign(brandsProductsModalItem, data);
                    if($scope.validIsNew(brandsProductsModalItem.id)){
                        brandsProductsModalItem.id = window.parseInt(brandsProductsModalItem.id, 10)
                        $scope.brandsProductsModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param brandsProductsModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteBrandsProductsModal = function (brandsProductsModal, index) {
            $scope.brandsProductsModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addBrandsProductsModal = function () {
            $scope.brandsProductsModalAoData = {};
            $scope.brandsProductsModalSearch = '';
            $scope.brandsProductsModal.unshift({
                'id': ($scope.brandsProductsModal.length+1) + 'null',
                "code": $scope.productOptions[0] ? $scope.productOptions[0].value : '',
                "osx_url": '',
                "windows_url": '',
                "ios_url": '',
                "android_url": '',
            });
        };

        /**
         *
         * @param modalItem 添加的渠道名称
         * @param index 添加的index
         */

        $scope.cancelSaveProductsModal = function (modalItem, index) {
            if ($scope.validIsNew(modalItem.id)) {
                $scope.brandsProductsModal.splice(index, 1);
            }
        };

        //产品列表结束



        //选择货币开始

        //$scope.selectObj = {};

        /**
         * 点击复选框
         * @param value value值
         * @param $event 点击事件
         */
        $scope.selectCurrency = function(value, $event) {
            if($event.target.checked){
               if($scope.brandsCurrenciesModal.indexOf(value) === -1){
                   $scope.brandsCurrenciesModal.push(value)
               }
            }else{
                $scope.brandsCurrenciesModal.splice($scope.brandsCurrenciesModal.indexOf(value), 1)
            }
        };

        //选择货币结束

        $scope.confirmModal = function () {

            //校验jackpotUrl
            if($scope.modalItem.jackpotUrl){
                if(!/^http[.]*/.test($scope.modalItem.jackpotUrl)){
                    $rootScope.alertErrorMsg('jackpotUrl should be url');
                    return '';
                }
            }

            //校验name

            if($scope.methodsNameModal && $scope.methodsNameModal.length){
                var tempObj = {};
                var sameKey = false;
                $scope.methodsNameModal.map(function(nameItem) {
                    if(tempObj[nameItem.locale]){
                        sameKey = true
                    }
                    tempObj[nameItem.locale] = nameItem.value
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same local in name list,just remove one');
                    return '';
                }
            }

            //校验langs

            if($scope.brandsLangsModal && $scope.brandsLangsModal.length){
                var tempObj = {};
                var sameKey = false;
                $scope.brandsLangsModal.map(function(nameItem) {
                    if(tempObj[nameItem.our_locale]){
                        sameKey = true
                    }
                    tempObj[nameItem.our_locale] = nameItem.our_locale||'';
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same local in langs list,just remove one');
                    return '';
                }
            }

            //校验product

            if($scope.brandsProductsModal && $scope.brandsProductsModal.length){
                var tempObj = {};
                var sameKey = false;
                $scope.brandsProductsModal.map(function(nameItem) {
                    if(tempObj[nameItem.code]){
                        sameKey = true
                    }
                    tempObj[nameItem.code] = nameItem.code
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same local in product list,just remove one');
                    return '';
                }
            }

            //提取数据

            var tempData = angular.copy($scope.modalItem);

            //提取name数据
            console.log($scope.methodsNameModal,'$scope.methodsNameModal')

            if($scope.methodsNameModal && $scope.methodsNameModal.length){
                var tempObjName = {};
                var sameKeyName = false;
                $scope.methodsNameModal.map(function(nameItem) {
                    if(tempObjName[nameItem.locale]&&!$scope.validIsNew(nameItem.id)){
                        sameKeyName = true
                    }
                    tempObjName[nameItem.locale] = nameItem.value
                });
                if(sameKeyName){
                    $rootScope.alertErrorMsg('you set same local,just remove one');
                    return '';
                }
                tempData.name = angular.copy(tempObjName)
            }else{
                tempData.name = {}
            }

            //提取langs数据

            var tempBrandsLangs = angular.copy($scope.brandsLangsModal);

            tempBrandsLangs = tempBrandsLangs.filter(function (modalItem) {
                return !$scope.validIsNew(modalItem.id);
            });
            tempBrandsLangs.forEach(function (modalItem, brandsLangsIndex) {
                if(modalItem.id){
                    delete modalItem.id;
                }
            });
            tempData.langs = tempBrandsLangs;

            //提取product数据
            var tempBrandsProducts = angular.copy($scope.brandsProductsModal);
            tempBrandsProducts = tempBrandsProducts.filter(function (modalItem) {
                return !$scope.validIsNew(modalItem.id);
            });
            tempBrandsProducts.forEach(function (modalItem, brandsProductsIndex) {
                if(modalItem.id){
                    delete modalItem.id;
                }
            });
            tempData.products = tempBrandsProducts;

            //提取Currency数据

            tempData.currencies = angular.copy($scope.brandsCurrenciesModal);

            if(edit==2){
                adminService.postReq($rootScope.URL.GAMEBRANDS.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }else if(edit==3){
                if(!tempData.jackpotUrl){
                    delete tempData.jackpotUrl;
                }
                adminService.patchReq($rootScope.URL.GAMEBRANDS.PATCH+'/'+tempData.code, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }

        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        //页面加载执行

        $scope.initGameBrandModalData();
    }
})();

(function() {

    angular
        .module('admin.gameCategories')
        .controller('GameCategoriesController', GameCategoriesController);

    GameCategoriesController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function GameCategoriesController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.localesOptions = [];

        $scope.initLocalesOptionsData = function () {
            $scope.localesOptions = [];
            adminService.getReq($rootScope.URL.LOCALELANGUAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.name||'',
                                    value:objItem.code||''
                                };
                                if(objItem.supported){
                                    $scope.localesOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        // 原始的数据
        $scope.gameCategories = [];

        // 过滤出来的数据
        $scope.showGameCategories = [];
        $scope.gameCategoriesReload = 1;
        $scope.gameCategoriesAoData = {};
        $scope.gameCategoriesSearch = '';

        // 初始化table数据
        $scope.initGameCategoriesData = function () {
            //$scope.gameCategories = [];
            adminService.getReq($rootScope.URL.GAMECATEGORIES.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.gameCategories = angular.copy(res.data.data);
                        $scope.gameCategoriesReload++;
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.showGameCategoriesModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/gameCategories/gameCategoriesModal.html',
                controller: 'gameCategoriesModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit:edit,
                    modalItem: item,
                    hasPower:$scope.validPower("GAMECATEGORIES", ["PATCH", "POST"]) && edit !== 1,
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initGameCategoriesData();
            }, function (data) {

            });
        };

        // 删除gameCategories
        /**
         * @param gameCategories GAMECATEGORIESTITLE数据对象
         * @return null
         */
        $scope.deleteGameCategories = function (gameCategories) {
            if (!$scope.validIsNew(gameCategories._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.GAMECATEGORIES.DELETE+'/'+gameCategories.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initGameCategoriesData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };


        // 页面加载执行的函数

        $scope.initGameCategoriesData();

        $scope.initLocalesOptionsData()
    }
})();

(function() {

    angular
        .module('admin.gameCategories')
        .controller('gameCategoriesModalController', gameCategoriesModalController);

    gameCategoriesModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'hasPower',
        'edit',
        'modalItem'
    ];

    function gameCategoriesModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        hasPower,
        edit,
        modalItem
    ) {

        $scope.edit = edit;
        $scope.hasPower = hasPower;

        // 原始的数据
        $scope.methodsNameModal = [];

        // 过滤出来的数据
        $scope.showMethodsNameModal = [];
        $scope.methodsNameModalReload = 1;
        $scope.methodsNameModalAoData = {};
        $scope.methodsNameModalSearch = '';

        var baseMethodsName = angular.copy(modalItem);

        // 初始化table数据
        $scope.initMethodsNameModalData = function () {
            $scope.methodsNameModal = [];
            console.log(modalItem,'modalItem')
            if(modalItem['name']&&modalItem['name'].length){
                $scope.methodsNameModal = modalItem['name'];
                $scope.methodsNameModal.forEach(function (methodsNameItem, methodsNameIndex) {
                    methodsNameItem.id = methodsNameIndex + 1;
                })
            }
        };


        // 保存
        /**
         *
         * @param methodsNameModal 渠道名称数据对象
         * @param data
         */

        $scope.saveMethodsNameModal = function (methodsNameModal, data) {
            $scope.methodsNameModal.forEach(function (methodsNameModalItem) {
                if(methodsNameModalItem.id == methodsNameModal.id){
                    window.Object.assign(methodsNameModalItem, data);
                    if($scope.validIsNew(methodsNameModalItem.id)){
                        methodsNameModalItem.id = window.parseInt(methodsNameModalItem.id, 10)
                        $scope.methodsNameModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param methodsNameModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteMethodsNameModal = function (methodsNameModal, index) {
            $scope.methodsNameModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addMethodsNameModal = function () {
            $scope.methodsNameModalAoData = {};
            $scope.methodsNameModalSearch = '';
            $scope.methodsNameModal.unshift({
                'id': ($scope.methodsNameModal.length+1) + 'null',
                "locale": $scope.localesOptions[0] ? $scope.localesOptions[0].value : '',
                "value": ''
            });
        };

        /**
         *
         * @param modalItem 添加的渠道名称
         * @param index 添加的index
         */

        $scope.cancelSaveModal = function (modalItem, index) {
            if ($scope.validIsNew(modalItem.id)) {
                $scope.methodsNameModal.splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            if($scope.methodsNameModal && $scope.methodsNameModal.length){
                var tempObj = {};
                var sameKey = false;
                $scope.methodsNameModal.map(function(nameItem) {
                    if(tempObj[nameItem.locale]){
                        sameKey = true
                    }
                    tempObj[nameItem.locale] = nameItem.value
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same local,just remove one');
                    return '';
                }
            }
            $scope.methodsNameModal = $scope.methodsNameModal.filter(function (methodsNameItem) {
                return !$scope.validIsNew(methodsNameItem.id);
            });
            $scope.methodsNameModal.forEach(function (methodsNameItem, methodsNameIndex) {
                if(methodsNameItem.id){
                    delete methodsNameItem.id;
                }
            });
            baseMethodsName.name = $scope.methodsNameModal;
            var tempData = angular.copy(baseMethodsName);
            if(tempData.name && tempData.name.length){
                var tempObj = {};
                var sameKey = false;
                tempData.name.map(function(nameItem) {
                    if(tempObj[nameItem.locale]){
                        sameKey = true
                    }
                    tempObj[nameItem.locale] = nameItem.value
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same local,just remove one');
                    return '';
                }
                tempData.name = angular.copy(tempObj)
            }
            if (edit==2) {
                adminService.postReq($rootScope.URL.GAMECATEGORIES.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (edit==3) {
                adminService.patchReq($rootScope.URL.GAMECATEGORIES.PATCH+'/'+modalItem.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initMethodsNameModalData();

    }
})();

(function() {

    angular
        .module('admin.gameRecords')
        .controller('GameRecordsController', GameRecordsController);

    GameRecordsController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function GameRecordsController(
        $scope,
        $rootScope,
        adminService
    ) {

        $scope.search = {
            products: [],
            brands: []
        };

        $scope.brandOptions = [];

        $scope.initBrandOptionsData = function () {
            $scope.brandOptions = [];
            adminService.getReq($rootScope.URL.GAMEBRANDS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.brandOptions.push(tempObj)
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.productOptions = [];
        $scope.productSearchOptions = [];

        $scope.initProductManageData = function () {
            $scope.productOptions = [];
            $scope.productSearchOptions = [];
            adminService.getReq($rootScope.URL.GAMESPRODUCTS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.productSearchOptions.push(tempObj)
                                if(objItem.disabled == false){
                                    $scope.productOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.gameRecordsUrl = $rootScope.URL.GAMERECORDS.GET;

        // 原始的数据
        $scope.gameRecords = [];
        $scope.gameRecordsReload = 1;
        $scope.gameRecordsAoData = {};
        $scope.tempGameRecordsAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempGameRecordsAoData = Object.assign($scope.tempGameRecordsAoData,$scope.gameRecordsAoData);
            $scope.gameRecordsReload++;
        };

        $scope.resetSearch = function() {
            $scope.gameRecordsAoData = {};
            $scope.search = {
                products: [],
                brands: []
            };
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempGameRecordsAoData;
            $scope.tempGameRecordsAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.gameRecordsReload++;
        };

        // 初始化table数据
        $scope.initGameRecordsData = function () {
            $scope.gameRecordsReload++;
        };

        // 页面加载执行的函数

        $scope.initProductManageData();

        $scope.initBrandOptionsData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.gameRecordsAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.gameRecordsAoData.start_time) {
                        $scope.gameRecordsAoData.start_time = '';
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.gameRecordsAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.gameRecordsAoData.end_time) {
                        $scope.gameRecordsAoData.end_time = '';
                    }
                }
            }
        });

        $scope.$watch('search.products.length+search.brands.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.gameRecordsAoData.products = $scope.search.products.join(',');
                $scope.gameRecordsAoData.brands = $scope.search.brands.join(',');
            }
        });

        $scope.urlUsername = '';

        // try {
        //     var urlParams = $scope.getUrlParams();
        //     if(urlParams._username){
        //         $scope.urlUsername = urlParams._username;
        //     }
        //     if(urlParams.user_id){
        //         $scope.tempGameRecordsAoData.user_id = urlParams.user_id;
        //     }
        // }catch (e){
        //     console.error(e)
        // }

    }
})();

(function() {

    angular
        .module('admin.gameRecords')
        .controller('GameRecordsFilterModalController', GameRecordsFilterModalController);

    GameRecordsFilterModalController.$inject = [
        '$scope',
        '$uibModalInstance',
        '$rootScope',
        'filter',
        '$translate',
        'adminService'
    ];

    function GameRecordsFilterModalController(
        $scope,
        $uibModalInstance,
        $rootScope,
        filter,
        $translate,
        adminService
    ) {

        $scope.search = {
            products: [],
            brands: []
        };

        $scope.brandOptions = [];

        $scope.initBrandOptionsData = function () {
            $scope.brandOptions = [];
            adminService.getReq($rootScope.URL.GAMEBRANDS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.brandOptions.push(tempObj)
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.productOptions = [];
        $scope.productSearchOptions = [];

        $scope.initProductManageData = function () {
            $scope.productOptions = [];
            $scope.productSearchOptions = [];
            adminService.getReq($rootScope.URL.GAMESPRODUCTS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.productSearchOptions.push(tempObj)
                                if(objItem.disabled == false){
                                    $scope.productOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.gameRecordsUrl = $rootScope.URL.GAMERECORDS.GET;

        // 原始的数据
        $scope.gameRecords = [];
        $scope.gameRecordsReload = 1;
        $scope.gameRecordsAoData = {};
        $scope.tempGameRecordsAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempGameRecordsAoData = Object.assign($scope.tempGameRecordsAoData,$scope.gameRecordsAoData);
            $scope.gameRecordsReload++;
        };

        $scope.resetSearch = function() {
            $scope.gameRecordsAoData = {};
            $scope.search = {
                products: [],
                brands: []
            };
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempGameRecordsAoData;
            $scope.tempGameRecordsAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.gameRecordsReload++;
        };

        // 初始化table数据
        $scope.initGameRecordsData = function () {
            $scope.gameRecordsReload++;
        };

        // 页面加载执行的函数

        $scope.initProductManageData();

        $scope.initBrandOptionsData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.gameRecordsAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.gameRecordsAoData.start_time) {
                        $scope.gameRecordsAoData.start_time = '';
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.gameRecordsAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.gameRecordsAoData.end_time) {
                        $scope.gameRecordsAoData.end_time = '';
                    }
                }
            }
        });

        $scope.$watch('search.products.length+search.brands.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.gameRecordsAoData.products = $scope.search.products.join(',');
                $scope.gameRecordsAoData.brands = $scope.search.brands.join(',');
            }
        });

        $scope.filter = filter;

        $scope.urlUsername = $scope.filter.username||'';

        if($scope.filter.username){
            delete $scope.filter.username
        }

        $scope.gameRecordsAoData = window.Object.assign($scope.gameRecordsAoData, $scope.filter);
        $scope.tempGameRecordsAoData = window.Object.assign($scope.tempGameRecordsAoData, $scope.filter);

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数
    }
})();

(function() {

    angular
        .module('admin.gamesManage')
        .controller('GamesManageController', GamesManageController);

    GamesManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function GamesManageController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.search = {
            categories: []
        };

        $scope.brandOptions = [];

        $scope.initBrandOptionsData = function () {
            $scope.brandOptions = [];
            adminService.getReq($rootScope.URL.GAMEBRANDS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.brandOptions.push(tempObj)
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.productOptions = [];
        $scope.productSearchOptions = [];

        $scope.initProductManageData = function () {
            $scope.productOptions = [];
            $scope.productSearchOptions = [];
            adminService.getReq($rootScope.URL.GAMESPRODUCTS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.productSearchOptions.push(tempObj)
                                if(objItem.disabled == false){
                                    $scope.productOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.categoriesOptions = [];

        $scope.initCategoriesManageData = function () {
            $scope.categoriesOptions = [];
            adminService.getReq($rootScope.URL.GAMECATEGORIES.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:$scope.showArrayName(objItem.name)||'',
                                    value:objItem.id||''
                                };
                                $scope.categoriesOptions.push(tempObj)
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.localesOptions = [];

        $scope.initLocalesOptionsData = function () {
            $scope.localesOptions = [];
            adminService.getReq($rootScope.URL.LOCALELANGUAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.name||'',
                                    value:objItem.code||''
                                };
                                if(objItem.supported){
                                    $scope.localesOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.booleanOptons = [
            {
                label: 'Yes',
                value: true
            },
            {
                label: 'No',
                value: false
            }
        ];

        $scope.gamesManageUrl = $rootScope.URL.GAMESMANAGE.GET;

        // 原始的数据
        $scope.gamesManage = [];
        $scope.gamesManageReload = 1;
        $scope.tempGamesManageAoData = {};
        $scope.gamesManageAoData = {};

        $scope.trigerSearch = function() {
            if($scope.gamesManageAoData.keyword&&$scope.gamesManageAoData.keyword.length!==0&&$scope.gamesManageAoData.keyword.length<3){
                $rootScope.alertErrorMsg('min name char length 3');
                return;
            }
            $scope.tempGamesManageAoData = Object.assign($scope.tempGamesManageAoData,$scope.gamesManageAoData);
            $scope.gamesManageReload++;
        };

        $scope.resetSearch = function() {
            $scope.search = {
                categories: []
            };
            $scope.gamesManageAoData = {};
            var tempData = $scope.tempGamesManageAoData;
            $scope.tempGamesManageAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.gamesManageReload++;
        };

        // 初始化table数据
        $scope.initGamesManageData = function () {
            $scope.gamesManageReload++;
        };

        $scope.handleGamesManageData = function(arr) {
            arr.forEach(function (gamesManageItem, gamesManageIndex) {
                gamesManageItem._id = gamesManageIndex +1;
                gamesManageItem.currentJackpot = '';
                gamesManageItem.flashCode = gamesManageItem.codes && gamesManageItem.codes.flash || '',
                gamesManageItem.html5Code = gamesManageItem.codes && gamesManageItem.codes.html5 || '',
                gamesManageItem.appCode = gamesManageItem.codes && gamesManageItem.codes.ios || '',
                gamesManageItem.apkCode = gamesManageItem.codes && gamesManageItem.codes.android || '',
                gamesManageItem.windowsCode = gamesManageItem.codes && gamesManageItem.codes.windows || '',
                gamesManageItem.flashDemoSupported = (gamesManageItem.demo && gamesManageItem.demo.flash || 'false').toString(),
                gamesManageItem.html5DemoSupported = (gamesManageItem.demo && gamesManageItem.demo.html5 || 'false').toString()
                if(gamesManageItem.codes){
                    delete gamesManageItem.codes;
                }
                if(gamesManageItem.demo){
                    delete gamesManageItem.demo;
                }
                if(gamesManageItem.worksOn){
                    delete gamesManageItem.worksOn;
                }
                if(window.Array.isArray(gamesManageItem.categories)){
                    gamesManageItem.categories = gamesManageItem.categories.map(function (item) {
                        return item.id;
                    });
                }else{
                    gamesManageItem.categories = [];
                }
            });
            return arr;
        };


        $scope.showEditGamesManageModal = function (game,edit) {
            var modalInstanceGameModal = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/gamesManage/gamesManageModal.html',
                controller: 'addGamesController',
                scope: $scope,
                size: 'lg',
                resolve:{
                    gamesItem:game,
                    edit:edit,
                    hasPower:$scope.hasPower && edit!==1
                }
            });
            modalInstanceGameModal.result.then(function(data) {
                $scope.initGamesManageData();
                modalInstanceGameModal = null;
            }, function(data) {
                modalInstanceGameModal = null;
            });
        };

        // 删除gamesManage
        /**
         * @param gamesManage GAMESMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteGamesManage = function (gamesManage) {
            if (!$scope.validIsNew(gamesManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.GAMESMANAGE.DELETE+'/'+gamesManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initGamesManageData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        // 添加按钮
        $scope.addGamesManage = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/gamesManage/gamesManageModal.html',
                controller: 'addGamesController',
                scope: $scope,
                size: 'lg',
                resolve:{
                    gamesItem:false,
                    edit:false,
                    hasPower:$scope.hasPower
                }
            });
            modalInstance.result.then(function(data) {
                $scope.initGamesManageData()
            }, function(data) {
            });
        };

        /**
         *
         * @param item 添加的GAMESMANAGETITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.gamesManage.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.hasPower = $scope.validPower("GAMESMANAGE", ["PATCH", "POST"]);

        if($scope.hasPower){

            $scope.initProductManageData();

            $scope.initBrandOptionsData();

            $scope.initCategoriesManageData();

            $scope.initLocalesOptionsData();
        }

        $scope.$watch('search.categories.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.gamesManageAoData.categories = $scope.search.categories.join(',');
            }
        });
    }
})();

(function() {

    angular
        .module('admin.gamesManage')
        .controller('addGamesController', addGamesController);

    addGamesController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        'gamesItem',
        'edit',
        'hasPower',
        '$uibModal',
        '$translate'
    ];

    function addGamesController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        gamesItem,
        edit,
        hasPower,
        $uibModal,
        $translate
    ) {

        $scope.edit = edit;

        $scope.hasPower = hasPower;

        if(edit == 3||edit ==1){
            $scope.gamesItem = angular.copy(gamesItem)
        }else{
            $scope.gamesItem = {
                name: [],
                productCode: $scope.productOptions[0] && $scope.productOptions[0].value || '',
                brandCode: $scope.brandOptions[0] && $scope.brandOptions[0].value || '',
                flashCode:'',
                html5Code:'',
                appCode:'',
                apkCode:'',
                windowsCode: '',
                ftpCode: '',
                flashDemoSupported: '',
                html5DemoSupported: '',
                image: '',
                lines: '',
                hasJackpot: '',
                currentJackpot: '',
                disabled: false,
                rebateable: $scope.booleanOptons[1].value,
                bigwinable: '',
                categories: [],
                isNew: '',
                isComingSoon: '',
                isRecommend: ''
            };
        }

        $scope.showChooseFileModal  = function(name){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/mediaFiles/mediaFilesChooseName.html',
                controller: 'mediaFilesChooseNameModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    filter:{
                        category:'game',
                        name:name||'',
                        status:'finished'
                    }
                }
            });
            modalInstance.result.then(function(data) {
                $scope.gamesItem.image = data;
                modalInstance = null;
            }, function(data) {
                modalInstance = null;
            });
        };

        /**
         * 点击复选框
         * @param value value值
         * @param $event 点击事件
         */
        $scope.selectCategories = function(value, $event) {
            if($event.target.checked){
                if($scope.gamesItem.categories.indexOf(value) === -1){
                    $scope.gamesItem.categories.push(value)
                }
            }else{
                $scope.gamesItem.categories.splice($scope.gamesItem.categories.indexOf(value), 1)
            }
        };

        // 过滤出来的数据
        $scope.showNameModal = [];
        $scope.nameModalReload = 1;
        $scope.nameModalAoData = {};
        $scope.nameModalSearch = '';

        // 初始化table数据
        $scope.initNameModalData = function () {
            $scope.gamesItem['name'].forEach(function (nameItem, nameIndex) {
                nameItem.id = nameIndex + 1;
            })
        };


        // 保存
        /**
         *
         * @param nameModal name数据对象
         * @param data
         */

        $scope.saveNameModal = function (nameModal, data) {
            $scope.gamesItem['name'].forEach(function (nameModalItem) {
                if(nameModalItem.id == nameModal.id){
                    window.Object.assign(nameModalItem, data);
                    if($scope.validIsNew(nameModalItem.id)){
                        nameModalItem.id = window.parseInt(nameModalItem.id, 10)
                        $scope.nameModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param nameModal name数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteNameModal = function (nameModal, index) {
            $scope.gamesItem['name'].splice(index, 1)
        };

        // 添加按钮
        $scope.addNameModal = function () {
            $scope.nameModalAoData = {};
            $scope.nameModalSearch = '';
            $scope.gamesItem['name'].unshift({
                'id': ($scope.gamesItem['name'].length+1) + 'null',
                "locale": $scope.localesOptions[0] ? $scope.localesOptions[0].value : '',
                "value": ''
            });
        };

        /**
         *
         * @param NameItem name项目
         * @param index 添加的index
         */

        $scope.cancelSaveNameModal = function (NameItem, index) {
            if ($scope.validIsNew(NameItem.id)) {
                $scope.gamesItem['name'].splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            if(!($scope.gamesItem.flashCode || $scope.gamesItem.html5Code || $scope.gamesItem.appCode || $scope.gamesItem.apkCode || $scope.gamesItem.windowsCode)){
                $rootScope.alertErrorMsg('flashCode html5Code appCode apkCode windowsCode, should has one');
                return '';
            }
            if($scope.gamesItem.productCode == 'SLOTS'){
                if(typeof $scope.gamesItem.bigwinable !== 'boolean'){
                    $rootScope.alertErrorMsg('bigwinable is required');
                    return;
                }
                if(typeof $scope.gamesItem.hasJackpot !== 'boolean'){
                    $rootScope.alertErrorMsg('hasJackpot is required');
                    return;
                }
            }
            if($scope.gamesItem.html5Code){
                $scope.gamesItem.html5DemoSupported = true;
            }
            if($scope.gamesItem.flashCode){
                $scope.gamesItem.flashDemoSupported = true;
            }
            if($scope.gamesItem.name && $scope.gamesItem.name.length){
                var tempObj = {};
                var sameKey = false;
                $scope.gamesItem.name.map(function(nameItem) {
                    if(tempObj[nameItem.locale]){
                        sameKey = true
                    }
                    tempObj[nameItem.locale] = nameItem.value
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same local, just remove one');
                    return '';
                }
            }
            var tempData = angular.copy($scope.gamesItem);
            tempData['name'] = tempData['name'].filter(function (item) {
                return !$scope.validIsNew(item.id);
            });
            if(window.Array.isArray(tempData['name'])){
                tempData['name'].forEach(function(nameItem) {
                    if(nameItem.id){
                        delete nameItem.id;
                    }
                })
            }
            if(tempData.name && tempData.name.length){
                var tempNameObj = {};
                tempData.name.map(function(nameItem) {
                    tempNameObj[nameItem.locale] = nameItem.value
                });
                tempData.name = angular.copy(tempNameObj)
            }
            console.log(tempData,'tempData9999')
            if (edit==2) {
                adminService.postReq($rootScope.URL.GAMESMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('success');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (edit==3) {
                adminService.patchReq($rootScope.URL.GAMESMANAGE.PATCH+'/'+gamesItem.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('success');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数
        $scope.initNameModalData();

    }
})();

(function() {

    angular
        .module('admin.localeLanguage')
        .controller('LocaleLanguageController', LocaleLanguageController);

    LocaleLanguageController.$inject = [
        '$scope',
        '$uibModal',
        '$rootScope',
        'adminService',
        '$translate'
    ];

    function LocaleLanguageController(
        $scope,
        $uibModal,
        $rootScope,
        adminService,
        $translate
    ) {

        // 原始的数据
        $scope.localeLanguage = [];

        $scope.supportedOptions = [
            {
                value:'0',
                label:$translate.instant('table.localeLanguage.th3ShowFalse')
            },
            {
                value:'1',
                label:$translate.instant('table.localeLanguage.th3ShowTrue')
            }
        ];

        // 过滤出来的数据
        $scope.showLocaleLanguage = [];
        $scope.localeLanguageReload = 1;
        $scope.localeLanguageAoData = {};
        $scope.localeLanguageSearch = '';

        // 初始化table数据
        $scope.initLocaleLanguageData = function () {
            //$scope.localeLanguage = [];
            adminService.getReq($rootScope.URL.LOCALELANGUAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.localeLanguage = angular.copy(res.data.data);
                        $scope.localeLanguage.forEach(function (localeLanguageItem, localeLanguageIndex) {
                            localeLanguageItem.supported = localeLanguageItem.supported ? '1' : '0';
                        });
                        $scope.localeLanguageReload++;
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        $scope.showLocaleLanguageModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/localeLanguage/localeLanguageModal.html',
                controller: 'localeLanguageModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit:edit,
                    modalItem: item,
                    hasPower:$scope.validPower("LOCALELANGUAGE", ["PATCH", "POST"]) && edit !== 1,
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initLocaleLanguageData();
            }, function (data) {

            });
        };


        // 删除localeLanguage
        /**
         * @param localeLanguage 本地语言数据对象
         * @return null
         */
        $scope.deleteLocaleLanguage = function (localeLanguage) {
            if (localeLanguage.code) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.LOCALELANGUAGE.DELETE+'/'+localeLanguage.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initLocaleLanguageData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                            }
                        }
                    });
                });
            }
        };

        /**
         *
         * @param item 添加的本地语言
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.localeLanguage.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initLocaleLanguageData();
    }
})();

(function() {

    angular
        .module('admin.localeLanguage')
        .controller('localeLanguageModalController', localeLanguageModalController);

    localeLanguageModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'hasPower',
        'edit',
        'modalItem'
    ];

    function localeLanguageModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        hasPower,
        edit,
        modalItem
    ) {

        $scope.edit = edit;
        $scope.hasPower = hasPower;
        $scope.modalItem = angular.copy(modalItem);

        // 初始化table数据
        $scope.initMethodsNameModalData = function () {
            if(edit==2){
                $scope.modalItem.supported = $scope.supportedOptions[1].value
            }
        };

        //$rootScope.toasterSuccess(res.data.msg);;
        $scope.confirmModal = function () {
            var tempData = angular.copy($scope.modalItem);
            if (edit==2) {
                adminService.postReq($rootScope.URL.LOCALELANGUAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (edit==3) {
                adminService.patchReq($rootScope.URL.LOCALELANGUAGE.PATCH+'/'+tempData.code, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }

        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initMethodsNameModalData();

    }
})();

(function() {

    angular
        .module('admin.gamesProducts')
        .controller('GamesProductsController', GamesProductsController);

    GamesProductsController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function GamesProductsController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.localesOptions = [];

        $scope.initLocalesOptionsData = function () {
            $scope.localesOptions = [];
            adminService.getReq($rootScope.URL.LOCALELANGUAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.name||'',
                                    value:objItem.code||''
                                };
                                if(objItem.supported){
                                    $scope.localesOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.disabledOptions = [
            {
                label:'YES',
                value:true
            },
            {
                label:'No',
                value:false
            }
        ];

        // 原始的数据
        $scope.gamesProducts = [];

        // 过滤出来的数据
        $scope.showGamesProducts = [];
        $scope.gamesProductsReload = 1;
        $scope.gamesProductsAoData = {};

        // 初始化table数据
        $scope.initGamesProductsData = function () {
            //$scope.gamesProducts = [];
            adminService.getReq($rootScope.URL.GAMESPRODUCTS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.gamesProducts = angular.copy(res.data.data);
                        $scope.gamesProductsReload++;
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        $scope.showGameProductNameModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/gamesProducts/gamesProductsModal.html',
                controller: 'gamesProductsModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit: edit,
                    modalItem: item,
                    hasPower:$scope.hasPower&&edit!==1
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initGamesProductsData();
            }, function (data) {

            });
        };


        // 删除gamesProducts
        /**
         * @param gamesProducts GAMESPRODUCTSTITLE数据对象
         * @return null
         */
        $scope.deleteGamesProducts = function (gamesProducts) {
            if (!$scope.validIsNew(gamesProducts._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.GAMESPRODUCTS.DELETE+'/'+gamesProducts.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initGamesProductsData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        $scope.hasPower = $scope.validPower("GAMESPRODUCTS", ["PATCH", "POST"])

        // 页面加载执行的函数

        $scope.initGamesProductsData();

        if($scope.hasPower){

            $scope.initLocalesOptionsData();

        }
    }
})();

(function() {

    angular
        .module('admin.gamesProducts')
        .controller('gamesProductsModalController', gamesProductsModalController);

    gamesProductsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'hasPower',
        'edit',
        'modalItem'
    ];

    function gamesProductsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        hasPower,
        edit,
        modalItem
    ) {

        $scope.hasPower = hasPower;

        $scope.edit = edit;

        $scope.modalItem = angular.copy(modalItem);

        // 原始的数据
        $scope.methodsNameModal = [];

        // 过滤出来的数据
        $scope.showMethodsNameModal = [];
        $scope.methodsNameModalReload = 1;
        $scope.methodsNameModalAoData = {};
        $scope.methodsNameModalSearch = '';

        // 初始化table数据
        $scope.initMethodsNameModalData = function () {
            if(edit == 2){
                $scope.modalItem = {
                    "code": "",
                    "disabled": $scope.disabledOptions[1].value,
                    "name": []
                }
            }else{
                if($scope.modalItem['name']&&$scope.modalItem['name'].length){
                    $scope.methodsNameModal = $scope.modalItem['name'];
                    $scope.methodsNameModal.forEach(function (methodsNameItem, methodsNameIndex) {
                        methodsNameItem.id = methodsNameIndex + 1;
                    })
                }
            }
        };


        // 保存
        /**
         *
         * @param methodsNameModal 渠道名称数据对象
         * @param data
         */

        $scope.saveMethodsNameModal = function (methodsNameModal, data) {
            $scope.methodsNameModal.forEach(function (methodsNameModalItem) {
                if(methodsNameModalItem.id == methodsNameModal.id){
                    window.Object.assign(methodsNameModalItem, data);
                    if($scope.validIsNew(methodsNameModalItem.id)){
                        methodsNameModalItem.id = window.parseInt(methodsNameModalItem.id, 10)
                        $scope.methodsNameModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param methodsNameModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteMethodsNameModal = function (methodsNameModal, index) {
            $scope.methodsNameModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addMethodsNameModal = function () {
            $scope.methodsNameModalAoData = {};
            $scope.methodsNameModalSearch = '';
            $scope.methodsNameModal.unshift({
                'id': ($scope.methodsNameModal.length+1) + 'null',
                "locale": $scope.localesOptions[0] ? $scope.localesOptions[0].value : '',
                "value": ''
            });
        };

        /**
         *
         * @param modalItem 添加的渠道名称
         * @param index 添加的index
         */

        $scope.cancelSaveModal = function (item, index) {
            if ($scope.validIsNew(item.id)) {
                $scope.methodsNameModal.splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            if($scope.methodsNameModal && $scope.methodsNameModal.length){
                var tempObj = {};
                var sameKey = false;
                $scope.methodsNameModal.map(function(nameItem) {
                    if(tempObj[nameItem.locale]){
                        sameKey = true
                    }
                    tempObj[nameItem.locale] = nameItem.value
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same local,just remove one');
                    return '';
                }
            }
            $scope.methodsNameModal = $scope.methodsNameModal.filter(function (methodsNameItem) {
                return !$scope.validIsNew(methodsNameItem.id);
            });
            $scope.methodsNameModal.forEach(function (methodsNameItem, methodsNameIndex) {
                if(methodsNameItem.id){
                    delete methodsNameItem.id;
                }
            });
            var tempData = angular.copy($scope.modalItem);
            if($scope.methodsNameModal && $scope.methodsNameModal.length){
                var tempObj = {};
                var sameKey = false;
                $scope.methodsNameModal.map(function(nameItem) {
                    if(tempObj[nameItem.locale]){
                        sameKey = true
                    }
                    tempObj[nameItem.locale] = nameItem.value
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same local,just remove one');
                    return '';
                }
                tempData.name = angular.copy(tempObj)
            }else{
                tempData.name = {}
            }
            if(edit ==2){
                adminService.postReq($rootScope.URL.GAMESPRODUCTS.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }else if(edit == 3){
                adminService.patchReq($rootScope.URL.GAMESPRODUCTS.PATCH+'/'+tempData.code, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss({});
        };

        // 页面加载执行的函数

        $scope.initMethodsNameModalData();

    }
})();

(function() {

    angular
        .module('admin.mediaCategories')
        .controller('MediaCategoriesController', MediaCategoriesController);

    MediaCategoriesController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function MediaCategoriesController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.mediaCategoriesUrl =

        // 原始的数据
        $scope.mediaCategories = [];

        // 过滤出来的数据
        $scope.showMediaCategories = [];
        $scope.mediaCategoriesReload = 1;
        $scope.mediaCategoriesAoData = {};
        $scope.mediaCategoriesSearch = '';

        // 初始化table数据
        $scope.initMediaCategoriesData = function () {
            adminService.getReq($rootScope.URL.MEDIACATEGORIES.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.mediaCategories = angular.copy(res.data.data);
                        $scope.mediaCategoriesReload++;
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        $scope.showMediaCategoriesModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/mediaCategories/mediaCategoriesModal.html',
                controller: 'mediaCategoriesModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit:edit,
                    modalItem: item,
                    hasPower:$scope.validPower("MEDIACATEGORIES", ["POST"]) && edit !== 1,
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initMediaCategoriesData();
            }, function (data) {

            });
        };

        // 页面加载执行的函数

        $scope.initMediaCategoriesData();
    }
})();

(function() {

    angular
        .module('admin.mediaCategories')
        .controller('mediaCategoriesModalController', mediaCategoriesModalController);

    mediaCategoriesModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'hasPower',
        'edit',
        'modalItem'
    ];

    function mediaCategoriesModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        hasPower,
        edit,
        modalItem
    ) {

        $scope.edit = edit;
        $scope.hasPower = hasPower;

        $scope.modalItem = modalItem;

        // 原始的数据
        $scope.methodsNameModal = [];

        // 过滤出来的数据
        $scope.showMethodsNameModal = [];
        $scope.methodsNameModalReload = 1;
        $scope.methodsNameModalAoData = {};
        $scope.methodsNameModalSearch = '';

        $scope.localesOptions = [];

        $scope.initLocalesOptionsData = function () {
            $scope.localesOptions = [];
            adminService.getReq($rootScope.URL.LOCALELANGUAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.name||'',
                                    value:objItem.code||''
                                };
                                if(objItem.supported){
                                    $scope.localesOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        // 初始化table数据
        $scope.initMethodsNameModalData = function () {
            $scope.methodsNameModal = [];
            console.log(modalItem,'modalItem')
            if(modalItem['name']&&modalItem['name'].length){
                $scope.methodsNameModal = modalItem['name'];
                $scope.methodsNameModal.forEach(function (methodsNameItem, methodsNameIndex) {
                    methodsNameItem.id = methodsNameIndex + 1;
                })
            }
        };


        // 保存
        /**
         *
         * @param methodsNameModal 渠道名称数据对象
         * @param data
         */

        $scope.saveMethodsNameModal = function (methodsNameModal, data) {
            $scope.methodsNameModal.forEach(function (methodsNameModalItem) {
                if(methodsNameModalItem.id == methodsNameModal.id){
                    window.Object.assign(methodsNameModalItem, data);
                    if($scope.validIsNew(methodsNameModalItem.id)){
                        methodsNameModalItem.id = window.parseInt(methodsNameModalItem.id, 10)
                        $scope.methodsNameModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param methodsNameModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteMethodsNameModal = function (methodsNameModal, index) {
            $scope.methodsNameModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addMethodsNameModal = function () {
            $scope.methodsNameModalAoData = {};
            $scope.methodsNameModalSearch = '';
            $scope.methodsNameModal.unshift({
                'id': ($scope.methodsNameModal.length+1) + 'null',
                "locale": $scope.localesOptions[0] ? $scope.localesOptions[0].value : '',
                "value": ''
            });
        };

        /**
         *
         * @param modalItem 添加的渠道名称
         * @param index 添加的index
         */

        $scope.cancelSaveModal = function (modalItem, index) {
            if ($scope.validIsNew(modalItem.id)) {
                $scope.methodsNameModal.splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            if($scope.methodsNameModal && $scope.methodsNameModal.length){
                var tempObj = {};
                var sameKey = false;
                $scope.methodsNameModal.map(function(nameItem) {
                    if(tempObj[nameItem.locale]){
                        sameKey = true
                    }
                    tempObj[nameItem.locale] = nameItem.value
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same local,just remove one');
                    return '';
                }
            }
            $scope.methodsNameModal = $scope.methodsNameModal.filter(function (methodsNameItem) {
                return !$scope.validIsNew(methodsNameItem.id);
            });
            $scope.methodsNameModal.forEach(function (methodsNameItem, methodsNameIndex) {
                if(methodsNameItem.id){
                    delete methodsNameItem.id;
                }
            });
            var tempData = {
                path:$scope.modalItem.path,
                name:angular.copy($scope.methodsNameModal)
            };
            if(tempData.name && tempData.name.length){
                var tempObj = {};
                var sameKey = false;
                tempData.name.map(function(nameItem) {
                    if(tempObj[nameItem.locale]){
                        sameKey = true
                    }
                    tempObj[nameItem.locale] = nameItem.value
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same local,just remove one');
                    return '';
                }
                tempData.name = angular.copy(tempObj)
            }
            if (edit==2) {
                adminService.postReq($rootScope.URL.MEDIACATEGORIES.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initMethodsNameModalData();

        $scope.initLocalesOptionsData();

    }
})();

(function() {

    angular
        .module('admin.mediaFiles')
        .controller('MediaFilesController', MediaFilesController);

    MediaFilesController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function MediaFilesController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.mediaFilesUrl = $rootScope.URL.MEDIAFILES.GET;

        $scope.categoryOptionsSearch = [];

        $scope.statusOptions = [
            {
                label:'pending',
                value:'pending'
            },
            {
                label:'processing',
                value:'processing'
            },
            {
                label:'failed',
                value:'failed'
            },
            {
                label:'finished',
                value:'finished'
            }
        ];

        // 原始的数据
        $scope.mediaFiles = [];

        // 过滤出来的数据
        $scope.showMediaFiles = [];
        $scope.mediaFilesReload = 1;
        $scope.mediaFilesAoData = {};
        $scope.tempMediaFilesAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempMediaFilesAoData = Object.assign($scope.tempMediaFilesAoData,$scope.mediaFilesAoData);
            $scope.mediaFilesReload++;
        };

        $scope.resetSearch = function() {
            $scope.mediaFilesAoData = {};
            var tempData = $scope.tempMediaFilesAoData;
            $scope.tempMediaFilesAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.mediaFilesReload++;
        };

        // 初始化table数据
        $scope.initMediaFilesData = function () {
            $scope.mediaFilesReload++;
        };


        $scope.showMediaFilesModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/mediaFiles/mediaFilesModal.html',
                controller: 'mediaFilesModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit:edit,
                    modalItem: item,
                    isGame: false,
                    hasPower:$scope.validPower("MEDIAFILES", ["POST"]) && edit !== 1,
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initMediaFilesData();
            }, function (data) {

            });
        };

        $scope.initCategoryOptionsSearch = function () {
            adminService.getReq($rootScope.URL.MEDIACATEGORIES.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if (window.Array.isArray(res.data.data)) {
                            res.data.data.map(function (objItem) {
                                var tempObj = {
                                    label: objItem.path || '',
                                    value: objItem.path || ''
                                };
                                $scope.categoryOptionsSearch.push(tempObj);
                            })
                        }
                        $scope.categoryOptionsSearch.unshift({
                            label:'全部',
                            value:''
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.showMediaFilesViewModal = function (item) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/mediaFiles/mediaFilesViewModal.html',
                controller: 'mediaFilesViewModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    modalItem: item,
                }
            });
            modalInstance.result.then(function (data) {
            }, function (data) {

            });
        };

        // 删除mediaFiles
        /**
         * @param mediaFiles MEDIAFILESTITLE数据对象
         * @return null
         */
        $scope.deleteMediaFiles = function (mediaFiles) {
            $rootScope.alertConfirm(function () {
                adminService.deleteReq($rootScope.URL.MEDIAFILES.DELETE+'/'+mediaFiles.name, {}, {}).then(function (res) {
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initMediaFilesData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                            return '';
                        }
                    }
                });
            });
        };

        // 页面加载执行的函数

        $scope.initCategoryOptionsSearch()
    }
})();

(function () {

    angular
        .module('admin.mediaFiles')
        .controller('mediaFilesChooseNameModalController', mediaFilesChooseNameModalController);

    mediaFilesChooseNameModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$uibModal',
        '$translate',
        'adminService',
        'filter'
    ];

    function mediaFilesChooseNameModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $uibModal,
        $translate,
        adminService,
        filter
    ) {

        $scope.filter = angular.copy(filter);

        $scope.mediaFilesUrl = $rootScope.URL.MEDIAFILES.GET;

        $scope.statusOptions = [
            {
                label:'pending',
                value:'pending'
            },
            {
                label:'processing',
                value:'processing'
            },
            {
                label:'failed',
                value:'failed'
            },
            {
                label:'finished',
                value:'finished'
            }
        ];

        // 原始的数据
        $scope.mediaFiles = [];

        // 过滤出来的数据
        $scope.showMediaFiles = [];
        $scope.mediaFilesReload = 1;
        $scope.mediaFilesAoData = {};
        $scope.tempMediaFilesAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempMediaFilesAoData = Object.assign($scope.tempMediaFilesAoData,$scope.mediaFilesAoData);
            $scope.mediaFilesReload++;
        };

        $scope.resetSearch = function() {
            $scope.mediaFilesAoData = {};
            var tempData = $scope.tempMediaFilesAoData;
            $scope.tempMediaFilesAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.mediaFilesReload++;
        };

        // 初始化table数据
        $scope.initMediaFilesData = function () {
            $scope.mediaFilesReload++;
        };

        $scope.showMediaFilesModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/mediaFiles/mediaFilesModal.html',
                controller: 'mediaFilesModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit:edit,
                    modalItem: item,
                    isGame: true,
                    hasPower:$scope.validPower("MEDIAFILES", ["POST"]) && edit !== 1,
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initMediaFilesData();
            }, function (data) {

            });
        };


        $scope.chooseMediaFiles = function (item) {
            $uibModalInstance.close(item.name);
        };

        $scope.showMediaFilesViewModal = function (item) {
            var modalInstanceShowFile = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/mediaFiles/mediaFilesViewModal.html',
                controller: 'mediaFilesViewModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    modalItem: item,
                }
            });
            modalInstanceShowFile.result.then(function (data) {
                modalInstanceShowFile = null;
            }, function (data) {
                modalInstanceShowFile = null;
            });
        };

        $scope.cancelModalChooseFileModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.mediaFilesAoData = window.Object.assign($scope.mediaFilesAoData, $scope.filter);
        $scope.tempMediaFilesAoData = window.Object.assign($scope.tempMediaFilesAoData, $scope.filter);;

    }
})();

(function () {

    angular
        .module('admin.mediaFiles')
        .controller('mediaFilesModalController', mediaFilesModalController);

    mediaFilesModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'Upload',
        'adminService',
        'hasPower',
        'edit',
        'isGame',
        'modalItem'
    ];

    function mediaFilesModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        Upload,
        adminService,
        hasPower,
        edit,
        isGame,
        modalItem
    ) {

        $scope.uploadStatus=false;
        $scope.edit = edit;
        $scope.isGame = isGame;
        $scope.hasPower = hasPower;
        $scope.modalItem = angular.copy(modalItem);
        $scope.modalItem.category = '';
        $scope.modalItem.locale = '';

        // accept="image/jpg,image/png,image/bmp,image/jpeg"
        $scope.filesTypesOptions = {
            'game': [
                        {
                            key: 'card',
                            file: '',
                            tip: '392x220 png',
                            type: 'image/png'
                        },
                        {
                            key: 'icon',
                            file: '',
                            tip: '128x128 png',
                            type: 'image/png'
                        }
                    ],
            'spot': [
                        {
                            key: 'spot',
                            file: '',
                            tip: '1600x740 jpg',
                            type: 'image/jpg'
                        },
                        {
                            key: 'blur',
                            file: '',
                            tip: '2560x770 jpg',
                            type: 'image/jpg'
                        }
                    ],
            'menu': [
                        {
                            key: 'bg',
                            file: '',
                            tip: '716x550 jpg',
                            type: 'image/jpg'
                        },
                        {
                            key: 'collection',
                            file: '',
                            tip: '196x330 jpg png',
                            type: 'image/jpg,image/png'
                        }
                    ],
            'promotion': [
                        {
                            key: '1060',
                            file: '',
                            tip: '2120x160 jpg',
                            type: 'image/jpg'
                        },
                        {
                            key: '919',
                            file: '',
                            tip: '1838x320 jpg',
                            type: 'image/jpg'
                        },
                        {
                            key: '749',
                            file: '',
                            tip: '1498x320 jpg',
                            type: 'image/jpg'
                        }
                    ],
        };

        $scope.localesOptions = [];

        $scope.initLocalesOptionsData = function () {
            $scope.localesOptions = [];
            adminService.getReq($rootScope.URL.LOCALELANGUAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                if(objItem.supported){
                                    $scope.localesOptions.push(tempObj)
                                }
                            })
                        }
                        $scope.modalItem.locale = $scope.localesOptions[0]&&$scope.localesOptions[0].code;
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.addMenuMediaFilesType = function(){
            console.log($scope.modalItem.locale)
            if($scope.modalItem.locale){
                $scope.filesTypes.push({
                    key: $scope.modalItem.locale,
                    file: '',
                    tip: '285x170 png',
                    type: 'image/png'
                })
            }
        };

        // 初始化table数据
        $scope.initFilesTypes = function () {
            $scope.filesTypes = angular.copy($scope.filesTypesOptions[$scope.modalItem.category])
        };

        $scope.categoryOptions = [];

        $scope.initCategoryOptions = function () {
            adminService.getReq($rootScope.URL.MEDIACATEGORIES.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if (window.Array.isArray(res.data.data)) {
                            res.data.data.map(function (objItem) {
                                var tempObj = {
                                    label: objItem.path || '',
                                    value: objItem.path || ''
                                };
                                $scope.categoryOptions.push(tempObj);
                                $scope.initFilesTypes();
                            })
                        }
                        $scope.modalItem.category = $scope.categoryOptions[0].value;
                        $scope.initFilesTypes();
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        //$rootScope.toasterSuccess(res.data.msg);;
        $scope.confirmModal = function () {
            var requireVaild = false;
            var tempObj = {};
            $scope.filesTypes.forEach(function (item) {
                if(item.file === ''){
                    requireVaild = true
                }else{
                    tempObj[item.key] = item.file
                }
            });
            if(requireVaild&&['game','promotion'].indexOf($scope.modalItem.category)!==-1){
                $rootScope.alertErrorMsg('image should upload at one time');
                return;
            }
            Upload.upload({
                url: $rootScope.URL.MEDIAFILES.POST,
                data: {'category': $scope.modalItem.category,'image':tempObj}
            }).then(function (resp) {
                $scope.uploadStatus=true;
                $uibModalInstance.close('OK');
                console.log('Success uploaded Response: ' + resp);
            }, function (resp) {
                $scope.uploadStatus=true;
                $rootScope.alertErrorMsg(resp.data&&resp.data.msg||'upload error');
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                $scope.uploadStatus=true;
            });
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        if($scope.isGame){

            $scope.modalItem.category = 'game';

            $scope.categoryOptions.push({
                label:'game',
                value:'game'
            });

            $scope.initFilesTypes();

        }else{

            $scope.initCategoryOptions();

            $scope.initLocalesOptionsData();
        }

    }
})();

(function () {

    angular
        .module('admin.mediaFiles')
        .controller('mediaFilesViewModalController', mediaFilesViewModalController);

    mediaFilesViewModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'modalItem'
    ];

    function mediaFilesViewModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        modalItem
    ) {

        $scope.files = modalItem.files;

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

    }
})();

(function() {

    angular
        .module('admin.menu')
        .controller('SuperAdminMenuController', SuperAdminMenuController);

    SuperAdminMenuController.$inject = [
        '$scope',
        '$rootScope',
        'superAdminService',
        '$sce',
        '$uibModal'
    ];

    function SuperAdminMenuController(
        $scope,
        $rootScope,
        superAdminService,
        $sce,
        $uibModal
    ) {

        $scope.superAdminSelect012 = $rootScope.superAdminSelect012;

        $scope.oneLevelMenus = [];

        // 原始的二级数据
        $scope.twoLevelMenus = [];

        // 过滤出来的二级数据
        $scope.twoLevelMenusShow = [];
        $scope.twoLevelMenusShowReload = 1;
        $scope.twoLevelMenusAoData = {
            menuStatus: ''
        };

        $scope.currentSelectMenu = {};

        // 添加一级菜单
        $scope.addOneLevelMenu = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/superAdmin/menu/menu-add-modal.html',
                controller: 'OneLevelMenusModalController',
                resolve: {
                    modalData: function () {
                        return {};
                    },
                    isAdd: true
                }
            });
            modalInstance.result.then(function (data) {
                if (data === 'neededUploadOneLevelMenus') {
                    $scope.initOneLevelMenus();
                }
            }, function (cancel) {

            });
        };

        // 获取二级菜单,初始化列表数据
        /**
         * @param oneLevelMenu 一级菜单对象
         * @return null
         */
        $scope.getSecondLevelMenu = function (oneLevelMenu) {
            if(!$scope.validPower("MANAGEMENU", ["RIGHTGET"])){
                return '';
            }
            $scope.twoLevelMenus = [];
            $scope.currentSelectMenu = angular.copy(oneLevelMenu);
            if ($scope.currentSelectMenu['showSecond'] !== undefined) {
                delete $scope.currentSelectMenu['showSecond'];
            }
            if (oneLevelMenu['showSecond']) {
                oneLevelMenu['showSecond'] = false;
                return;
            }
            console.log(oneLevelMenu, 'oneLevelMenu');
            $scope.oneLevelMenus.forEach(function (oneLevelMenusItem) {
                oneLevelMenusItem['showSecond'] = false;
            });
            if (oneLevelMenu.id) {
                oneLevelMenu['showSecond'] = !oneLevelMenu['showSecond'];
                $scope.twoLevelMenus = [];
                superAdminService.getReq($rootScope.URL.MANAGEMENU.RIGHTGET, { 'parentid': oneLevelMenu.id, 'pageSize': 50, 'curPage': 1 }, {}).then(function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            oneLevelMenu['secondLevelMenus'] = angular.copy(data.data.list);
                            $scope.twoLevelMenus = angular.copy(data.data.list);
                            // $scope.twoLevelMenusShowReload++;
                            $scope.twoLevelMenusAoData = {
                                menuName: '',
                                menuStatus: ''
                            };
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }
        };

        // 保存二级菜单
        /**
         * @param secondLevelMenu 二级菜单对象
         * @param item 输入的对象
         * @return null
         */
        $scope.saveSecondLevelMenu = function (secondLevelMenu, item) {
            console.log(secondLevelMenu, 'secondLevelMenu');
            console.log(item, 'secondLevelMenuItem');
            var tempData = angular.extend({}, secondLevelMenu, item);
            if (!tempData.id) {
                if(!$scope.validPower("MANAGEMENU", ["RIGHTPOST"])){
                    return '';
                }
                delete tempData.id;
                superAdminService.postReq($rootScope.URL.MANAGEMENU.RIGHTPOST, {}, tempData).then(function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.getSecondLevelMenu($scope.currentSelectMenu);
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }else{
                if(!$scope.validPower("MANAGEMENU", ["RIGHTPATCH"])){
                    return '';
                }
                superAdminService.patchReq($rootScope.URL.MANAGEMENU.RIGHTPATCH, {}, tempData).then(function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.getSecondLevelMenu($scope.currentSelectMenu);
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }

            return '';
        };

        // 添加二级菜单
        $scope.addSecondLevelMenu = function () {
            if ($scope.currentSelectMenu.id) {
                $scope.twoLevelMenusAoData = {};
                $scope.twoLevelMenus.unshift({
                    'id': null,
                    'menuName': '',
                    'menuCode': '',
                    'menuType': null,
                    'menuStatus': '1',
                    'menuUrl': '',
                    'menuSortNo': 0,
                    'parentId': $scope.currentSelectMenu.id,
                    'isShowTrEdit': true
                });
            }
        };

        /**
         *
         * @param item 添加的对象
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.twoLevelMenus.splice(index, 1);
            }
        };

        // 删除一级菜单
        /**
         * @param oneLevelMenu 一级菜单对象
         * @param $event 事件对象
         * @return null
         */
        $scope.deleteOneLevelMenu = function (oneLevelMenu, $event) {
            if(!$scope.validPower("MANAGEMENU", ["LEFTDELETE"])){
                return '';
            }
            console.log(oneLevelMenu, 'oneLevelMenu');
            $event.stopPropagation();
            if (oneLevelMenu.id) {
                $rootScope.alertConfirm(function () {
                    superAdminService.deleteReq($rootScope.URL.MANAGEMENU.LEFTDELETE, { 'id': oneLevelMenu.id }, {}).then(function (data) {
                        console.log(data);
                        if (typeof data.success === 'boolean') {
                            if (data.success) {
                                $scope.initOneLevelMenus();
                                $rootScope.toasterSuccess(data.msg);
                            } else {
                                $rootScope.alertErrorMsg(data.msg);
                            }
                        }
                    });
                });
            }
        };

        // 删除二级菜单
        /**
         * @param secondLevelMenu 二级菜单对象
         * @return null
         */
        $scope.deleteSecondLevelMenu = function (secondLevelMenu) {
            if(!$scope.validPower("MANAGEMENU", ["RIGHTDELETE"])){
                return '';
            }
            console.log(secondLevelMenu, 'secondLevelMenu');
            if (secondLevelMenu.id) {
                $rootScope.alertConfirm(function () {
                    superAdminService.deleteReq($rootScope.URL.MANAGEMENU.RIGHTDELETE, { 'id': secondLevelMenu.id }, {}).then(function (data) {
                        console.log(data);
                        if (typeof data.success === 'boolean') {
                            if (data.success) {
                                $scope.getSecondLevelMenu($scope.currentSelectMenu);
                                $rootScope.toasterSuccess(data.msg);
                            } else {
                                $rootScope.alertErrorMsg(data.msg);
                            }
                        }
                    });
                });
            }
        };

        // 初始化一级菜单
        $scope.initOneLevelMenus = function () {
            if(!$scope.validPower("MANAGEMENU", ["LEFTGET"])){
                return '';
            }
            $scope.oneLevelMenus = [];
            superAdminService.getReq($rootScope.URL.MANAGEMENU.LEFTGET, {}, {}).then(function (data) {
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        var tempData = data.data;
                        tempData.forEach(function (oneLevelMenusItem) {
                            oneLevelMenusItem['secondLevelMenus'] = [];
                            oneLevelMenusItem['showSecond'] = false;
                        });
                        $scope.oneLevelMenus = angular.copy(data.data);
                        if ($scope.oneLevelMenus[0]) {
                            $scope.currentSelectMenu = angular.copy($scope.oneLevelMenus[0]);
                            $scope.getSecondLevelMenu($scope.currentSelectMenu);
                        }
                    } else {
                        $rootScope.alertErrorMsg(data.msg);
                    }
                }
            });
        };

        // 编辑一级菜单
        /**
         * @param oneLevelMenu 一级菜单对象
         * @return null
         */
        $scope.editOneLevelMenu = function (oneLevelMenu, $event) {
            console.log(oneLevelMenu, 'editOneLevelMenu');
            $event.stopPropagation();
            if (oneLevelMenu.id) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/superAdmin/menu/menu-add-modal.html',
                    controller: 'OneLevelMenusModalController',
                    resolve: {
                        modalData: function () {
                            return oneLevelMenu;
                        },
                        isAdd: false
                    }
                });
                modalInstance.result.then(function (data) {
                    if (data === 'neededUploadOneLevelMenus') {
                        $scope.initOneLevelMenus();
                    }
                }, function (cancel) {

                });
            }
        };

        // 页面加载执行的函数

        $scope.initOneLevelMenus();
    }
})();

(function() {

    angular
        .module('admin.menu')
        .controller('OneLevelMenusModalController', OneLevelMenusModalController);

    OneLevelMenusModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'modalData',
        'isAdd',
        'superAdminService'
    ];

    function OneLevelMenusModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        modalData,
        isAdd,
        superAdminService
    ) {

        $scope.oneLevelMenusModal = {};

        $scope.isAdd = isAdd;

        $scope.superAdminSelect012 = $rootScope.superAdminSelect012;

        if (isAdd) {
            $scope.oneLevelMenusModal['menuStatus'] = '1';
        } else {
            $scope.oneLevelMenusModal = angular.copy(modalData);
        }

        $scope.confirm = function () {
            if (isAdd) {
                var tempAddOneLevelMenus = {
                    // "id": "1",
                    'menuName': $scope.oneLevelMenusModal.menuName || '',
                    'menuCode': '',
                    'menuType': '',
                    'menuStatus': $scope.oneLevelMenusModal.menuStatus,
                    'menuUrl': '',
                    'menuSortNo': $scope.oneLevelMenusModal.menuSortNo || '',
                    'parentId': 'root',
                };
                superAdminService.postReq($rootScope.URL.MANAGEMENU.LEFTPOST, {}, tempAddOneLevelMenus).then(function (data) {
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.oneLevelMenusModal = {};
                            $rootScope.toasterSuccess(data.msg);
                            $uibModalInstance.close('neededUploadOneLevelMenus');
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            } else {
                var tempUpdateOneLevelMenus = {
                    'id': $scope.oneLevelMenusModal.id,
                    'menuName': $scope.oneLevelMenusModal.menuName || '',
                    'menuCode': $scope.oneLevelMenusModal.menuCode || '',
                    'menuType': $scope.oneLevelMenusModal.menuType,
                    'menuStatus': $scope.oneLevelMenusModal.menuStatus,
                    'menuUrl': $scope.oneLevelMenusModal.menuUrl,
                    'menuSortNo': $scope.oneLevelMenusModal.menuSortNo,
                    'parentId': 'root',
                };
                superAdminService.patchReq($rootScope.URL.MANAGEMENU.LEFTPATCH,{}, tempUpdateOneLevelMenus).then(function (data) {
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.oneLevelMenusModal = {};
                            $rootScope.toasterSuccess(data.msg);
                            $uibModalInstance.close('neededUploadOneLevelMenus');
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

(function() {

    angular
        .module('admin.ordersManage')
        .controller('OrderAddModalController', OrderAddModalController);

    OrderAddModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        'item',
        '$translate'
    ];

    function OrderAddModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        item,
        $translate
    ) {

        $scope.orderAdd = {
            order_no: '',
            trade_no: '',
            amount: '',
            adminId: window.userInfo && window.userInfo.adminId || '',
            adminname: window.userInfo && window.userInfo.username || '',
        };

        $scope.confirmOrderAddModal = function () {
            if(!item.id){
                $rootScope.alertErrorMsg('server data error');
                $uibModalInstance.dismiss('cancel');
                return;
            }
            adminService.postReq($rootScope.URL.ORDERSMANAGE.POST+'/'+item.id, {}, $scope.orderAdd).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $uibModalInstance.close('success');
                        $rootScope.toasterSuccess(res.data.msg);
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.cancelOrderAddModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

    }
})();

(function() {

    angular
        .module('admin.ordersManage')
        .controller('OrderDetailModalController', OrderDetailModalController);

    OrderDetailModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'orderDetail',
        '$translate'
    ];

    function OrderDetailModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        orderDetail,
        $translate
    ) {

        $scope.orderDetail = orderDetail;

        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();

(function() {

    angular
        .module('admin.ordersManage')
        .controller('OrderManageFilterModalController', OrderManageFilterModalController);

    OrderManageFilterModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'filter',
        'adminService',
        '$translate'
    ];

    function OrderManageFilterModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        filter,
        adminService,
        $translate
    ) {

        $scope.search = {
            wallet: [],
            method: []
        };

        $scope.walletOptions = [];

        $scope.initWalletOptionsData = function () {
            $scope.walletOptions = [];
            adminService.getReq($rootScope.URL.WALLETSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.walletOptions.push(tempObj)
                                //if(!objItem.disabled){
                                //    $scope.walletOptions.push(tempObj)
                                //}
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.methodOptions = [];

        $scope.initMethodOptionsData = function () {
            $scope.methodOptions = [];
            adminService.getReq($rootScope.URL.PAYMENTMETHODS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.methodOptions.push(tempObj)
                                //if(!objItem.disabled){
                                //    $scope.methodOptions.push(tempObj)
                                //}
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.ordersManageUrl = $rootScope.URL.ORDERSMANAGE.GET;

        // 原始的数据
        $scope.ordersManage = [];

        $scope.advancedSearch = false;

        // 过滤出来的数据
        $scope.ordersManageReload = 1;
        $scope.ordersManageAoData = {};
        $scope.tempOrdersManageAoData = {};
        $scope.ordersManageAoData.wallet = ''
        $scope.ordersManageAoData.method = ''

        $scope.trigerSearch = function() {
            $scope.tempOrdersManageAoData = Object.assign($scope.tempOrdersManageAoData,$scope.ordersManageAoData);
            $scope.ordersManageReload++;
        };

        $scope.resetSearch = function() {
            $scope.ordersManageAoData = {};
            $scope.ordersManageAoData.wallet = ''
            $scope.ordersManageAoData.method = ''
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            $scope.search = {
                wallet: [],
                method: []
            };
            var tempData = $scope.tempOrdersManageAoData;
            $scope.tempOrdersManageAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.ordersManageReload++;
        };

        $scope.initOrdersManageData = function() {
            $scope.ordersManageReload++
        };

        $scope.showAdvanceSearch = function() {
            $scope.advancedSearch = !$scope.advancedSearch
        };

        //页面加载执行
        $scope.initWalletOptionsData();
        $scope.initMethodOptionsData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.ordersManageAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.ordersManageAoData.start_time) {
                        $scope.ordersManageAoData.start_time = '';
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.ordersManageAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.ordersManageAoData.end_time) {
                        $scope.ordersManageAoData.end_time = '';
                    }
                }
            }
        });

        $scope.$watch('search.wallet.length+search.method.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.ordersManageAoData.wallet = $scope.search.wallet.join(',');
                $scope.ordersManageAoData.method = $scope.search.method.join(',');
            }
        });

        $scope.filter = filter;

        $scope.urlUsername = $scope.filter.username||'';

        if($scope.filter.username){
            delete $scope.filter.username
        }

        $scope.ordersManageAoData  = window.Object.assign($scope.ordersManageAoData, $scope.filter);
        $scope.tempOrdersManageAoData  = window.Object.assign($scope.tempOrdersManageAoData, $scope.filter);

        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();

(function() {

    angular
        .module('admin.ordersManage')
        .controller('OrdersManageController', OrdersManageController);

    OrdersManageController.$inject = [
        '$scope',
        '$uibModal',
        '$rootScope',
        'adminService'
    ];

    function OrdersManageController(
        $scope,
        $uibModal,
        $rootScope,
        adminService
    ) {

        $scope.search = {
            wallet: [],
            method: []
        };

        $scope.walletOptions = [];

        $scope.initWalletOptionsData = function () {
            $scope.walletOptions = [];
            adminService.getReq($rootScope.URL.WALLETSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.walletOptions.push(tempObj)
                                //if(!objItem.disabled){
                                //    $scope.walletOptions.push(tempObj)
                                //}
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.methodOptions = [];

        $scope.initMethodOptionsData = function () {
            $scope.methodOptions = [];
            adminService.getReq($rootScope.URL.PAYMENTMETHODS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.methodOptions.push(tempObj)
                                //if(!objItem.disabled){
                                //    $scope.methodOptions.push(tempObj)
                                //}
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.ordersManageUrl = $rootScope.URL.ORDERSMANAGE.GET;

        // 原始的数据
        $scope.ordersManage = [];

        $scope.advancedSearch = false;

        // 过滤出来的数据
        $scope.ordersManageReload = 1;
        $scope.ordersManageAoData = {};
        $scope.tempOrdersManageAoData = {};
        $scope.ordersManageAoData.wallet = ''
        $scope.ordersManageAoData.method = ''

        $scope.trigerSearch = function() {
            $scope.tempOrdersManageAoData = Object.assign($scope.tempOrdersManageAoData,$scope.ordersManageAoData);
            $scope.ordersManageReload++;
        };

        $scope.resetSearch = function() {
            $scope.ordersManageAoData = {};
            $scope.ordersManageAoData.wallet = ''
            $scope.ordersManageAoData.method = ''
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            $scope.search = {
                wallet: [],
                method: []
            };
            var tempData = $scope.tempOrdersManageAoData;
            $scope.tempOrdersManageAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.ordersManageReload++;
        };

        $scope.initOrdersManageData = function() {
            $scope.ordersManageReload++
        };

        $scope.showAdvanceSearch = function() {
            $scope.advancedSearch = !$scope.advancedSearch
        };


        // 删除ordersManage
        /**
         * @param ordersManage ORDERSMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteOrdersManage = function (ordersManage) {
            if (ordersManage.code) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.ORDERSMANAGE.DELETE+'/'+ordersManage.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initOrdersManageData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        // 添加按钮
        $scope.manualOrdersManage = function (item) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/ordersManage/orderAddModal.html',
                controller: 'OrderAddModalController',
                resolve: {
                    item: item
                },
                size: 'md'
            });
            modalInstance.result.then(function(data) {
                $scope.initOrdersManageData()
            }, function(data) {
            });
        };

        // 详细按钮
        $scope.ordersDetailManage = function (item) {
            if(!item.id){
                $rootScope.alertErrorMsg('server data error');
                return;
            }
            adminService.getReq($rootScope.URL.ORDERSMANAGE.GETDETAIL + '/' + item.id, {}, {}).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    console.log(res.data.data)
                    if (res.data.success) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: '/views/admin/ordersManage/orderDetailModal.html',
                            controller: 'OrderDetailModalController',
                            scope:$scope,
                            resolve: {
                                orderDetail: res.data.data
                            },
                            size: 'lg',
                        });
                        modalInstance.result.then(function(data) {
                        }, function(data) {
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        /**
         *
         * @param item 添加的ORDERSMANAGETITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.ordersManage.splice(index, 1);
            }
        };

        //页面加载执行
        $scope.initWalletOptionsData();
        $scope.initMethodOptionsData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.ordersManageAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.ordersManageAoData.start_time) {
                        $scope.ordersManageAoData.start_time = '';
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.ordersManageAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.ordersManageAoData.end_time) {
                        $scope.ordersManageAoData.end_time = '';
                    }
                }
            }
        });

        $scope.$watch('search.wallet.length+search.method.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.ordersManageAoData.wallet = $scope.search.wallet.join(',');
                $scope.ordersManageAoData.method = $scope.search.method.join(',');
            }
        });

        $scope.urlUsername = '';

        // try {
        //     var urlParams = $scope.getUrlParams();
        //     if(urlParams._username){
        //         $scope.urlUsername = urlParams._username;
        //     }
        //     if(urlParams.user_id){
        //         $scope.tempOrdersManageAoData.user_id = urlParams.user_id;
        //     }
        // }catch (e){
        //     console.error(e)
        // }

    }
})();

(function() {

    angular
        .module('admin.promotionsManage')
        .controller('promotionsEditContentModalController', promotionsEditContentModalController);

    promotionsEditContentModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'modalItem'
    ];

    function promotionsEditContentModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        modalItem
    ) {
        $scope.type = modalItem._type
        if(modalItem._type){
            delete modalItem._type
        }

        $scope.options = {
            height: 400,
            focus: true,
            airMode: !$scope.hasPower||$scope.edit==1,
            toolbar: [
                ['edit',['undo','redo']],
                ['headline', ['style']],
                ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                ['fontface', ['fontname']],
                ['textsize', ['fontsize']],
                ['fontclr', ['color']],
                ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                ['height', ['height']],
                ['table', ['table']],
                ['insert', ['link','picture','video','hr']],
                ['view', ['codeview']],
                ['help', ['help']]
            ]
        };

        // 初始化table数据
        $scope.initModalItemModalData = function () {
            $scope.modalItem = angular.copy(modalItem);
            if(!$scope.modalItem.locale){
                $scope.modalItem.locale = $scope.localesOptions[0].value
            }
        };

        $scope.confirmModalRebatesBrand = function () {
            $uibModalInstance.close({
                type:$scope.type,
                data:$scope.modalItem
            });
        };

        $scope.cancelModalRebatesBrand = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initModalItemModalData();
    }
})();

(function() {

    angular
        .module('admin.promotionsManage')
        .controller('PromotionsManageController', PromotionsManageController);

    PromotionsManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function PromotionsManageController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.search = {
            currency: []
        };

        $scope.statusOptions = [
            {
                label:'publish',
                value:'publish'
            },
            {
                label:'draft',
                value:'draft'
            }
        ];

        $scope.currencyOptions = [];
        $scope.currencySearchOptions = [];

        $scope.initCurrenciesManageData = function () {
            $scope.currencyOptions = [];
            $scope.currencySearchOptions = [];
            adminService.getReq($rootScope.URL.CURRENCIESMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.name||'',
                                    value:objItem.code||''
                                };
                                $scope.currencySearchOptions.push(tempObj);
                                if(objItem.supported){
                                    $scope.currencyOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.brandOptions = [];

        $scope.initBrandOptionsData = function () {
            $scope.brandOptions = [];
            adminService.getReq($rootScope.URL.GAMEBRANDS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.brandOptions.push(tempObj)
                                // if(objItem.supported){
                                //     $scope.brandOptions.push(tempObj)
                                // }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.localesOptions = [];

        $scope.initLocalesOptionsData = function () {
            $scope.localesOptions = [];
            adminService.getReq($rootScope.URL.LOCALELANGUAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.name||'',
                                    value:objItem.code||''
                                };
                                if(objItem.supported){
                                    $scope.localesOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        //“DEPOSIT”,” LIVE”, “LOTTERY”,”REBATE”,”SLOTS”,”SPORTS”
        $scope.categoriesOptions = [
            {
                label:'DEPOSIT',
                value:'DEPOSIT'
            },
            {
                label:'LIVE',
                value:'LIVE'
            },
            {
                label:'LOTTERY',
                value:'LOTTERY'
            },
            {
                label:'REBATE',
                value:'REBATE'
            },
            {
                label:'SLOTS',
                value:'SLOTS'
            },
            {
                label:'SPORTS',
                value:'SPORTS'
            },
        ];

        $scope.promotionsManageUrl = $rootScope.URL.PROMOTIONSMANAGE.GET;

        // 原始的数据
        $scope.promotionsManage = [];
        $scope.promotionsManageReload = 1;
        $scope.promotionsManageAoData = {};
        $scope.tempPromotionsManageAoData = {};

        // 初始化table数据
        $scope.initPromotionsManageData = function () {
            $scope.promotionsManageReload++;
        };

        $scope.trigerSearch = function() {
            $scope.tempPromotionsManageAoData = Object.assign($scope.tempPromotionsManageAoData,$scope.promotionsManageAoData);
            $scope.promotionsManageReload++;
        };

        $scope.resetSearch = function() {
            $scope.promotionsManageAoData = {};
            $scope.search = {
                currency: []
            };
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempPromotionsManageAoData;
            $scope.tempPromotionsManageAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.promotionsManageReload++;
        };


        // 保存
        /**
         *
         * @param promotionsManage 转账数据对象
         */

        $scope.editPromotionsManage = function (promotionsManage,edit) {
            if(!promotionsManage.id){
                $rootScope.alertErrorMsg('server data error');
                return;
            }
            adminService.getReq($rootScope.URL.PROMOTIONSMANAGE.GETDETAIL + '/' + promotionsManage.id, {}, {}).then(function(res) {
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: '/views/admin/promotionsManage/promotionsManageModal.html',
                            controller: 'promotionsModalController',
                            scope: $scope,
                            size: 'lg',
                            resolve: {
                                promotionsItem: res.data.data,
                                edit: edit,
                                hasPower:$scope.hasPower&&edit!==1
                            }
                        });
                        modalInstance.result.then(function(data) {
                            $scope.initPromotionsManageData();
                        }, function(data) {
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        // 添加按钮
        $scope.addPromotionsManage = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/promotionsManage/promotionsManageModal.html',
                controller: 'promotionsModalController',
                scope: $scope,
                size: 'lg',
                resolve: {
                    promotionsItem: false,
                    edit: 2,
                    hasPower:$scope.hasPower
                }
            });
            modalInstance.result.then(function(data) {
                $scope.initPromotionsManageData();
            }, function(data) {
            });
        };

        $scope.hasPower = $scope.validPower("PROMOTIONSMANAGE", ["POST","PATCH"]);

        // 页面加载执行的函数

        $scope.initCurrenciesManageData();

        if($scope.hasPower){

            //$scope.initBrandOptionsData();

            $scope.initLocalesOptionsData()
        }

        $scope.$watch('search.currency.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.promotionsManageAoData.currency = $scope.search.currency.join(',');
            }
        });
    }
})();

(function() {

    angular
        .module('admin.promotionsManage')
        .controller('promotionsModalController', promotionsModalController);

    promotionsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        'promotionsItem',
        'edit',
        '$uibModal',
        'hasPower',
        '$translate'
    ];

    function promotionsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        promotionsItem,
        edit,
        $uibModal,
        hasPower,
        $translate
    ) {

        $scope.hasPower = hasPower;

        $scope.edit = edit;

        if(edit!==2){
            $scope.promotionsItem = angular.copy(promotionsItem)
        }else{
            $scope.promotionsItem = {
                banner: '',
                currency: $scope.currencyOptions[0] && $scope.currencyOptions[0].value || '',
                status: $scope.statusOptions[0] && $scope.statusOptions[0].value || '',
                startTime: '',
                endTime: '',
                categories: [],
                title: [],
                content: [],
            };
        }


        if($scope.promotionsItem.period){
            $scope.promotionsItem.startTime = $scope.promotionsItem.period.from?$scope.formatTime($scope.promotionsItem.period.from):"";
            $scope.promotionsItem.endTime = $scope.promotionsItem.period.to?$scope.formatTime($scope.promotionsItem.period.to):"";
            delete $scope.promotionsItem.period
        }


        $scope.timeStart = $scope.promotionsItem.startTime || '';
        $scope.timeEnd = $scope.promotionsItem.endTime || '';

        /**
         * 点击复选框
         * @param value value值
         * @param $event 点击事件
         */
        $scope.selectCategories = function(value, $event) {
            if($event.target.checked){
                if($scope.promotionsItem.categories.indexOf(value) === -1){
                    $scope.promotionsItem.categories.push(value)
                }
            }else{
                $scope.promotionsItem.categories.splice($scope.promotionsItem.categories.indexOf(value), 1)
            }
        };

        // 过滤出来的数据
        $scope.showTitleModal = [];
        $scope.titleModalReload = 1;
        $scope.titleModalAoData = {};
        $scope.titleModalSearch = '';

        // 初始化table数据
        $scope.initTitleModalData = function () {
            $scope.promotionsItem['title'].forEach(function (titleItem, titleIndex) {
                titleItem.id = titleIndex + 1;
            })
        };


        // 保存
        /**
         *
         * @param titleModal 渠道名称数据对象
         * @param data
         */

        $scope.saveTitleModal = function (titleModal, data) {
            $scope.promotionsItem['title'].forEach(function (titleModalItem) {
                if(titleModalItem.id == titleModal.id){
                    window.Object.assign(titleModalItem, data);
                    if($scope.validIsNew(titleModalItem.id)){
                        titleModalItem.id = window.parseInt(titleModalItem.id, 10)
                        $scope.titleModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param titleModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteTitleModal = function (titleModal, index) {
            $scope.promotionsItem['title'].splice(index, 1)
        };

        // 添加按钮
        $scope.addTitleModal = function () {
            $scope.titleModalAoData = {};
            $scope.titleModalSearch = '';
            $scope.promotionsItem['title'].unshift({
                'id': ($scope.promotionsItem['title'].length+1) + 'null',
                "locale": $scope.localesOptions[0] ? $scope.localesOptions[0].value : '',
                "value": ''
            });
        };

        /**
         *
         * @param titleItem 条件项目
         * @param index 添加的index
         */

        $scope.cancelSaveTitleModal = function (titleItem, index) {
            if ($scope.validIsNew(titleItem.id)) {
                $scope.promotionsItem['title'].splice(index, 1);
            }
        };


        // 过滤出来的数据
        $scope.showContentModal = [];
        $scope.contentModalReload = 1;
        $scope.contentModalAoData = {};
        $scope.contentModalSearch = '';


        // 初始化table数据
        $scope.initContentModalData = function () {
            $scope.promotionsItem['content'].forEach(function (contentItem, contentIndex) {
                contentItem.id = contentIndex + 1;
            })
        };


        // 保存
        /**
         *
         * @param contentModal 处理对象数据对象
         * @param data
         */

        $scope.saveContentModal = function (contentModal, data) {
            $scope.promotionsItem['content'].forEach(function (contentModalItem) {
                if(contentModalItem.id == contentModal.id){
                    window.Object.assign(contentModalItem, data);
                    if($scope.validIsNew(contentModalItem.id)){
                        contentModalItem.id = window.parseInt(contentModalItem.id, 10)
                        $scope.contentModalReload ++
                    }
                }
            });
        };

        // 删除处理对象Modal
        /**
         * @param contentModal 处理对象
         * @param index 位置
         * @return null
         */
        $scope.deleteContentModal = function (contentModal, index) {
            $scope.promotionsItem['content'].splice(index, 1);
            $scope.initContentModalData();
            $scope.contentModalReload ++;
        };

        // 添加按钮
        $scope.addContentModal = function () {
            $scope.contentModalAoData = {};
            $scope.contentModalSearch = '';
            $scope.promotionsItem['content'].unshift({
                'id': ($scope.promotionsItem['content'].length+1) + 'null',
                "locale": $scope.localesOptions[0] ? $scope.localesOptions[0].value : '',
                "value": ''
            });
        };

        /**
         *
         * @param contentItem 处理项目
         * @param index 添加的index
         */

        $scope.cancelSaveContentModal = function (contentItem, index) {
            if ($scope.validIsNew(contentItem.id)) {
                $scope.promotionsItem['content'].splice(index, 1);
            }
        };

        //$scope.confirmModal = function () {
        //    console.log($scope.promotionsItem,6666)
        //    return;
        //    var tempData = angular.copy($scope.promotionsItem);
        //    tempData['title'] = tempData['title'].filter(function (item) {
        //        return !$scope.validIsNew(item.id);
        //    });
        //    if(window.Array.isArray(tempData['title'])){
        //        tempData['title'].forEach(function(titleItem) {
        //            if(titleItem.id){
        //                delete titleItem.id;
        //            }
        //        })
        //    }
        //    tempData['content'] = tempData['content'].filter(function (item) {
        //        return !$scope.validIsNew(item.id);
        //    });
        //    if(window.Array.isArray(tempData['content'])){
        //        tempData['content'].forEach(function(contentItem) {
        //            if(contentItem.id){
        //                delete contentItem.id;
        //            }
        //        })
        //    }
        //    if (!edit) {
        //        adminService.postReq($rootScope.URL.COUPONSMANAGE.POST, {}, tempData).then(function (res) {
        //            console.log(res);
        //            if (typeof res.data.success === 'boolean') {
        //                if (res.data.success) {
        //                    $uibModalInstance.close('success');
        //                    $rootScope.toasterSuccess(res.data.msg);
        //                } else {
        //                    $rootScope.alertErrorMsg(res.data.msg);
        //                }
        //            }
        //        });
        //    } else if (edit) {
        //        adminService.patchReq($rootScope.URL.COUPONSMANAGE.PATCH+'/'+promotionsItem.code, {}, tempData).then(function (res) {
        //            console.log(res);
        //            if (typeof res.data.success === 'boolean') {
        //                if (res.data.success) {
        //                    $uibModalInstance.close('success');
        //                    $rootScope.toasterSuccess(res.data.msg);
        //                } else {
        //                    $rootScope.alertErrorMsg(res.data.msg);
        //                }
        //            }
        //        });
        //    }
        //};

        $scope.showEditHtmlContentModal = function (modalItem,type) {
            var tempData = angular.copy(modalItem);
            tempData._type = type;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/promotionsManage/promotionsEditContentModal.html',
                controller: 'promotionsEditContentModalController',
                size: 'lg',
                windowClass: 'full-screen-modal-window',
                scope:$scope,
                resolve: {
                    modalItem: tempData
                }
            });
            modalInstance.result.then(function (data) {
                if(['title','content'].indexOf(data.type)){
                    if(data.type == 'content'){
                        console.log(data)
                        if(data.data.id){
                            $scope.promotionsItem[data.type].forEach(function(item,index) {
                                if (item.id == data.data.id) {
                                    $scope.promotionsItem[data.type].splice(index,1,angular.copy(data.data))
                                }
                            });
                        }else{
                            $scope.promotionsItem[data.type].unshift(angular.copy(data.data))
                            $scope.initContentModalData();
                        }
                        $scope.contentModalReload ++;
                    }
                    $scope.titleModalReload ++;
                }
            }, function (data) {

            });
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showChooseFileModal  = function(name){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/mediaFiles/mediaFilesChooseName.html',
                controller: 'mediaFilesChooseNameModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    filter:{
                        category:'promotion',
                        name:name||'',
                        status:'finished'
                    }
                }
            });
            modalInstance.result.then(function(data) {
                $scope.promotionsItem.banner = data;
                modalInstance = null;
            }, function(data) {
                modalInstance = null;
            });
        };

        $scope.confirmModal = function () {
            if($scope.promotionsItem.title.length == 0){
                $rootScope.alertErrorMsg('title is required');
                return '';
            }
            if($scope.promotionsItem.content.length == 0){
                $rootScope.alertErrorMsg('content is required');
                return '';
            }
            if($scope.promotionsItem.title && $scope.promotionsItem.title.length){
                var tempObj1 = {};
                var sameKey1 = false;
                $scope.promotionsItem.title.map(function(nameItem) {
                    if(tempObj1[nameItem.locale]){
                        sameKey1 = true
                    }
                    tempObj1[nameItem.locale] = nameItem.value
                });
                if(sameKey1){
                    $rootScope.alertErrorMsg('you set same local in title table, just remove one');
                    return '';
                }
            }
            if($scope.promotionsItem.content && $scope.promotionsItem.content.length){
                var tempObj2 = {};
                var sameKey2 = false;
                $scope.promotionsItem.content.map(function(nameItem) {
                    if(tempObj2[nameItem.locale]){
                        sameKey2 = true
                    }
                    tempObj2[nameItem.locale] = nameItem.value
                });
                if(sameKey2){
                    $rootScope.alertErrorMsg('you set same local in content table, just remove one');
                    return '';
                }
            }
            var tempData = angular.copy($scope.promotionsItem);

            //处理title
            tempData['title'] = tempData['title'].filter(function (item) {
                return !$scope.validIsNew(item.id);
            });
            if(window.Array.isArray(tempData['title'])){
                tempData['title'].forEach(function(titleItem) {
                    if(titleItem.id){
                        delete titleItem.id;
                    }
                })
            }
            if(tempData.title && tempData.title.length){
                var tempNameObj1 = {};
                tempData.title.map(function(nameItem) {
                    tempNameObj1[nameItem.locale] = nameItem.value
                });
                tempData.title = angular.copy(tempNameObj1)
            }

            //处理content
            tempData['content'] = tempData['content'].filter(function (item) {
                return !$scope.validIsNew(item.id);
            });
            if(window.Array.isArray(tempData['content'])){
                tempData['content'].forEach(function(contentItem) {
                    if(contentItem.id){
                        delete contentItem.id;
                    }
                })
            }
            if(tempData.content && tempData.content.length){
                var tempNameObj2 = {};
                tempData.content.map(function(nameItem) {
                    tempNameObj2[nameItem.locale] = nameItem.value
                });
                tempData.content = angular.copy(tempNameObj2)
            }
            if (edit==2) {
                adminService.postReq($rootScope.URL.PROMOTIONSMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('success');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (edit==3) {
                adminService.patchReq($rootScope.URL.PROMOTIONSMANAGE.PATCH+'/'+promotionsItem.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('success');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initTitleModalData();

        $scope.initContentModalData();

        $scope.$watch('timeStart+timeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.timeStart) {
                    $scope.promotionsItem.startTime = $scope.timeStart.format && $scope.timeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    $scope.promotionsItem.startTime = '';
                }
                if ($scope.timeEnd) {
                    $scope.promotionsItem.endTime = $scope.timeEnd.format && $scope.timeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    $scope.promotionsItem.endTime = '';
                }
            }
        });

    }
})();

(function() {

    angular
        .module('admin.paymentMethods')
        .controller('PaymentMethodsController', PaymentMethodsController);

    PaymentMethodsController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function PaymentMethodsController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.localesOptions = [];

        $scope.initLocalesOptionsData = function () {
            $scope.localesOptions = [];
            adminService.getReq($rootScope.URL.LOCALELANGUAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.name||'',
                                    value:objItem.code||''
                                };
                                if(objItem.supported){
                                    $scope.localesOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.currencyOptions = [];

        $scope.initCurrenciesManageData = function () {
            $scope.currencyOptions = [];
            adminService.getReq($rootScope.URL.CURRENCIESMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.name||'',
                                    value:objItem.code||''
                                };
                                if(objItem.supported){
                                    $scope.currencyOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.typeOptions = [
            {
                label:'pc',
                value:'pc'
            },
            {
                label:'mobile',
                value:'mobile'
            },
            {
                label:'both',
                value:'both'
            }
        ];

        $scope.disabledOptions = [
            {
                label:'YES',
                value:'1'
            },
            {
                label:'No',
                value:'0'
            }
        ];

        $scope.showEditMethodsNameModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/paymentMethods/paymentMethodsNameModal.html',
                controller: 'PaymentMethodsNameModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit:edit,
                    modalItem: item,
                    hasPower: $scope.validPower('PAYMENTMETHODS', ['POST', 'PATCH']) && edit!==1
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initPaymentMethodsData();
            }, function (data) {

            });
        };

        $scope.showEditMethodsDetail = function (item) {
            adminService.getReq($rootScope.URL.PAYMENTMETHODS.GETDETAIL + '/' + item.code, {}, {}).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: '/views/admin/paymentMethods/paymentMethodsNameModal.html',
                            controller: 'PaymentMethodsNameModalController',
                            size: 'lg',
                            scope:$scope,
                            resolve: {
                                edit:1,
                                modalItem: res.data.data,
                                hasPower: false
                            }
                        });
                        modalInstance.result.then(function (data) {
                            $scope.initPaymentMethodsData();
                        }, function (data) {

                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        // 原始的数据
        $scope.paymentMethods = [];

        // 过滤出来的数据
        $scope.showPaymentMethods = [];
        $scope.paymentMethodsReload = 1;
        $scope.paymentMethodsAoData = {};
        $scope.paymentMethodsSearch = '';

        // 初始化table数据
        $scope.initPaymentMethodsData = function () {
            //$scope.paymentMethods = [];
            adminService.getReq($rootScope.URL.PAYMENTMETHODS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.paymentMethods = angular.copy(res.data.data);
                        $scope.paymentMethods.forEach(function (paymentMethodsItem, paymentMethodsIndex) {
                            paymentMethodsItem.min = paymentMethodsItem['range'] && paymentMethodsItem['range'].min || '';
                            paymentMethodsItem.max = paymentMethodsItem['range'] && paymentMethodsItem['range'].max || '';
                            paymentMethodsItem.disabled = paymentMethodsItem.disabled ? '1' : '0';
                        });
                        $scope.paymentMethodsReload++;
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        // 删除paymentMethods
        /**
         * @param paymentMethods PAYMENTMETHODSTITLE数据对象
         * @return null
         */
        $scope.deletePaymentMethods = function (paymentMethods) {
            if (!$scope.validIsNew(paymentMethods.id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.PAYMENTMETHODS.DELETE+'/'+paymentMethods.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initPaymentMethodsData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        // 恢复paymentMethods
        /**
         * @param paymentMethods PAYMENTMETHODSTITLE数据对象
         * @return null
         */
        $scope.recoverPaymentMethods = function (paymentMethods) {
            if (!$scope.validIsNew(paymentMethods.id)) {
                $rootScope.alertConfirm(function () {
                    adminService.putReq($rootScope.URL.PAYMENTMETHODS.PUT+'/'+paymentMethods.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initPaymentMethodsData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                }, 'recover');
            }
        };


        $scope.checkPaymentMethodsMinMax = function(data) {
            var temp = parseFloat(data);
            if(!data || temp<0.01 || temp>100000){
                return false;
            }
            return true;
        };

        // 页面加载执行的函数

        $scope.initPaymentMethodsData();

        if($scope.validPower('PAYMENTMETHODS', ['POST', 'PATCH'])){

            $scope.initCurrenciesManageData();

            $scope.initLocalesOptionsData();
        }
    }
})();

(function() {

    angular
        .module('admin.paymentMethods')
        .controller('PaymentMethodsNameModalController', PaymentMethodsNameModalController);

    PaymentMethodsNameModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'hasPower',
        'edit',
        'modalItem'
    ];

    function PaymentMethodsNameModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        hasPower,
        edit,
        modalItem
    ) {

        $scope.hasPower = hasPower;

        $scope.edit = edit;

        $scope.modalItem = angular.copy(modalItem);

        // 原始的数据
        $scope.methodsNameModal = [];

        // 过滤出来的数据
        $scope.showMethodsNameModal = [];
        $scope.methodsNameModalReload = 1;
        $scope.methodsNameModalAoData = {};
        $scope.methodsNameModalSearch = '';

        // 初始化table数据
        $scope.initMethodsNameModalData = function () {
            if(edit == 2){
                $scope.modalItem = {
                    "code": "",
                    "currency": $scope.currencyOptions[0].value,
                    "min": '',
                    "max": '',
                    "disabled": $scope.disabledOptions[1].value,
                    "type": $scope.typeOptions[0].value,
                    "name": []
                }
            }else{
                if($scope.modalItem['name']&&$scope.modalItem['name'].length){
                    $scope.methodsNameModal = $scope.modalItem['name'];
                    $scope.methodsNameModal.forEach(function (methodsNameItem, methodsNameIndex) {
                        methodsNameItem.id = methodsNameIndex + 1;
                    })
                }
            }
        };


        // 保存
        /**
         *
         * @param methodsNameModal 渠道名称数据对象
         * @param data
         */

        $scope.saveMethodsNameModal = function (methodsNameModal, data) {
            $scope.methodsNameModal.forEach(function (methodsNameModalItem) {
                if(methodsNameModalItem.id == methodsNameModal.id){
                    window.Object.assign(methodsNameModalItem, data);
                    if($scope.validIsNew(methodsNameModalItem.id)){
                        methodsNameModalItem.id = window.parseInt(methodsNameModalItem.id, 10)
                        $scope.methodsNameModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param methodsNameModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteMethodsNameModal = function (methodsNameModal, index) {
            $scope.methodsNameModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addMethodsNameModal = function () {
            $scope.methodsNameModalAoData = {};
            $scope.methodsNameModalSearch = '';
            $scope.methodsNameModal.unshift({
                'id': ($scope.methodsNameModal.length+1) + 'null',
                "locale": $scope.localesOptions[0] ? $scope.localesOptions[0].value : '',
                "value": ''
            });
        };

        /**
         *
         * @param modalItem 添加的渠道名称
         * @param index 添加的index
         */

        $scope.cancelSaveModal = function (item, index) {
            if ($scope.validIsNew(item.id)) {
                $scope.methodsNameModal.splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            if(window.parseFloat($scope.modalItem.min||'')>window.parseFloat($scope.modalItem.max||'')){
                $rootScope.alertErrorMsg('min should less than max');
                return '';
            }
            if($scope.methodsNameModal && $scope.methodsNameModal.length){
                var tempObj = {};
                var sameKey = false;
                $scope.methodsNameModal.map(function(nameItem) {
                    if(tempObj[nameItem.locale]){
                        sameKey = true
                    }
                    tempObj[nameItem.locale] = nameItem.value
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same local,just remove one');
                    return '';
                }
            }
            $scope.methodsNameModal = $scope.methodsNameModal.filter(function (methodsNameItem) {
                return !$scope.validIsNew(methodsNameItem.id);
            });
            $scope.methodsNameModal.forEach(function (methodsNameItem, methodsNameIndex) {
                if(methodsNameItem.id){
                    delete methodsNameItem.id;
                }
            });
            var tempData = angular.copy($scope.modalItem);
            if($scope.methodsNameModal && $scope.methodsNameModal.length){
                var tempObj = {};
                var sameKey = false;
                $scope.methodsNameModal.map(function(nameItem) {
                    if(tempObj[nameItem.locale]){
                        sameKey = true
                    }
                    tempObj[nameItem.locale] = nameItem.value
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same local,just remove one');
                    return '';
                }
                tempData.name = angular.copy(tempObj)
            }else{
                tempData.name = {}
            }
            if(edit ==2){
                adminService.postReq($rootScope.URL.PAYMENTMETHODS.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }else if(edit == 3){
                adminService.patchReq($rootScope.URL.PAYMENTMETHODS.PATCH+'/'+tempData.code, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss({});
        };

        // 页面加载执行的函数

        $scope.initMethodsNameModalData();

    }
})();

(function() {

    angular
        .module('admin.pspsManage')
        .controller('PspsManageController', PspsManageController);

    PspsManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function PspsManageController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.activatedOptions = [
            {
                label:'Yes',
                value:true
            },
            {
                label:'No',
                value:false
            }
        ];

        $scope.methodsOptions = [];

        $scope.initMethodsOptions = function() {
            $scope.methodsOptions = [];
            adminService.getReq($rootScope.URL.PAYMENTMETHODS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.paymentMethods = angular.copy(res.data.data);
                        $scope.paymentMethods.forEach(function (paymentMethodsItem, paymentMethodsIndex) {
                            if(!paymentMethodsItem.disabled){
                                var temp = {};
                                temp.label = $scope.showArrayName(paymentMethodsItem.name);
                                temp.value = paymentMethodsItem.code;
                                if(!$scope.checkIsDelete(paymentMethodsItem)){
                                    $scope.methodsOptions.push(temp)
                                }
                            }
                        });
                        console.log($scope.paymentMethods)
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        // 原始的数据
        $scope.pspsManage = [];

        // 过滤出来的数据
        $scope.showPspsManage = [];
        $scope.pspsManageReload = 1;
        $scope.pspsManageAoData = {};
        $scope.pspsManageSearch = '';

        // 初始化table数据
        $scope.initPspsManageData = function () {
            //$scope.pspsManage = [];
            adminService.getReq($rootScope.URL.PSPSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.pspsManage = angular.copy(res.data.data);
                        $scope.pspsManage.forEach(function (pspsManageItem, pspsManageIndex) {
                            pspsManageItem.id = pspsManageIndex +1;
                        });
                        $scope.pspsManageReload++;
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        /**
         * 展示methods弹窗
         * @param item
         */

        $scope.showPspsMethodsModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/pspsManage/pspsMethodsModal.html',
                controller: 'pspsMethodsModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit: edit,
                    modalItem: item,
                    hasPower:$scope.hasPower&&edit!==1
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initPspsManageData();
            }, function (data) {
            });
        };


        // 删除pspsManage
        /**
         * @param pspsManage PSPSMANAGETITLE数据对象
         * @return null
         */
        $scope.deletePspsManage = function (pspsManage) {
            if (!$scope.validIsNew(pspsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.PSPSMANAGE.DELETE+'/'+pspsManage.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initPspsManageData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        // 恢复pspsManage
        /**
         * @param pspsManage PSPSMANAGETITLE数据对象
         * @return null
         */
        $scope.recoverPspsManage = function (pspsManage) {
            if (!$scope.validIsNew(pspsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.putReq($rootScope.URL.PSPSMANAGE.DELETE+'/'+pspsManage.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initPspsManageData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        $scope.hasPower = $scope.validPower("PSPSMANAGE", ["PATCH", "POST"])

        // 页面加载执行的函数

        $scope.initPspsManageData();

        if($scope.hasPower){

            $scope.initMethodsOptions()

        }
    }
})();

(function() {

    angular
        .module('admin.pspsManage')
        .controller('pspsMethodsModalController', pspsMethodsModalController);

    pspsMethodsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'hasPower',
        'edit',
        'modalItem'
    ];

    function pspsMethodsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        hasPower,
        edit,
        modalItem
    ) {

        $scope.hasPower = hasPower;
        $scope.edit = edit;
        $scope.modalItem = modalItem;

        // 原始的数据
        $scope.pspsMethodsModal = [];

        // 过滤出来的数据
        $scope.showPspsMethodsModal = [];
        $scope.pspsMethodsModalReload = 1;
        $scope.pspsMethodsModalAoData = {};
        $scope.pspsMethodsModalSearch = '';

        // 初始化table数据
        $scope.initPspsMethodsModalData = function () {
            $scope.pspsMethodsModal = [];
            if(edit==2){
                $scope.modalItem = {
                    code: '',
                    gateway: '',
                    account: '',
                    api_key: '',
                    activated: $scope.activatedOptions[0].value,
                    methods: []
                }
            }else{
                if(modalItem['methods'].length){
                    $scope.pspsMethodsModal = modalItem['methods'];
                    $scope.pspsMethodsModal.forEach(function (pspsMethodsItem, pspsMethodsIndex) {
                        pspsMethodsItem.id = pspsMethodsIndex + 1;
                        if(pspsMethodsItem['extra_setting'] && pspsMethodsItem['extra_setting']['bank'] && window.Array.isArray(pspsMethodsItem['extra_setting']['bank'])){
                            pspsMethodsItem['extra_setting']['bank'] = pspsMethodsItem['extra_setting']['bank'].join(',')
                        }else{
                            pspsMethodsItem['extra_setting'] = {};
                            pspsMethodsItem['extra_setting']['bank'] = '';
                        }
                    })
                }
            }
        };


        // 保存
        /**
         *
         * @param pspsMethodsModal 渠道名称数据对象
         * @param data
         */

        $scope.savePspsMethodsModal = function (pspsMethodsModal, data) {
            $scope.pspsMethodsModal.forEach(function (pspsMethodsModalItem) {
                if(pspsMethodsModalItem.id == pspsMethodsModal.id){
                    pspsMethodsModalItem['code'] = data.code || '';
                    pspsMethodsModalItem['rate'] = data.rate || '';
                    pspsMethodsModalItem['extra_setting'] = {};
                    pspsMethodsModalItem['extra_setting']['bank'] = data['extra_setting.bank'] || '';
                    if($scope.validIsNew(pspsMethodsModalItem.id)){
                        pspsMethodsModalItem.id = window.parseInt(pspsMethodsModalItem.id, 10)
                        $scope.pspsMethodsModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param pspsMethodsModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deletePspsMethodsModal = function (pspsMethodsModal, index) {
            $scope.pspsMethodsModal.splice(index, 1)
        };

        console.log($scope.methodsOptions)

        // 添加按钮
        $scope.addPspsMethodsModal = function () {
            $scope.pspsMethodsModalAoData = {};
            $scope.pspsMethodsModalSearch = '';
            $scope.pspsMethodsModal.unshift({
                'id': ($scope.pspsMethodsModal.length+1) + 'null',
                "code": $scope.methodsOptions[0] ? $scope.methodsOptions[0].value : '',
                "rate": '',
                "extra_setting": {
                    "bank":''
                }
            });
        };

        /**
         *
         * @param modalItem 添加的渠道名称
         * @param index 添加的index
         */

        $scope.cancelSaveModal = function (modalItem, index) {
            if ($scope.validIsNew(modalItem.id)) {
                $scope.pspsMethodsModal.splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            var tempPspsMethod = angular.copy($scope.pspsMethodsModal);
            tempPspsMethod = tempPspsMethod.filter(function (pspsMethodsItem) {
                return !$scope.validIsNew(pspsMethodsItem.id);
            });
            tempPspsMethod.forEach(function (pspsMethodsItem, pspsMethodsIndex) {
                if(pspsMethodsItem.id){
                    delete pspsMethodsItem.id;
                }
                if(pspsMethodsItem['extra_setting'] && pspsMethodsItem['extra_setting']['bank']){
                    pspsMethodsItem['extra_setting']['bank'] = pspsMethodsItem['extra_setting']['bank'].split(',');
                    if(pspsMethodsItem['extra_setting']['bank'].length === 0){
                        delete pspsMethodsItem['extra_setting'];
                    }
                }
            });
            var tempData = angular.copy($scope.modalItem);
            tempData.methods = tempPspsMethod;
            if(edit==2){
                adminService.postReq($rootScope.URL.PSPSMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }else if(edit==3){
                adminService.patchReq($rootScope.URL.PSPSMANAGE.PATCH+'/'+tempData.code, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initPspsMethodsModalData();

    }
})();

(function() {

    angular
        .module('admin.rebatesList')
        .controller('RebatesListController', RebatesListController);

    RebatesListController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function RebatesListController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.rebatesListUrl = $rootScope.URL.REBATESLIST.GET;

        // 原始的数据
        $scope.rebatesListReload = 1;
        $scope.rebatesListAoData = {};
        $scope.tempRebatesListAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempRebatesListAoData = Object.assign($scope.tempRebatesListAoData,$scope.rebatesListAoData);
            $scope.rebatesListReload++;
        };

        $scope.resetSearch = function() {
            $scope.rebatesListAoData = {};
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempRebatesListAoData;
            $scope.tempRebatesListAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.rebatesListReload++;
        };

        // 初始化table数据
        $scope.initRebatesListData = function () {
            $scope.rebatesListReload++;
        };

        // 详细按钮
        $scope.showRebatesDetail = function (item) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/rebatesList/rebatesDetailModal.html',
                controller: 'RebatesDetailModalController',
                scope:$scope,
                resolve: {
                    rebatesDetail: item
                },
                size: 'lg',
            });
            modalInstance.result.then(function(data) {
            }, function(data) {
            });
        };


        // 页面加载执行的函数

        $scope.initRebatesListData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.rebatesListAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.rebatesListAoData.start_time) {
                        $scope.rebatesListAoData.start_time = '';
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.rebatesListAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.rebatesListAoData.end_time) {
                        $scope.rebatesListAoData.end_time = '';
                    }
                }
            }
        });

        $scope.urlUsername = '';

        // try {
        //     var urlParams = $scope.getUrlParams();
        //     if(urlParams._username){
        //         $scope.urlUsername = urlParams._username;
        //     }
        //     if(urlParams.user_id){
        //         $scope.tempRebatesListAoData.user_id = urlParams.user_id;
        //     }
        // }catch (e){
        //     console.error(e)
        // }
    }
})();

(function() {

    angular
        .module('admin.rebatesList')
        .controller('RebatesDetailModalController', RebatesDetailModalController);

    RebatesDetailModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'rebatesDetail',
        '$translate'
    ];

    function RebatesDetailModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        rebatesDetail,
        $translate
    ) {

        $scope.rebatesDetail = rebatesDetail;

        $scope.showDetailModal = [];
        $scope.detailModalAoData = {};
        $scope.detailModalSearch = '';
        $scope.detailModalReload = 1;

        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();

(function() {

    angular
        .module('admin.rebatesList')
        .controller('RebatesListFilterModalController', RebatesListFilterModalController);

    RebatesListFilterModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'filter',
        'adminService',
        '$translate'
    ];

    function RebatesListFilterModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        filter,
        adminService,
        $translate
    ) {

        $scope.rebatesListUrl = $rootScope.URL.REBATESLIST.GET;

        // 原始的数据
        $scope.rebatesListReload = 1;
        $scope.rebatesListAoData = {};
        $scope.tempRebatesListAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempRebatesListAoData = Object.assign($scope.tempRebatesListAoData,$scope.rebatesListAoData);
            $scope.rebatesListReload++;
        };

        $scope.resetSearch = function() {
            $scope.rebatesListAoData = {};
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempRebatesListAoData;
            $scope.tempRebatesListAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.rebatesListReload++;
        };

        // 初始化table数据
        $scope.initRebatesListData = function () {
            $scope.rebatesListReload++;
        };

        // // 详细按钮
        // $scope.showRebatesDetail = function (item) {
        //     var modalInstance = $uibModal.open({
        //         animation: true,
        //         ariaLabelledBy: 'modal-title',
        //         ariaDescribedBy: 'modal-body',
        //         templateUrl: '/views/admin/rebatesList/rebatesDetailModal.html',
        //         controller: 'RebatesDetailModalController',
        //         scope:$scope,
        //         resolve: {
        //             rebatesDetail: item
        //         },
        //         size: 'lg',
        //     });
        //     modalInstance.result.then(function(data) {
        //     }, function(data) {
        //     });
        // };


        // 页面加载执行的函数

        $scope.initRebatesListData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.rebatesListAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.rebatesListAoData.start_time) {
                        $scope.rebatesListAoData.start_time = '';
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.rebatesListAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.rebatesListAoData.end_time) {
                        $scope.rebatesListAoData.end_time = '';
                    }
                }
            }
        });

        $scope.filter = filter;

        $scope.urlUsername = $scope.filter.username||'';

        if($scope.filter.username){
            delete $scope.filter.username
        }

        $scope.rebatesListAoData = window.Object.assign($scope.rebatesListAoData,$scope.filter)
        $scope.tempRebatesListAoData = window.Object.assign($scope.tempRebatesListAoData,$scope.filter)

        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();

(function() {

    angular
        .module('admin.reliefsList')
        .controller('ReliefsListController', ReliefsListController);

    ReliefsListController.$inject = [
        '$scope',
        '$uibModal',
        '$rootScope',
        'adminService'
    ];

    function ReliefsListController(
        $scope,
        $uibModal,
        $rootScope,
        adminService
    ) {

        $scope.reliefsListUrl = $rootScope.URL.RELIEFSLIST.GET;

        // 原始的数据
        $scope.reliefsList = [];
        $scope.reliefsListReload = 1;
        $scope.reliefsListAoData = {};
        $scope.tempReliefsListAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempReliefsListAoData = Object.assign($scope.tempReliefsListAoData,$scope.reliefsListAoData);
            $scope.reliefsListReload++;
        };

        $scope.resetSearch = function() {
            $scope.reliefsListAoData = {};
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempReliefsListAoData;
            $scope.tempReliefsListAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.reliefsListReload++;
        };

        // 初始化table数据
        $scope.initReliefsListData = function () {
            $scope.reliefsListReload++;
        };

        // 页面加载执行的函数

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.reliefsListAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.reliefsListAoData.start_time) {
                        $scope.reliefsListAoData.start_time = '';
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.reliefsListAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.reliefsListAoData.end_time) {
                        $scope.reliefsListAoData.end_time = '';
                    }
                }
            }
        });
    }
})();

(function() {

    angular
        .module('admin.role')
        .controller('SuperAdminRoleController', SuperAdminRoleController);

    SuperAdminRoleController.$inject = [
        '$scope',
        '$rootScope',
        'superAdminService'
    ];

    function SuperAdminRoleController(
        $scope,
        $rootScope,
        superAdminService
    ) {

        $scope.superAdminSelect012 = $rootScope.superAdminSelect012;

        // 原始的二级数据
        $scope.roles = [];

        // 过滤出来的二级数据
        $scope.showRoles = [];
        $scope.rolesReload = 1;
        $scope.rolesAoData = {};

        // 初始化table数据
        $scope.initRolesData = function () {
            if(!$scope.validPower("MANAGEROLE", ["GET"])){
                return '';
            }
            superAdminService.getReq($rootScope.URL.MANAGEROLE.GET,{ 'pageSize': 50, 'curPage': 1 }, {}).then(function (data) {
                console.log(data);
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        $scope.showRoles = [];
                        $scope.roles = angular.copy(data.data.list);
                        $scope.rolesReload++;
                    } else {
                        $rootScope.alertErrorMsg(data.msg);
                    }
                }
            });
        };


        // 保存角色
        /**
         * @param role 角色对象
         * @param item 输入的内容
         * @return null
         */
        $scope.saveRole = function (role, item) {
            var tempData = angular.extend({}, role, item);
            if (!tempData.id) {
                if(!$scope.validPower("MANAGEROLE", ["POST"])){
                    return '';
                }
                delete tempData.id;
                superAdminService.postReq($rootScope.URL.MANAGEROLE.POST, {}, tempData).then(function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.initRolesData();
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            } else if (tempData.id) {
                if(!$scope.validPower("MANAGEROLE", ["PATCH"])){
                    return '';
                }
                superAdminService.patchReq($rootScope.URL.MANAGEROLE.PATCH, {}, tempData).then(function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.initRolesData();
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除role
        /**
         * @param role 角色数据对象
         * @return null
         */
        $scope.deleteRole = function (role) {
            if(!$scope.validPower("MANAGEROLE", ["DELETE"])){
                return '';
            }
            if (role.id) {
                $rootScope.alertConfirm(function () {
                    superAdminService.deleteReq($rootScope.URL.MANAGEROLE.DELETE, { id: role.id }, {}).then(function (data) {
                        if (typeof data.success === 'boolean') {
                            if (data.success) {
                                $scope.initRolesData();
                                $rootScope.toasterSuccess(data.msg);
                            } else {
                                $rootScope.alertErrorMsg(data.msg);
                            }
                        }
                    });
                });
            }
        };

        // 添加按钮
        $scope.addRoles = function () {
            $scope.rolesAoData = {};
            $scope.roles.unshift({
                'id': null,
                'roleName': '',
                'roleType': '',
                'roleStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的对象
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.roles.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initRolesData();
    }
})();

(function() {

    angular
        .module('admin.role')
        .controller('SuperAdminRoleRelationController', SuperAdminRoleRelationController);

    SuperAdminRoleRelationController.$inject = [
        '$scope',
        '$rootScope',
        'superAdminService'
    ];

    function SuperAdminRoleRelationController(
        $scope,
        $rootScope,
        superAdminService
    ) {

        $scope.roles = [];
        $scope.oneLevelMenus = [];
        $scope.buttons = [];

        $scope.currentRole = {};
        $scope.currentOneLevelMenu = {};
        $scope.currentSecondLevelMenu = {};

        // 获取角色关系
        /**
         * @param role 角色对象
         * @param isClick 是否是click动作
         * @return null
         */
        $scope.getRoleRelationById = function (role, isClick) {
            $scope.currentRole = angular.copy(role);
            if (role.id) {
                if(!$scope.validPower("MANAGEROLEMENU", ["MIDGET"])){
                    return '';
                }
                superAdminService.getReq($rootScope.URL.MANAGEROLEMENU.MIDGET, { 'roleId': role.id }, {}).then(function (data) {
                    console.log(data, 'getRoleRelationById');
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            var allMenus = angular.copy(data.data);
                            $scope.oneLevelMenus = allMenus.filter(function (allMenusItem) {
                                return allMenusItem.parentId == 'root';
                            });
                            $scope.oneLevelMenus = angular.copy($scope.oneLevelMenus);
                            $scope.oneLevelMenus.forEach(function (oneLevelMenusItem) {
                                oneLevelMenusItem.showSecond = false;
                                oneLevelMenusItem.secondLevelMenus = angular.copy(allMenus.filter(function (allMenusItem) {
                                    return allMenusItem.parentId == oneLevelMenusItem.id;
                                }));
                            });
                            console.log($scope.oneLevelMenus, '$scope.oneLevelMenus');
                            // if (isClick) {
                            //     $scope.buttons = [];
                            //     $scope.currentSecondLevelMenu = {};
                            // } else {
                            //     if (!$scope.currentSecondLevelMenu.id) {
                            //         for (var i = 0, j = $scope.oneLevelMenus.length; i < j; i++) {
                            //             if ($scope.oneLevelMenus[i]['secondLevelMenus'][0]) {
                            //                 $scope.oneLevelMenus[i]['showSecond'] = true;
                            //                 $scope.currentSecondLevelMenu = angular.copy($scope.oneLevelMenus[i]['secondLevelMenus'][0]);
                            //                 $scope.getSecondLevelButtons($scope.currentSecondLevelMenu);
                            //                 break;
                            //             }
                            //         }
                            //     }
                            // }
                            for (var i = 0, j = $scope.oneLevelMenus.length; i < j; i++) {
                                if ($scope.oneLevelMenus[i]['secondLevelMenus'][0]) {
                                    $scope.oneLevelMenus[i]['showSecond'] = true;
                                    $scope.currentSecondLevelMenu = angular.copy($scope.oneLevelMenus[i]['secondLevelMenus'][0]);
                                    $scope.getSecondLevelButtons($scope.currentSecondLevelMenu);
                                    break;
                                }
                            }
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }
        };

        // 初始化role数据
        $scope.initRolesData = function () {
            if(!$scope.validPower("MANAGEROLEMENU", ["LEFTGET"])){
                return '';
            }
            superAdminService.getReq($rootScope.URL.MANAGEROLEMENU.LEFTGET, { 'pageSize': 50, 'curPage': 1 }, {}).then(function (data) {
                console.log(data, 'initRolesData');
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        $scope.roles = angular.copy(data.data);
                        if ($scope.roles[0]) {
                            $scope.currentRole = angular.copy($scope.roles[0]);
                            $scope.getRoleRelationById($scope.currentRole, false);
                        }
                    } else {
                        $rootScope.alertErrorMsg(data.msg);
                    }
                }
            });
        };

        // 获取buttons
        /**
         * @param secondLevelMenu 二级菜单对象
         * @return null
         */
        $scope.getSecondLevelButtons = function (secondLevelMenu, $event) {
            if ($event) {
                $event.stopPropagation();
            }
            if (!$scope.currentRole.id) {
                $rootScope.alertErrorMsg('select role first!');
                return;
            }
            $scope.currentSecondLevelMenu = angular.copy(secondLevelMenu);
            if (secondLevelMenu.id) {
                $scope.buttons = [];
                if(!$scope.validPower("MANAGEROLEMENU", ["RIGHTGET"])){
                    return '';
                }
                superAdminService.getReq($rootScope.URL.MANAGEROLEMENU.RIGHTGET, {
                    'roleId': $scope.currentRole.id,
                    'menuId': secondLevelMenu.id
                }, {}).then(function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.buttons = angular.copy(data.data);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }
        };

        // 点击修改button状态
        /**
         * @param button 按钮对象
         * @return null
         */
        $scope.handelClickButton = function (button, $event) {
            $event.preventDefault();
            if (!$scope.currentRole.id || !$scope.currentSecondLevelMenu.id) {
                $rootScope.alertErrorMsg('select role and menu first!');
                return;
            }
            if (button.id) {
                console.log(button, 'button');
                if (button.checked) {
                    if(!$scope.validPower("MANAGEROLEMENU", ["RIGHTPOST"])){
                        return '';
                    }
                    superAdminService.postReq($rootScope.URL.MANAGEROLEMENU.RIGHTPOST, {}, {
                        'roleId': $scope.currentRole.id,
                        'btnId': button.id,
                        'menuId': $scope.currentSecondLevelMenu.id
                    }).then(function (data) {
                        console.log(data);
                        if (typeof data.success === 'boolean') {
                            if (data.success) {
                                $scope.getRoleRelationById($scope.currentRole, false);
                                $scope.getSecondLevelButtons($scope.currentSecondLevelMenu);
                                $rootScope.toasterSuccess(data.msg);
                            } else {
                                $rootScope.alertErrorMsg(data.msg);
                            }
                        }
                    });
                } else {
                    if(!$scope.validPower("MANAGEROLEMENU", ["RIGHTDELETE"])){
                        return '';
                    }
                    superAdminService.deleteReq($rootScope.URL.MANAGEROLEMENU.RIGHTDELETE, {
                        'roleId': $scope.currentRole.id,
                        'btnId': button.id,
                        'menuId': $scope.currentSecondLevelMenu.id
                    }, {}).then(function (data) {
                        console.log(data);
                        if (typeof data.success === 'boolean') {
                            if (data.success) {
                                $scope.getRoleRelationById($scope.currentRole, false);
                                $scope.getSecondLevelButtons($scope.currentSecondLevelMenu);
                                $rootScope.toasterSuccess(data.msg);
                            } else {
                                $rootScope.alertErrorMsg(data.msg);
                            }
                        }
                    });
                }
            }
        };


        // 页面加载执行的函数

        $scope.initRolesData();
    }
})();

(function() {

    angular
        .module('admin.transactionsDetail')
        .controller('TransactionsDetailController', TransactionsDetailController);

    TransactionsDetailController.$inject = [
        '$scope',
        '$uibModal',
        '$rootScope',
        '$translate',
        '$sce',
        'adminService'
    ];

    function TransactionsDetailController(
        $scope,
        $uibModal,
        $rootScope,
        $translate,
        $sce,
        adminService
    ) {

        $scope.serviceOptions = [
            {
                label:'all',
                value:''
            },
            {
                label:'deposit',
                value:'deposit'
            },
            {
                label:'withdraw',
                value:'withdraw'
            },
            {
                label:'transfer',
                value:'transfer'
            },
            {
                label:'coupon',
                value:'coupon'
            },
            {
                label:'relief',
                value:'relief'
            },
            {
                label:'rebate',
                value:'rebate'
            },
            {
                label:'bigwin',
                value:'bigwin'
            },
        ];

        $scope.showDescriptionDetail = function (data) {
            var tempStr = '';
            if (typeof data == 'object') {
                window.Object.keys(data).map(function (item) {
                    if(typeof data[item] == 'string'){
                        tempStr = tempStr + '<span style="width: 180px;text-align: left">'+$translate.instant(item)+'</span>'  + ':' + data[item] + '</br>'
                    }
                })
            }
            return tempStr;
        };

        $scope.walletOptions = [];

        $scope.initWalletOptionsData = function () {
            $scope.walletOptions = [];
            adminService.getReq($rootScope.URL.WALLETSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                if(!objItem.disabled){
                                    $scope.walletOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.timezone = '+00:00';

        $scope.transactionsDetail = [];
        $scope.transactionsDetailReload = 1;
        $scope.tempTransactionsDetailAoData = {
            user_id: '',
            affiliate_id: '',
            service_id: '',
            min_amount: '',
            max_amount: '',
            wallet_code: '',
            timezone: "+00:00"
        };
        $scope.transactionsDetailAoData = {
            user_id: '',
            affiliate_id: '',
            service_id: '',
            min_amount: '',
            max_amount: '',
            wallet_code: '',
            timezone: "+00:00"
        };

        $scope.trigerSearch = function() {
            if(/[+-]\d{2}:\d{2}$/.test($scope.transactionsDetailAoData.timezone)){
            }else{
                $rootScope.alertErrorMsg('Formatting error,The right example +00:00');
                return;
            }
            $scope.tempTransactionsDetailAoData = Object.assign($scope.tempTransactionsDetailAoData,$scope.transactionsDetailAoData);
            $scope.transactionsDetailReload++;
        };

        $scope.resetSearch = function() {
            $scope.transactionsDetailAoData = {
                user_id: '',
                affiliate_id: '',
                service_id: '',
                min_amount: '',
                max_amount: '',
                wallet_code: '',
                timezone: "+00:00"
            };
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempTransactionsDetailAoData;
            $scope.tempTransactionsDetailAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize,
                user_id: '',
                affiliate_id: '',
                service_id: '',
                min_amount: '',
                max_amount: '',
                wallet_code: '',
                timezone: "+00:00"
            };
            $scope.transactionsDetailReload++;
        };

        $scope.advancedSearch = false;

        /**
         * 高级搜索控制
         */
        $scope.switchAdvancedSearch = function () {
            $scope.advancedSearch = !$scope.advancedSearch;
        };

        $scope.transactionsUrl = $rootScope.URL.TRANSACTIONSDETAIL.GET;

        //页面加载运行的函数

        $scope.initWalletOptionsData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.transactionsDetailAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.transactionsDetailAoData.start_time) {
                        $scope.transactionsDetailAoData.start_time = '';
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.transactionsDetailAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.transactionsDetailAoData.end_time) {
                        $scope.transactionsDetailAoData.end_time = '';
                    }
                }
            }
        });

        $scope.urlUsername = '';


        // try {
        //     var urlParams = $scope.getUrlParams();
        //     if(urlParams._username){
        //         $scope.urlUsername = urlParams._username;
        //     }
        //     if(urlParams.user_id){
        //         $scope.tempTransactionsDetailAoData.user_id = urlParams.user_id;
        //     }
        // }catch (e){
        //     console.error(e)
        // }


    }
})();

(function() {

    angular
        .module('admin.transactionsDetail')
        .controller('TransactionsDetailFilterController', TransactionsDetailFilterController);

    TransactionsDetailFilterController.$inject = [
        '$scope',
        '$uibModalInstance',
        '$rootScope',
        'filter',
        '$translate',
        'adminService'
    ];

    function TransactionsDetailFilterController(
        $scope,
        $uibModalInstance,
        $rootScope,
        filter,
        $translate,
        adminService
    ) {

        $scope.serviceOptions = [
            {
                label:'all',
                value:''
            },
            {
                label:'deposit',
                value:'deposit'
            },
            {
                label:'withdraw',
                value:'withdraw'
            },
            {
                label:'transfer',
                value:'transfer'
            },
            {
                label:'coupon',
                value:'coupon'
            },
            {
                label:'relief',
                value:'relief'
            },
            {
                label:'rebate',
                value:'rebate'
            },
            {
                label:'bigwin',
                value:'bigwin'
            },
        ];

        $scope.showDescriptionDetail = function (data) {
            var tempStr = '';
            if (typeof data == 'object') {
                window.Object.keys(data).map(function (item) {
                    if(typeof data[item] == 'string'){
                        tempStr = tempStr + '<span style="width: 180px;text-align: left">'+$translate.instant(item)+'</span>'  + ':' + data[item] + '</br>'
                    }
                })
            }
            return tempStr;
        };

        $scope.walletOptions = [];

        $scope.initWalletOptionsData = function () {
            $scope.walletOptions = [];
            adminService.getReq($rootScope.URL.WALLETSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                if(!objItem.disabled){
                                    $scope.walletOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.timezone = '+00:00';

        $scope.transactionsDetail = [];
        $scope.transactionsDetailReload = 1;
        $scope.tempTransactionsDetailAoData = {
            user_id: '',
            affiliate_id: '',
            service_id: '',
            min_amount: '',
            max_amount: '',
            wallet_code: '',
            timezone: "+00:00"
        };
        $scope.transactionsDetailAoData = {
            user_id: '',
            affiliate_id: '',
            service_id: '',
            min_amount: '',
            max_amount: '',
            wallet_code: '',
            timezone: "+00:00"
        };

        $scope.trigerSearch = function() {
            if(/[+-]\d{2}:\d{2}$/.test($scope.transactionsDetailAoData.timezone)){
            }else{
                $rootScope.alertErrorMsg('Formatting error,The right example +00:00');
                return;
            }
            $scope.tempTransactionsDetailAoData = Object.assign($scope.tempTransactionsDetailAoData,$scope.transactionsDetailAoData);
            $scope.transactionsDetailReload++;
        };

        $scope.resetSearch = function() {
            $scope.transactionsDetailAoData = {
                user_id: '',
                affiliate_id: '',
                service_id: '',
                min_amount: '',
                max_amount: '',
                wallet_code: '',
                timezone: "+00:00"
            };
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempTransactionsDetailAoData;
            $scope.tempTransactionsDetailAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize,
                user_id: '',
                affiliate_id: '',
                service_id: '',
                min_amount: '',
                max_amount: '',
                wallet_code: '',
                timezone: "+00:00"
            };
            $scope.transactionsDetailReload++;
        };

        $scope.advancedSearch = false;

        /**
         * 高级搜索控制
         */
        $scope.switchAdvancedSearch = function () {
            $scope.advancedSearch = !$scope.advancedSearch;
        };

        $scope.transactionsUrl = $rootScope.URL.TRANSACTIONSDETAIL.GET;

        //页面加载运行的函数

        $scope.initWalletOptionsData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.transactionsDetailAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.transactionsDetailAoData.start_time) {
                        $scope.transactionsDetailAoData.start_time = '';
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.transactionsDetailAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.transactionsDetailAoData.end_time) {
                        $scope.transactionsDetailAoData.end_time = '';
                    }
                }
            }
        });

        $scope.filter = filter;

        $scope.urlUsername = $scope.filter.username||'';

        if($scope.filter.username){
            delete $scope.filter.username
        }

        $scope.transactionsDetailAoData = window.Object.assign($scope.transactionsDetailAoData, $scope.filter);
        $scope.tempTransactionsDetailAoData = window.Object.assign($scope.tempTransactionsDetailAoData, $scope.filter);

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        //页面加载运行的函数

    }
})();

(function() {

    angular
        .module('admin.transfersList')
        .controller('TransfersListController', TransfersListController);

    TransfersListController.$inject = [
        '$scope',
        '$uibModal',
        '$rootScope',
        'adminService'
    ];

    function TransfersListController(
        $scope,
        $uibModal,
        $rootScope,
        adminService
    ) {

        $scope.search = {
            sourceWallet: [],
            result: [],
            destinationWallet: []
        };

        $scope.transfersListUrl = $rootScope.URL.TRANSFERSLIST.GET;

        // 原始的数据
        $scope.transfersList = [];
        $scope.transfersListReload = 1;
        $scope.transfersListAoData = {};
        $scope.tempTransfersListAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempTransfersListAoData = Object.assign($scope.tempTransfersListAoData,$scope.transfersListAoData);
            $scope.transfersListReload++;
        };

        $scope.resetSearch = function() {
            $scope.transfersListAoData = {};
            $scope.search = {
                sourceWallet: [],
                result: [],
                destinationWallet: []
            };
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempTransfersListAoData;
            $scope.tempTransfersListAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.transfersListReload++;
        };

        // 初始化table数据
        $scope.initTransfersListData = function () {
            $scope.transfersListReload++;
        };

        $scope.walletOptions = [];

        $scope.initWalletOptionsData = function () {
            $scope.walletOptions = [];
            adminService.getReq($rootScope.URL.WALLETSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                if(!objItem.disabled){
                                    $scope.walletOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.resultOptions = [
            {
                label:'succeed',
                value:'succeed'
            },
            {
                label:'failed',
                value:'failed'
            },
            {
                label:'processing',
                value:'processing'
            },
        ];

        // 页面加载执行的函数

        $scope.initWalletOptionsData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.transfersListAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.transfersListAoData.start_time) {
                        $scope.transfersListAoData.start_time = '';
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.transfersListAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.transfersListAoData.end_time) {
                        $scope.transfersListAoData.end_time = '';
                    }
                }
            }
        });

        $scope.$watch('search.sourceWallet.length+search.destinationWallet.length+search.result.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.transfersListAoData.source_wallet = $scope.search.sourceWallet.join(',')
                $scope.transfersListAoData.destination_wallet = $scope.search.destinationWallet.join(',')
                $scope.transfersListAoData.result = $scope.search.result.join(',')
            }
        });

        $scope.urlUsername = '';

        // try {
        //     var urlParams = $scope.getUrlParams();
        //     if(urlParams._username){
        //         $scope.urlUsername = urlParams._username;
        //     }
        //     if(urlParams.user_id){
        //         $scope.tempTransfersListAoData.user_id = urlParams.user_id;
        //     }
        // }catch (e){
        //     console.error(e)
        // }
    }
})();

(function() {

    angular
        .module('admin.transfersList')
        .controller('TransfersListFilterModalController', TransfersListFilterModalController);

    TransfersListFilterModalController.$inject = [
        '$scope',
        '$uibModalInstance',
        '$rootScope',
        'filter',
        'adminService'
    ];

    function TransfersListFilterModalController(
        $scope,
        $uibModalInstance,
        $rootScope,
        filter,
        adminService
    ) {

        $scope.search = {
            sourceWallet: [],
            result: [],
            destinationWallet: []
        };

        $scope.transfersListUrl = $rootScope.URL.TRANSFERSLIST.GET;

        // 原始的数据
        $scope.transfersList = [];
        $scope.transfersListReload = 1;
        $scope.transfersListAoData = {};
        $scope.tempTransfersListAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempTransfersListAoData = Object.assign($scope.tempTransfersListAoData,$scope.transfersListAoData);
            $scope.transfersListReload++;
        };

        $scope.resetSearch = function() {
            $scope.transfersListAoData = {};
            $scope.search = {
                sourceWallet: [],
                result: [],
                destinationWallet: []
            };
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempTransfersListAoData;
            $scope.tempTransfersListAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.transfersListReload++;
        };

        // 初始化table数据
        $scope.initTransfersListData = function () {
            $scope.transfersListReload++;
        };

        $scope.walletOptions = [];

        $scope.initWalletOptionsData = function () {
            $scope.walletOptions = [];
            adminService.getReq($rootScope.URL.WALLETSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                if(!objItem.disabled){
                                    $scope.walletOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.resultOptions = [
            {
                label:'succeed',
                value:'succeed'
            },
            {
                label:'failed',
                value:'failed'
            },
            {
                label:'processing',
                value:'processing'
            },
        ];

        // 页面加载执行的函数

        $scope.initWalletOptionsData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.transfersListAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.transfersListAoData.start_time) {
                        $scope.transfersListAoData.start_time = '';
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.transfersListAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.transfersListAoData.end_time) {
                        $scope.transfersListAoData.end_time = '';
                    }
                }
            }
        });

        $scope.$watch('search.sourceWallet.length+search.destinationWallet.length+search.result.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.transfersListAoData.source_wallet = $scope.search.sourceWallet.join(',')
                $scope.transfersListAoData.destination_wallet = $scope.search.destinationWallet.join(',')
                $scope.transfersListAoData.result = $scope.search.result.join(',')
            }
        });

        $scope.filter = filter;

        $scope.urlUsername = $scope.filter.username||'';

        if($scope.filter.username){
            delete $scope.filter.username
        }

        $scope.transfersListAoData = window.Object.assign($scope.transfersListAoData, $scope.filter)

        $scope.tempTransfersListAoData = window.Object.assign($scope.tempTransfersListAoData, $scope.filter)

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

(function() {

    angular
        .module('admin.userLevel')
        .controller('UserLevelConditionsModalController', UserLevelConditionsModalController);

    UserLevelConditionsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'item'
    ];

    function UserLevelConditionsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        item
    ) {

        $scope.confirmModal = function () {
            $scope.conditionsModal = $scope.conditionsModal.filter(function (conditionsItem) {
                return !$scope.validIsNew(conditionsItem.id);
            });
            $scope.conditionsModal.forEach(function (conditionsItem, conditionsIndex) {
                if(conditionsItem.id){
                    delete conditionsItem.id;
                }
            });
            baseConditions['conditions'] = $scope.conditionsModal;
            $uibModalInstance.close({
                type:'conditions',
                data:baseConditions
            });
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss({
                type:'conditions',
                data:baseConditions
            });
        };

        // 页面加载执行的函数

        $scope.initConditionsModalData();
    }
})();

(function() {

    angular
        .module('admin.userLevel')
        .controller('UserLevelRebatesBrandsModalController', UserLevelRebatesBrandsModalController);

    UserLevelRebatesBrandsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'RebatesBrandsItem'
    ];

    function UserLevelRebatesBrandsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        RebatesBrandsItem
    ) {

        // 原始的数据
        $scope.rebatesBrandsModal = [];

        // 过滤出来的数据
        $scope.showRebatesBrandsModal = [];
        $scope.rebatesBrandsModalReload = 1;
        $scope.rebatesBrandsModalAoData = {};
        $scope.rebatesBrandsModalSearch = '';

        $scope.checkRebatesBrandsRate = function(data) {
            var temp = window.parseFloat(data);
            if(!data || temp<0.0001 || temp>0.99){
                return '0.0001-0.99';
            }
            return true;
        }

        var baseRebatesBrands = angular.copy(RebatesBrandsItem);

        // 初始化table数据
        $scope.initRebatesBrandsModalData = function () {
            $scope.rebatesBrandsModal = [];
            console.log(RebatesBrandsItem,'RebatesBrandsItem')
            if(RebatesBrandsItem['brands'].length){
                $scope.rebatesBrandsModal = RebatesBrandsItem['brands'];
                $scope.rebatesBrandsModal.forEach(function (rebatesBrandsItem, rebatesBrandsIndex) {
                    rebatesBrandsItem.id = rebatesBrandsIndex + 1;
                })
            }
        };


        // 保存
        /**
         *
         * @param rebatesBrandsModal 用户等级数据对象
         * @param data
         */

        $scope.saveRebatesBrandsModal = function (rebatesBrandsModal, data) {
            $scope.rebatesBrandsModal.forEach(function (rebatesBrandsModalItem) {
                if(rebatesBrandsModalItem.id == rebatesBrandsModal.id){
                    window.Object.assign(rebatesBrandsModalItem, data);
                    if($scope.validIsNew(rebatesBrandsModalItem.id)){
                        rebatesBrandsModalItem.id = window.parseInt(rebatesBrandsModalItem.id, 10)
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param rebatesBrandsModal 用户等级数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteRebatesBrandsModal = function (rebatesBrandsModal, index) {
            $scope.rebatesBrandsModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addRebatesBrandsModal = function () {
            $scope.rebatesBrandsModalAoData = {};
            $scope.rebatesBrandsModalSearch = '';
            $scope.rebatesBrandsModal.unshift({
                'id': ($scope.rebatesBrandsModal.length+1) + 'null',
                "brand": $scope.brandOptions[0]&&$scope.brandOptions[0].value || '',
                "rate": ''
            });
        };

        /**
         *
         * @param RebatesBrandsItem 添加的用户等级
         * @param index 添加的index
         */

        $scope.cancelSave = function (RebatesBrandsItem, index) {
            if ($scope.validIsNew(RebatesBrandsItem.id)) {
                $scope.rebatesBrandsModal.splice(index, 1);
            }
        };

        $scope.confirmModalRebatesBrand = function () {
            $scope.rebatesBrandsModal = $scope.rebatesBrandsModal.filter(function (rebatesBrandsItem) {
                return !$scope.validIsNew(rebatesBrandsItem.id);
            });
            $scope.rebatesBrandsModal.forEach(function (rebatesBrandsItem, rebatesBrandsIndex) {
                if(rebatesBrandsItem.id){
                    delete rebatesBrandsItem.id;
                }
            });
            baseRebatesBrands['brands'] = $scope.rebatesBrandsModal;
            console.log($scope.rebatesBrandsModal,'$scope.rebatesBrandsModal')
            $uibModalInstance.close({
                type:'brands',
                data:baseRebatesBrands
            });
        };

        $scope.cancelModalRebatesBrand = function () {
            $uibModalInstance.dismiss({
                type:'brands',
                data:baseRebatesBrands
            });
        };

        // 页面加载执行的函数

        $scope.initRebatesBrandsModalData();
    }
})();

(function() {

    angular
        .module('admin.userLevel')
        .controller('UserLevelRebatesModalController', UserLevelRebatesModalController);

    UserLevelRebatesModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$uibModal',
        '$translate',
        'item'
    ];

    function UserLevelRebatesModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $uibModal,
        $translate,
        item
    ) {

        // 原始的数据
        $scope.rebatesModal = [];



        $scope.confirmModal = function () {
            $scope.rebatesModal = $scope.rebatesModal.filter(function (rebatesItem) {
                return !$scope.validIsNew(rebatesItem.id);
            });
            $scope.rebatesModal.forEach(function (rebatesItem, rebatesIndex) {
                if(rebatesItem.id){
                    delete rebatesItem.id;
                }
            });
            baseRebates['rebates'] = $scope.rebatesModal;
            $uibModalInstance.close({
                type:'rebates',
                data:baseRebates
            });
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss({
                type:'rebates',
                data:baseRebates
            });
        };
        // 页面加载执行的函数

        $scope.initRebatesModalData();
    }
})();

(function() {

    angular
        .module('admin.userLevel')
        .controller('UserLevelTreatmentsModalController', UserLevelTreatmentsModalController);

    UserLevelTreatmentsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'item'
    ];

    function UserLevelTreatmentsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        item
    ) {

        $scope.confirmModal = function () {
            $scope.treatmentsModal = $scope.treatmentsModal.filter(function (treatmentsItem) {
                return !$scope.validIsNew(treatmentsItem.id);
            });
            $scope.treatmentsModal.forEach(function (treatmentsItem, treatmentsIndex) {
                if(treatmentsItem.id){
                    delete treatmentsItem.id;
                }
            });
            baseTreatments['treatments'] = $scope.treatmentsModal
            $uibModalInstance.close({
                type:'treatments',
                data: baseTreatments
            });
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss({
                type:'treatments',
                data: baseTreatments
            });
        };

        // 页面加载执行的函数

        $scope.initTreatmentsModalData();
    }
})();

(function() {

    angular
        .module('admin.userLevel')
        .controller('UserLevelController', UserLevelController);

    UserLevelController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function UserLevelController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.designationOptions = [
            {
                label: 'deposit',
                value: 'deposit'
            },
            {
                label: 'bets',
                value: 'bets'
            }
        ];

        $scope.comparisonOptions = [
            {
                label: 'eq',
                value: 'eq'
            },
            {
                label: 'gt',
                value: 'gt'
            },
            {
                label: 'gte',
                value: 'gte'
            },
            {
                label: 'lt',
                value: 'lt'
            },
            {
                label: 'lte',
                value: 'lte'
            }
        ];

        $scope.typeOptions = [
            {
                label: 'grading',
                value: 'grading'
            },
            {
                label: 'upgrading',
                value: 'upgrading'
            }
        ];

        $scope.logicalityOptions = [
            {
                label: 'AND',
                value: 'AND'
            },
            {
                label: 'OR',
                value: 'OR'
            }
        ];

        $scope.designationOptions = [
            {
                label: 'member-card',
                value: 'member-card'
            },
            {
                label: 'upgrading-bonus',
                value: 'upgrading-bonus'
            },
            {
                label: 'monthly-free-bets',
                value: 'monthly-free-bets'
            },
            {
                label: 'weekly-deposit-bonus',
                value: 'weekly-deposit-bonus'
            },
            {
                label: 'birthday-bonus',
                value: 'birthday-bonus'
            },
            {
                label: 'birthday-party',
                value: 'birthday-party'
            },
            {
                label: 'cs',
                value: 'cs'
            },
            {
                label: 'daily-withdraw-limit',
                value: 'daily-withdraw-limit'
            },
            {
                label: 'big-prize-bonus',
                value: 'big-prize-bonus'
            },
            {
                label: 'holiday-gift',
                value: 'holiday-gift'
            },
            {
                label: 'quarterly-travel-benefit',
                value: 'quarterly-travel-benefit'
            }
        ];

        $scope.typeOptions = [
            {
                label: 'boolean',
                value: 'boolean'
            },
            {
                label: 'amount',
                value: 'amount'
            },
            {
                label: 'coupon',
                value: 'coupon'
            },
            {
                label: 'string',
                value: 'string'
            }
        ];

        $scope.defaultOptions = [
            {
                label:'YES',
                value:'1'
            },
            {
                label:'NO',
                value:'0'
            }
        ];

        $scope.productOptions = [];

        $scope.initProductManageData = function () {
            $scope.productOptions = [];
            adminService.getReq($rootScope.URL.GAMESPRODUCTS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                if(objItem.disabled == false){
                                    $scope.productOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.currencyOptions = [];

        $scope.initCurrenciesManageData = function () {
            $scope.currencyOptions = [];
            adminService.getReq($rootScope.URL.CURRENCIESMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.name||'',
                                    value:objItem.code||''
                                };
                                if(objItem.supported){
                                    $scope.currencyOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.brandOptions = [];

        $scope.initBrandOptionsData = function () {
            $scope.brandOptions = [];
            adminService.getReq($rootScope.URL.GAMEBRANDS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.brandOptions.push(tempObj)
                                // if(objItem.supported){
                                //     $scope.brandOptions.push(tempObj)
                                // }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        // 原始的数据
        $scope.userLevel = [];

        // 过滤出来的数据
        $scope.showUserLevel = [];
        $scope.userLevelReload = 1;
        $scope.userLevelAoData = {};
        $scope.userLevelSearch = '';

        // 判断是否是一个新添加的
        $scope.validIsNew = function (str) {
            if (str && str.toString().indexOf('null') !== -1) {
                return true;
            }
            return false;
        };

        /**
         * 格式化userLevel数据
         * @param userLevelItem 数组中的每一项
         */
        $scope.formatUserLevelData = function (userLevelItem) {
            var conditions = [];
            var treatments = [];
            var rebates = [];
            if(userLevelItem['conditions']){
                window.Object.keys(userLevelItem['conditions']).map(function (key) {
                    window.Object.keys(userLevelItem['conditions'][key]).map(function (keyItem) {
                        conditions = conditions.concat(userLevelItem['conditions'][key][keyItem])
                    })
                })
            }
            if(userLevelItem['treatments']){
                window.Object.keys(userLevelItem['treatments']).map(function (key) {
                    treatments = treatments.concat(userLevelItem['treatments'][key])
                })
            }
            if(userLevelItem['rebates']){
                window.Object.keys(userLevelItem['rebates']).map(function (key) {
                    userLevelItem['rebates'][key].map(function (keyItem) {
                        var tempObj = {};
                        tempObj.product = keyItem['product'];
                        tempObj.max = keyItem['max'];
                        tempObj.days = keyItem['days'];
                        tempObj.currency = key;
                        if (window.Array.isArray(keyItem['brands'])) {
                            tempObj.brands = angular.copy(keyItem['brands']);
                        } else {
                            tempObj.brands = [];
                        }
                        tempObj.brands.forEach(function (brandsItem) {
                            if(brandsItem.currency){
                                delete brandsItem.currency
                            }
                        });
                        rebates.push(tempObj)
                    })
                })
            }
            return {
                conditions:conditions,
                treatments:treatments,
                rebates:rebates
            };
        };

        // 初始化table数据
        $scope.initUserLevelData = function () {
            //$scope.userLevel = [];
            adminService.getReq($rootScope.URL.USERLEVEL.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.userLevel = angular.copy(res.data.data);
                        $scope.userLevel.forEach(function (userLevelItem, userLevelIndex) {
                            userLevelItem.id = userLevelIndex +1;
                            userLevelItem.default = userLevelItem.isDefault ? '1' : '0'
                            window.Object.assign(userLevelItem, $scope.formatUserLevelData(userLevelItem))
                        });
                        $scope.userLevelReload++;
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.showUserLevelModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/userLevel/userLevelModal.html',
                controller: 'UserLevelModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    modalItem: item,
                    edit: edit,
                    hasPower: $scope.hasPower&&edit!==1,
                }
            });
            modalInstance.result.then(function(data) {
                $scope.initUserLevelData();
                modalInstance = null;
            }, function(data) {
                modalInstance = null;
            });
        };


        // 保存
        /**
         *
         * @param userLevel 用户等级数据对象
         * @param item
         */

        $scope.saveUserLevel = function (userLevel, item) {
            var tempData = angular.extend({}, userLevel, item);
            if ($scope.validIsNew(tempData.id)) {
                delete tempData.id;
                if(tempData.default){
                    delete tempData.default;
                }
                adminService.postReq($rootScope.URL.USERLEVEL.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initUserLevelData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData.id) && tempData.code) {
                adminService.patchReq($rootScope.URL.USERLEVEL.PATCH + '/' + tempData.code,{}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initUserLevelData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除userLevel
        /**
         * @param userLevel 用户等级数据对象
         * @return null
         */
        $scope.deleteUserLevel = function (userLevel) {
            if (!$scope.validIsNew(userLevel.id) && userLevel.code) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.USERLEVEL.DELETE + '/' + userLevel.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initUserLevelData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        $scope.hasPower = $scope.validPower("USERLEVEL", ["PATCH", "POST"]);


        // 页面加载执行的函数

        $scope.initUserLevelData();

        if($scope.hasPower){
            $scope.initCurrenciesManageData();
            $scope.initProductManageData();
            $scope.initBrandOptionsData();
        }
    }
})();

(function() {

    angular
        .module('admin.userLevel')
        .controller('UserLevelModalController', UserLevelModalController);

    UserLevelModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'edit',
        '$uibModal',
        'hasPower',
        'modalItem'
    ];

    function UserLevelModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        edit,
        $uibModal,
        hasPower,
        modalItem
    ) {

        $scope.hasPower = hasPower;

        $scope.edit = edit;

        $scope.modalItem = angular.copy(modalItem);

        $scope.conditionsModal = [];
        $scope.treatmentsModal = [];
        $scope.rebatesModal = [];

        //初始化数据

        $scope.initGameBrandModalData = function () {
            if(edit == 2){
                $scope.modalItem = {
                    'code': '',
                    'default': '0',
                    'level': '',
                    'conditions': [],
                    'treatments': [],
                    'rebates': []
                }
            }
            if(typeof $scope.modalItem.default !== 'undefined'){
                delete $scope.modalItem.default;
            }
            if(modalItem['conditions']&&modalItem['conditions'].length){
                $scope.conditionsModal = modalItem['conditions'];
                $scope.conditionsModal.forEach(function (conditionsItem, conditionsIndex) {
                    conditionsItem.id = conditionsIndex + 1;
                })
            }else{
                $scope.conditionsModal = [];
            }
            if(modalItem['treatments']&&modalItem['treatments'].length){
                $scope.treatmentsModal = modalItem['treatments'];
                $scope.treatmentsModal.forEach(function (treatmentsItem, treatmentsIndex) {
                    treatmentsItem.id = treatmentsIndex + 1;
                })
            }else{
                $scope.treatmentsModal = [];
            }
            if(modalItem['rebates']&&modalItem['rebates'].length){
                $scope.rebatesModal = modalItem['rebates'];
                $scope.rebatesModal.forEach(function (rebatesItem, rebatesIndex) {
                    rebatesItem.id = rebatesIndex + 1;
                })
            }else{
                $scope.rebatesModal = [];
            }

        };

        //条件开始

        // 过滤出来的数据
        $scope.showConditionsModal = [];
        $scope.conditionsModalReload = 1;
        $scope.conditionsModalAoData = {};
        $scope.conditionsModalSearch = '';

        // 保存
        /**
         *
         * @param conditionsModal 用户等级数据对象
         * @param data
         */

        $scope.saveConditionsModal = function (conditionsModal, data) {
            $scope.conditionsModal.forEach(function (conditionsModalItem) {
                if(conditionsModalItem.id == conditionsModal.id){
                    window.Object.assign(conditionsModalItem, data);
                    if($scope.validIsNew(conditionsModalItem.id)){
                        conditionsModalItem.id = window.parseInt(conditionsModalItem.id, 10)
                    }
                }
            });
        };

        // 删除conditionsModal
        /**
         * @param conditionsModal 用户等级数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteConditionsModal = function (conditionsModal, index) {
            $scope.conditionsModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addConditionsModal = function () {
            $scope.conditionsModalAoData = {};
            $scope.conditionsModalSearch = '';
            $scope.conditionsModal.unshift({
                'id': ($scope.conditionsModal.length+1) + 'null',
                "currency": $scope.currencyOptions[0].value,
                "designation": $scope.designationOptions[0].value,
                "comparison": $scope.comparisonOptions[0].value,
                "value":'',
                "type": $scope.typeOptions[0].value,
                "logicality": $scope.logicalityOptions[0].value
            });
        };

        /**
         *
         * @param item 添加的用户等级
         * @param index 添加的index
         */

        $scope.cancelConditionsSave = function (item, index) {
            if ($scope.validIsNew(item.id)) {
                $scope.conditionsModal.splice(index, 1);
            }
        };


        //条件结束



        //处理开始

        // 过滤出来的数据
        $scope.showTreatmentsModal = [];
        $scope.treatmentsModalReload = 1;
        $scope.treatmentsModalAoData = {};
        $scope.treatmentsModalSearch = '';


        // 保存
        /**
         *
         * @param treatmentsModal 用户等级数据对象
         * @param data
         */

        $scope.saveTreatmentsModal = function (treatmentsModal, data) {
            $scope.treatmentsModal.forEach(function (treatmentsModalItem) {
                if(treatmentsModalItem.id == treatmentsModal.id){
                    window.Object.assign(treatmentsModalItem, data);
                    if($scope.validIsNew(treatmentsModalItem.id)){
                        treatmentsModalItem.id = window.parseInt(treatmentsModalItem.id, 10)
                    }
                }
            });
        };

        // 删除treatmentsModal
        /**
         * @param treatmentsModal 用户等级数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteTreatmentsModal = function (treatmentsModal, index) {
            $scope.treatmentsModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addTreatmentsModal = function () {
            $scope.treatmentsModalAoData = {};
            $scope.treatmentsModalSearch = '';
            $scope.treatmentsModal.unshift({
                'id': ($scope.treatmentsModal.length+1) + 'null',
                "currency": $scope.currencyOptions[0].value,
                "designation": $scope.designationOptions[0].value,
                "type": $scope.typeOptions[0].value,
                "value":""
            });
        };

        /**
         *
         * @param item 添加的用户等级
         * @param index 添加的index
         */

        $scope.cancelTreatmentsSave = function (item, index) {
            if ($scope.validIsNew(item.id)) {
                $scope.treatmentsModal.splice(index, 1);
            }
        };

        //处理结束


        //返利开始

        // 过滤出来的数据
        $scope.showRebatesModal = [];
        $scope.rebatesModalReload = 1;
        $scope.rebatesModalAoData = {};
        $scope.rebatesModalSearch = '';

        $scope.checkRebatesMax = function(data) {
            if(!data || window.parseFloat(data)<0.01){
                return 'min 0.01'
            }
            return true;
        };

        // 保存
        /**
         *
         * @param rebatesModal 用户等级数据对象
         * @param data
         */

        $scope.saveRebatesModal = function (rebatesModal, data) {
            $scope.rebatesModal.forEach(function (rebatesModalItem) {
                if(rebatesModalItem.id == rebatesModal.id){
                    window.Object.assign(rebatesModalItem, data);
                    if($scope.validIsNew(rebatesModalItem.id)){
                        rebatesModalItem.id = window.parseInt(rebatesModalItem.id, 10)
                    }
                    $scope.rebatesModalReload++;
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param rebatesModal 用户等级数据对象
         * @return null
         */
        $scope.deleteRebatesModal = function (rebatesModal) {
            $scope.rebatesModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addRebatesModal = function () {
            $scope.rebatesModalAoData = {};
            $scope.rebatesModalSearch = '';
            $scope.rebatesModal.unshift({
                'id': ($scope.rebatesModal.length+1) + 'null',
                "currency":$scope.currencyOptions[0].value,
                "product": $scope.productOptions[0].value,
                "max":'',
                "days":'',
                "brands":[]
            });
        };

        $scope.showEditRebatesBrandModal = function (RebatesBrandsItem) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/userLevel/rebatesBrandsModal.html',
                controller: 'UserLevelRebatesBrandsModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    RebatesBrandsItem: RebatesBrandsItem
                }
            });
            modalInstance.result.then(function (data) {
                if(data.type == 'brands'){
                    $scope.rebatesModal.forEach(function(rebatesModalItem) {
                        if (window.parseInt(rebatesModalItem.id) == window.parseInt(data.data.id)) {
                            rebatesModalItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.rebatesModalReload++;
                        }
                    });
                }
                modalInstance = null
            }, function (data) {
                if(data.type == 'brands'){
                    $scope.rebatesModal.forEach(function(rebatesModalItem) {
                        if (window.parseInt(rebatesModalItem.id) == window.parseInt(data.data.id)) {
                            rebatesModalItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.rebatesModalReload++;
                        }
                    });
                }
                modalInstance = null
            });
        };

        /**
         *
         * @param item 添加的用户等级
         * @param index 添加的index
         */

        $scope.cancelRebatesSave = function (item, index) {
            if ($scope.validIsNew(item.id)) {
                $scope.rebatesModal.splice(index, 1);
            }
        };

        //返利结束

        $scope.confirmModal = function () {

            //提取数据

            var tempData = angular.copy($scope.modalItem);
            var tempConditionsModal = $scope.conditionsModal.filter(function (conditionsItem) {
                return !$scope.validIsNew(conditionsItem.id);
            });
            tempConditionsModal.forEach(function (conditionsItem, conditionsIndex) {
                if(conditionsItem.id){
                    delete conditionsItem.id;
                }
            });
            tempData.conditions = angular.copy(tempConditionsModal);

            var tempTreatmentsModal = $scope.treatmentsModal.filter(function (treatmentsItem) {
                return !$scope.validIsNew(treatmentsItem.id);
            });
            tempTreatmentsModal.forEach(function (treatmentsItem, treatmentsIndex) {
                if(treatmentsItem.id){
                    delete treatmentsItem.id;
                }
            });
            tempData.treatments = angular.copy(tempTreatmentsModal);

            var  tempRebatesModal = $scope.rebatesModal.filter(function (rebatesItem) {
                return !$scope.validIsNew(rebatesItem.id);
            });
            tempRebatesModal.forEach(function (rebatesItem, rebatesIndex) {
                if(rebatesItem.id){
                    delete rebatesItem.id;
                }
            });
            tempData.rebates = angular.copy(tempRebatesModal);

            if(edit==2){
                adminService.postReq($rootScope.URL.USERLEVEL.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }else if(edit==3){
                adminService.patchReq($rootScope.URL.USERLEVEL.PATCH+'/'+tempData.code, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }

        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        //页面加载执行

        $scope.initGameBrandModalData();
    }
})();

(function() {

    angular
        .module('admin.usersManage')
        .controller('usersManageFilterModalController', usersManageFilterModalController);

    usersManageFilterModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'filter'
    ];

    function usersManageFilterModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        filter
    ) {

        $scope.currencyOptions = [];

        $scope.initCurrenciesManageData = function () {
            $scope.currencyOptions = [];
            adminService.getReq($rootScope.URL.CURRENCIESMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.name||'',
                                    value:objItem.code||''
                                };
                                if(objItem.supported){
                                    $scope.currencyOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        $scope.genderOptions = [
            {
                label:'male',
                value:'M'
            },
            {
                label:'female',
                value:'F'
            },
            {
                label:'unknown',
                value:'U'
            },
        ];

        $scope.booleanOptons = [
            {
                label: 'Yes',
                value: true
            },
            {
                label: 'No',
                value: false
            }
        ];

        $scope.usersManageUrl = $rootScope.URL.USERSMANAGE.GET;

        // 原始的数据
        $scope.usersManage = [];
        $scope.usersManageReload = 1;
        $scope.usersManageAoData = {};
        $scope.tempUsersManageAoData = {};

        $scope.trigerSearch = function() {
            if($scope.usersManageAoData.username&&$scope.usersManageAoData.username.length&&($scope.usersManageAoData.username.length<3||$scope.usersManageAoData.username.length>11)){
                $rootScope.alertErrorMsg('username char length should between 3 and 11');
                return;
            }
            $scope.tempUsersManageAoData = Object.assign($scope.tempUsersManageAoData,$scope.usersManageAoData)
            $scope.usersManageReload++;
        };

        $scope.resetSearch = function() {
            $scope.usersManageAoData = {};
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempUsersManageAoData;
            $scope.tempUsersManageAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.usersManageReload++;
        };

        // 初始化table数据
        $scope.initUsersManageData = function () {
            $scope.usersManageReload++;
        };

        // 页面加载执行的函数

        $scope.initCurrenciesManageData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.usersManageAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.usersManageAoData.start_time) {
                        $scope.usersManageAoData.start_time = '';
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.usersManageAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.usersManageAoData.end_time) {
                        $scope.usersManageAoData.end_time = '';
                    }
                }
            }
        });

        $scope.showDescriptionDetail = function (data) {
            var tempStr = '';
            if (typeof data == 'object') {
                window.Object.keys(data).map(function (item) {
                    if(typeof data[item] == 'boolean'){
                        tempStr = tempStr + '<span style="width: 180px;text-align: left">'+$translate.instant(item)+'</span>'  + ':' + (data[item]?'Yes':'No') + '</br>'
                    }
                })
            }
            return tempStr;
        };

        $scope.filter = filter;

        $scope.usersManageAoData = window.Object.assign($scope.usersManageAoData, $scope.filter);
        $scope.tempUsersManageAoData = window.Object.assign($scope.tempUsersManageAoData, $scope.filter);

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

    }
})();

(function() {

    angular
        .module('admin.usersManage')
        .controller('usersManageModalController', usersManageModalController);

    usersManageModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'hasPower',
        'edit',
        'modalItem'
    ];

    function usersManageModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        hasPower,
        edit,
        modalItem
    ) {

        $scope.edit = edit;
        $scope.hasPower = hasPower;

        $scope.userId = modalItem.userId;

        // 初始化table数据
        $scope.initMethodsNameModalData = function () {
            $scope.modalItem = modalItem
        };

        // 原始的数据
        $scope.userCommentModal = [];

        // 过滤出来的数据
        $scope.showUserCommentModal = [];
        $scope.userCommentModalReload = 1;
        $scope.userCommentModalAoData = {};
        $scope.userCommentModalSearch = '';

        $scope.rankOptons = [];

        $scope.initRankOptions = function () {
            $scope.rankOptons = [];
            adminService.getReq($rootScope.URL.USERLEVEL.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                if(objItem.isDeleted === false){
                                    var tempObj ={
                                        label:objItem.code||'',
                                        value:objItem.code||''
                                    };
                                    $scope.rankOptons.push(tempObj)
                                }
                                // if(objItem.supported){
                                //     $scope.brandOptions.push(tempObj)
                                // }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        // 初始化table数据
        $scope.initUserCommentModalData = function () {
            adminService.getReq($rootScope.URL.USERSMANAGE.GETCOMMENTS+'/'+modalItem.userId, {}, {}).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.userCommentModal = angular.copy(res.data.data);
                        $scope.userCommentModalReload++;
                        console.log($scope.userCommentModal)
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        $scope.tempComment = '';
        // 保存
        $scope.saveUserCommentModal = function () {
            var tempData = {
                comment: $scope.tempComment,
                admin_id: window.userInfo && window.userInfo.adminId || '',
                adminname: window.userInfo && window.userInfo.username || '',
            };
            $scope.tempComment = '';
            adminService.postReq($rootScope.URL.USERSMANAGE.POSTCOMMENTS+'/'+modalItem.userId, {}, tempData).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $rootScope.toasterSuccess(res.data.msg);
                        $scope.initUserCommentModalData();
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        //$rootScope.toasterSuccess(res.data.msg);;
        $scope.confirmModal = function () {
            if($scope.modalItem.name){
                if($scope.modalItem.name.length<3||$scope.modalItem.name.length>11){
                    $rootScope.alertErrorMsg('name length should between 3 and 11');
                    return;
                }
            }
            var tempData = {
                name:$scope.modalItem.name || '',
                nameVerified:$scope.modalItem.verifications.name,
                phone:$scope.modalItem.phone||'',
                phoneVerified:$scope.modalItem.verifications.phone,
                locked:$scope.modalItem.locked,
            };
            if (edit==3) {
                adminService.patchReq($rootScope.URL.USERSMANAGE.PATCH+'/'+modalItem.userId, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }

        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initMethodsNameModalData();

        if($scope.validPower("USERSMANAGE", ["GETCOMMENTS"])){
            $scope.initUserCommentModalData();
        }

        $scope.initRankOptions();

    }
})();

(function() {

    angular
        .module('admin.usersManage')
        .controller('UsersManageController', UsersManageController);

    UsersManageController.$inject = [
        '$scope',
        '$uibModal',
        '$state',
        '$translate',
        '$rootScope',
        'adminService'
    ];

    function UsersManageController(
        $scope,
        $uibModal,
        $state,
        $translate,
        $rootScope,
        adminService
    ) {

        $scope.currencyOptions = [];

        $scope.initCurrenciesManageData = function () {
            $scope.currencyOptions = [];
            adminService.getReq($rootScope.URL.CURRENCIESMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.name||'',
                                    value:objItem.code||''
                                };
                                if(objItem.supported){
                                    $scope.currencyOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.genderOptions = [
            {
                label:'male',
                value:'M'
            },
            {
                label:'female',
                value:'F'
            },
            {
                label:'unknown',
                value:'U'
            },
        ];

        $scope.booleanOptons = [
            {
                label: 'Yes',
                value: true
            },
            {
                label: 'No',
                value: false
            }
        ];

        $scope.showEditUserManageModal = function(item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/usersManage/userManageEditModal.html',
                controller: 'usersManageModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit:edit,
                    modalItem: item,
                    hasPower:$scope.validPower("USERSMANAGE", ["PATCH"]) && edit !== 1,
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initUsersManageData();
            }, function (data) {

            });
        };

        $scope.usersManageUrl = $rootScope.URL.USERSMANAGE.GET;

        // 原始的数据
        $scope.usersManage = [];
        $scope.usersManageReload = 1;
        $scope.usersManageAoData = {};
        $scope.tempUsersManageAoData = {};

        $scope.trigerSearch = function() {
            if($scope.usersManageAoData.username&&$scope.usersManageAoData.username.length&&($scope.usersManageAoData.username.length<3||$scope.usersManageAoData.username.length>11)){
                $rootScope.alertErrorMsg('username char length should between 3 and 11');
                return;
            }
            $scope.tempUsersManageAoData = Object.assign($scope.tempUsersManageAoData,$scope.usersManageAoData)
            $scope.usersManageReload++;
        };

        $scope.resetSearch = function() {
            $scope.usersManageAoData = {};
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempUsersManageAoData;
            $scope.tempUsersManageAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.usersManageReload++;
        };

        // 初始化table数据
        $scope.initUsersManageData = function () {
            $scope.usersManageReload++;
        };

        // 页面加载执行的函数

        $scope.initCurrenciesManageData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.usersManageAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.usersManageAoData.start_time) {
                        $scope.usersManageAoData.start_time = '';
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.usersManageAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.usersManageAoData.end_time) {
                        $scope.usersManageAoData.end_time = '';
                    }
                }
            }
        });
        
        $scope.openNewTab = function(item,state) {
            if(['bankCardsUser'].indexOf(state) !== -1){
                adminService.getReq( $rootScope.URL.USERSMANAGE.SELECTCARDS+'/'+item.userId, {}, {}).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            var modalInstance = $uibModal.open({
                                animation: true,
                                ariaLabelledBy: 'modal-title',
                                ariaDescribedBy: 'modal-body',
                                templateUrl: '/views/admin/bankCards/userBankCardsModal.html',
                                controller: 'UserBankCardsModalController',
                                size: 'lg',
                                scope:$scope,
                                windowClass: 'full-screen-modal-window',
                                resolve: {
                                    modalItem: res.data,
                                }
                            });
                            modalInstance.result.then(function (data) {

                            }, function (data) {

                            });
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
                return;
            }
            if(state === 'transactionsDetail'){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/admin/transactionsDetail/transactionsDetailFilterModal.html',
                    controller: 'TransactionsDetailFilterController',
                    size: 'lg',
                    windowClass: 'full-screen-modal-window',
                    scope:$scope,
                    resolve: {
                        filter: {
                            user_id:item.userId,
                            username:item.username,
                            timezone:item.timezone,
                        },
                    }
                });
                modalInstance.result.then(function (data) {

                }, function (data) {

                });
            }
            if(state === 'ordersManage'){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/admin/ordersManage/orderManageFilterModal.html',
                    controller: 'OrderManageFilterModalController',
                    size: 'lg',
                    windowClass: 'full-screen-modal-window',
                    scope:$scope,
                    resolve: {
                        filter: {
                            username:item.username,
                            user_id:item.userId
                        },
                    }
                });
                modalInstance.result.then(function (data) {

                }, function (data) {

                });
            }
            if(state === 'withdrawsManage'){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/admin/withdrawsManage/withdrawsManageFilterModal.html',
                    controller: 'WithdrawsManageFilterModalController',
                    size: 'lg',
                    windowClass: 'full-screen-modal-window',
                    scope:$scope,
                    resolve: {
                        filter: {
                            username:item.username,
                            user_id:item.userId
                        },
                    }
                });
                modalInstance.result.then(function (data) {

                }, function (data) {

                });
            }
            if(state === 'transfersList'){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/admin/transfersList/transfersListFilterModal.html',
                    controller: 'TransfersListFilterModalController',
                    size: 'lg',
                    windowClass: 'full-screen-modal-window',
                    scope:$scope,
                    resolve: {
                        filter: {
                            username:item.username,
                            user_id:item.userId
                        },
                    }
                });
                modalInstance.result.then(function (data) {

                }, function (data) {

                });
            }
            if(state === 'gameRecords'){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/admin/gameRecords/gameRecordsFilterModal.html',
                    controller: 'GameRecordsFilterModalController',
                    size: 'lg',
                    windowClass: 'full-screen-modal-window',
                    scope:$scope,
                    resolve: {
                        filter: {
                            username:item.username,
                            user_id:item.userId
                        },
                    }
                });
                modalInstance.result.then(function (data) {

                }, function (data) {

                });
            }
            if(state === 'rebatesList'){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/admin/rebatesList/rebatesListFilterModal.html',
                    controller: 'RebatesListFilterModalController',
                    size: 'lg',
                    windowClass: 'full-screen-modal-window',
                    scope:$scope,
                    resolve: {
                        filter: {
                            username:item.username,
                            user_id:item.userId
                        },
                    }
                });
                modalInstance.result.then(function (data) {

                }, function (data) {

                });
            }
            if(state === 'appliesUse'){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/admin/appliesUse/appliesUseFilterModal.html',
                    controller: 'AppliesUseFilterModalController',
                    size: 'lg',
                    windowClass: 'full-screen-modal-window',
                    scope:$scope,
                    resolve: {
                        filter: {
                            username:item.username,
                            user_id:item.userId
                        },
                    }
                });
                modalInstance.result.then(function (data) {

                }, function (data) {

                });
            }
            // var url = window.location.pathname+$rootScope.$state.href(state)+'?_username='+(item.username||'')+'&user_id='+(item.userId||'');
            // window.open(url,'_blank');
        };

        $scope.showDescriptionDetail = function (data) {
            var tempStr = '';
            if (typeof data == 'object') {
                window.Object.keys(data).map(function (item) {
                    if(typeof data[item] == 'boolean'){
                        tempStr = tempStr + '<span style="width: 180px;text-align: left">'+$translate.instant(item)+'</span>'  + ':' + (data[item]?'Yes':'No') + '</br>'
                    }
                })
            }
            return tempStr;
        };

        // 页面加载执行

        // try {
        //     var urlParams = $scope.getUrlParams();
        //     if(urlParams.user_id){
        //         $scope.tempUsersManageAoData.affiliate_id = urlParams.user_id;
        //         $scope.usersManageAoData.affiliate_id = urlParams.user_id;
        //     }
        // }catch (e){
        //     console.error(e)
        // }

    }
})();

(function() {

    angular
        .module('admin.walletsManage')
        .controller('WalletsManageController', WalletsManageController);

    WalletsManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function WalletsManageController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.brandOptions = [];

        $scope.initBrandOptionsData = function () {
            $scope.brandOptions = [];
            adminService.getReq($rootScope.URL.GAMEBRANDS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.brandOptions.push(tempObj)
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.localesOptions = [];

        $scope.initLocalesOptionsData = function () {
            $scope.localesOptions = [];
            adminService.getReq($rootScope.URL.LOCALELANGUAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.name||'',
                                    value:objItem.code||''
                                };
                                if(objItem.supported){
                                    $scope.localesOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.booleanOptons = [
            {
                label: 'Yes',
                value: true
            },
            {
                label: 'No',
                value: false
            }
        ];

        $scope.statusOptons = [
            {
                label: 'OPEN',
                value: 'OPEN'
            },
            {
                label: 'MAINTAIN',
                value: 'MAINTAIN'
            },
            {
                label: 'CLOSED',
                value: 'CLOSED'
            }
        ];

        // 原始的数据
        $scope.walletsManage = [];

        // 过滤出来的数据
        $scope.showWalletsManage = [];
        $scope.walletsManageReload = 1;
        $scope.walletsManageAoData = {};
        $scope.walletsManageSearch = '';

        // 初始化table数据
        $scope.initWalletsManageData = function () {
            adminService.getReq($rootScope.URL.WALLETSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.walletsManage = angular.copy(res.data.data);
                        $scope.walletsManage.forEach(function(walletItem) {
                            if(walletItem.merchant){
                                walletItem.apiEndpoint = walletItem.merchant.api||'';
                                walletItem.merchantKey = walletItem.merchant.key||'';
                                walletItem.merchantName = walletItem.merchant.name||'';
                                delete walletItem.merchant;
                            }else{
                                walletItem.apiEndpoint = '';
                                walletItem.merchantKey = '';
                                walletItem.merchantName = '';
                            }
                            if(walletItem.setting){
                                if(walletItem.setting.record){
                                    walletItem.recordsDuration = walletItem.setting.record.duration||'';
                                    walletItem.recordsParamsTimeFormat = walletItem.setting.record.timeFormat||'';
                                    walletItem.recordsTimezone = walletItem.setting.record.timezone||'';
                                    delete walletItem.setting.record;
                                }else{
                                    walletItem.recordsDuration = '';
                                    walletItem.recordsParamsTimeFormat = '';
                                    walletItem.recordsTimezone = '';
                                }
                                if(walletItem.setting.user){
                                    walletItem.usernamePrefix = walletItem.setting.user.prefix||'';
                                    walletItem.syncPassword = walletItem.setting.user.syncPassword||'';
                                    delete walletItem.setting.user
                                }else{
                                    walletItem.usernamePrefix = '';
                                    walletItem.syncPassword = '';
                                }
                                delete walletItem.setting;
                            }
                        });
                        $scope.walletsManageReload++;
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.showWalletsManageModal = function (modalItem,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/walletsManage/walletsManageModal.html',
                controller: 'walletsManageModalController',
                scope: $scope,
                size: 'lg',
                resolve:{
                    modalItem:modalItem,
                    edit:edit,
                    hasPower:$scope.hasPower && edit!==1
                }
            });
            modalInstance.result.then(function(data) {
                $scope.initWalletsManageData();
            }, function(data) {
            });
        };

        // 删除walletsManage
        /**
         * @param walletsManage WALLETSMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteWalletsManage = function (walletsManage) {
            if (!$scope.validIsNew(walletsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.WALLETSMANAGE.DELETE+'/'+walletsManage.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initWalletsManageData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        // 恢复walletsManage
        /**
         * @param walletsManage WALLETSMANAGETITLE数据对象
         * @return null
         */
        $scope.recoverWalletsManage = function (walletsManage) {
            if (!$scope.validIsNew(walletsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.putReq($rootScope.URL.WALLETSMANAGE.PUT+'/'+walletsManage.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initWalletsManageData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                }, 'recover');
            }
        };

        $scope.hasPower = $scope.validPower("WALLETSMANAGE", ["PATCH", "POST"]);

        // 页面加载执行的函数

        $scope.initWalletsManageData();


        if($scope.hasPower){

            $scope.initBrandOptionsData();

            $scope.initLocalesOptionsData();
        }

    }
})();

(function() {

    angular
        .module('admin.walletsManage')
        .controller('walletsManageModalController', walletsManageModalController);

    walletsManageModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        'modalItem',
        'edit',
        'hasPower',
        '$translate'
    ];

    function walletsManageModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        modalItem,
        edit,
        hasPower,
        $translate
    ) {

        $scope.edit = edit;

        $scope.hasPower = hasPower;

        if(edit == 3||edit ==1){
            $scope.modalItem = angular.copy(modalItem)
        }else{
            $scope.modalItem = {
                name: [],
                brands: [],
                syncPassword: $scope.booleanOptons[0] && $scope.booleanOptons[0].value || '',
                disabled: $scope.booleanOptons[1] && $scope.booleanOptons[1].value,
                status: $scope.statusOptons[0] && $scope.statusOptons[0].value || '',
                code:'',
                usernamePrefix:'',
                recordsDuration: '',
                recordsParamsTimeFormat: ''
            };
        }

        if($scope.modalItem.recordsParamsTimeZone){
            delete $scope.modalItem.recordsParamsTimeZone
        }
        if(!$scope.modalItem.apiEndpoint){
            $scope.modalItem.apiEndpoint = '';
        }

        /**
         * 点击复选框
         * @param value value值
         * @param $event 点击事件
         */
        $scope.selectBrands = function(value, $event) {
            if($event.target.checked){
                if($scope.modalItem.brands.indexOf(value) === -1){
                    $scope.modalItem.brands.push(value)
                }
            }else{
                $scope.modalItem.brands.splice($scope.modalItem.brands.indexOf(value), 1)
            }
        };

        // 过滤出来的数据
        $scope.showNameModal = [];
        $scope.nameModalReload = 1;
        $scope.nameModalAoData = {};
        $scope.nameModalSearch = '';

        // 初始化table数据
        $scope.initNameModalData = function () {
            if(window.Array.isArray($scope.modalItem['name'])){
                $scope.modalItem['name'].forEach(function (nameItem, nameIndex) {
                    nameItem.id = nameIndex + 1;
                })
            }
        };


        // 保存
        /**
         *
         * @param nameModal name数据对象
         * @param data
         */

        $scope.saveNameModal = function (nameModal, data) {
            $scope.modalItem['name'].forEach(function (nameModalItem) {
                if(nameModalItem.id == nameModal.id){
                    window.Object.assign(nameModalItem, data);
                    if($scope.validIsNew(nameModalItem.id)){
                        nameModalItem.id = window.parseInt(nameModalItem.id, 10)
                        $scope.nameModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param nameModal name数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteNameModal = function (nameModal, index) {
            $scope.modalItem['name'].splice(index, 1)
        };

        // 添加按钮
        $scope.addNameModal = function () {
            $scope.nameModalAoData = {};
            $scope.nameModalSearch = '';
            $scope.modalItem['name'].unshift({
                'id': ($scope.modalItem['name'].length+1) + 'null',
                "locale": $scope.localesOptions[0] ? $scope.localesOptions[0].value : '',
                "value": ''
            });
        };

        /**
         *
         * @param NameItem name项目
         * @param index 添加的index
         */

        $scope.cancelSaveNameModal = function (NameItem, index) {
            if ($scope.validIsNew(NameItem.id)) {
                $scope.modalItem['name'].splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            if($scope.modalItem.name && $scope.modalItem.name.length){
                var tempObj = {};
                var sameKey = false;
                $scope.modalItem.name.map(function(nameItem) {
                    if(tempObj[nameItem.locale]){
                        sameKey = true
                    }
                    tempObj[nameItem.locale] = nameItem.value
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same local, just remove one');
                    return '';
                }
            }
            var tempData = angular.copy($scope.modalItem);
            tempData['name'] = tempData['name'].filter(function (item) {
                return !$scope.validIsNew(item.id);
            });
            if(window.Array.isArray(tempData['name'])){
                tempData['name'].forEach(function(nameItem) {
                    if(nameItem.id){
                        delete nameItem.id;
                    }
                })
            }
            if(tempData.name && tempData.name.length){
                var tempNameObj = {};
                tempData.name.map(function(nameItem) {
                    tempNameObj[nameItem.locale] = nameItem.value
                });
                tempData.name = angular.copy(tempNameObj)
            }
            if (edit==2) {
                adminService.postReq($rootScope.URL.WALLETSMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('success');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (edit==3) {
                adminService.patchReq($rootScope.URL.WALLETSMANAGE.PATCH+'/'+tempData.code, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('success');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数
        $scope.initNameModalData();

    }
})();

(function() {

    angular
        .module('admin.withdrawsManage')
        .controller('WithdrawsManageController', WithdrawsManageController);

    WithdrawsManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function WithdrawsManageController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.walletOptions = [];

        $scope.initWalletOptionsData = function () {
            $scope.walletOptions = [];
            adminService.getReq($rootScope.URL.WALLETSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.walletOptions.push(tempObj)
                                //if(!objItem.disabled){
                                //    $scope.walletOptions.push(tempObj)
                                //}
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        //pending|auditing|approved|declined|paid|reviewing|finished

        $scope.statusOptions = [
            {
                label:'pending',
                value:'pending'
            },
            {
                label:'auditing',
                value:'auditing'
            },
            {
                label:'approved',
                value:'approved'
            },
            {
                label:'declined',
                value:'declined'
            },
            {
                label:'finished',
                value:'finished'
            },
            {
                label:'paid',
                value:'paid'
            },
            {
                label:'reviewing',
                value:'reviewing'
            },
        ];

        $scope.search = {
            wallet: [],
            status: []
        };

        $scope.withdrawsManageUrl = $rootScope.URL.WITHDRAWSMANAGE.GET;

        // 原始的数据
        $scope.withdrawsManage = [];
        $scope.withdrawsManageReload = 1;
        $scope.withdrawsManageAoData = {};
        $scope.tempWithdrawsManageAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempWithdrawsManageAoData = Object.assign($scope.tempWithdrawsManageAoData,$scope.withdrawsManageAoData);
            $scope.withdrawsManageReload++;
        };

        $scope.resetSearch = function() {
            $scope.withdrawsManageAoData = {};
            $scope.search = {
                wallet: [],
                status: []
            };
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempWithdrawsManageAoData;
            $scope.tempWithdrawsManageAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.withdrawsManageReload++;
        };

        // 初始化table数据
        $scope.initWithdrawsManageData = function () {
            $scope.withdrawsManageReload++;
        };

        /**
         *  显示提款详情
         * @param item withdraws项目详情
         */
        $scope.showWithdrawsDetail = function (item) {
            if(!item.id){
                $rootScope.alertErrorMsg('server data error');
                return;
            }
            adminService.getReq($rootScope.URL.WITHDRAWSMANAGE.GETDETAIL + '/' + item.id, {}, {}).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: '/views/admin/withdrawsManage/withdrawsManageDetailModal.html',
                            controller: 'WithdrawsManageModalController',
                            scope:$scope,
                            resolve: {
                                withdrawsDetail: res.data.data
                            },
                            size: 'lg',
                        });
                        modalInstance.result.then(function(data) {
                        }, function(data) {
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        /**
         *  进入审批流程
         * @param item withdraws项目详情
         * @param approve 到审批的哪一步了
         */
        $scope.approveWithdrawsManage = function (item, approve) {
            if(!item.id || !approve){
                $rootScope.alertErrorMsg('server data error');
                return;
            }
            console.log(approve,'approve')
            var tempUrl = $rootScope.URL.WITHDRAWSMANAGE && $rootScope.URL.WITHDRAWSMANAGE['GET'+approve.toUpperCase()];
            adminService.getReq(tempUrl + '/' + item.id, {admin_id:(window.userInfo.adminId || ''),adminname: (window.userInfo && window.userInfo.username || ''),}, {}).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        var tempData = angular.copy(res.data.data);
                        tempData.approve = approve;
                        tempData.itemId = item.id;
                        var modalInstance = $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: '/views/admin/withdrawsManage/withdrawsManageModal.html',
                            controller: 'WithdrawsManageApproveModalController',
                            scope:$scope,
                            resolve: {
                                withdrawsDetail: tempData
                            },
                            size: 'lg',
                        });
                        modalInstance.result.then(function(data) {
                            $scope.initWithdrawsManageData()
                        }, function(data) {
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        // 页面加载执行的函数

        $scope.initWalletOptionsData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.withdrawsManageAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.withdrawsManageAoData.start_time) {
                        $scope.withdrawsManageAoData.start_time = '';
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.withdrawsManageAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.withdrawsManageAoData.end_time) {
                        $scope.withdrawsManageAoData.end_time = '';
                    }
                }
            }
        });

        $scope.$watch('search.wallet.length+search.status.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.withdrawsManageAoData.wallet = $scope.search.wallet.join(',');
                $scope.withdrawsManageAoData.status = $scope.search.status.join(',');
            }
        });

        $scope.urlUsername = '';

        // try {
        //     var urlParams = $scope.getUrlParams();
        //     if(urlParams._username){
        //         $scope.urlUsername = urlParams._username;
        //     }
        //     if(urlParams.user_id){
        //         $scope.tempWithdrawsManageAoData.user_id = urlParams.user_id;
        //     }
        // }catch (e){
        //     console.error(e)
        // }
    }
})();

(function() {

    angular
        .module('admin.withdrawsManage')
        .controller('WithdrawsManageApproveModalController', WithdrawsManageApproveModalController);

    WithdrawsManageApproveModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'withdrawsDetail',
        'adminService',
        '$translate'
    ];

    function WithdrawsManageApproveModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        withdrawsDetail,
        adminService,
        $translate
    ) {

        $scope.withdrawsDetail = withdrawsDetail;
        if($scope.withdrawsDetail.approve){
            $scope.approve = $scope.withdrawsDetail.approve;
            delete $scope.withdrawsDetail.approve;
        }
        if($scope.withdrawsDetail.itemId){
            $scope.itemId = $scope.withdrawsDetail.itemId;
            delete $scope.withdrawsDetail.itemId
        }

        $scope.detailModalAoData = {};
        $scope.detailModalSearch = '';
        $scope.detailModalReload = 1;
        $scope.showDetailModal = [];

        $scope.resultOptions = [];
        if($scope.approve == 'audit'){
        //‘pending’, ‘approved’, ‘declined’
            $scope.resultOptions = [
                {
                    label:'pending',
                    value:'pending'
                },
                {
                    label:'approved',
                    value:'approved'
                },
                {
                    label:'declined',
                    value:'declined'
                }
            ];
        }else if($scope.approve == 'pay'){
        //‘paid’, ‘approved’
            $scope.resultOptions = [
                {
                    label:'paid',
                    value:'paid'
                },
                {
                    label:'approved',
                    value:'approved'
                }
            ];
        }else if($scope.approve == 'pay'){
        //‘paid’, ‘finished’
            $scope.resultOptions = [
                {
                    label:'paid',
                    value:'paid'
                },
                {
                    label:'finished',
                    value:'finished'
                }
            ];
        }
        if(!$scope.withdrawsDetail.adminId){
            $scope.withdrawsDetail.adminId = window.userInfo && window.userInfo.adminId || '';
        }
        if(!$scope.withdrawsDetail.result){
            $scope.withdrawsDetail.result = $scope.resultOptions[0] && $scope.resultOptions[0].value || '';
        }
        if(!$scope.withdrawsDetail.comment){
            $scope.withdrawsDetail.comment = '';
        }

        $scope.confirmModal = function() {
            if(!$scope.withdrawsDetail.comment){
                $rootScope.alertErrorMsg('comment is required');
                return;
            }
            if(!$scope.withdrawsDetail.result){
                $rootScope.alertErrorMsg('result is required');
                return;
            }
            var approveData = {
                adminId: $scope.withdrawsDetail.adminId,
                result: $scope.withdrawsDetail.result,
                comment: $scope.withdrawsDetail.comment,
                adminname: window.userInfo && window.userInfo.username || '',
            };
            var tempUrl = $rootScope.URL.WITHDRAWSMANAGE && $rootScope.URL.WITHDRAWSMANAGE['POST'+$scope.approve.toUpperCase()];
            adminService.postReq(tempUrl+'/'+$scope.itemId+'/'+withdrawsDetail.id, {}, approveData).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $uibModalInstance.close('success');
                        $rootScope.toasterSuccess(res.data.msg);
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();

(function() {

    angular
        .module('admin.withdrawsManage')
        .controller('WithdrawsManageModalController', WithdrawsManageModalController);

    WithdrawsManageModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'withdrawsDetail',
        '$translate'
    ];

    function WithdrawsManageModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        withdrawsDetail,
        $translate
    ) {

        $scope.withdrawsDetail = withdrawsDetail;

        $scope.detailModalAoData = {};
        $scope.detailModalSearch = '';
        $scope.detailModalReload = 1;
        $scope.showDetailModal = [];

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();

(function() {

    angular
        .module('admin.withdrawsManage')
        .controller('WithdrawsManageFilterModalController', WithdrawsManageFilterModalController);

    WithdrawsManageFilterModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'filter',
        'adminService',
        '$translate'
    ];

    function WithdrawsManageFilterModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        filter,
        adminService,
        $translate
    ) {

        $scope.walletOptions = [];

        $scope.initWalletOptionsData = function () {
            $scope.walletOptions = [];
            adminService.getReq($rootScope.URL.WALLETSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.walletOptions.push(tempObj)
                                //if(!objItem.disabled){
                                //    $scope.walletOptions.push(tempObj)
                                //}
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        //pending|auditing|approved|declined|paid|reviewing|finished

        $scope.statusOptions = [
            {
                label:'pending',
                value:'pending'
            },
            {
                label:'auditing',
                value:'auditing'
            },
            {
                label:'approved',
                value:'approved'
            },
            {
                label:'declined',
                value:'declined'
            },
            {
                label:'finished',
                value:'finished'
            },
            {
                label:'paid',
                value:'paid'
            },
            {
                label:'reviewing',
                value:'reviewing'
            },
        ];

        $scope.search = {
            wallet: [],
            status: []
        };

        $scope.withdrawsManageUrl = $rootScope.URL.WITHDRAWSMANAGE.GET;

        // 原始的数据
        $scope.withdrawsManage = [];
        $scope.withdrawsManageReload = 1;
        $scope.withdrawsManageAoData = {};
        $scope.tempWithdrawsManageAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempWithdrawsManageAoData = Object.assign($scope.tempWithdrawsManageAoData,$scope.withdrawsManageAoData);
            $scope.withdrawsManageReload++;
        };

        $scope.resetSearch = function() {
            $scope.withdrawsManageAoData = {};
            $scope.search = {
                wallet: [],
                status: []
            };
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempWithdrawsManageAoData;
            $scope.tempWithdrawsManageAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.withdrawsManageReload++;
        };

        // 初始化table数据
        $scope.initWithdrawsManageData = function () {
            $scope.withdrawsManageReload++;
        };

        // /**
        //  *  显示提款详情
        //  * @param item withdraws项目详情
        //  */
        // $scope.showWithdrawsDetail = function (item) {
        //     if(!item.id){
        //         $rootScope.alertErrorMsg('server data error');
        //         return;
        //     }
        //     adminService.getReq($rootScope.URL.WITHDRAWSMANAGE.GETDETAIL + '/' + item.id, {}, {}).then(function (res) {
        //         if (typeof res.data.success === 'boolean') {
        //             if (res.data.success) {
        //                 var modalInstance = $uibModal.open({
        //                     animation: true,
        //                     ariaLabelledBy: 'modal-title',
        //                     ariaDescribedBy: 'modal-body',
        //                     templateUrl: '/views/admin/withdrawsManage/withdrawsManageDetailModal.html',
        //                     controller: 'WithdrawsManageModalController',
        //                     scope:$scope,
        //                     resolve: {
        //                         withdrawsDetail: res.data.data
        //                     },
        //                     size: 'lg',
        //                 });
        //                 modalInstance.result.then(function(data) {
        //                 }, function(data) {
        //                 });
        //             } else {
        //                 $rootScope.alertErrorMsg(res.data.msg);
        //             }
        //         }
        //     });
        // };


        // 页面加载执行的函数

        $scope.initWalletOptionsData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.withdrawsManageAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.withdrawsManageAoData.start_time) {
                        $scope.withdrawsManageAoData.start_time = '';
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.withdrawsManageAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.withdrawsManageAoData.end_time) {
                        $scope.withdrawsManageAoData.end_time = '';
                    }
                }
            }
        });

        $scope.$watch('search.wallet.length+search.status.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.withdrawsManageAoData.wallet = $scope.search.wallet.join(',');
                $scope.withdrawsManageAoData.status = $scope.search.status.join(',');
            }
        });

        $scope.filter = filter;

        $scope.urlUsername = $scope.filter.username||'';

        if($scope.filter.username){
            delete $scope.filter.username
        }

        $scope.withdrawsManageAoData = window.Object.assign($scope.withdrawsManageAoData, $scope.filter);
        $scope.tempWithdrawsManageAoData = window.Object.assign($scope.tempWithdrawsManageAoData, $scope.filter);

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();
