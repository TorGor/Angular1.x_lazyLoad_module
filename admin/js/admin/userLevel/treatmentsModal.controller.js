(function() {

    angular
        .module('admin.userLevel')
        .controller('UserLevelTreatmentsModalController', UserLevelTreatmentsModalController);

    UserLevelTreatmentsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'item'
    ];

    function UserLevelTreatmentsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        item
    ) {

        $scope.confirmModal = function () {
            $scope.treatmentsModal = $scope.treatmentsModal.filter(function (treatmentsItem) {
                return !$scope.validIsNew(treatmentsItem.id);
            });
            $scope.treatmentsModal.forEach(function (treatmentsItem, treatmentsIndex) {
                if(treatmentsItem.id){
                    delete treatmentsItem.id;
                }
            });
            baseTreatments['treatments'] = $scope.treatmentsModal
            $uibModalInstance.close({
                type:'treatments',
                data: baseTreatments
            });
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss({
                type:'treatments',
                data: baseTreatments
            });
        };

        // 页面加载执行的函数

        $scope.initTreatmentsModalData();
    }
})();
