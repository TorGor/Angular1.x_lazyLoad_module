(function() {

    angular
        .module('admin.withdrawsManage')
        .controller('WithdrawsManageFilterModalController', WithdrawsManageFilterModalController);

    WithdrawsManageFilterModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'filter',
        '$translate'
    ];

    function WithdrawsManageFilterModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        filter,
        $translate
    ) {

        $scope.filter = filter;

        $scope.withdrawsManageUrl = $rootScope.URL.WITHDRAWSMANAGE.GET;

        // 原始的数据
        $scope.withdrawsManage = [];
        $scope.withdrawsManageReload = 1;
        $scope.withdrawsManageAoData = {};
        $scope.tempWithdrawsManageAoData = {};

        $scope.tempWithdrawsManageAoData = window.Object.assign($scope.tempWithdrawsManageAoData, $scope.filter);

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();
