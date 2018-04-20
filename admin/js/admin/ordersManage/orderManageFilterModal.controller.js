(function() {

    angular
        .module('admin.ordersManage')
        .controller('OrderManageFilterModalController', OrderManageFilterModalController);

    OrderManageFilterModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'filter',
        '$translate'
    ];

    function OrderManageFilterModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        filter,
        $translate
    ) {

        $scope.filter = filter;

        $scope.ordersManageUrl = $rootScope.URL.ORDERSMANAGE.GET;

        // 原始的数据
        $scope.ordersManage = [];

        $scope.advancedSearch = false;

        // 过滤出来的数据
        $scope.ordersManageReload = 1;
        $scope.ordersManageAoData = {};
        $scope.tempOrdersManageAoData = {};

        $scope.tempOrdersManageAoData  = window.Object.assign($scope.tempOrdersManageAoData, $scope.filter);

        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();
