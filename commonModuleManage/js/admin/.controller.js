(function() {

    angular
        .module('admin.commonModule')
        .controller('CommonModuleController', CommonModuleController);

    CommonModuleController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function CommonModuleController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.commonModule = [];

        // 过滤出来的数据
        $scope.showCommonModule = [];
        $scope.commonModuleReload = 1;
        $scope.commonModuleAoData = {};
        $scope.commonModuleSearch = '';

        // 初始化table数据
        $scope.initCommonModuleData = function () {
            $scope.commonModule = [];
            adminService.getReq($rootScope.URL.COMMONMODULE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.commonModule = angular.copy(data.res.data);
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        // 保存
        /**
         *
         * @param commonModule COMMONMODULETITLE数据对象
         * @param item
         */

        $scope.saveCommonModule = function (commonModule, item) {
            var tempData = angular.extend({}, commonModule, item);
            if (!tempData.id) {
                delete tempData.id;
                adminService.postReq($rootScope.URL.COMMONMODULE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initCommonModuleData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (tempData.id && commonModule.id) {
                adminService.patchReq($rootScope.URL.COMMONMODULE.PATCH+'/'+commonModule.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initCommonModuleData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除commonModule
        /**
         * @param commonModule COMMONMODULETITLE数据对象
         * @return null
         */
        $scope.deleteCommonModule = function (commonModule) {
            if (commonModule.id) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.COMMONMODULE.DELETE+'/'+commonModule.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initCommonModuleData();
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
        $scope.addCommonModule = function () {
            $scope.commonModuleAoData = {};
            $scope.commonModuleSearch = '';
            $scope.commonModule.unshift({
                'id': null,
                'commonModuleName': '',
                'commonModuleType': '',
                'commonModuleStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的COMMONMODULETITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.commonModule.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initCommonModuleData();
    }
})();
