(function() {

    angular
        .module('admin.rebatesList')
        .controller('RebatesDetailModalController', RebatesDetailModalController);

    RebatesDetailModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'rebatesDetail',
        '$translate'
    ];

    function RebatesDetailModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        rebatesDetail,
        $translate
    ) {

        $scope.rebatesDetail = rebatesDetail;

        $scope.showDetailModal = [];
        $scope.detailModalAoData = {};
        $scope.detailModalSearch = '';
        $scope.detailModalReload = 1;

        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();
