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

        $scope.brandOptions = [];

        $scope.initBrandOptionsData = function () {
            $scope.brandOptions = [];
            adminService.getReq($rootScope.URL.GAMEBRANDS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.brandOptions.push(tempObj)
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.booleanOptons = [
            {
                label: 'Yes',
                value: true
            },
            {
                label: 'No',
                value: false
            }
        ];

        $scope.statusOptons = [
            {
                label: 'OPEN',
                value: 'OPEN'
            },
            {
                label: 'MAINTAIN',
                value: 'MAINTAIN'
            },
            {
                label: 'CLOSED',
                value: 'CLOSED'
            }
        ];

        // 原始的数据
        $scope.walletsManage = [];

        // 过滤出来的数据
        $scope.showWalletsManage = [];
        $scope.walletsManageReload = 1;
        $scope.walletsManageAoData = {};
        $scope.walletsManageSearch = '';

        // 初始化table数据
        $scope.initWalletsManageData = function () {
            adminService.getReq($rootScope.URL.WALLETSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.walletsManage = angular.copy(res.data.data);
                        $scope.walletsManage.forEach(function(walletItem) {
                            if(walletItem.merchant){
                                walletItem.merchantKey = walletItem.merchant.key||'';
                                walletItem.merchantName = walletItem.merchant.name||'';
                                delete walletItem.merchant;
                            }else{
                                walletItem.merchantKey = '';
                                walletItem.merchantName = '';
                            }
                            if(walletItem.setting){
                                if(walletItem.setting.record){
                                    walletItem.recordsDuration = walletItem.setting.record.duration||'';
                                    walletItem.recordsParamsTimeFormat = walletItem.setting.record.timeFormat||'';
                                    walletItem.recordsParamsTimeZone = walletItem.setting.record.timezone||'';
                                    delete walletItem.setting.record;
                                }else{
                                    walletItem.recordsDuration = '';
                                    walletItem.recordsParamsTimeFormat = '';
                                    walletItem.recordsParamsTimeZone = '';
                                }
                                if(walletItem.setting.user){
                                    walletItem.usernamePrefix = walletItem.setting.user.prefix||'';
                                    walletItem.syncPassword = walletItem.setting.user.syncPassword||'';
                                    delete walletItem.setting.user
                                }else{
                                    walletItem.usernamePrefix = '';
                                    walletItem.syncPassword = '';
                                }
                                delete walletItem.setting;
                            }
                        });
                        $scope.walletsManageReload++;
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
