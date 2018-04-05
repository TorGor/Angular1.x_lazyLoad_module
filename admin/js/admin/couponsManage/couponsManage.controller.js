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
            $scope.tempCouponsManageAoData = angular.extend($scope.tempCouponsManageAoData,$scope.couponsManageAoData)
        };

        $scope.resetSearch = function() {
            $scope.couponsManageAoData = {};
            var tempData = $scope.tempCouponsManageAoData;
            $scope.tempCouponsManageAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            }
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
