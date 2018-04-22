(function() {

    angular
        .module('admin.reliefsList')
        .controller('ReliefsListController', ReliefsListController);

    ReliefsListController.$inject = [
        '$scope',
        '$uibModal',
        '$rootScope',
        'adminService'
    ];

    function ReliefsListController(
        $scope,
        $uibModal,
        $rootScope,
        adminService
    ) {

        $scope.reliefsListUrl = $rootScope.URL.RELIEFSLIST.GET;

        // 原始的数据
        $scope.reliefsList = [];
        $scope.reliefsListReload = 1;
        $scope.reliefsListAoData = {};
        $scope.tempReliefsListAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempReliefsListAoData = Object.assign($scope.tempReliefsListAoData,$scope.reliefsListAoData);
            $scope.reliefsListReload++;
        };

        $scope.resetSearch = function() {
            $scope.reliefsListAoData = {};
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempReliefsListAoData;
            $scope.tempReliefsListAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.reliefsListReload++;
        };

        // 初始化table数据
        $scope.initReliefsListData = function () {
            $scope.reliefsListReload++;
        };

        // 页面加载执行的函数

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.reliefsListAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.reliefsListAoData.start_time) {
                        delete $scope.reliefsListAoData.start_time;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.reliefsListAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.reliefsListAoData.end_time) {
                        delete $scope.reliefsListAoData.end_time;
                    }
                }
            }
        });
    }
})();
