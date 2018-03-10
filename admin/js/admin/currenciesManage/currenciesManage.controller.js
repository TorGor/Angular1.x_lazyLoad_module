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
            adminService.getReq($rootScope.URL.CURRENCIESMANAGE, {}, {}).then(function (res) {
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
                adminService.postReq($rootScope.URL.CURRENCIESMANAGE, {}, tempData).then(function (res) {
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
                adminService.patchReq($rootScope.URL.CURRENCIESMANAGE+'/'+currenciesManage.code, {}, tempData).then(function (res) {
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
                    adminService.deleteReq($rootScope.URL.CURRENCIESMANAGE+'/'+currenciesManage.code, {}, {}).then(function (res) {
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
