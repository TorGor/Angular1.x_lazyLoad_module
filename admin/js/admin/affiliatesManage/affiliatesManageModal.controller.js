(function() {

    angular
        .module('admin.affiliatesManage')
        .controller('affiliatesManageModalController', affiliatesManageModalController);

    affiliatesManageModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'hasPower',
        'edit',
        'modalItem'
    ];

    function affiliatesManageModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        hasPower,
        edit,
        modalItem
    ) {

        $scope.hasPower = hasPower;

        $scope.edit = edit;

        $scope.modalItem = angular.copy(modalItem);

        $scope.showMethodsNameModal = [];
        $scope.methodsNameModalReload = 1;
        $scope.methodsNameModalAoData = {};
        $scope.methodsNameModalSearch = '';

        // 初始化table数据
        $scope.initMethodsNameModalData = function () {
            if(edit == 2){
                $scope.modalItem = {

                }
            }else{

            }
        };

        $scope.confirmModal = function () {
            var tempData = {
                name:$scope.modalItem.name,
                phone:$scope.modalItem.phone,
                approved:$scope.modalItem.isApproved,
                locked:$scope.modalItem.isLocked,
                nameVerified:$scope.modalItem.verifications.name,
                phoneVerified:$scope.modalItem.verifications.phone
            };
            adminService.patchReq($rootScope.URL.AFFILIATESMANAGE.PATCH+'/'+modalItem.userId, {}, tempData).then(function (res) {
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
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initMethodsNameModalData();

    }
})();
