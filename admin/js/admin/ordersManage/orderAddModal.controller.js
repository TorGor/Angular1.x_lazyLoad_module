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
