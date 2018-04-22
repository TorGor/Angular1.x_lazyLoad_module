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

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.rebatesListAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.rebatesListAoData.start_time) {
                        delete $scope.rebatesListAoData.start_time;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.rebatesListAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.rebatesListAoData.end_time) {
                        delete $scope.rebatesListAoData.end_time;
                    }
                }
            }
        });

        $scope.urlUsername = '';

        // try {
        //     var urlParams = $scope.getUrlParams();
        //     if(urlParams._username){
        //         $scope.urlUsername = urlParams._username;
        //     }
        //     if(urlParams.user_id){
        //         $scope.tempRebatesListAoData.user_id = urlParams.user_id;
        //     }
        // }catch (e){
        //     console.error(e)
        // }
    }
})();
