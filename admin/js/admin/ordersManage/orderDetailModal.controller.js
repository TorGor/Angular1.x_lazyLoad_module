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

        $scope.confirmOrderDetailModal = function () {
            $uibModalInstance.close('success');
        };

        $scope.cancelOrderDetailModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

    }
})();
