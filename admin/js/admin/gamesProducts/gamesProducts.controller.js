(function() {

    angular
        .module('admin.gamesProducts')
        .controller('GamesProductsController', GamesProductsController);

    GamesProductsController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function GamesProductsController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.gamesProducts = [];

        // 过滤出来的数据
        $scope.showGamesProducts = [];
        $scope.gamesProductsReload = 1;
        $scope.gamesProductsAoData = {};
        $scope.gamesProductsSearch = '';

        // 初始化table数据
        $scope.initGamesProductsData = function () {
            $scope.gamesProducts = [];
            adminService.getReq($rootScope.URL.GAMESPRODUCTS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.gamesProducts = angular.copy(data.res.data);
                        $scope.gamesProducts.forEach(function (gamesProductsItem, gamesProductsIndex) {
                            gamesProductsItem.id = gamesProductsIndex +1;
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
         * @param gamesProducts GAMESPRODUCTSTITLE数据对象
         * @param item
         */

        $scope.saveGamesProducts = function (gamesProducts, item) {
            var tempData = angular.extend({}, gamesProducts, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.GAMESPRODUCTS.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGamesProductsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && gamesProducts.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.GAMESPRODUCTS.PATCH+'/'+gamesProducts.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGamesProductsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除gamesProducts
        /**
         * @param gamesProducts GAMESPRODUCTSTITLE数据对象
         * @return null
         */
        $scope.deleteGamesProducts = function (gamesProducts) {
            if (!$scope.validIsNew(gamesProducts._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.GAMESPRODUCTS.DELETE+'/'+gamesProducts.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initGamesProductsData();
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
        $scope.addGamesProducts = function () {
            $scope.gamesProductsAoData = {};
            $scope.gamesProductsSearch = '';
            $scope.gamesProducts.unshift({
                '_id': ($scope.gamesProducts.length+1) + 'null',
                'gamesProductsName': '',
                'gamesProductsType': '',
                'gamesProductsStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的GAMESPRODUCTSTITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.gamesProducts.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initGamesProductsData();
    }
})();
