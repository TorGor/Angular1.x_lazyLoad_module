(function() {

    angular
        .module('admin.gameCategories')
        .controller('GameCategoriesController', GameCategoriesController);

    GameCategoriesController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function GameCategoriesController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.gameCategories = [];

        // 过滤出来的数据
        $scope.showGameCategories = [];
        $scope.gameCategoriesReload = 1;
        $scope.gameCategoriesAoData = {};
        $scope.gameCategoriesSearch = '';

        // 初始化table数据
        $scope.initGameCategoriesData = function () {
            $scope.gameCategories = [];
            adminService.getReq($rootScope.URL.GAMECATEGORIES.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.gameCategories = angular.copy(res.data.data);
                        $scope.gameCategories.forEach(function (gameCategoriesItem, gameCategoriesIndex) {
                            gameCategoriesItem.id = gameCategoriesIndex +1;
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
         * @param gameCategories GAMECATEGORIESTITLE数据对象
         * @param item
         */

        $scope.saveGameCategories = function (gameCategories, item) {
            var tempData = angular.extend({}, gameCategories, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.GAMECATEGORIES.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGameCategoriesData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && gameCategories.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.GAMECATEGORIES.PATCH+'/'+gameCategories.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGameCategoriesData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除gameCategories
        /**
         * @param gameCategories GAMECATEGORIESTITLE数据对象
         * @return null
         */
        $scope.deleteGameCategories = function (gameCategories) {
            if (!$scope.validIsNew(gameCategories._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.GAMECATEGORIES.DELETE+'/'+gameCategories.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initGameCategoriesData();
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
        $scope.addGameCategories = function () {
            $scope.gameCategoriesAoData = {};
            $scope.gameCategoriesSearch = '';
            $scope.gameCategories.unshift({
                '_id': ($scope.gameCategories.length+1) + 'null',
                'gameCategoriesName': '',
                'gameCategoriesType': '',
                'gameCategoriesStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的GAMECATEGORIESTITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.gameCategories.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initGameCategoriesData();
    }
})();
