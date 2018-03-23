(function() {

    angular
        .module('admin.withdrawsManage')
        .controller('WithdrawsManageController', WithdrawsManageController);

    WithdrawsManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function WithdrawsManageController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.withdrawsManageUrl = $rootScope.URL.WITHDRAWSMANAGE.GET;

        // 原始的数据
        $scope.withdrawsManage = [];
        $scope.withdrawsManageReload = 1;
        $scope.withdrawsManageAoData = {};

        // 初始化table数据
        $scope.initWithdrawsManageData = function () {
            $scope.withdrawsManageReload++;
        };

        /**
         *  显示提款详情
         * @param item withdraws项目详情
         */
        $scope.showWithdrawsDetail = function (item) {
            if(!item.id){
                $rootScope.alertErrorMsg('server data error');
                return;
            }
            adminService.getReq($rootScope.URL.WITHDRAWSMANAGE.GET + '/' + item.id, {}, {}).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: '/views/admin/withdrawsManage/withdrawsManageDetailModal.html',
                            controller: 'WithdrawsManageModalController',
                            resolve: {
                                withdrawsDetail: res.data.data
                            },
                            size: 'lg',
                        });
                        modalInstance.result.then(function(data) {
                        }, function(data) {
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        /**
         *  进入审批流程
         * @param item withdraws项目详情
         * @param approve 到审批的哪一步了
         */
        $scope.approveWithdrawsManage = function (item, approve) {
            if(!item.id || !approve){
                $rootScope.alertErrorMsg('server data error');
                return;
            }
            var tempUrl = $rootScope.URL.WITHDRAWSMANAGE && $rootScope.URL.WITHDRAWSMANAGE['GET'+approve.toUpperCase()];
            adminService.getReq(tempUrl + '/' + item.id, {admin_id:window.userInfo.admin_id || ''}, {}).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: '/views/admin/withdrawsManage/withdrawsManageModal.html',
                            controller: 'WithdrawsManageApproveController',
                            resolve: {
                                withdrawsDetail: res.data.data,
                                approve: approve
                            },
                            size: 'lg',
                        });
                        modalInstance.result.then(function(data) {
                            $scope.initWithdrawsManageData()
                        }, function(data) {
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        // 页面加载执行的函数
    }
})();
