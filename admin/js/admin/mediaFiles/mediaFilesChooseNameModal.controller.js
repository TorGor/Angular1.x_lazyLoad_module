(function () {

    angular
        .module('admin.mediaFiles')
        .controller('mediaFilesChooseNameModalController', mediaFilesChooseNameModalController);

    mediaFilesChooseNameModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$uibModal',
        '$translate',
        'adminService',
        'filter'
    ];

    function mediaFilesChooseNameModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $uibModal,
        $translate,
        adminService,
        filter
    ) {

        $scope.filter = angular.copy(filter);

        $scope.mediaFilesUrl = $rootScope.URL.MEDIAFILES.GET;

        $scope.statusOptions = [
            {
                label:'pending',
                value:'pending'
            },
            {
                label:'processing',
                value:'processing'
            },
            {
                label:'failed',
                value:'failed'
            },
            {
                label:'finished',
                value:'finished'
            }
        ];

        // 原始的数据
        $scope.mediaFiles = [];

        // 过滤出来的数据
        $scope.showMediaFiles = [];
        $scope.mediaFilesReload = 1;
        $scope.mediaFilesAoData = {};
        $scope.tempMediaFilesAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempMediaFilesAoData = Object.assign($scope.tempMediaFilesAoData,$scope.mediaFilesAoData);
            $scope.mediaFilesReload++;
        };

        $scope.resetSearch = function() {
            $scope.mediaFilesAoData = {};
            var tempData = $scope.tempMediaFilesAoData;
            $scope.tempMediaFilesAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.mediaFilesReload++;
        };

        // 初始化table数据
        $scope.initMediaFilesData = function () {
            $scope.mediaFilesReload++;
        };


        $scope.chooseMediaFiles = function (item) {
            $uibModalInstance.close(item.name);
        };

        $scope.showMediaFilesViewModal = function (item) {
            var modalInstanceShowFile = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/mediaFiles/mediaFilesViewModal.html',
                controller: 'mediaFilesViewModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    modalItem: item,
                }
            });
            modalInstanceShowFile.result.then(function (data) {
                modalInstanceShowFile = null;
            }, function (data) {
                modalInstanceShowFile = null;
            });
        };

        $scope.cancelModalChooseFileModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.mediaFilesAoData = window.Object.assign($scope.mediaFilesAoData, $scope.filter);
        $scope.tempMediaFilesAoData = window.Object.assign($scope.tempMediaFilesAoData, $scope.filter);;

    }
})();
