(function() {

    angular
        .module('admin.usersManage')
        .controller('usersManageModalController', usersManageModalController);

    usersManageModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'hasPower',
        'edit',
        'modalItem'
    ];

    function usersManageModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        hasPower,
        edit,
        modalItem
    ) {

        $scope.edit = edit;
        $scope.hasPower = hasPower;

        // 初始化table数据
        $scope.initMethodsNameModalData = function () {
            if(edit==3){
                $scope.modalItem = {
                    userId:modalItem.userId,
                    name:modalItem.name || '',
                    userId:modalItem.userId,
                    userId:modalItem.userId,
                    userId:modalItem.userId,
                }
            }else{
                $scope.modalItem = {};
            }
        };

        //$rootScope.toasterSuccess(res.data.msg);;
        $scope.confirmModal = function () {
            var tempData = angular.copy($scope.modalItem);
            if (edit==3) {
                adminService.patchReq($rootScope.URL.USERSMANAGE.PATCH+'/'+tempData.userId, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }

        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initMethodsNameModalData();

    }
})();
