(function() {

    angular
        .module('admin.withdrawsManage')
        .controller('WithdrawsManageModalController', WithdrawsManageModalController);

    WithdrawsManageModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'withdrawsDetail',
        '$translate'
    ];

    function WithdrawsManageModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        withdrawsDetail,
        $translate
    ) {

        $scope.withdrawsDetail = withdrawsDetail;

        $scope.detailModalAoData = {};
        $scope.detailModalSearch = '';
        $scope.detailModalReload = 1;
        $scope.showDetailModal = [];

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();
