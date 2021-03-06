(function() {

    angular
        .module('admin.bigwinsManage')
        .controller('bigwinsManageModalController', bigwinsManageModalController);

    bigwinsManageModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        'modalItem',
        '$translate'
    ];

    function bigwinsManageModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        modalItem,
        $translate
    ) {

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
            },
        ];

        $scope.item = {
            result:$scope.resultOptions[0].value,
            comment:''
        };

        $scope.confirmModal = function () {
            var tempData = angular.copy($scope.item);
            tempData.adminId = modalItem.data.adminId;
            tempData.adminname=window.userInfo && window.userInfo.username || '',
            adminService.postReq($rootScope.URL.BIGWINSMANAGE.POSTAUDIT+'/'+modalItem._itemId+'/'+modalItem.data.id, {}, tempData).then(function (res) {
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
