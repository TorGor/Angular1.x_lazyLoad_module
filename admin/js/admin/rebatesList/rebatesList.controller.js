(function() {

    angular
        .module('admin.rebatesList')
        .controller('RebatesListController', RebatesListController);

    RebatesListController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function RebatesListController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.rebatesListUrl = $rootScope.URL.REBATESLIST.GET;

        // 原始的数据
        $scope.rebatesListReload = 1;
        $scope.rebatesListAoData = {};

        // 初始化table数据
        $scope.initRebatesListData = function () {
            $scope.rebatesListReload++;
        };

        // 详细按钮
        $scope.showRebatesDetail = function (item) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/rebatesList/rebatesDetailModal.html',
                controller: 'RebatesDetailModalController',
                resolve: {
                    rebatesDetail: item
                },
                size: 'lg',
            });
            modalInstance.result.then(function(data) {
            }, function(data) {
            });
        };


        // 页面加载执行的函数

        $scope.initRebatesListData();
    }
})();
