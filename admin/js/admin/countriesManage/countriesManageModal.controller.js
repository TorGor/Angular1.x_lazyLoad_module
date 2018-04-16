(function() {

    angular
        .module('admin.countriesManage')
        .controller('countriesManageModalController', countriesManageModalController);

    countriesManageModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'hasPower',
        'edit',
        'modalItem'
    ];

    function countriesManageModalController(
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
                    "iso": "",
                    "iso3": "",
                    "numcode": '',
                    "name": "",
                    "phoneCode": '',
                    "currencyCode": $scope.currencyOptions[0].value,
                    "niceName": "",
                }
            }
        };

        //$rootScope.toasterSuccess(res.data.msg);;
        $scope.confirmModal = function () {
            var tempData = angular.copy($scope.modalItem);
            if (edit==2) {
                adminService.postReq($rootScope.URL.COUNTRIESMANAGE.POST, {}, tempData).then(function (res) {
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
                adminService.patchReq($rootScope.URL.COUNTRIESMANAGE.PATCH+'/'+tempData.iso, {}, tempData).then(function (res) {
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
