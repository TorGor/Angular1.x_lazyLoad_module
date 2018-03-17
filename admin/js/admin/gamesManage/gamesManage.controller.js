(function() {

    angular
        .module('admin.gamesManage')
        .controller('GamesManageController', GamesManageController);

    GamesManageController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function GamesManageController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.gamesManage = [];

        // 过滤出来的数据
        $scope.showGamesManage = [];
        $scope.gamesManageReload = 1;
        $scope.gamesManageAoData = {};
        $scope.gamesManageSearch = '';

        // 初始化table数据
        $scope.initGamesManageData = function () {
            $scope.gamesManage = [];
            adminService.getReq($rootScope.URL.GAMESMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.gamesManage = angular.copy(res.data.data);
                        $scope.gamesManage.forEach(function (gamesManageItem, gamesManageIndex) {
                            gamesManageItem.id = gamesManageIndex +1;
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
         * @param gamesManage GAMESMANAGETITLE数据对象
         * @param item
         */

        $scope.saveGamesManage = function (gamesManage, item) {
            var tempData = angular.extend({}, gamesManage, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.GAMESMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGamesManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && gamesManage.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.GAMESMANAGE.PATCH+'/'+gamesManage.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGamesManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除gamesManage
        /**
         * @param gamesManage GAMESMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteGamesManage = function (gamesManage) {
            if (!$scope.validIsNew(gamesManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.GAMESMANAGE.DELETE+'/'+gamesManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initGamesManageData();
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
        $scope.addGamesManage = function () {
            $scope.gamesManageAoData = {};
            $scope.gamesManageSearch = '';
            $scope.gamesManage.unshift({
                '_id': ($scope.gamesManage.length+1) + 'null',
                'gamesManageName': '',
                'gamesManageType': '',
                'gamesManageStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的GAMESMANAGETITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.gamesManage.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initGamesManageData();
    }
})();
