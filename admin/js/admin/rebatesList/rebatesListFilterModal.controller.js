(function() {

    angular
        .module('admin.rebatesList')
        .controller('RebatesListFilterModalController', RebatesListFilterModalController);

    RebatesListFilterModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'filter',
        '$translate'
    ];

    function RebatesListFilterModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        filter,
        $translate
    ) {

        $scope.filter = filter;

        $scope.rebatesListUrl = $rootScope.URL.REBATESLIST.GET;

        // 原始的数据
        $scope.rebatesListReload = 1;
        $scope.rebatesListAoData = {};
        $scope.tempRebatesListAoData = {};

        $scope.tempRebatesListAoData = window.Object.assign($scope.tempRebatesListAoData,$scope.filter)

        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();
