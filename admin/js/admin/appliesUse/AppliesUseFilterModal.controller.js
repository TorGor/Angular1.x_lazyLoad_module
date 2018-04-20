(function() {

    angular
        .module('admin.appliesUse')
        .controller('AppliesUseFilterModalController', AppliesUseFilterModalController);

    AppliesUseFilterModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        'filter',
        '$translate'
    ];

    function AppliesUseFilterModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        filter,
        $translate
    ) {

        $scope.filter = filter;

        $scope.appliesUseUrl = $rootScope.URL.APPLIESUSE.GET;

        // 原始的数据
        $scope.appliesUse = [];

        // 过滤出来的数据
        $scope.showAppliesUse = [];
        $scope.appliesUseReload = 1;
        $scope.appliesUseAoData = {};
        $scope.tempAppliesUseAoData = {};

        $scope.tempAppliesUseAoData = window.Object.assign($scope.tempAppliesUseAoData, $scope.filter)

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

    }
})();
