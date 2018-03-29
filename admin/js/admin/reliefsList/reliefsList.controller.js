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
    }
})();
