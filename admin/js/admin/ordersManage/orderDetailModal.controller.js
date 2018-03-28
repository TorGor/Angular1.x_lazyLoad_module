(function() {

    angular
        .module('admin.ordersManage')
        .controller('OrderDetailModalController', OrderDetailModalController);

    OrderDetailModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'orderDetail',
        '$translate'
    ];

    function OrderDetailModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        orderDetail,
        $translate
    ) {

        $scope.orderDetail = orderDetail;

        $scope.showDetailName = function(data) {
            var str = '';
            if(window.Array.isArray(data)){
                data.map(function(item, index) {
                    str = str + (item.locale||'') + ':' + (item.value||'') + (index === (data.length-1)?'':',')
                })
            }
            return str;
        };

        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();
