(function() {

    angular
        .module('admin.role')
        .controller('SuperAdminRoleController', SuperAdminRoleController);

    SuperAdminRoleController.$inject = [
        '$scope',
        '$rootScope',
        'superAdminService'
    ];

    function SuperAdminRoleController(
        $scope,
        $rootScope,
        superAdminService
    ) {

        $scope.superAdminSelect012 = $rootScope.superAdminSelect012;

        // 原始的二级数据
        $scope.roles = [];

        // 过滤出来的二级数据
        $scope.showRoles = [];
        $scope.rolesReload = 1;
        $scope.rolesAoData = {};

        // 初始化table数据
        $scope.initRolesData = function () {
            if(!$scope.validPower("MANAGEROLE", ["GET"])){
                return '';
            }
            superAdminService.getReq($rootScope.URL.MANAGEROLE.GET,{ 'pageSize': 50, 'curPage': 1 }, {}).then(function (data) {
                console.log(data);
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        $scope.showRoles = [];
                        $scope.roles = angular.copy(data.data.list);
                        $scope.rolesReload++;
                    } else {
                        $rootScope.alertErrorMsg(data.msg);
                    }
                }
            });
        };


        // 保存角色
        /**
         * @param role 角色对象
         * @param item 输入的内容
         * @return null
         */
        $scope.saveRole = function (role, item) {
            var tempData = angular.extend({}, role, item);
            if (!tempData.id) {
                if(!$scope.validPower("MANAGEROLE", ["POST"])){
                    return '';
                }
                delete tempData.id;
                superAdminService.postReq($rootScope.URL.MANAGEROLE.POST, {}, tempData).then(function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.initRolesData();
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            } else if (tempData.id) {
                if(!$scope.validPower("MANAGEROLE", ["PATCH"])){
                    return '';
                }
                superAdminService.patchReq($rootScope.URL.MANAGEROLE.PATCH, {}, tempData).then(function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.initRolesData();
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除role
        /**
         * @param role 角色数据对象
         * @return null
         */
        $scope.deleteRole = function (role) {
            if(!$scope.validPower("MANAGEROLE", ["DELETE"])){
                return '';
            }
            if (role.id) {
                $rootScope.alertConfirm(function () {
                    superAdminService.deleteReq($rootScope.URL.MANAGEROLE.DELETE, { id: role.id }, {}).then(function (data) {
                        if (typeof data.success === 'boolean') {
                            if (data.success) {
                                $scope.initRolesData();
                                $rootScope.toasterSuccess(data.msg);
                            } else {
                                $rootScope.alertErrorMsg(data.msg);
                            }
                        }
                    });
                });
            }
        };

        // 添加按钮
        $scope.addRoles = function () {
            $scope.rolesAoData = {};
            $scope.roles.unshift({
                'id': null,
                'roleName': '',
                'roleType': '',
                'roleStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的对象
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.roles.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initRolesData();
    }
})();
