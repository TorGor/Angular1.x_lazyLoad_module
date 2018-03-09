(function() {

    angular
        .module('admin.blackLists')
        .controller('BlackListsController', BlackListsController);

    BlackListsController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function BlackListsController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.blackLists = [];

        // 过滤出来的数据
        $scope.showBlackLists = [];
        $scope.blackListsReload = 1;
        $scope.blackListsAoData = {};
        $scope.blackListsSearch = '';

        // 初始化table数据
        $scope.initBlackListsData = function () {
            $scope.blackLists = [];
            adminService.getReq(URL.BLACKLISTS, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.blackLists = angular.copy(data.res.data);
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        // 保存
        /**
         *
         * @param blackLists BLACKLISTSTITLE数据对象
         * @param item
         */

        $scope.saveBlackLists = function (blackLists, item) {
            var tempData = angular.extend({}, blackLists, item);
            if (!tempData.id) {
                delete tempData.id;
                adminService.postReq(URL.BLACKLISTS, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initBlackListsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (tempData.id && blackLists.id) {
                adminService.patchReq(URL.BLACKLISTS+'/'+blackLists.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initBlackListsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除blackLists
        /**
         * @param blackLists BLACKLISTSTITLE数据对象
         * @return null
         */
        $scope.deleteBlackLists = function (blackLists) {
            if (blackLists.id) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq(URL.BLACKLISTS+'/'+blackLists.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initBlackListsData();
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
        $scope.addBlackLists = function () {
            $scope.blackListsAoData = {};
            $scope.blackListsSearch = '';
            $scope.blackLists.unshift({
                'id': null,
                'blackListsName': '',
                'blackListsType': '',
                'blackListsStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的BLACKLISTSTITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.blackLists.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initBlackListsData();
    }
})();
