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
			//new module name will be append here

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
        .module('admin.blackLists', [
            'app.core',
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
        .module('admin.gamesManage', [
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
        .module('admin.localeLanguage', [
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
        .module('admin.pspsManage', [
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
        .module('admin.transactionsDetail', [
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
        '$rootScope',
        '$translate'
    ];

    function appRun(
        $rootScope,
        $translate
    ) {

        // 配置预设的url
        $rootScope.URL = {
            COUNTRIESMANAGE:{
                GET:'/rest/countries',
                POST:'/rest/countries',
                PATCH:'/rest/countries',
                DELETE:'/rest/countries',
                PUT:'/rest/countries/restore'
            },
            LOCALELANGUAGE:{
                GET:'/rest/locales',
                POST:'/rest/locales',
                PATCH:'/rest/locales',
                DELETE:'/rest/locales',
                PUT:'/rest/locales/restore'
            },
            USERLEVEL:{
                GET:'/rest/ranks',
                POST:'/rest/ranks',
                PATCH:'/rest/ranks',
                DELETE:'/rest/ranks',
                PUT:'/rest/ranks/restore'
            },
            TRANSACTIONSDETAIL:{
                GET:'/rest/transactions',
                POST:'/rest/transactions',
                PATCH:'/rest/transactions',
                DELETE:'/rest/transactions',
                PUT:'/rest/transactions/restore'
            },
            CURRENCIESMANAGE:{
                GET:'/rest/currencies',
                POST:'/rest/currencies',
                PATCH:'/rest/currencies',
                DELETE:'/rest/currencies',
                PUT:'/rest/currencies/restore'
            },
            BLACKLISTS:{
                GET:'/rest/blacklists',
                POST:'/rest/blacklists',
                PATCH:'/rest/blacklists',
                DELETE:'/rest/blacklists',
                PUT:'/rest/blacklists/restore'
            },
            ORDERSMANAGE:{
                GET:'/rest/orders',
                POST:'/rest/orders/receive',
                PATCH:'/rest/orders',
                DELETE:'/rest/orders',
                PUT:'/rest/orders/restore'
            },
            PAYMENTMETHODS:{
                GET:'/rest/methods',
                POST:'/rest/methods',
                PATCH:'/rest/methods',
                DELETE:'/rest/methods',
                PUT:'/rest/methods/restore'
            },
            APPLIESUSE:{
                GET:'/rest/applies',
                POST:'/rest/applies/audit',
                PATCH:'/rest/applies/revoke',
                DELETE:'/rest/applies',
                PUT:'/rest/applies/restore'
            },
            GAMEBRANDS:{
                GET:'/rest/brands',
                POST:'/rest/brands',
                PATCH:'/rest/brands',
                DELETE:'/rest/brands'
            },
            GAMECATEGORIES:{
                GET:'/rest/categories',
                POST:'/rest/categories',
                PATCH:'/rest/categories',
                DELETE:'/rest/categories'
            },
            COUPONSMANAGE:{
                GET:'/rest/coupons',
                POST:'/rest/coupons',
                PATCH:'/rest/coupons',
                PUT:'/rest/coupons',
                DELETE:'/rest/coupons'
            },
            GAMESMANAGE:{
                GET:'/rest/games',
                POST:'/rest/games',
                PATCH:'/rest/games',
                PUT:'/rest/games',
                DELETE:'/rest/games'
            },
            GAMESPRODUCTS:{
                GET:'/rest/products',
                POST:'/rest/products',
                PATCH:'/rest/products',
                PUT:'/rest/products',
                DELETE:'/rest/products'
            },
            PSPSMANAGE:{
                GET:'/rest/psps',
                POST:'/rest/psps',
                PATCH:'/rest/psps',
                PUT:'/rest/psps',
                DELETE:'/rest/psps'
            },
            WITHDRAWSMANAGE:{
                GET:'/rest/withdraws',
                POST:'/rest/withdraws',
                PATCH:'/rest/withdraws',
                PUT:'/rest/withdraws',
                DELETE:'/rest/withdraws'
            },
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

    }

})();
(function (angular) {


    angular
        .module('admin')
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
             * @returns $promise
             */
            getReq: function (url, params, data) {
                return $http({
                    method: 'GET',
                    url: EVN.debug ? (EVN.server + url + EVN.suffix) : url,
                    params: params||{},
                    // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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
        if (typeof(obj) != 'object') return obj;

        for (var oldName in obj) {

            // Camel to underscore
            newName = oldName.replace(/([A-Z])/g, function ($1) {
                return '_' + $1.toLowerCase();
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

})(angular);


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
            adminId: window.userInfo && window.userInfo.admin_id || ''
        };

        $scope.confirmModal = function () {
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
            adminId: window.userInfo && window.userInfo.admin_id || ''
        };

        $scope.confirmModal = function () {
            adminService.patchReq($rootScope.URL.ORDERSMANAGE.PATCH+'/'+item.id, {}, $scope.orderAdd).then(function (res) {
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

        $scope.appliesUseUrl = $rootScope.URL.APPLIESUSE.GET;

        // 原始的数据
        $scope.appliesUse = [];

        // 过滤出来的数据
        $scope.showAppliesUse = [];
        $scope.appliesUseReload = 1;
        $scope.appliesUseAoData = {};

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

        $scope.initAppliesUseData();
    }
})();

(function() {

    angular
        .module('admin.blackLists')
        .controller('BlackListsController', BlackListsController);

    BlackListsController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function BlackListsController(
        $scope,
        $rootScope,
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
                label:'All',
                value:''
            },
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
        $scope.blackListsSearch = '';

        $scope.blackListsUrl = $rootScope.URL.BLACKLISTS.GET;

        // 初始化table数据
        $scope.initBlackListsData = function () {
            $scope.blackListsReload++;
        };


        // 保存
        /**
         *
         * @param blackLists BLACKLISTSTITLE数据对象
         * @param item
         */

        $scope.saveBlackLists = function (blackLists, item) {
            var tempData = angular.extend({}, blackLists, item);
            tempData.adminId = window.userInfo && window.userInfo.admin_id || '';
            if (tempData.id) {
                delete tempData.id;
                adminService.postReq($rootScope.URL.BLACKLISTS.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initBlackListsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!tempData.id && blackLists.accountNumber) {
                adminService.patchReq($rootScope.URL.BLACKLISTS.PATCH+'/'+blackLists.accountNumber, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initBlackListsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
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
            }
        };

        // 添加按钮
        $scope.addBlackLists = function () {
            $scope.blackLists.unshift({
                "id":true,
                "accountNumber": "",
                "type": $scope.typeOptions[0].value,
                "comment":"",
                "isDeleted":false
            });
        };

        /**
         *
         * @param item 添加的BLACKLISTSTITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.account_number == '') {
                $scope.blackLists.splice(index, 1);
            }
        };

    }
})();

(function() {

    angular
        .module('admin.countriesManage')
        .controller('CountriesManageController', CountriesManageController);

    CountriesManageController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function CountriesManageController(
        $scope,
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

        // 原始的数据
        $scope.countriesManage = [];

        // 过滤出来的数据
        $scope.showCountriesManage = [];
        $scope.countriesManageReload = 1;
        $scope.countriesManageAoData = {};
        $scope.countriesManageSearch = '';

        // 初始化table数据
        $scope.initCountriesManageData = function () {
            $scope.countriesManage = [];
            adminService.getReq($rootScope.URL.COUNTRIESMANAGE.GET).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.countriesManage = angular.copy(res.data.data);
                        $scope.countriesManage.forEach(function (countriesManageItem, countriesManageIndex) {
                            countriesManageItem.id = countriesManageIndex + 1;
                            countriesManageItem.currencyCode = countriesManageItem.currency && countriesManageItem.currency.code || '';
                            countriesManageItem.numcode = countriesManageItem.numCode || '';
                            if(countriesManageItem.numCode){
                                delete countriesManageItem.numCode
                            }
                            if(countriesManageItem.currency){
                                delete countriesManageItem.currency
                            }
                        })
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        // 保存
        /**
         *
         * @param countriesManage 国家管理数据对象
         * @param item
         */

        $scope.saveCountriesManage = function (countriesManage, item) {
            var tempData = angular.extend({}, countriesManage, item);
            if (!tempData.id) {
                delete tempData.id;
                adminService.postReq($rootScope.URL.COUNTRIESMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initCountriesManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (tempData.id && countriesManage.iso) {
                delete tempData.id;
                adminService.patchReq($rootScope.URL.COUNTRIESMANAGE.PATCH+'/'+countriesManage.iso, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initCountriesManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
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

        // 添加按钮
        $scope.addCountriesManage = function () {
            $scope.countriesManageAoData = {};
            $scope.countriesManageSearch = '';
            $scope.countriesManage.unshift({
                "id": null,
                "iso": "",
                "iso3": "",
                "numcode": '',
                "name": "",
                "phoneCode": '',
                "currencyCode": '',
                "niceName": "",
            });
        };

        /**
         *
         * @param item 添加的国家管理
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.countriesManage.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initCountriesManageData();

        $scope.initCurrenciesManageData()
    }
})();

(function() {

    angular
        .module('admin.couponsManage')
        .controller('CouponsManageController', CouponsManageController);

    CouponsManageController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function CouponsManageController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.couponsManage = [];

        // 过滤出来的数据
        $scope.showCouponsManage = [];
        $scope.couponsManageReload = 1;
        $scope.couponsManageAoData = {};
        $scope.couponsManageSearch = '';

        // 初始化table数据
        $scope.initCouponsManageData = function () {
            $scope.couponsManage = [];
            adminService.getReq($rootScope.URL.COUPONSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.couponsManage = angular.copy(res.data.data);
                        $scope.couponsManage.forEach(function (couponsManageItem, couponsManageIndex) {
                            couponsManageItem.id = couponsManageIndex +1;
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        // 保存
        /**
         *
         * @param couponsManage COUPONSMANAGETITLE数据对象
         * @param item
         */

        $scope.saveCouponsManage = function (couponsManage, item) {
            var tempData = angular.extend({}, couponsManage, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.COUPONSMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initCouponsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && couponsManage.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.COUPONSMANAGE.PATCH+'/'+couponsManage.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initCouponsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除couponsManage
        /**
         * @param couponsManage COUPONSMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteCouponsManage = function (couponsManage) {
            if (!$scope.validIsNew(couponsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.COUPONSMANAGE.DELETE+'/'+couponsManage.id, {}, {}).then(function (res) {
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

        // 添加按钮
        $scope.addCouponsManage = function () {
            $scope.couponsManageAoData = {};
            $scope.couponsManageSearch = '';
            $scope.couponsManage.unshift({
                '_id': ($scope.couponsManage.length+1) + 'null',
                'couponsManageName': '',
                'couponsManageType': '',
                'couponsManageStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
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

        // 页面加载执行的函数

        $scope.initCouponsManageData();
    }
})();

(function() {

    angular
        .module('admin.currenciesManage')
        .controller('CurrenciesManageController', CurrenciesManageController);

    CurrenciesManageController.$inject = [
        '$scope',
        '$rootScope',
        '$translate',
        'adminService'
    ];

    function CurrenciesManageController(
        $scope,
        $rootScope,
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
            $scope.currenciesManage = [];
            adminService.getReq($rootScope.URL.CURRENCIESMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.currenciesManage = angular.copy(res.data.data);
                        $scope.currenciesManage.forEach(function (currenciesManageItem, currenciesManageIndex) {
                            currenciesManageItem.id = currenciesManageIndex +1;
                            currenciesManageItem.supported = currenciesManageItem.supported ? '1' : '0';
                            currenciesManageItem.symbolAfter = currenciesManageItem.symbolAfter ? '1' : '0';
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        // 保存
        /**
         *
         * @param currenciesManage 货币管理数据对象
         * @param item
         */

        $scope.saveCurrenciesManage = function (currenciesManage, item) {
            var tempData = angular.extend({}, currenciesManage, item);
            if (!tempData.id) {
                delete tempData.id;
                adminService.postReq($rootScope.URL.CURRENCIESMANAGE.GET, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initCurrenciesManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (currenciesManage.id) {
                delete tempData.id;
                adminService.patchReq($rootScope.URL.CURRENCIESMANAGE.PATCH+'/'+currenciesManage.code, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initCurrenciesManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除currenciesManage
        /**
         * @param currenciesManage 货币管理数据对象
         * @return null
         */
        $scope.deleteCurrenciesManage = function (currenciesManage) {
            if (currenciesManage.id) {
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

        // 添加按钮
        $scope.addCurrenciesManage = function () {
            $scope.currenciesManageAoData = {};
            $scope.currenciesManageSearch = '';
            $scope.currenciesManage.unshift({
                'id': null,
                'code': '',
                'name': '',
                'symbol': '',
                'symbolAfter': '0',
                'supported': '1'
            });
        };

        /**
         *
         * @param item 添加的货币管理
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.currenciesManage.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initCurrenciesManageData();
    }
})();

(function() {

    angular
        .module('admin.gameBrands')
        .controller('GameBrandsController', GameBrandsController);

    GameBrandsController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function GameBrandsController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.gameBrands = [];

        // 过滤出来的数据
        $scope.showGameBrands = [];
        $scope.gameBrandsReload = 1;
        $scope.gameBrandsAoData = {};
        $scope.gameBrandsSearch = '';

        // 初始化table数据
        $scope.initGameBrandsData = function () {
            $scope.gameBrands = [];
            adminService.getReq($rootScope.URL.GAMEBRANDS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.gameBrands = angular.copy(res.data.data);
                        $scope.gameBrands.forEach(function (gameBrandsItem, gameBrandsIndex) {
                            gameBrandsItem.id = gameBrandsIndex +1;
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        // 保存
        /**
         *
         * @param gameBrands GAMEBRANDSTITLE数据对象
         * @param item
         */

        $scope.saveGameBrands = function (gameBrands, item) {
            var tempData = angular.extend({}, gameBrands, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.GAMEBRANDS.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGameBrandsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && gameBrands.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.GAMEBRANDS.PATCH+'/'+gameBrands.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGameBrandsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除gameBrands
        /**
         * @param gameBrands GAMEBRANDSTITLE数据对象
         * @return null
         */
        $scope.deleteGameBrands = function (gameBrands) {
            if (!$scope.validIsNew(gameBrands._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.GAMEBRANDS.DELETE+'/'+gameBrands.id, {}, {}).then(function (res) {
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

        // 添加按钮
        $scope.addGameBrands = function () {
            $scope.gameBrandsAoData = {};
            $scope.gameBrandsSearch = '';
            $scope.gameBrands.unshift({
                '_id': ($scope.gameBrands.length+1) + 'null',
                'gameBrandsName': '',
                'gameBrandsType': '',
                'gameBrandsStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的GAMEBRANDSTITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.gameBrands.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initGameBrandsData();
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
            $scope.gameCategories = [];
            adminService.getReq($rootScope.URL.GAMECATEGORIES.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.gameCategories = angular.copy(res.data.data);
                        $scope.gameCategories.forEach(function (paymentMethodsItem, paymentMethodsIndex) {
                            paymentMethodsItem._id = paymentMethodsIndex +1;
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        // 展示弹窗
        $scope.showGameCategoriesNameModal = function (item) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/gameCategories/gameCategoriesNameModal.html',
                controller: 'GameCategoriesNameModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    GameCategoriesNameItem: item
                }
            });
            modalInstance.result.then(function (data) {
                if(data.type == 'name'){
                    $scope.gameCategories.forEach(function(gameCategoriesItem) {
                        if (gameCategoriesItem.id == data.data.id) {
                            gameCategoriesItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.gameCategoriesReload++;
                        }
                    });
                }
            }, function (data) {
                if(data.type == 'name'){
                    $scope.gameCategories.forEach(function(gameCategoriesItem) {
                        if (gameCategoriesItem.id == data.data.id) {
                            gameCategoriesItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.gameCategoriesReload++;
                        }
                    });
                }
            });
        };



        // 保存
        /**
         *
         * @param gameCategories GAMECATEGORIESTITLE数据对象
         * @param item
         */

        $scope.saveGameCategories = function (gameCategories, item) {
            var tempData = angular.extend({}, gameCategories, item);
            if ($scope.validIsNew(gameCategories._id)) {
                delete tempData._id;
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
                adminService.postReq($rootScope.URL.GAMECATEGORIES.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGameCategoriesData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(gameCategories._id) && gameCategories.id) {
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
                adminService.patchReq($rootScope.URL.GAMECATEGORIES.PATCH+'/'+gameCategories.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGameCategoriesData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
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

        // 添加按钮
        $scope.addGameCategories = function () {
            $scope.gameCategoriesAoData = {};
            $scope.gameCategoriesSearch = '';
            $scope.gameCategories.unshift({
                '_id': ($scope.gameCategories.length+1) + 'null',
                'name': []
            });
        };

        /**
         *
         * @param item 添加的GAMECATEGORIESTITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.gameCategories.splice(index, 1);
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
        .controller('GameCategoriesNameModalController', GameCategoriesNameModalController);

    GameCategoriesNameModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'GameCategoriesNameItem'
    ];

    function GameCategoriesNameModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        GameCategoriesNameItem
    ) {

        // 原始的数据
        $scope.gameCategoriesNameModal = [];

        // 过滤出来的数据
        $scope.showGameCategoriesNameModal = [];
        $scope.gameCategoriesNameModalReload = 1;
        $scope.gameCategoriesNameModalAoData = {};
        $scope.gameCategoriesNameModalSearch = '';

        var baseGameCategoriesName = angular.copy(GameCategoriesNameItem);

        // 初始化table数据
        $scope.initGameCategoriesNameModalData = function () {
            $scope.gameCategoriesNameModal = [];
            console.log(GameCategoriesNameItem,'GameCategoriesNameItem')
            if(GameCategoriesNameItem['name'].length){
                $scope.gameCategoriesNameModal = GameCategoriesNameItem['name'];
                $scope.gameCategoriesNameModal.forEach(function (gameCategoriesNameItem, gameCategoriesNameIndex) {
                    gameCategoriesNameItem.id = gameCategoriesNameIndex + 1;
                })
            }
        };


        // 保存
        /**
         *
         * @param gameCategoriesNameModal 渠道名称数据对象
         * @param data
         */

        $scope.saveGameCategoriesNameModal = function (gameCategoriesNameModal, data) {
            $scope.gameCategoriesNameModal.forEach(function (gameCategoriesNameModalItem) {
                if(gameCategoriesNameModalItem.id == gameCategoriesNameModal.id){
                    window.Object.assign(gameCategoriesNameModalItem, data);
                    if($scope.validIsNew(gameCategoriesNameModalItem.id)){
                        gameCategoriesNameModalItem.id = window.parseInt(gameCategoriesNameModalItem.id, 10)
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param gameCategoriesNameModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteGameCategoriesNameModal = function (gameCategoriesNameModal, index) {
            $scope.gameCategoriesNameModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addGameCategoriesNameModal = function () {
            $scope.gameCategoriesNameModalAoData = {};
            $scope.gameCategoriesNameModalSearch = '';
            $scope.gameCategoriesNameModal.unshift({
                'id': ($scope.gameCategoriesNameModal.length+1) + 'null',
                "locale": $scope.localesOptions[0] ? $scope.localesOptions[0].value : '',
                "value": ''
            });
        };

        /**
         *
         * @param GameCategoriesNameItem 添加的渠道名称
         * @param index 添加的index
         */

        $scope.cancelSaveModal = function (GameCategoriesNameItem, index) {
            if ($scope.validIsNew(GameCategoriesNameItem.id)) {
                $scope.gameCategoriesNameModal.splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            $scope.gameCategoriesNameModal = $scope.gameCategoriesNameModal.filter(function (gameCategoriesNameItem) {
                return !$scope.validIsNew(gameCategoriesNameItem.id);
            });
            $scope.gameCategoriesNameModal.forEach(function (gameCategoriesNameItem, gameCategoriesNameIndex) {
                if(gameCategoriesNameItem.id){
                    delete gameCategoriesNameItem.id;
                }
            });
            if($scope.gameCategoriesNameModal && $scope.gameCategoriesNameModal.length){
                var tempObj = {};
                var sameKey = false;
                $scope.gameCategoriesNameModal.map(function(nameItem) {
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
            baseGameCategoriesName.name = $scope.gameCategoriesNameModal;
            $uibModalInstance.close({
                type:'name',
                data:baseGameCategoriesName
            });
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss({
                type:'name',
                data:baseGameCategoriesName
            });
        };

        // 页面加载执行的函数

        $scope.initGameCategoriesNameModalData();

    }
})();

(function() {

    angular
        .module('admin.gamesManage')
        .controller('GamesManageController', GamesManageController);

    GamesManageController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function GamesManageController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.gamesManage = [];

        // 过滤出来的数据
        $scope.showGamesManage = [];
        $scope.gamesManageReload = 1;
        $scope.gamesManageAoData = {};
        $scope.gamesManageSearch = '';

        // 初始化table数据
        $scope.initGamesManageData = function () {
            $scope.gamesManage = [];
            adminService.getReq($rootScope.URL.GAMESMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.gamesManage = angular.copy(res.data.data);
                        $scope.gamesManage.forEach(function (gamesManageItem, gamesManageIndex) {
                            gamesManageItem.id = gamesManageIndex +1;
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        // 保存
        /**
         *
         * @param gamesManage GAMESMANAGETITLE数据对象
         * @param item
         */

        $scope.saveGamesManage = function (gamesManage, item) {
            var tempData = angular.extend({}, gamesManage, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.GAMESMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGamesManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && gamesManage.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.GAMESMANAGE.PATCH+'/'+gamesManage.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGamesManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
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
            $scope.gamesManageAoData = {};
            $scope.gamesManageSearch = '';
            $scope.gamesManage.unshift({
                '_id': ($scope.gamesManage.length+1) + 'null',
                'gamesManageName': '',
                'gamesManageType': '',
                'gamesManageStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
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

        $scope.initGamesManageData();
    }
})();

(function() {

    angular
        .module('admin.gamesProducts')
        .controller('GamesProductsController', GamesProductsController);

    GamesProductsController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function GamesProductsController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.gamesProducts = [];

        // 过滤出来的数据
        $scope.showGamesProducts = [];
        $scope.gamesProductsReload = 1;
        $scope.gamesProductsAoData = {};
        $scope.gamesProductsSearch = '';

        // 初始化table数据
        $scope.initGamesProductsData = function () {
            $scope.gamesProducts = [];
            adminService.getReq($rootScope.URL.GAMESPRODUCTS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.gamesProducts = angular.copy(res.data.data);
                        $scope.gamesProducts.forEach(function (gamesProductsItem, gamesProductsIndex) {
                            gamesProductsItem.id = gamesProductsIndex +1;
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        // 保存
        /**
         *
         * @param gamesProducts GAMESPRODUCTSTITLE数据对象
         * @param item
         */

        $scope.saveGamesProducts = function (gamesProducts, item) {
            var tempData = angular.extend({}, gamesProducts, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.GAMESPRODUCTS.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGamesProductsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && gamesProducts.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.GAMESPRODUCTS.PATCH+'/'+gamesProducts.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGamesProductsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除gamesProducts
        /**
         * @param gamesProducts GAMESPRODUCTSTITLE数据对象
         * @return null
         */
        $scope.deleteGamesProducts = function (gamesProducts) {
            if (!$scope.validIsNew(gamesProducts._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.GAMESPRODUCTS.DELETE+'/'+gamesProducts.id, {}, {}).then(function (res) {
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

        // 添加按钮
        $scope.addGamesProducts = function () {
            $scope.gamesProductsAoData = {};
            $scope.gamesProductsSearch = '';
            $scope.gamesProducts.unshift({
                '_id': ($scope.gamesProducts.length+1) + 'null',
                'gamesProductsName': '',
                'gamesProductsType': '',
                'gamesProductsStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的GAMESPRODUCTSTITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.gamesProducts.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initGamesProductsData();
    }
})();

(function() {

    angular
        .module('admin.localeLanguage')
        .controller('LocaleLanguageController', LocaleLanguageController);

    LocaleLanguageController.$inject = [
        '$scope',
        '$rootScope',
        'adminService',
        '$translate'
    ];

    function LocaleLanguageController(
        $scope,
        $rootScope,
        adminService,
        $translate
    ) {

        // 原始的数据
        $scope.localeLanguage = [];

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

        // 过滤出来的数据
        $scope.showLocaleLanguage = [];
        $scope.localeLanguageReload = 1;
        $scope.localeLanguageAoData = {};
        $scope.localeLanguageSearch = '';

        // 初始化table数据
        $scope.initLocaleLanguageData = function () {
            $scope.localeLanguage = [];
            adminService.getReq($rootScope.URL.LOCALELANGUAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.localeLanguage = angular.copy(res.data.data);
                        $scope.localeLanguage.forEach(function (localeLanguageItem, localeLanguageIndex) {
                            localeLanguageItem.id = localeLanguageIndex +1;
                            localeLanguageItem.supported = localeLanguageItem.supported ? '1' : '0';
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        // 保存
        /**
         *
         * @param localeLanguage 本地语言数据对象
         * @param item
         */

        $scope.saveLocaleLanguage = function (localeLanguage, item) {
            var tempData = angular.extend({}, localeLanguage, item);
            if (!tempData.id) {
                delete tempData.id;
                adminService.postReq($rootScope.URL.LOCALELANGUAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initLocaleLanguageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (tempData.id && localeLanguage.code) {
                delete tempData.id;
                adminService.patchReq($rootScope.URL.LOCALELANGUAGE.PATCH+'/'+localeLanguage.code, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initLocaleLanguageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }

            return '';
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

        // 添加的本地语言
        $scope.addLocaleLanguage = function () {
            $scope.localeLanguageAoData = {};
            $scope.localeLanguageSearch = '';
            $scope.localeLanguage.unshift({
                "id": null,
                "code": "",
                "name": "",
                "supported": '1'
            })
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
        .module('admin.ordersManage')
        .controller('OrderAddModalController', OrderAddModalController);

    OrderAddModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        '$translate'
    ];

    function OrderAddModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        $translate
    ) {

        $scope.orderAdd = {
            order_no: '',
            trade_no: '',
            amount: '',
            adminId: window.userInfo && window.userInfo.admin_id || ''
        };

        $scope.confirmOrderAddModal = function () {
            adminService.postReq($rootScope.URL.ORDERSMANAGE.POST+'/'+$scope.orderAdd.order_no, {}, $scope.orderAdd).then(function (res) {
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

        $scope.ordersManageUrl = $rootScope.URL.ORDERSMANAGE.GET;

        // 原始的数据
        $scope.ordersManage = [];

        $scope.advancedSearch = false;

        // 过滤出来的数据
        $scope.ordersManageReload = 1;
        $scope.ordersManageAoData = {};

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
        $scope.addOrdersManage = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/ordersManage/orderAddModal.html',
                controller: 'OrderAddModalController',
                size: 'md',
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
            adminService.getReq($rootScope.URL.ORDERSMANAGE.GET + '/' + item.id, {}, {}).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    console.log(res.data.data)
                    if (res.data.success) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: '/views/admin/ordersManage/orderDetailModal.html',
                            controller: 'OrderDetailModalController',
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

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.ordersManageAoData.start_time = $scope.searchTimeStart.format('YYYY-MM-DD') + ' 00:00:00';
                } else {
                    if ($scope.ordersManageAoData.start_time) {
                        delete $scope.ordersManageAoData.start_time;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.ordersManageAoData.end_time = $scope.searchTimeEnd.format('YYYY-MM-DD') + ' 23:59:59';
                } else {
                    if ($scope.ordersManageAoData.end_time) {
                        delete $scope.ordersManageAoData.end_time;
                    }
                }
            }
        });

    }
})();

(function() {

    angular
        .module('admin.pspsManage')
        .controller('PspsManageController', PspsManageController);

    PspsManageController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function PspsManageController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.pspsManage = [];

        // 过滤出来的数据
        $scope.showPspsManage = [];
        $scope.pspsManageReload = 1;
        $scope.pspsManageAoData = {};
        $scope.pspsManageSearch = '';

        // 初始化table数据
        $scope.initPspsManageData = function () {
            $scope.pspsManage = [];
            adminService.getReq($rootScope.URL.PSPSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.pspsManage = angular.copy(res.data.data);
                        $scope.pspsManage.forEach(function (pspsManageItem, pspsManageIndex) {
                            pspsManageItem.id = pspsManageIndex +1;
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        // 保存
        /**
         *
         * @param pspsManage PSPSMANAGETITLE数据对象
         * @param item
         */

        $scope.savePspsManage = function (pspsManage, item) {
            var tempData = angular.extend({}, pspsManage, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.PSPSMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initPspsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && pspsManage.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.PSPSMANAGE.PATCH+'/'+pspsManage.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initPspsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除pspsManage
        /**
         * @param pspsManage PSPSMANAGETITLE数据对象
         * @return null
         */
        $scope.deletePspsManage = function (pspsManage) {
            if (!$scope.validIsNew(pspsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.PSPSMANAGE.DELETE+'/'+pspsManage.id, {}, {}).then(function (res) {
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

        // 添加按钮
        $scope.addPspsManage = function () {
            $scope.pspsManageAoData = {};
            $scope.pspsManageSearch = '';
            $scope.pspsManage.unshift({
                '_id': ($scope.pspsManage.length+1) + 'null',
                'pspsManageName': '',
                'pspsManageType': '',
                'pspsManageStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的PSPSMANAGETITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.pspsManage.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initPspsManageData();
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

        $scope.showEditMethodsNameModal = function (item) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/paymentMethods/paymentMethodsNameModal.html',
                controller: 'PaymentMethodsNameModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    MethodsNameItem: item
                }
            });
            modalInstance.result.then(function (data) {
                if(data.type == 'name'){
                    $scope.paymentMethods.forEach(function(paymentMethodsItem) {
                        if (paymentMethodsItem.id == data.data.id) {
                            paymentMethodsItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.paymentMethodsReload++;
                        }
                    });
                }
            }, function (data) {
                if(data.type == 'name'){
                    $scope.paymentMethods.forEach(function(paymentMethodsItem) {
                        if (paymentMethodsItem.id == data.data.id) {
                            paymentMethodsItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.paymentMethodsReload++;
                        }
                    });
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
            $scope.paymentMethods = [];
            adminService.getReq($rootScope.URL.PAYMENTMETHODS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.paymentMethods = angular.copy(res.data.data);
                        $scope.paymentMethods.forEach(function (paymentMethodsItem, paymentMethodsIndex) {
                            paymentMethodsItem.id = paymentMethodsIndex +1;
                            paymentMethodsItem.min = paymentMethodsItem['range'] && paymentMethodsItem['range'].min || '';
                            paymentMethodsItem.max = paymentMethodsItem['range'] && paymentMethodsItem['range'].max || '';
                            paymentMethodsItem.disabled = paymentMethodsItem.disabled ? '1' : '0';
                        });
                        console.log($scope.paymentMethods)
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        // 保存
        /**
         *
         * @param paymentMethods PAYMENTMETHODSTITLE数据对象
         * @param item
         */

        $scope.savePaymentMethods = function (paymentMethods, item) {
            var tempData = angular.extend({}, paymentMethods, item);
            if ($scope.validIsNew(paymentMethods.id)) {
                delete tempData.id;
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
                adminService.postReq($rootScope.URL.PAYMENTMETHODS.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initPaymentMethodsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(paymentMethods.id) && paymentMethods.code) {
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
                adminService.patchReq($rootScope.URL.PAYMENTMETHODS.PATCH+'/'+paymentMethods.code, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initPaymentMethodsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
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
            if (!$scope.validIsNew(paymentMethods.id) && paymentMethods.code) {
                adminService.putReq($rootScope.URL.PAYMENTMETHODS.DELETE+'/'+paymentMethods.code, {}, {}).then(function (res) {
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
            }
        };

        // 添加按钮
        $scope.addPaymentMethods = function () {
            $scope.paymentMethodsAoData = {};
            $scope.paymentMethodsSearch = '';
            $scope.paymentMethods.unshift({
                'id': ($scope.paymentMethods.length+1) + 'null',
                "code": "",
                "currency": $scope.currencyOptions[0].value,
                "min": '',
                "max": '',
                "disabled": false,
                "type": $scope.typeOptions[0].value,
                "name": []
            });
        };

        /**
         *
         * @param item 添加的PAYMENTMETHODSTITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item.id)) {
                $scope.paymentMethods.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initPaymentMethodsData();

        $scope.initCurrenciesManageData();

        $scope.initLocalesOptionsData();

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
        'MethodsNameItem'
    ];

    function PaymentMethodsNameModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        MethodsNameItem
    ) {

        // 原始的数据
        $scope.methodsNameModal = [];

        // 过滤出来的数据
        $scope.showMethodsNameModal = [];
        $scope.methodsNameModalReload = 1;
        $scope.methodsNameModalAoData = {};
        $scope.methodsNameModalSearch = '';

        var baseMethodsName = angular.copy(MethodsNameItem);

        // 初始化table数据
        $scope.initMethodsNameModalData = function () {
            $scope.methodsNameModal = [];
            console.log(MethodsNameItem,'MethodsNameItem')
            if(MethodsNameItem['name'].length){
                $scope.methodsNameModal = MethodsNameItem['name'];
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
         * @param MethodsNameItem 添加的渠道名称
         * @param index 添加的index
         */

        $scope.cancelSaveModal = function (MethodsNameItem, index) {
            if ($scope.validIsNew(MethodsNameItem.id)) {
                $scope.methodsNameModal.splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            $scope.methodsNameModal = $scope.methodsNameModal.filter(function (methodsNameItem) {
                return !$scope.validIsNew(methodsNameItem.id);
            });
            $scope.methodsNameModal.forEach(function (methodsNameItem, methodsNameIndex) {
                if(methodsNameItem.id){
                    delete methodsNameItem.id;
                }
            });
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
            baseMethodsName.name = $scope.methodsNameModal;
            $uibModalInstance.close({
                type:'name',
                data:baseMethodsName
            });
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss({
                type:'name',
                data:baseMethodsName
            });
        };

        // 页面加载执行的函数

        $scope.initMethodsNameModalData();

    }
})();

(function() {

    angular
        .module('admin.transactionsDetail')
        .controller('TransactionsDetailController', TransactionsDetailController);

    TransactionsDetailController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function TransactionsDetailController(
        $scope,
        $rootScope,
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

        $scope.timezone = '+00:00';

        $scope.transactionsDetail = [];
        $scope.transactionsDetailReload = 1;
        $scope.transactionsDetailAoData = {
            user_id: '',
            affiliate_id: '',
            service_id: '',
            // service: '',
            min_amount: '',
            max_amount: '',
            wallet_code: '',
            timezone: "+00:00"
        };

        $scope.validTimeZone = function () {
            console.log($scope.validReg('[+-]\\d{2}:\\d{2}$',$scope.timezone,'77777'))
            if(/[+-]\d{2}:\d{2}$/.test($scope.timezone)){
                $scope.transactionsDetailAoData.timezone = $scope.timezone;
            }else{
                $rootScope.alertErrorMsg('Formatting error,The right example +00:00');
            }
        };

        $scope.advancedSearch = false;

        /**
         * 高级搜索控制
         */
        $scope.switchAdvancedSearch = function () {
            $scope.advancedSearch = !$scope.advancedSearch;
        };

        $scope.transactionsUrl = $rootScope.URL.TRANSACTIONSDETAIL.GET;

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.transactionsDetailAoData.start_time = $scope.searchTimeStart.format('YYYY-MM-DD') + ' 00:00:00';
                } else {
                    if ($scope.transactionsDetailAoData.start_time) {
                        delete $scope.transactionsDetailAoData.start_time;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.transactionsDetailAoData.end_time = $scope.searchTimeEnd.format('YYYY-MM-DD') + ' 23:59:59';
                } else {
                    if ($scope.transactionsDetailAoData.end_time) {
                        delete $scope.transactionsDetailAoData.end_time;
                    }
                }
            }
        });

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



        // 原始的数据
        $scope.conditionsModal = [];

        // 过滤出来的数据
        $scope.showConditionsModal = [];
        $scope.conditionsModalReload = 1;
        $scope.conditionsModalAoData = {};
        $scope.conditionsModalSearch = '';

        var baseConditions = angular.copy(item);

        // 初始化table数据
        $scope.initConditionsModalData = function () {
            $scope.conditionsModal = [];
            if(item['conditions'].length){
                $scope.conditionsModal = item['conditions'];
                $scope.conditionsModal.forEach(function (conditionsItem, conditionsIndex) {
                    conditionsItem.id = conditionsIndex + 1;
                })
            }
        };


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

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item.id)) {
                $scope.conditionsModal.splice(index, 1);
            }
        };

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
                "brand": "",
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

        $scope.productOptions = [
            {
                label: 'SLOTS',
                value: 'SLOTS'
            },
            {
                label: 'LIVE',
                value: 'LIVE'
            },
            {
                label: 'SPORTS',
                value: 'SPORTS'
            },
            {
                label: 'LOTTERY',
                value: 'LOTTERY'
            }
        ];

        // 原始的数据
        $scope.rebatesModal = [];

        var baseRebates = angular.copy(item);

        // 过滤出来的数据
        $scope.showRebatesModal = [];
        $scope.rebatesModalReload = 1;
        $scope.rebatesModalAoData = {};
        $scope.rebatesModalSearch = '';

        // 初始化table数据
        $scope.initRebatesModalData = function () {
            $scope.rebatesModal = [];
            if(item['rebates'].length){
                $scope.rebatesModal = item['rebates'];
                $scope.rebatesModal.forEach(function (rebatesItem, rebatesIndex) {
                    rebatesItem.id = rebatesIndex + 1;
                })
            }
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
                        if (rebatesModalItem.id == data.data.id) {
                            rebatesModalItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.rebatesModalReload++;
                        }
                    });
                }
                modalInstance = null
            }, function (data) {
                if(data.type == 'brands'){
                    $scope.rebatesModal.forEach(function(rebatesModalItem) {
                        if (rebatesModalItem.id == data.data.id) {
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

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item.id)) {
                $scope.rebatesModal.splice(index, 1);
            }
        };

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

        var baseTreatments = angular.copy(item);

        // 原始的数据
        $scope.treatmentsModal = [];

        // 过滤出来的数据
        $scope.showTreatmentsModal = [];
        $scope.treatmentsModalReload = 1;
        $scope.treatmentsModalAoData = {};
        $scope.treatmentsModalSearch = '';

        // 初始化table数据
        $scope.initTreatmentsModalData = function () {
            $scope.treatmentsModal = [];
            if(item['treatments'].length){
                $scope.treatmentsModal = item['treatments'];
                $scope.treatmentsModal.forEach(function (treatmentsItem, treatmentsIndex) {
                    treatmentsItem.id = treatmentsIndex + 1;
                })
            }
        };


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

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item.id)) {
                $scope.treatmentsModal.splice(index, 1);
            }
        };

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

        $scope.currencyOptions = [];

        // 原始的数据
        $scope.userLevel = [];

        // 过滤出来的数据
        $scope.showUserLevel = [];
        $scope.userLevelReload = 1;
        $scope.userLevelAoData = {};
        $scope.userLevelSearch = '';

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
            $scope.userLevel = [];
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
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        /**
         * 根据传入的modal名称进行弹窗显示
         * @param modal 弹窗的名称
         * @param item 弹窗的数据
         */

        $scope.showEditModal = function (modal,item) {
            var templateName = '';
            var controllerName = '';
            if(modal == 'conditions'){
                templateName = 'conditionsModal';
                controllerName = 'UserLevelConditionsModalController';
            }else if(modal == 'treatments'){
                templateName = 'treatmentsModal';
                controllerName = 'UserLevelTreatmentsModalController';
            }else if(modal == 'rebates'){
                templateName = 'rebatesModal';
                controllerName = 'UserLevelRebatesModalController';
            }else{
                return;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/userLevel/'+templateName+'.html',
                controller: controllerName,
                size: 'lg',
                scope:$scope,
                resolve: {
                    item: item
                }
            });
            modalInstance.result.then(function(data) {
                if (['conditions', 'treatments', 'rebates'].indexOf(data.type) !== -1) {
                    $scope.userLevel.forEach(function(userLevelItem) {
                        if (userLevelItem.id == data.data.id) {
                            userLevelItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.userLevelReload++;
                        }
                    });
                }
                modalInstance = null;
            }, function(data) {
                if (['conditions', 'treatments', 'rebates'].indexOf(data.type) !== -1) {
                    $scope.userLevel.forEach(function(userLevelItem) {
                        if (userLevelItem.id == data.data.id) {
                            userLevelItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.userLevelReload++;
                        }
                    });
                }
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

        // 添加按钮
        $scope.addUserLevel = function () {
            $scope.userLevelAoData = {};
            $scope.userLevelSearch = '';
            $scope.userLevel.unshift({
                'id': ($scope.userLevel.length+1) + 'null',
                'code': '',
                'default': '0',
                'level': '',
                'conditions': [],
                'treatments': [],
                'rebates': []
            });
        };

        /**
         *
         * @param item 添加的用户等级
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item.id)) {
                $scope.userLevel.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initUserLevelData();

        $scope.initCurrenciesManageData();
    }
})();

(function() {

    angular
        .module('admin.withdrawsManage')
        .controller('WithdrawsManageController', WithdrawsManageController);

    WithdrawsManageController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function WithdrawsManageController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.withdrawsManage = [];

        // 过滤出来的数据
        $scope.showWithdrawsManage = [];
        $scope.withdrawsManageReload = 1;
        $scope.withdrawsManageAoData = {};
        $scope.withdrawsManageSearch = '';

        // 初始化table数据
        $scope.initWithdrawsManageData = function () {
            $scope.withdrawsManage = [];
            adminService.getReq($rootScope.URL.WITHDRAWSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.withdrawsManage = angular.copy(res.data.data);
                        $scope.withdrawsManage.forEach(function (withdrawsManageItem, withdrawsManageIndex) {
                            withdrawsManageItem.id = withdrawsManageIndex +1;
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        // 保存
        /**
         *
         * @param withdrawsManage WITHDRAWSMANAGETITLE数据对象
         * @param item
         */

        $scope.saveWithdrawsManage = function (withdrawsManage, item) {
            var tempData = angular.extend({}, withdrawsManage, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.WITHDRAWSMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initWithdrawsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && withdrawsManage.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.WITHDRAWSMANAGE.PATCH+'/'+withdrawsManage.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initWithdrawsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除withdrawsManage
        /**
         * @param withdrawsManage WITHDRAWSMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteWithdrawsManage = function (withdrawsManage) {
            if (!$scope.validIsNew(withdrawsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.WITHDRAWSMANAGE.DELETE+'/'+withdrawsManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initWithdrawsManageData();
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
        $scope.addWithdrawsManage = function () {
            $scope.withdrawsManageAoData = {};
            $scope.withdrawsManageSearch = '';
            $scope.withdrawsManage.unshift({
                '_id': ($scope.withdrawsManage.length+1) + 'null',
                'withdrawsManageName': '',
                'withdrawsManageType': '',
                'withdrawsManageStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的WITHDRAWSMANAGETITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.withdrawsManage.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initWithdrawsManageData();
    }
})();
