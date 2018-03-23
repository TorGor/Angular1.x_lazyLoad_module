(function() {

    angular
        .module('admin.withdrawsManage')
        .controller('WithdrawsManageApproveController', WithdrawsManageApproveController);

    WithdrawsManageApproveController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'withdrawsDetail',
        'approve',
        '$translate'
    ];

    function WithdrawsManageApproveController(
        $scope,
        $rootScope,
        $uibModalInstance,
        withdrawsDetail,
        approve,
        $translate
    ) {

        $scope.withdrawsDetail = withdrawsDetail;

        $scope.confirmModal = function() {
            var tempUrl = $rootScope.URL.WITHDRAWSMANAGE && $rootScope.URL.WITHDRAWSMANAGE['POST'+approve.toUpperCase()];
            adminService.postReq(tempUrl+'/'+withdrawsDetail.id, {}, $scope.withdrawsDetail).then(function (res) {
                console.log(res);
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

        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();
