(function() {
    'use strict';

    angular
        .module('superAdmin.admin')
        .controller('SuperAdminAdminRelationController', SuperAdminAdminRelationController);

    SuperAdminAdminRelationController.$inject = [
        '$scope',
        '$rootScope',
        'superAdminService',
        'superAdminSelect012'
    ];

    function SuperAdminAdminRelationController(
        $scope,
        $rootScope,
        superAdminService,
        superAdminSelect012
    ){

        $scope.superAdminSelect012 = superAdminSelect012;

        $scope.roles = [];

        $scope.admins = [];

        $scope.currentAdmin = {};

        $scope.roleMenuAndBtn = [];

        $scope.initRolesData = function () {
            superAdminService.getFindPageRoleInfo({"pageSize":50,"curPage":1},{},function (data) {
                console.log(data,'initRolesData');
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        $scope.roles = angular.copy(data.data.list);
                    } else {
                        $rootScope.alertErrorMsg(data.msg);
                    }
                }
            });
        };

        $scope.initAdminsData = function () {
            superAdminService.getFindUserInfo({"pageSize":100,"curPage":1},{},function (data) {
                console.log(data);
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        $scope.admins = angular.copy(data.data.list);
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
            if(id){
                $scope.roleMenuAndBtn = [];
                superAdminService.getFindRoleMenuByRoleId({"roleId":id},{},function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.roleMenuAndBtn = angular.copy(data.data);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }
        };

        // 获取用户的menu和button
        /**
         * @param admin 管理员对象
         * @return null
         */
        $scope.setCurrentAdmin = function (admin) {
            $scope.currentAdmin = angular.copy(admin);
            if(admin.roleId){
                $scope.getRoleMenuAndBtn(admin.roleId)
            }
        };

        // 设置用户的roleId
        /**
         * @param role 角色对象
         * @return null
         */
        $scope.setAdminRoleId = function (role) {
            if($scope.currentAdmin.id){
                var tempData = angular.copy($scope.currentAdmin);
                tempData.roleId = role.id;
                superAdminService.postUpdateUserInfo({},tempData,function (data) {
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $rootScope.toasterSuccess(data.msg);
                            $scope.currentAdmin.roleId = role.id;
                            $scope.admins.forEach(function ( admin ) {
                                if(admin.id == $scope.currentAdmin.id){
                                    admin.roleId = role.id;
                                }
                            });
                            $scope.getRoleMenuAndBtn(role.id);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }else{
                $rootScope.alertErrorMsg('select admin first!');
                return
            }
        };

        // 页面加载执行的函数

        $scope.initRolesData();

        $scope.initAdminsData()
    }
})();
