(function() {

    angular
        .module('admin.transfersList')
        .controller('TransfersListFilterModalController', TransfersListFilterModalController);

    TransfersListFilterModalController.$inject = [
        '$scope',
        '$uibModalInstance',
        '$rootScope',
        'filter',
        'adminService'
    ];

    function TransfersListFilterModalController(
        $scope,
        $uibModalInstance,
        $rootScope,
        filter,
        adminService
    ) {

        $scope.filter = filter;

        $scope.transfersListUrl = $rootScope.URL.TRANSFERSLIST.GET;

        // 原始的数据
        $scope.transfersList = [];
        $scope.transfersListReload = 1;
        $scope.transfersListAoData = {};
        $scope.tempTransfersListAoData = {};

        $scope.tempTransfersListAoData = window.Object.assign($scope.tempTransfersListAoData, $scope.filter)

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
