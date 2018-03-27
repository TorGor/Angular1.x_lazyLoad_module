(function() {

    angular
        .module('admin.blackLists')
        .controller('blackListsModalController', blackListsModalController);

    blackListsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'hasPower',
        'edit',
        'modalItem'
    ];

    function blackListsModalController(
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
        $scope.modalItem = angular.copy(modalItem);

        // 初始化table数据
        $scope.initMethodsNameModalData = function () {
            if(edit==2){
                $scope.modalItem = {
                    "accountNumber": "",
                    "type": $scope.typeOptions[0].value,
                    "comment":"",
                    "isDeleted":$scope.isDeletedOptions[2].value
                }
            }
            $scope.modalItem.adminId = window.userInfo && window.userInfo.adminId
        };

        $scope.confirmModal = function () {
            if (edit==2) {
                adminService.postReq($rootScope.URL.BLACKLISTS.POST, {}, $scope.modalItem).then(function (res) {
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
            } else if (edit==3) {
                adminService.patchReq($rootScope.URL.BLACKLISTS.PATCH+'/'+modalItem.accountNumber, {}, tempData).then(function (res) {
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
