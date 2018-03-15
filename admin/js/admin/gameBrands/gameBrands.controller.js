(function() {

    angular
        .module('admin.gameBrands')
        .controller('GameBrandsController', GameBrandsController);

    GameBrandsController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function GameBrandsController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.gameBrands = [];

        // 过滤出来的数据
        $scope.showGameBrands = [];
        $scope.gameBrandsReload = 1;
        $scope.gameBrandsAoData = {};
        $scope.gameBrandsSearch = '';

        // 初始化table数据
        $scope.initGameBrandsData = function () {
            $scope.gameBrands = [];
            adminService.getReq($rootScope.URL.GAMEBRANDS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.gameBrands = angular.copy(data.res.data);
                        $scope.gameBrands.forEach(function (gameBrandsItem, gameBrandsIndex) {
                            gameBrandsItem.id = gameBrandsIndex +1;
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
         * @param gameBrands GAMEBRANDSTITLE数据对象
         * @param item
         */

        $scope.saveGameBrands = function (gameBrands, item) {
            var tempData = angular.extend({}, gameBrands, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.GAMEBRANDS.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGameBrandsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && gameBrands.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.GAMEBRANDS.PATCH+'/'+gameBrands.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGameBrandsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除gameBrands
        /**
         * @param gameBrands GAMEBRANDSTITLE数据对象
         * @return null
         */
        $scope.deleteGameBrands = function (gameBrands) {
            if (!$scope.validIsNew(gameBrands._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.GAMEBRANDS.DELETE+'/'+gameBrands.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initGameBrandsData();
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
        $scope.addGameBrands = function () {
            $scope.gameBrandsAoData = {};
            $scope.gameBrandsSearch = '';
            $scope.gameBrands.unshift({
                '_id': ($scope.gameBrands.length+1) + 'null',
                'gameBrandsName': '',
                'gameBrandsType': '',
                'gameBrandsStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的GAMEBRANDSTITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.gameBrands.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initGameBrandsData();
    }
})();
