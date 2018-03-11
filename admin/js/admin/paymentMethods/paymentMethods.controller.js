(function() {

    angular
        .module('admin.paymentMethods')
        .controller('PaymentMethodsController', PaymentMethodsController);

    PaymentMethodsController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function PaymentMethodsController(
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

        $scope.localesOptions = [];

        $scope.initLocalesOptionsData = function () {
            $scope.localesOptions = [];
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
            if (!tempData.id) {
                delete tempData.id;
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
            } else if (tempData.id && paymentMethods.code) {
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
            if (paymentMethods.id) {
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
            if (paymentMethods.id) {
                $rootScope.alertConfirm(function () {
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
                });
            }
        };

        // 添加按钮
        $scope.addPaymentMethods = function () {
            $scope.paymentMethodsAoData = {};
            $scope.paymentMethodsSearch = '';
            $scope.paymentMethods.unshift({
                'id': null,
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
            if (item.id == null) {
                $scope.paymentMethods.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initPaymentMethodsData();
    }
})();
