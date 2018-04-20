(function() {

    angular
        .module('admin.gameRecords')
        .controller('GameRecordsFilterModalController', GameRecordsFilterModalController);

    GameRecordsFilterModalController.$inject = [
        '$scope',
        '$uibModalInstance',
        '$rootScope',
        'filter',
        '$translate',
        'adminService'
    ];

    function GameRecordsFilterModalController(
        $scope,
        $uibModalInstance,
        $rootScope,
        filter,
        $translate,
        adminService
    ) {

        $scope.gameRecordsUrl = $rootScope.URL.GAMERECORDS.GET;

        // 原始的数据
        $scope.gameRecords = [];
        $scope.gameRecordsReload = 1;
        $scope.gameRecordsAoData = {};
        $scope.tempGameRecordsAoData = {};

        $scope.tempGameRecordsAoData = window.Object.assign($scope.tempGameRecordsAoData, $scope.filter);

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数
    }
})();
