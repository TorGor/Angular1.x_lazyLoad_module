(function() {

    angular
        .module('admin.gameRecords')
        .controller('GameRecordsController', GameRecordsController);

    GameRecordsController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function GameRecordsController(
        $scope,
        $rootScope,
        adminService
    ) {

        $scope.gameRecordsUrl = $rootScope.URL.GAMERECORDS.GET;

        // 原始的数据
        $scope.gameRecords = [];
        $scope.gameRecordsReload = 1;
        $scope.gameRecordsAoData = {};

        // 初始化table数据
        $scope.initGameRecordsData = function () {
            $scope.gameRecordsReload++;
        };

        // 页面加载执行的函数

    }
})();
