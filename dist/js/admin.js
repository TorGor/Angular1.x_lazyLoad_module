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
        .module('admin.paymentMethods', [
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
        '$rootScope',
        '$translate'
    ];

    function appRun(
        $rootScope,
        $translate
    ) {

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
                console.log(url,88888)
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
            '                                ng-model="searchValue"\n' +
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

                if(!$scope.outputValue){
                    $scope.outputValue = ''
                }

                if(!$scope.outputkey){
                    $scope.outputkey = ''
                }
                if(!$scope.searchkey){
                    $scope.searchkey = $scope.outputValue
                }
                if(!$scope.inputPlaceholder){
                    $scope.inputPlaceholder = 'search value'
                }

                $scope.inputStatu=$scope.inputStatu||false;
                $scope.searchDataFromServer = function (value) {
                    var temAoData = {
                        page: 1,
                        pageSize: 25
                    };
                    if($scope.searchkey){
                        temAoData[$scope.searchkey] = value||'';
                    }
                    adminService.getReq($scope.url,temAoData,{}).then(function (data){
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
                                })
                            }
                        }else{
                            $scope.allItems=[];
                        }
                    });
                };
                $scope.handelSelect = function($item, $model) {
                    $scope.outputValue = $item['_value']||'';
                    $($element).find('.ui-select-search').val($model)
                };

                $timeout(function() {
                    $($element).find('.ui-select-search').bind('keyup', function(e) {
                        var tempvalue = e.target.value;
                        if(!tempvalue){
                            $scope.outputValue = '';
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
                    $($element).find('.ui-select-search').bind('focus',function(e) {
                        var tempvalue = e.target.value;
                        $scope.searchDataFromServer(tempvalue);
                    })
                },10)
            }
        }
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
            adminId: window.userInfo && window.userInfo.adminId || ''
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
            adminId: window.userInfo && window.userInfo.adminId || ''
        };

        $scope.confirmModal = function () {
            adminService.postReq($rootScope.URL.ORDERSMANAGE.PATCH+'/'+item.id, {}, $scope.orderAdd).then(function (res) {
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
    }
})();

(function() {

    angular
        .module('admin.bigwinsManage')
        .controller('BigwinsManageController', BigwinsManageController);

    BigwinsManageController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function BigwinsManageController(
        $scope,
        $rootScope,
        adminService
    ) {

        $scope.bigwinsManageUrl = $rootScope.URL.BIGWINSMANAGE.GET;

        // 原始的数据
        $scope.bigwinsManage = [];
        $scope.bigwinsManageReload = 1;
        $scope.bigwinsManageAoData = {};

        // 初始化table数据
        $scope.initBigwinsManageData = function () {
            $scope.bigwinsManageReload++;
        };


        // 保存
        /**
         *
         * @param bigwinsManage BIGWINSMANAGETITLE数据对象
         * @param item
         */

        $scope.saveBigwinsManage = function (bigwinsManage, item) {
            var tempData = angular.extend({}, bigwinsManage, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.BIGWINSMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initBigwinsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && bigwinsManage.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.BIGWINSMANAGE.PATCH+'/'+bigwinsManage.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initBigwinsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除bigwinsManage
        /**
         * @param bigwinsManage BIGWINSMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteBigwinsManage = function (bigwinsManage) {
            if (!$scope.validIsNew(bigwinsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.BIGWINSMANAGE.DELETE+'/'+bigwinsManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initBigwinsManageData();
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
        $scope.addBigwinsManage = function () {
            $scope.bigwinsManageAoData = {};
            $scope.bigwinsManageSearch = '';
            $scope.bigwinsManage.unshift({
                '_id': ($scope.bigwinsManage.length+1) + 'null',
                'bigwinsManageName': '',
                'bigwinsManageType': '',
                'bigwinsManageStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
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
                $scope.initOrdersManageData()
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
            $scope.couponsItem.startTime = $scope.couponsItem.period.from || '';
            $scope.couponsItem.endTime = $scope.couponsItem.period.to || '';
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
                    $scope.couponsItem.startTime = $scope.timeStart.format && $scope.timeStart.format('YYYY-MM-DD') + ' 00:00:00';
                } else {
                    $scope.couponsItem.startTime = '';
                }
                if ($scope.timeEnd) {
                    $scope.couponsItem.endTime = $scope.timeEnd.format && $scope.timeEnd.format('YYYY-MM-DD') + ' 23:59:59';
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
                    $scope.gameRecordsAoData.start_time = $scope.searchTimeStart.format('YYYY-MM-DD') + ' 00:00:00';
                } else {
                    if ($scope.gameRecordsAoData.start_time) {
                        delete $scope.gameRecordsAoData.start_time;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.gameRecordsAoData.end_time = $scope.searchTimeEnd.format('YYYY-MM-DD') + ' 23:59:59';
                } else {
                    if ($scope.gameRecordsAoData.end_time) {
                        delete $scope.gameRecordsAoData.end_time;
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
        $scope.gamesManageAoData = {};

        // 初始化table数据
        $scope.initGamesManageData = function () {
            $scope.gamesManageReload++;
        };

        $scope.handleGamesManageData = function(arr) {
            arr.forEach(function (gamesManageItem, gamesManageIndex) {
                gamesManageItem._id = gamesManageIndex +1;
                gamesManageItem.currentJackpot = '';
                gamesManageItem.categories = [];
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
            });
            return arr;
        };


        $scope.showEditGamesManageModal = function (game,edit) {
            var modalInstance = $uibModal.open({
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
            modalInstance.result.then(function(data) {
                $scope.initGamesManageData()
            }, function(data) {
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
                rebateable: '',
                bigwinable: '',
                categories: [],
                isNew: '',
                isComingSoon: '',
                isRecommend: ''
            };
        }

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
            adminId: window.userInfo && window.userInfo.adminId || ''
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

        $scope.showDetailName = function(data) {
            var str = '';
            if(window.Array.isArray(data)){
                data.map(function(item, index) {
                    str = str + (item.locale||'') + ':' + (item.value||'') + (index === (data.length-1)?'':',')
                })
            }
            return str;
        };

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

        $scope.ordersManageAoData.wallet = ''
        $scope.ordersManageAoData.method = ''

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

        $scope.$watch('search.wallet.length+search.method.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.ordersManageAoData.wallet = $scope.search.wallet.join(',');
                $scope.ordersManageAoData.method = $scope.search.method.join(',');
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
                        console.log($scope.paymentMethods)
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

        // 初始化table数据
        $scope.initPromotionsManageData = function () {
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
            $scope.promotionsItem.startTime = ($scope.promotionsItem.period.from || '').substr(0,10);
            $scope.promotionsItem.endTime = ($scope.promotionsItem.period.to || '').substr(0,10);
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
            $scope.promotionsItem['content'].splice(index, 1)
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

        $scope.confirmModal = function () {
            console.log($scope.promotionsItem,6666)
            return;
            var tempData = angular.copy($scope.promotionsItem);
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
            if (!edit) {
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
            } else if (edit) {
                adminService.patchReq($rootScope.URL.COUPONSMANAGE.PATCH+'/'+promotionsItem.code, {}, tempData).then(function (res) {
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
                    $scope.promotionsItem.startTime = $scope.timeStart.format && $scope.timeStart.format('YYYY-MM-DD') + ' 00:00:00';
                } else {
                    $scope.promotionsItem.startTime = '';
                }
                if ($scope.timeEnd) {
                    $scope.promotionsItem.endTime = $scope.timeEnd.format && $scope.timeEnd.format('YYYY-MM-DD') + ' 23:59:59';
                } else {
                    $scope.promotionsItem.endTime = '';
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
                                temp.label = paymentMethodsItem.code;
                                temp.value = paymentMethodsItem.code;
                                $scope.methodsOptions.push(temp)
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
                $scope.pspsManageReload++;
            }, function (data) {
                $scope.pspsManageReload++;
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
                    $scope.rebatesListAoData.start_time = $scope.searchTimeStart.format('YYYY-MM-DD') + ' 00:00:00';
                } else {
                    if ($scope.rebatesListAoData.start_time) {
                        delete $scope.rebatesListAoData.start_time;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.rebatesListAoData.end_time = $scope.searchTimeEnd.format('YYYY-MM-DD') + ' 23:59:59';
                } else {
                    if ($scope.rebatesListAoData.end_time) {
                        delete $scope.rebatesListAoData.end_time;
                    }
                }
            }
        });
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

        // 原始的数据
        $scope.reliefsList = [];

        // 过滤出来的数据
        $scope.showReliefsList = [];
        $scope.reliefsListReload = 1;
        $scope.reliefsListAoData = {};
        $scope.reliefsListSearch = '';

        // 初始化table数据
        $scope.initReliefsListData = function () {
            //$scope.reliefsList = [];
            adminService.getReq($rootScope.URL.RELIEFSLIST.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.reliefsList = angular.copy(res.data.data);
                        $scope.reliefsList.forEach(function (reliefsListItem, reliefsListIndex) {
                            reliefsListItem._id = reliefsListIndex +1;
                        });
                        $scope.showReliefsList++;
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        // 页面加载执行的函数

        $scope.initReliefsListData();
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
        'adminService'
    ];

    function TransactionsDetailController(
        $scope,
        $uibModal,
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

        //页面加载运行的函数

        $scope.initWalletOptionsData();

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
                    $scope.transfersListAoData.start_time = $scope.searchTimeStart.format('YYYY-MM-DD') + ' 00:00:00';
                } else {
                    if ($scope.transfersListAoData.start_time) {
                        delete $scope.transfersListAoData.start_time;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.transfersListAoData.end_time = $scope.searchTimeEnd.format('YYYY-MM-DD') + ' 23:59:59';
                } else {
                    if ($scope.transfersListAoData.end_time) {
                        delete $scope.transfersListAoData.end_time;
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
                    console.log($scope.rebatesModal,88888)
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
        .controller('UsersManageController', UsersManageController);

    UsersManageController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function UsersManageController(
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

        // 初始化table数据
        $scope.initUsersManageData = function () {
            $scope.usersManageReload++;
        };

        // 页面加载执行的函数

        $scope.initCurrenciesManageData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.usersManageAoData.start_time = $scope.searchTimeStart.format('YYYY-MM-DD') + ' 00:00:00';
                } else {
                    if ($scope.usersManageAoData.start_time) {
                        delete $scope.usersManageAoData.start_time;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.usersManageAoData.end_time = $scope.searchTimeEnd.format('YYYY-MM-DD') + ' 23:59:59';
                } else {
                    if ($scope.usersManageAoData.end_time) {
                        delete $scope.usersManageAoData.end_time;
                    }
                }
            }
        });

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
                                walletItem.merchantKey = walletItem.merchant.key||'';
                                walletItem.merchantName = walletItem.merchant.name||'';
                                delete walletItem.merchant;
                            }else{
                                walletItem.merchantKey = '';
                                walletItem.merchantName = '';
                            }
                            if(walletItem.setting){
                                if(walletItem.setting.record){
                                    walletItem.recordsDuration = walletItem.setting.record.duration||'';
                                    walletItem.recordsParamsTimeFormat = walletItem.setting.record.timeFormat||'';
                                    walletItem.recordsParamsTimeZone = walletItem.setting.record.timezone||'';
                                    delete walletItem.setting.record;
                                }else{
                                    walletItem.recordsDuration = '';
                                    walletItem.recordsParamsTimeFormat = '';
                                    walletItem.recordsParamsTimeZone = '';
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

        console.log(modalItem,88888777776666)

        $scope.edit = edit;

        $scope.hasPower = hasPower;

        if(edit == 3||edit ==1){
            $scope.modalItem = angular.copy(modalItem)
        }else{
            $scope.modalItem = {
                name: [],
                brands: [],
                syncPassword: $scope.booleanOptons[0] && $scope.booleanOptons[0].value || '',
                disabled: '',
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
            var tempUrl = $rootScope.URL.WITHDRAWSMANAGE && $rootScope.URL.WITHDRAWSMANAGE['GET'+approve.toUpperCase()];
            adminService.getReq(tempUrl + '/' + item.id, {admin_id:window.userInfo.adminId || ''}, {}).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: '/views/admin/withdrawsManage/withdrawsManageModal.html',
                            controller: 'WithdrawsManageApproveController',
                            resolve: {
                                withdrawsDetail: res.data.data,
                                approve: approve
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
                    $scope.withdrawsManageAoData.start_time = $scope.searchTimeStart.format('YYYY-MM-DD') + ' 00:00:00';
                } else {
                    if ($scope.withdrawsManageAoData.start_time) {
                        delete $scope.withdrawsManageAoData.start_time;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.withdrawsManageAoData.end_time = $scope.searchTimeEnd.format('YYYY-MM-DD') + ' 23:59:59';
                } else {
                    if ($scope.withdrawsManageAoData.end_time) {
                        delete $scope.withdrawsManageAoData.end_time;
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
    }
})();

(function() {

    angular
        .module('admin.withdrawsManage')
        .controller('WithdrawsManageApproveController', WithdrawsManageApproveController);

    WithdrawsManageApproveController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'withdrawsDetail',
        'approve',
        '$translate'
    ];

    function WithdrawsManageApproveController(
        $scope,
        $rootScope,
        $uibModalInstance,
        withdrawsDetail,
        approve,
        $translate
    ) {

        $scope.withdrawsDetail = withdrawsDetail;

        $scope.detailModalAoData = {};
        $scope.detailModalSearch = '';
        $scope.detailModalReload = 1;
        $scope.showDetailModal = [];

        $scope.resultOptions = [];
        if(approve == 'audit'){
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
        }else if(approve == 'pay'){
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
        }else if(approve == 'pay'){
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
                comment: $scope.withdrawsDetail.comment
            };
            var tempUrl = $rootScope.URL.WITHDRAWSMANAGE && $rootScope.URL.WITHDRAWSMANAGE['POST'+approve.toUpperCase()];
            adminService.postReq(tempUrl+'/'+withdrawsDetail.id+'/'+withdrawsDetail.withdraw.id, {}, approveData).then(function (res) {
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
