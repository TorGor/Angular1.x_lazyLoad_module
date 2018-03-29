(function() {

    angular
        .module('admin.userLevel')
        .controller('UserLevelRebatesModalController', UserLevelRebatesModalController);

    UserLevelRebatesModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$uibModal',
        '$translate',
        'item'
    ];

    function UserLevelRebatesModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $uibModal,
        $translate,
        item
    ) {

        // 原始的数据
        $scope.rebatesModal = [];



        $scope.confirmModal = function () {
            $scope.rebatesModal = $scope.rebatesModal.filter(function (rebatesItem) {
                return !$scope.validIsNew(rebatesItem.id);
            });
            $scope.rebatesModal.forEach(function (rebatesItem, rebatesIndex) {
                if(rebatesItem.id){
                    delete rebatesItem.id;
                }
            });
            baseRebates['rebates'] = $scope.rebatesModal;
            $uibModalInstance.close({
                type:'rebates',
                data:baseRebates
            });
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss({
                type:'rebates',
                data:baseRebates
            });
        };
        // 页面加载执行的函数

        $scope.initRebatesModalData();
    }
})();
