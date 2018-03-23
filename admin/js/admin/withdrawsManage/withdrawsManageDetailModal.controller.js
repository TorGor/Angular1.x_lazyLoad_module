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

        $scope.confirmModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();
