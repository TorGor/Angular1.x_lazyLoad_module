(function() {
    'use strict';

    angular
        .module('superAdmin.menu')
        .controller('OneLevelMenusModalController', OneLevelMenusModalController);

    OneLevelMenusModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'modalData',
        'isAdd',
        'superAdminService'
    ];

    function OneLevelMenusModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        modalData,
        isAdd,
        superAdminService
    ) {

        $scope.oneLevelMenusModal = {};

        $scope.isAdd = isAdd;

        $scope.superAdminSelect012 = $rootScope.superAdminSelect012;

        if(isAdd){
            $scope.oneLevelMenusModal['menuStatus'] = '1';
        }else{
            $scope.oneLevelMenusModal = angular.copy(modalData)
        }

        $scope.confirm = function () {
            if(isAdd){
                var tempAddOneLevelMenus = {
                    // "id": "1",
                    "menuName": $scope.oneLevelMenusModal.menuName || "",
                    "menuCode": "",
                    "menuType": "",
                    "menuStatus": $scope.oneLevelMenusModal.menuStatus,
                    "menuUrl": "",
                    "menuSortNo": $scope.oneLevelMenusModal.menuSortNo || "",
                    "parentId": "root",
                };
                superAdminService.postSaveMenuInfo({},tempAddOneLevelMenus,function ( data ) {
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.oneLevelMenusModal = {};
                            $rootScope.toasterSuccess(data.msg);
                            $uibModalInstance.close('neededUploadOneLevelMenus');
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                })
            }else{
                var tempUpdateOneLevelMenus = {
                    "id": $scope.oneLevelMenusModal.id,
                    "menuName": $scope.oneLevelMenusModal.menuName || "",
                    "menuCode": $scope.oneLevelMenusModal.menuCode || "",
                    "menuType": $scope.oneLevelMenusModal.menuType,
                    "menuStatus": $scope.oneLevelMenusModal.menuStatus,
                    "menuUrl": $scope.oneLevelMenusModal.menuUrl,
                    "menuSortNo": $scope.oneLevelMenusModal.menuSortNo,
                    "parentId": "root",
                };
                superAdminService.postUpdateMenuInfo({},tempUpdateOneLevelMenus,function ( data ) {
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.oneLevelMenusModal = {};
                            $rootScope.toasterSuccess(data.msg);
                            $uibModalInstance.close('neededUploadOneLevelMenus');
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                })
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
