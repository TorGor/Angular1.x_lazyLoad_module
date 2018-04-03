(function() {

    angular
        .module('admin.bigwinsManage')
        .controller('BigwinsManageController', BigwinsManageController);

    BigwinsManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function BigwinsManageController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.bigwinsManageUrl = $rootScope.URL.BIGWINSMANAGE.GET;

        // 原始的数据
        $scope.bigwinsManage = [];
        $scope.bigwinsManageReload = 1;
        $scope.bigwinsManageAoData = {};

        // 初始化table数据
        $scope.initBigwinsManageData = function () {
            $scope.bigwinsManageReload++;
        };


        $scope.auditBigwinsManage = function (item) {
            if(!item.id){
                $rootScope.alertErrorMsg('server data error');
                return;
            }
            adminService.getReq($rootScope.URL.BIGWINSMANAGE.GETAUDIT + '/' + item.id, {}, {}).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    console.log(res.data.data)
                    if (res.data.success) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: '/views/admin/bigwinsManage/bigwinsManageModal.html',
                            controller: 'bigwinsManageModalController',
                            resolve: {
                                modalItem: res.data.data,
                                id: item.id,
                            },
                            size: 'lg',
                        });
                        modalInstance.result.then(function(data) {
                            $scope.initBigwinsManageData();
                        }, function(data) {
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
         * @param bigwinsManage BIGWINSMANAGETITLE数据对象
         * @param item
         */

        $scope.saveBigwinsManage = function (bigwinsManage, item) {
            var tempData = angular.extend({}, bigwinsManage, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.BIGWINSMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initBigwinsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && bigwinsManage.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.BIGWINSMANAGE.PATCH+'/'+bigwinsManage.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initBigwinsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除bigwinsManage
        /**
         * @param bigwinsManage BIGWINSMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteBigwinsManage = function (bigwinsManage) {
            if (!$scope.validIsNew(bigwinsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.BIGWINSMANAGE.DELETE+'/'+bigwinsManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initBigwinsManageData();
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

        // 恢复bigwinsManage
        /**
         * @param bigwinsManage BIGWINSMANAGETITLE数据对象
         * @return null
         */
        $scope.recoverBigwinsManage = function (bigwinsManage) {
            if (!$scope.validIsNew(bigwinsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.BIGWINSMANAGE.PUT+'/'+bigwinsManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initBigwinsManageData();
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
