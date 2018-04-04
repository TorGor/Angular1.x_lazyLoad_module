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
            adminService.getReq($rootScope.URL.DOMAINSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.domainsManage = angular.copy(res.data.data);
                        $scope.domainsManage.forEach(function (domainsManageItem, domainsManageIndex) {
                            domainsManageItem._id = domainsManageIndex +1;
                        });
                        $scope.domainsManageReload++;
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        $scope.showDomainsManageModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/domainsManage/domainsManageModal.html',
                controller: 'domainsManageModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit:edit,
                    modalItem: item,
                    hasPower:$scope.validPower("DOMAINSMANAGE", ["PATCH", "POST"]) && edit !== 1,
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initDomainsManageData();
            }, function (data) {

            });
        };

        // 删除domainsManage
        /**
         * @param domainsManage DOMAINSMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteDomainsManage = function (domainsManage) {
            if (!$scope.validIsNew(domainsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.DOMAINSMANAGE.DELETE+'/'+domainsManage.domain, {}, {}).then(function (res) {
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
                    adminService.deleteReq($rootScope.URL.DOMAINSMANAGE.PUT+'/'+domainsManage.domain, {}, {}).then(function (res) {
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
