(function() {

    angular
        .module('admin.affiliatesManage')
        .controller('AffiliatesManageController', AffiliatesManageController);

    AffiliatesManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function AffiliatesManageController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.affiliatesManageUrl = $scope.URL.AFFILIATESMANAGE.GET

        // 原始的数据
        $scope.affiliatesManage = [];
        $scope.affiliatesManageReload = 1;
        $scope.affiliatesManageAoData = {};

        // 初始化table数据
        $scope.initAffiliatesManageData = function () {
            $scope.affiliatesManageReload++;
        };


        // 保存
        /**
         *
         * @param affiliatesManage AFFILIATESMANAGETITLE数据对象
         * @param item
         */

        $scope.saveAffiliatesManage = function (affiliatesManage, item) {
            var tempData = angular.extend({}, affiliatesManage, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.AFFILIATESMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initAffiliatesManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && affiliatesManage.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.AFFILIATESMANAGE.PATCH+'/'+affiliatesManage.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initAffiliatesManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除affiliatesManage
        /**
         * @param affiliatesManage AFFILIATESMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteAffiliatesManage = function (affiliatesManage) {
            if (!$scope.validIsNew(affiliatesManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.AFFILIATESMANAGE.DELETE+'/'+affiliatesManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initAffiliatesManageData();
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

        // 恢复affiliatesManage
        /**
         * @param affiliatesManage AFFILIATESMANAGETITLE数据对象
         * @return null
         */
        $scope.recoverAffiliatesManage = function (affiliatesManage) {
            if (!$scope.validIsNew(affiliatesManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.AFFILIATESMANAGE.PUT+'/'+affiliatesManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initAffiliatesManageData();
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
    }
})();
