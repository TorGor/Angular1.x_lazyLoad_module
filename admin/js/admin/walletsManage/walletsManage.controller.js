(function() {

    angular
        .module('admin.walletsManage')
        .controller('WalletsManageController', WalletsManageController);

    WalletsManageController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function WalletsManageController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.walletsManage = [];

        // 过滤出来的数据
        $scope.showWalletsManage = [];
        $scope.walletsManageReload = 1;
        $scope.walletsManageAoData = {};
        $scope.walletsManageSearch = '';

        // 初始化table数据
        $scope.initWalletsManageData = function () {
            $scope.walletsManage = [];
            adminService.getReq($rootScope.URL.WALLETSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.walletsManage = angular.copy(res.data.data);
                        $scope.walletsManage.forEach(function (walletsManageItem, walletsManageIndex) {
                            walletsManageItem._id = walletsManageIndex +1;
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        // 保存
        /**
         *
         * @param walletsManage WALLETSMANAGETITLE数据对象
         * @param item
         */

        $scope.saveWalletsManage = function (walletsManage, item) {
            var tempData = angular.extend({}, walletsManage, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.WALLETSMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initWalletsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && walletsManage.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.WALLETSMANAGE.PATCH+'/'+walletsManage.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initWalletsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除walletsManage
        /**
         * @param walletsManage WALLETSMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteWalletsManage = function (walletsManage) {
            if (!$scope.validIsNew(walletsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.WALLETSMANAGE.DELETE+'/'+walletsManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initWalletsManageData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        // 添加按钮
        $scope.addWalletsManage = function () {
            $scope.walletsManageAoData = {};
            $scope.walletsManageSearch = '';
            $scope.walletsManage.unshift({
                '_id': ($scope.walletsManage.length+1) + 'null',
                'walletsManageName': '',
                'walletsManageType': '',
                'walletsManageStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的WALLETSMANAGETITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.walletsManage.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initWalletsManageData();
    }
})();
