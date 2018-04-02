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

        // 原始的数据
        $scope.reliefsList = [];

        // 过滤出来的数据
        $scope.showReliefsList = [];
        $scope.reliefsListReload = 1;
        $scope.reliefsListAoData = {};
        $scope.reliefsListSearch = '';

        // 初始化table数据
        $scope.initReliefsListData = function () {
            //$scope.reliefsList = [];
            adminService.getReq($rootScope.URL.RELIEFSLIST.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.reliefsList = angular.copy(res.data.data);
                        $scope.reliefsList.forEach(function (reliefsListItem, reliefsListIndex) {
                            reliefsListItem._id = reliefsListIndex +1;
                        });
                        $scope.showReliefsList++;
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        // 页面加载执行的函数

        $scope.initReliefsListData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.reliefsListAoData.start_time = $scope.searchTimeStart.format('YYYY-MM-DD') + ' 00:00:00';
                } else {
                    if ($scope.reliefsListAoData.start_time) {
                        delete $scope.reliefsListAoData.start_time;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.reliefsListAoData.end_time = $scope.searchTimeEnd.format('YYYY-MM-DD') + ' 23:59:59';
                } else {
                    if ($scope.reliefsListAoData.end_time) {
                        delete $scope.reliefsListAoData.end_time;
                    }
                }
            }
        });
    }
})();
