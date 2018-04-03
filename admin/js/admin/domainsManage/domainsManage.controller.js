(function() {

    angular
        .module('admin.domainsManage')
        .controller('DomainsManageController', DomainsManageController);

    DomainsManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function DomainsManageController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        // 原始的数据
        $scope.domainsManage = [];

        // 过滤出来的数据
        $scope.showDomainsManage = [];
        $scope.domainsManageReload = 1;
        $scope.domainsManageAoData = {};
        $scope.domainsManageSearch = '';

        // 初始化table数据
        $scope.initDomainsManageData = function () {
            $scope.domainsManage = [];
            adminService.getReq($rootScope.URL.DOMAINSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.domainsManage = angular.copy(res.data.data);
                        $scope.domainsManage.forEach(function (domainsManageItem, domainsManageIndex) {
                            domainsManageItem._id = domainsManageIndex +1;
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
         * @param domainsManage DOMAINSMANAGETITLE数据对象
         * @param item
         */

        $scope.saveDomainsManage = function (domainsManage, item) {
            var tempData = angular.extend({}, domainsManage, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.DOMAINSMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initDomainsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && domainsManage.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.DOMAINSMANAGE.PATCH+'/'+domainsManage.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initDomainsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除domainsManage
        /**
         * @param domainsManage DOMAINSMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteDomainsManage = function (domainsManage) {
            if (!$scope.validIsNew(domainsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.DOMAINSMANAGE.DELETE+'/'+domainsManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initDomainsManageData();
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

        // 恢复domainsManage
        /**
         * @param domainsManage DOMAINSMANAGETITLE数据对象
         * @return null
         */
        $scope.recoverDomainsManage = function (domainsManage) {
            if (!$scope.validIsNew(domainsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.DOMAINSMANAGE.PUT+'/'+domainsManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initDomainsManageData();
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

        $scope.initDomainsManageData();
    }
})();
