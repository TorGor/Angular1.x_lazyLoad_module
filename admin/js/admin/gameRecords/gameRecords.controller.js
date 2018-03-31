(function() {

    angular
        .module('admin.gameRecords')
        .controller('GameRecordsController', GameRecordsController);

    GameRecordsController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function GameRecordsController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.gameRecords = [];

        // 过滤出来的数据
        $scope.showGameRecords = [];
        $scope.gameRecordsReload = 1;
        $scope.gameRecordsAoData = {};
        $scope.gameRecordsSearch = '';

        // 初始化table数据
        $scope.initGameRecordsData = function () {
            $scope.gameRecords = [];
            adminService.getReq($rootScope.URL.GAMERECORDS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.gameRecords = angular.copy(res.data.data);
                        $scope.gameRecords.forEach(function (gameRecordsItem, gameRecordsIndex) {
                            gameRecordsItem._id = gameRecordsIndex +1;
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
         * @param gameRecords GAMERECORDSTITLE数据对象
         * @param item
         */

        $scope.saveGameRecords = function (gameRecords, item) {
            var tempData = angular.extend({}, gameRecords, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.GAMERECORDS.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGameRecordsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && gameRecords.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.GAMERECORDS.PATCH+'/'+gameRecords.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGameRecordsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除gameRecords
        /**
         * @param gameRecords GAMERECORDSTITLE数据对象
         * @return null
         */
        $scope.deleteGameRecords = function (gameRecords) {
            if (!$scope.validIsNew(gameRecords._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.GAMERECORDS.DELETE+'/'+gameRecords.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initGameRecordsData();
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
        $scope.addGameRecords = function () {
            $scope.gameRecordsAoData = {};
            $scope.gameRecordsSearch = '';
            $scope.gameRecords.unshift({
                '_id': ($scope.gameRecords.length+1) + 'null',
                'gameRecordsName': '',
                'gameRecordsType': '',
                'gameRecordsStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的GAMERECORDSTITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.gameRecords.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initGameRecordsData();
    }
})();
