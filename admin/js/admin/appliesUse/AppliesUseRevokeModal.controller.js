(function() {

    angular
        .module('admin.appliesUse')
        .controller('AppliesUseRevokeModalController', AppliesUseRevokeModalController);

    AppliesUseRevokeModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        'item',
        '$translate'
    ];

    function AppliesUseRevokeModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        item,
        $translate
    ) {
        $scope.resultOptions = [
            {
                label:'revoked',
                value:'revoked'
            },
            {
                label:'succeed',
                value:'succeed'
            }
        ];

        $scope.appliesUseSaveRevoke = {
            result: $scope.resultOptions[0].value,
            comment: '',
            adminId: window.userInfo && window.userInfo.admin_id || ''
        };

        $scope.confirmModal = function () {
            adminService.patchReq($rootScope.URL.ORDERSMANAGE.PATCH+'/'+item.id, {}, $scope.orderAdd).then(function (res) {
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

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

    }
})();
