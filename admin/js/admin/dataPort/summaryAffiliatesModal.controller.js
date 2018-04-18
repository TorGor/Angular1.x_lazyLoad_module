(function() {

    angular
        .module('admin.summaryAffiliates')
        .controller('summaryAffiliatesModalController', summaryAffiliatesModalController);

    summaryAffiliatesModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        'modalItem'
    ];

    function summaryAffiliatesModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        modalItem
    ) {

        // 初始化table数据
        $scope.initSummaryAffiliatesData = function () {
            $scope.modalItem = modalItem;
            console.log($scope.modalItem)
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initSummaryAffiliatesData();
    }
})();
