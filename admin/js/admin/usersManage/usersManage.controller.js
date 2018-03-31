(function() {

    angular
        .module('admin.usersManage')
        .controller('UsersManageController', UsersManageController);

    UsersManageController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function UsersManageController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.usersManage = [];

        // 过滤出来的数据
        $scope.showUsersManage = [];
        $scope.usersManageReload = 1;
        $scope.usersManageAoData = {};
        $scope.usersManageSearch = '';

        // 初始化table数据
        $scope.initUsersManageData = function () {
            $scope.usersManage = [];
            adminService.getReq($rootScope.URL.USERSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.usersManage = angular.copy(res.data.data);
                        $scope.usersManage.forEach(function (usersManageItem, usersManageIndex) {
                            usersManageItem._id = usersManageIndex +1;
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
         * @param usersManage USERSMANAGETITLE数据对象
         * @param item
         */

        $scope.saveUsersManage = function (usersManage, item) {
            var tempData = angular.extend({}, usersManage, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.USERSMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initUsersManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && usersManage.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.USERSMANAGE.PATCH+'/'+usersManage.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initUsersManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除usersManage
        /**
         * @param usersManage USERSMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteUsersManage = function (usersManage) {
            if (!$scope.validIsNew(usersManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.USERSMANAGE.DELETE+'/'+usersManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initUsersManageData();
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
        $scope.addUsersManage = function () {
            $scope.usersManageAoData = {};
            $scope.usersManageSearch = '';
            $scope.usersManage.unshift({
                '_id': ($scope.usersManage.length+1) + 'null',
                'usersManageName': '',
                'usersManageType': '',
                'usersManageStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的USERSMANAGETITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.usersManage.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initUsersManageData();
    }
})();
