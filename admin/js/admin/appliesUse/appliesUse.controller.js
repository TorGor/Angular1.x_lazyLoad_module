(function() {

    angular
        .module('admin.appliesUse')
        .controller('AppliesUseController', AppliesUseController);

    AppliesUseController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function AppliesUseController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.appliesUseUrl = $rootScope.URL.APPLIESUSE.GET;

        // 原始的数据
        $scope.appliesUse = [];

        // 过滤出来的数据
        $scope.showAppliesUse = [];
        $scope.appliesUseReload = 1;
        $scope.appliesUseAoData = {};

        // 初始化table数据
        $scope.initAppliesUseData = function () {
            $scope.appliesUseReload++;
        };

        $scope.appliesUseAudit = function (item) {
            if(!item.id){
                $rootScope.alertErrorMsg('server data error');
                return;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/appliesUse/appliesUseAuditModal.html',
                controller: 'AppliesUseAuditModalController',
                resolve: {
                    item: item
                },
                size: 'lg',
            });
            modalInstance.result.then(function(data) {
                $scope.initAppliesUseData()
            }, function(data) {
            });
        };


        $scope.appliesUseRevoke = function (item) {
            if(!item.id){
                $rootScope.alertErrorMsg('server data error');
                return;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/appliesUse/appliesUseRevokeModal.html',
                controller: 'AppliesUseRevokeModalController',
                resolve: {
                    item: item
                },
                size: 'lg',
            });
            modalInstance.result.then(function(data) {
                $scope.initAppliesUseData()
            }, function(data) {
            });
        };


        // 页面加载执行的函数

        $scope.initAppliesUseData();
    }
})();
