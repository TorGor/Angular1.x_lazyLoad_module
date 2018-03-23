(function() {

    angular
        .module('admin.transfersList')
        .controller('TransfersListController', TransfersListController);

    TransfersListController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function TransfersListController(
        $scope,
        $rootScope,
        adminService
    ) {

        $scope.transfersListUrl = $rootScope.URL.TRANSFERSLIST.GET;

        // 原始的数据
        $scope.transfersList = [];
        $scope.transfersListReload = 1;
        $scope.transfersListAoData = {};

        // 初始化table数据
        $scope.initTransfersListData = function () {
            $scope.transfersListReload++;
        };

        // 页面加载执行的函数
    }
})();
