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

        if($scope.validPower("COUNTRIESMANAGE", ["PATCH"])){
            $scope.initCurrenciesManageData();
        }
    }
})();
