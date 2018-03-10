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
            adminService.getReq($rootScope.URL.PAYMENTMETHODS, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.paymentMethods = angular.copy(data.res.data);
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
                adminService.postReq($rootScope.URL.PAYMENTMETHODS, {}, tempData).then(function (res) {
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
            } else if (tempData.id && paymentMethods.id) {
                adminService.patchReq($rootScope.URL.PAYMENTMETHODS+'/'+paymentMethods.id, {}, tempData).then(function (res) {
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
                    adminService.deleteReq($rootScope.URL.PAYMENTMETHODS+'/'+paymentMethods.id, {}, {}).then(function (res) {
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
                'paymentMethodsName': '',
                'paymentMethodsType': '',
                'paymentMethodsStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
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
