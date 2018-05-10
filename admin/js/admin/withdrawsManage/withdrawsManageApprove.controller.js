(function() {

    angular
        .module('admin.withdrawsManage')
        .controller('WithdrawsManageApproveModalController', WithdrawsManageApproveModalController);

    WithdrawsManageApproveModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'withdrawsDetail',
        'adminService',
        '$translate'
    ];

    function WithdrawsManageApproveModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        withdrawsDetail,
        adminService,
        $translate
    ) {

        $scope.withdrawsDetail = withdrawsDetail;
        if($scope.withdrawsDetail.approve){
            $scope.approve = $scope.withdrawsDetail.approve;
            delete $scope.withdrawsDetail.approve;
        }
        if($scope.withdrawsDetail.itemId){
            $scope.itemId = $scope.withdrawsDetail.itemId;
            delete $scope.withdrawsDetail.itemId
        }

        $scope.detailModalAoData = {};
        $scope.detailModalSearch = '';
        $scope.detailModalReload = 1;
        $scope.showDetailModal = [];

        $scope.resultOptions = [];
        if($scope.approve == 'audit'){
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
        }else if($scope.approve == 'pay'){
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
        }else if($scope.approve == 'pay'){
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
                comment: $scope.withdrawsDetail.comment,
                adminname: window.userInfo && window.userInfo.username || '',
            };
            var tempUrl = $rootScope.URL.WITHDRAWSMANAGE && $rootScope.URL.WITHDRAWSMANAGE['POST'+$scope.approve.toUpperCase()];
            adminService.postReq(tempUrl+'/'+$scope.itemId+'/'+withdrawsDetail.id, {}, approveData).then(function (res) {
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
