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

        $scope.walletOptions = [
            {
                label:'MAIN',
                value:'MAIN'
            },
            {
                label:'FS',
                value:'FS'
            },
            {
                label:'PT',
                value:'PT'
            },
        ];


        // 页面加载执行的函数

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.transfersListAoData.start_time = $scope.searchTimeStart.format('YYYY-MM-DD') + ' 00:00:00';
                } else {
                    if ($scope.transfersListAoData.start_time) {
                        delete $scope.transfersListAoData.start_time;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.transfersListAoData.end_time = $scope.searchTimeEnd.format('YYYY-MM-DD') + ' 23:59:59';
                } else {
                    if ($scope.transfersListAoData.end_time) {
                        delete $scope.transfersListAoData.end_time;
                    }
                }
            }
        });
    }
})();
