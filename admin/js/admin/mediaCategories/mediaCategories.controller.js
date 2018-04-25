(function() {

    angular
        .module('admin.mediaCategories')
        .controller('MediaCategoriesController', MediaCategoriesController);

    MediaCategoriesController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function MediaCategoriesController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.mediaCategoriesUrl =

        // 原始的数据
        $scope.mediaCategories = [];

        // 过滤出来的数据
        $scope.showMediaCategories = [];
        $scope.mediaCategoriesReload = 1;
        $scope.mediaCategoriesAoData = {};
        $scope.mediaCategoriesSearch = '';

        // 初始化table数据
        $scope.initMediaCategoriesData = function () {
            $scope.mediaCategories = [];
            adminService.getReq($rootScope.URL.MEDIACATEGORIES.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.mediaCategories = angular.copy(res.data.data);
                        $scope.mediaCategoriesReload++;
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        $scope.showMediaCategoriesModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/mediaCategories/mediaCategoriesModal.html',
                controller: 'mediaCategoriesModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit:edit,
                    modalItem: item,
                    hasPower:$scope.validPower("MEDIACATEGORIES", ["POST"]) && edit !== 1,
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initMediaCategoriesData();
            }, function (data) {

            });
        };

        // 页面加载执行的函数

        $scope.initMediaCategoriesData();
    }
})();
