(function() {
    'use strict';

    angular
        .module('superAdmin.role')
        .controller('SuperAdminRoleRelationController', SuperAdminRoleRelationController);

    SuperAdminRoleRelationController.$inject = [
        '$scope',
        '$rootScope',
        'superAdminService'
    ];

    function SuperAdminRoleRelationController(
        $scope,
        $rootScope,
        superAdminService
    ){

        $scope.roles = [];
        $scope.oneLevelMenus = [];
        $scope.buttons = [];

        $scope.currentRole = {};
        $scope.currentOneLevelMenu = {};
        $scope.currentSecondLevelMenu = {};

        // 获取角色关系
        /**
         * @param role 角色对象
         * @param isClick 是否是click动作
         * @return null
         */
        $scope.getRoleRelationById = function (role, isClick) {
            $scope.currentRole = angular.copy(role);
            if(role.id){
                superAdminService.getFindMenuByRoleId({"roleId":role.id},{},function (data) {
                    console.log(data,'getRoleRelationById');
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            var allMenus = angular.copy(data.data);
                            $scope.oneLevelMenus = allMenus.filter(function (allMenusItem) {
                                return allMenusItem.parentId == 'root';
                            });
                            $scope.oneLevelMenus = angular.copy($scope.oneLevelMenus);
                            $scope.oneLevelMenus.forEach(function (oneLevelMenusItem) {
                                oneLevelMenusItem.showSecond = true;
                                oneLevelMenusItem.secondLevelMenus = angular.copy(allMenus.filter(function (allMenusItem) {
                                    return allMenusItem.parentId == oneLevelMenusItem.id;
                                }));
                            });
                            console.log($scope.oneLevelMenus,'$scope.oneLevelMenus')
                            if(isClick){
                                $scope.currentSecondLevelMenu = {};
                                $scope.buttons = [];
                            }else{
                                if(!$scope.currentSecondLevelMenu.id){
                                    for(var i = 0, j = $scope.oneLevelMenus.length;i < j;i++){
                                        if($scope.oneLevelMenus[i]['secondLevelMenus'][0]){
                                            $scope.oneLevelMenus[i]['showSecond'] = true;
                                            $scope.currentSecondLevelMenu = angular.copy($scope.oneLevelMenus[i]['secondLevelMenus'][0]);
                                            $scope.getSecondLevelButtons($scope.currentSecondLevelMenu);
                                            break;
                                        }
                                    }
                                }
                            }
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }
        };

        // 初始化role数据
        $scope.initRolesData = function () {
            superAdminService.getFindRoleInfoList({"pageSize":50,"curPage":1},{},function (data) {
                console.log(data,'initRolesData');
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        $scope.roles = angular.copy(data.data);
                        if($scope.roles[0]){
                            $scope.currentRole = angular.copy($scope.roles[0]);
                            $scope.getRoleRelationById($scope.currentRole, false);
                        }
                    } else {
                        $rootScope.alertErrorMsg(data.msg);
                    }
                }
            });
        };

        // 获取buttons
        /**
         * @param secondLevelMenu 二级菜单对象
         * @return null
         */
        $scope.getSecondLevelButtons = function (secondLevelMenu, $event){
            if($event){
                $event.stopPropagation();
            }
            if(!$scope.currentRole.id){
                $rootScope.alertErrorMsg('select role first!');
                return
            }
            $scope.currentSecondLevelMenu = angular.copy(secondLevelMenu);
            if(secondLevelMenu.id){
                $scope.buttons = [];
                superAdminService.getFindButtonInfoList({
                    "roleId":$scope.currentRole.id,
                    "menuId":secondLevelMenu.id
                },{},function ( data ) {
                    console.log(data)
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.buttons = angular.copy(data.data);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                })
            }
        };

        // 点击修改button状态
        /**
         * @param button 按钮对象
         * @return null
         */
        $scope.handelClickButton = function (button, $event) {
            $event.preventDefault();
            if(!$scope.currentRole.id || !$scope.currentSecondLevelMenu.id){
                $rootScope.alertErrorMsg('select role and menu first!');
                return
            }
            if(button.id){
                console.log(button, 'button');
                if(button.checked){
                    superAdminService.postAddRoleAndMenuAndBtn({},{
                        "roleId":$scope.currentRole.id,
                        "btnId":button.id,
                        "menuId":$scope.currentSecondLevelMenu.id
                    },function ( data ) {
                        console.log(data);
                        if (typeof data.success === 'boolean') {
                            if (data.success) {
                                $scope.getRoleRelationById($scope.currentRole, false);
                                $scope.getSecondLevelButtons($scope.currentSecondLevelMenu);
                                $rootScope.toasterSuccess(data.msg);
                            } else {
                                $rootScope.alertErrorMsg(data.msg);
                            }
                        }
                    })
                }else{
                    superAdminService.getDeleteRoleAndMenuAndBtn({
                        "roleId":$scope.currentRole.id,
                        "btnId":button.id,
                        "menuId":$scope.currentSecondLevelMenu.id
                    },{},function ( data ) {
                        console.log(data);
                        if (typeof data.success === 'boolean') {
                            if (data.success) {
                                $scope.getRoleRelationById($scope.currentRole, false);
                                $scope.getSecondLevelButtons($scope.currentSecondLevelMenu);
                                $rootScope.toasterSuccess(data.msg);
                            } else {
                                $rootScope.alertErrorMsg(data.msg);
                            }
                        }
                    })
                }
            }
        };


        // 页面加载执行的函数

        $scope.initRolesData();
    }
})();
