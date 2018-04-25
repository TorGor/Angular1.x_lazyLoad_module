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

        $scope.userId = modalItem.userId;

        // 初始化table数据
        $scope.initMethodsNameModalData = function () {
            $scope.modalItem = modalItem
        };

        // 原始的数据
        $scope.userCommentModal = [];

        // 过滤出来的数据
        $scope.showuserCommentModal = [];
        $scope.userCommentModalReload = 1;
        $scope.userCommentModalAoData = {};
        $scope.userCommentModalSearch = '';

        // 初始化table数据
        $scope.initUserCommentModalData = function () {

        };


        // 保存
        /**
         *
         * @param userCommentModal 渠道名称数据对象
         * @param data
         */

        $scope.saveuserCommentModal = function (userCommentModal, data) {

        };

        //$rootScope.toasterSuccess(res.data.msg);;
        $scope.confirmModal = function () {
            if($scope.modalItem.name){
                if($scope.modalItem.name.length<3||$scope.modalItem.name.length>11){
                    $rootScope.alertErrorMsg('name length should between 3 and 11');
                    return;
                }
            }
            var tempData = {
                name:$scope.modalItem.name || '',
                nameVerified:$scope.modalItem.verifications.name,
                phone:$scope.modalItem.phone||'',
                phoneVerified:$scope.modalItem.verifications.phone,
                locked:$scope.modalItem.locked,
            };
            if (edit==3) {
                adminService.patchReq($rootScope.URL.USERSMANAGE.PATCH+'/'+$scope.userId, {}, tempData).then(function (res) {
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
