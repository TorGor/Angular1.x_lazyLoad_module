(function() {

    angular
        .module('admin.rebatesList')
        .controller('RebatesListFilterModalController', RebatesListFilterModalController);

    RebatesListFilterModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'filter',
        'adminService',
        '$translate'
    ];

    function RebatesListFilterModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        filter,
        adminService,
        $translate
    ) {

        $scope.rebatesListUrl = $rootScope.URL.REBATESLIST.GET;

        // 原始的数据
        $scope.rebatesListReload = 1;
        $scope.rebatesListAoData = {};
        $scope.tempRebatesListAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempRebatesListAoData = Object.assign($scope.tempRebatesListAoData,$scope.rebatesListAoData);
            $scope.rebatesListReload++;
        };

        $scope.resetSearch = function() {
            $scope.rebatesListAoData = {};
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempRebatesListAoData;
            $scope.tempRebatesListAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.rebatesListReload++;
        };

        // 初始化table数据
        $scope.initRebatesListData = function () {
            $scope.rebatesListReload++;
        };

        // // 详细按钮
        // $scope.showRebatesDetail = function (item) {
        //     var modalInstance = $uibModal.open({
        //         animation: true,
        //         ariaLabelledBy: 'modal-title',
        //         ariaDescribedBy: 'modal-body',
        //         templateUrl: '/views/admin/rebatesList/rebatesDetailModal.html',
        //         controller: 'RebatesDetailModalController',
        //         scope:$scope,
        //         resolve: {
        //             rebatesDetail: item
        //         },
        //         size: 'lg',
        //     });
        //     modalInstance.result.then(function(data) {
        //     }, function(data) {
        //     });
        // };


        // 页面加载执行的函数

        $scope.initRebatesListData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.rebatesListAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.rebatesListAoData.start_time) {
                        $scope.rebatesListAoData.start_time = '';
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.rebatesListAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.rebatesListAoData.end_time) {
                        $scope.rebatesListAoData.end_time = '';
                    }
                }
            }
        });

        $scope.filter = filter;

        $scope.urlUsername = $scope.filter.username||'';

        if($scope.filter.username){
            delete $scope.filter.username
        }

        $scope.rebatesListAoData = window.Object.assign($scope.rebatesListAoData,$scope.filter)
        $scope.tempRebatesListAoData = window.Object.assign($scope.tempRebatesListAoData,$scope.filter)

        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();
