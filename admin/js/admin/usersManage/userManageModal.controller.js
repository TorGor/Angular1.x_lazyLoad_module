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
        $scope.showUserCommentModal = [];
        $scope.userCommentModalReload = 1;
        $scope.userCommentModalAoData = {};
        $scope.userCommentModalSearch = '';

        $scope.rankOptons = [];

        $scope.initRankOptions = function () {
            $scope.rankOptons = [];
            adminService.getReq($rootScope.URL.USERLEVEL.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                if(objItem.isDeleted === false){
                                    var tempObj ={
                                        label:objItem.code||'',
                                        value:objItem.code||''
                                    };
                                    $scope.rankOptons.push(tempObj)
                                }
                                // if(objItem.supported){
                                //     $scope.brandOptions.push(tempObj)
                                // }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        // 初始化table数据
        $scope.initUserCommentModalData = function () {
            adminService.getReq($rootScope.URL.USERSMANAGE.GETCOMMENTS+'/'+modalItem.userId, {}, {}).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.userCommentModal = angular.copy(res.data.data);
                        $scope.userCommentModalReload++;
                        console.log($scope.userCommentModal)
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        $scope.tempComment = '';
        // 保存
        $scope.saveUserCommentModal = function () {
            var tempData = {
                comment: $scope.tempComment,
                admin_id: window.userInfo && window.userInfo.adminId || '',
                adminname: window.userInfo && window.userInfo.username || '',
            };
            $scope.tempComment = '';
            adminService.postReq($rootScope.URL.USERSMANAGE.POSTCOMMENTS+'/'+modalItem.userId, {}, tempData).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $rootScope.toasterSuccess(res.data.msg);
                        $scope.initUserCommentModalData();
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
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
                adminService.patchReq($rootScope.URL.USERSMANAGE.PATCH+'/'+modalItem.userId, {}, tempData).then(function (res) {
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

        if($scope.validPower("USERSMANAGE", ["GETCOMMENTS"])){
            $scope.initUserCommentModalData();
        }

        $scope.initRankOptions();

    }
})();
