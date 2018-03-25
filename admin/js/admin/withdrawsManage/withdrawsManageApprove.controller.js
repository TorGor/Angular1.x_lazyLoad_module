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

        $scope.detailModalAoData = {};
        $scope.detailModalSearch = '';
        $scope.detailModalReload = 1;
        $scope.showDetailModal = [];

        $scope.resultOptions = [];
        if(approve == 'audit'){
        //‘pending’, ‘approved’, ‘declined’
            $scope.resultOptions = [
                {
                    label:'pending',
                    value:'pending'
                },
                {
                    label:'approved',
                    value:'approved'
                },
                {
                    label:'declined',
                    value:'declined'
                }
            ];
        }else if(approve == 'pay'){
        //‘paid’, ‘approved’
            $scope.resultOptions = [
                {
                    label:'paid',
                    value:'paid'
                },
                {
                    label:'approved',
                    value:'approved'
                }
            ];
        }else if(approve == 'pay'){
        //‘paid’, ‘finished’
            $scope.resultOptions = [
                {
                    label:'paid',
                    value:'paid'
                },
                {
                    label:'finished',
                    value:'finished'
                }
            ];
        }
        if(!$scope.withdrawsDetail.adminId){
            $scope.withdrawsDetail.adminId = window.userInfo && window.userInfo.adminId || '';
        }
        if(!$scope.withdrawsDetail.result){
            $scope.withdrawsDetail.result = $scope.resultOptions[0] && $scope.resultOptions[0].value || '';
        }
        if(!$scope.withdrawsDetail.comment){
            $scope.withdrawsDetail.comment = '';
        }

        $scope.confirmModal = function() {
            if(!$scope.withdrawsDetail.comment){
                $rootScope.alertErrorMsg('comment is required');
                return;
            }
            if(!$scope.withdrawsDetail.result){
                $rootScope.alertErrorMsg('result is required');
                return;
            }
            var approveData = {
                adminId: $scope.withdrawsDetail.adminId,
                result: $scope.withdrawsDetail.result,
                comment: $scope.withdrawsDetail.comment
            };
            var tempUrl = $rootScope.URL.WITHDRAWSMANAGE && $rootScope.URL.WITHDRAWSMANAGE['POST'+approve.toUpperCase()];
            adminService.postReq(tempUrl+'/'+withdrawsDetail.id+'/'+withdrawsDetail.withdraw.id, {}, approveData).then(function (res) {
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
