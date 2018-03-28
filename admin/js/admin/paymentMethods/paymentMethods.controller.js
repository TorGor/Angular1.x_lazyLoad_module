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
                $scope.paymentMethodsReload++;
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
