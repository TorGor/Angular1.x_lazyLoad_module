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
        $scope.mediaFilesSearch = '';

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
                    hasPower:$scope.validPower("MEDIAFILES", ["POST"]) && edit !== 1,
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initMediaCategoriesData();
            }, function (data) {

            });
        };

        // 保存
        /**
         *
         * @param mediaFiles MEDIAFILESTITLE数据对象
         * @param item
         */

        $scope.saveMediaFiles = function (mediaFiles, item) {
            var tempData = angular.extend({}, mediaFiles, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.MEDIAFILES.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initMediaFilesData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && mediaFiles.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.MEDIAFILES.PATCH+'/'+mediaFiles.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initMediaFilesData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
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

        // 恢复mediaFiles
        /**
         * @param mediaFiles MEDIAFILESTITLE数据对象
         * @return null
         */
        $scope.recoverMediaFiles = function (mediaFiles) {
            if (!$scope.validIsNew(mediaFiles._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.MEDIAFILES.PUT+'/'+mediaFiles.id, {}, {}).then(function (res) {
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
                }, 'recover');
            }
        };

        // 页面加载执行的函数
    }
})();
