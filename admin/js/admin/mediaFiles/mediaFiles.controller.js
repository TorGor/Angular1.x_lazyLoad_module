(function() {

    angular
        .module('admin.mediaFiles')
        .controller('MediaFilesController', MediaFilesController);

    MediaFilesController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function MediaFilesController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.mediaFilesUrl = $rootScope.URL.MEDIAFILES.GET;

        $scope.categoryOptionsSearch = [];

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


        $scope.showMediaFilesModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/mediaFiles/mediaFilesModal.html',
                controller: 'mediaFilesModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit:edit,
                    modalItem: item,
                    isGame: false,
                    hasPower:$scope.validPower("MEDIAFILES", ["POST"]) && edit !== 1,
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initMediaFilesData();
            }, function (data) {

            });
        };

        $scope.initCategoryOptionsSearch = function () {
            adminService.getReq($rootScope.URL.MEDIACATEGORIES.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if (window.Array.isArray(res.data.data)) {
                            res.data.data.map(function (objItem) {
                                var tempObj = {
                                    label: objItem.path || '',
                                    value: objItem.path || ''
                                };
                                $scope.categoryOptionsSearch.push(tempObj);
                            })
                        }
                        $scope.categoryOptionsSearch.unshift({
                            label:'全部',
                            value:''
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.showMediaFilesViewModal = function (item) {
            var modalInstance = $uibModal.open({
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
            modalInstance.result.then(function (data) {
            }, function (data) {

            });
        };

        // 删除mediaFiles
        /**
         * @param mediaFiles MEDIAFILESTITLE数据对象
         * @return null
         */
        $scope.deleteMediaFiles = function (mediaFiles) {
            $rootScope.alertConfirm(function () {
                adminService.deleteReq($rootScope.URL.MEDIAFILES.DELETE+'/'+mediaFiles.name, {}, {}).then(function (res) {
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initMediaFilesData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                            return '';
                        }
                    }
                });
            });
        };

        // 页面加载执行的函数

        $scope.initCategoryOptionsSearch()
    }
})();
