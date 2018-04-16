(function() {

    angular
        .module('admin.commonModule')
        .controller('CommonModuleController', CommonModuleController);

    CommonModuleController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function CommonModuleController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        // 原始的数据
        $scope.commonModule = [];

        // 过滤出来的数据
        $scope.showCommonModule = [];
        $scope.commonModuleReload = 1;
        $scope.commonModuleAoData = {};
        $scope.commonModuleSearch = '';

        // 初始化table数据
        $scope.initCommonModuleData = function () {
            $scope.commonModule = [];
            adminService.getReq($rootScope.URL.COMMONMODULE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.commonModule = angular.copy(res.data.data);
                        $scope.commonModule.forEach(function (commonModuleItem, commonModuleIndex) {
                            commonModuleItem._id = commonModuleIndex +1;
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        // 保存
        /**
         *
         * @param commonModule COMMONMODULETITLE数据对象
         * @param item
         */

        $scope.saveCommonModule = function (commonModule, item) {
            var tempData = angular.extend({}, commonModule, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.COMMONMODULE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initCommonModuleData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && commonModule.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.COMMONMODULE.PATCH+'/'+commonModule.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initCommonModuleData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除commonModule
        /**
         * @param commonModule COMMONMODULETITLE数据对象
         * @return null
         */
        $scope.deleteCommonModule = function (commonModule) {
            if (!$scope.validIsNew(commonModule._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.COMMONMODULE.DELETE+'/'+commonModule.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initCommonModuleData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        // 恢复commonModule
        /**
         * @param commonModule COMMONMODULETITLE数据对象
         * @return null
         */
        $scope.recoverCommonModule = function (commonModule) {
            if (!$scope.validIsNew(commonModule._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.COMMONMODULE.PUT+'/'+commonModule.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initCommonModuleData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                }, 'recover');
            }
        };

        // 页面加载执行的函数

        $scope.initCommonModuleData();
    }
})();
