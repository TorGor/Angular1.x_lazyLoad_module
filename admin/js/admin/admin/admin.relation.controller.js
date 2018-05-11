(function() {

    angular
        .module('admin.admin')
        .controller('SuperAdminAdminRelationController', SuperAdminAdminRelationController);

    SuperAdminAdminRelationController.$inject = [
        '$scope',
        '$rootScope',
        'superAdminService',
        '$timeout'
    ];

    function SuperAdminAdminRelationController(
        $scope,
        $rootScope,
        superAdminService,
        $timeout
    ) {

        $scope.roles = [];

        $scope.admins = [];

        $scope.currentAdmin = {};

        $scope.roleMenuAndBtn = [];

        $scope.initRolesData = function () {
            superAdminService.getReq($rootScope.URL.MANAGEADMINROLE.MIDGET, { 'pageSize': 100, 'curPage': 1 }, {}).then(function (data) {
                console.log(data, 'initRolesData');
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        $scope.roles = angular.copy(data.data);
                    } else {
                        $rootScope.alertErrorMsg(data.msg);
                    }
                }
            });
        };

        $scope.initAdminsData = function (userName) {
            superAdminService.getReq($rootScope.URL.MANAGEADMINROLE.LEFTGET, { 'pageSize': 100, 'curPage': 1, 'status': 1, 'userName': userName || '' }, {}).then(function (data) {
                console.log(data);
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        $scope.admins = angular.copy(data.data.list);
                        if (!$scope.currentAdmin.id) {
                            if ($scope.admins.length > 0) {
                                $scope.currentAdmin = angular.copy($scope.admins[0]);
                                $scope.getRoleMenuAndBtn($scope.currentAdmin.roleId);
                            }
                        }
                    } else {
                        $rootScope.alertErrorMsg(data.msg);
                    }
                }
            });
        };

        // 获取用户的menu和button
        /**
         * @param id 角色对象的id
         * @return null
         */
        $scope.getRoleMenuAndBtn = function (id) {
            $scope.roleMenuAndBtn = [];
            if (id) {
                superAdminService.getReq($rootScope.URL.MANAGEADMINROLE.RIGHTGET, { 'roleId': id }, {}).then(function (data) {
                    console.log(data, 'getRoleMenuAndBtn');
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.roleMenuAndBtn = angular.copy(data.data);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }else{

            }
        };

        // 获取用户的menu和button
        /**
         * @param admin 管理员对象
         * @return null
         */
        $scope.setCurrentAdmin = function (admin) {
            $scope.currentAdmin = angular.copy(admin);
            $scope.getRoleMenuAndBtn(admin.roleId);
        };

        // 设置用户的roleId
        /**
         * @param role 角色对象
         * @return null
         */
        $scope.setAdminRoleId = function (role) {
            if ($scope.currentAdmin.id) {
                var tempData = angular.copy($scope.currentAdmin);
                tempData.roleId = role.id;
                superAdminService.patchReq($rootScope.URL.MANAGEADMINROLE.MIDPATCH, {}, tempData).then(function (data) {
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $rootScope.toasterSuccess(data.msg);
                            $scope.currentAdmin.roleId = role.id;
                            $scope.admins.forEach(function (admin) {
                                if (admin.id == $scope.currentAdmin.id) {
                                    admin.roleId = role.id;
                                }
                            });
                            $scope.getRoleMenuAndBtn(role.id);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            } else {
                $rootScope.alertErrorMsg('select admin first!');
                return;
            }
        };

        var timer = null;

        $scope.$watch('userName', function (newValue, oldValue) {
            if (newValue != oldValue) {
                if (timer) {
                    $timeout.cancel(timer);
                }
                timer = $timeout(function() {
                    $scope.initAdminsData($scope.userName);
                }, 200);
            }
        });

        // 页面加载执行的函数

        $scope.initRolesData();

        $scope.initAdminsData();
    }
})();
