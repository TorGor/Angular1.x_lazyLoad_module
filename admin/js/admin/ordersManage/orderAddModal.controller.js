(function() {

    angular
        .module('admin.ordersManage')
        .controller('OrderAddModalController', OrderAddModalController);

    OrderAddModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        'item',
        '$translate'
    ];

    function OrderAddModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        item,
        $translate
    ) {

        $scope.orderAdd = {
            order_no: '',
            trade_no: '',
            amount: '',
            adminId: window.userInfo && window.userInfo.adminId || ''
        };

        $scope.confirmOrderAddModal = function () {
            if(!item.id){
                $rootScope.alertErrorMsg('server data error');
                $uibModalInstance.dismiss('cancel');
                return;
            }
            adminService.postReq($rootScope.URL.ORDERSMANAGE.POST+'/'+item.id, {}, $scope.orderAdd).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $uibModalInstance.close('success');
                        $rootScope.toasterSuccess(res.data.msg);
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.cancelOrderAddModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

    }
})();
