(function() {

    angular
        .module('admin.commonModule')
        .controller('CommonModuleController', CommonModuleController);

    CommonModuleController.$inject = [
        '$scope',
        '$rootScope',
        'adminCommonModuleService'
    ];

    function CommonModuleController(
        $scope,
        $rootScope,
        adminCommonModuleService
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
            adminCommonModuleService.getCommonModuleList({ 'pageSize': 50, 'curPage': 1 }, {}, function (data) {
                console.log(data);
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        $scope.commonModule = angular.copy(data.data.list);
                    } else {
                        $rootScope.alertErrorMsg(data.msg);
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
                adminCommonModuleService.saveCommonModuleInfo({}, tempData, function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.initCommonModuleData();
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            } else if (tempData.id) {
                adminCommonModuleService.updateCommonModuleInfo({}, tempData, function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.initCommonModuleData();
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
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
                    adminCommonModuleService.deleteCommonModuleInfo({ id: commonModule.id }, {}, function (data) {
                        if (typeof data.success === 'boolean') {
                            if (data.success) {
                                $scope.initCommonModuleData();
                                $rootScope.toasterSuccess(data.msg);
                            } else {
                                $rootScope.alertErrorMsg(data.msg);
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
