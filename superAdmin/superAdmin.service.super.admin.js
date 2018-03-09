(function (angular) {
    

    angular
        .module('app.superAdmin')
        .factory('superAdminService', superAdminService);

    superAdminService.$inject = ['$resource', 'EVN'];

    /* @ngInject */
    function superAdminService($resource, EVN) {
        return $resource(EVN.server + '/admin/:action',
            {},
            {
                // 菜单维护模块

                // 3.1 查询一级菜单
                getFindRootMenuInfo: {
                    method: 'GET',
                    params: {
                        action: 'findRootMenuInfo' + EVN.suffix
                    }
                },

                // 3.2 查询子菜单
                getFindSecMenuInfo: {
                    method: 'GET',
                    params: {
                        action: 'findSecMenuInfo' + EVN.suffix
                    }
                },

                // 3.3 保存菜单
                postSaveMenuInfo: {
                    method: 'POST',
                    params: {
                        action: 'saveMenuInfo' + EVN.suffix
                    }
                },

                // 3.4 更新菜单
                postUpdateMenuInfo: {
                    method: 'POST',
                    params: {
                        action: 'updateMenuInfo' + EVN.suffix
                    }
                },

                // 3.5 删除一级菜单
                getDeleteMenuInfoById: {
                    method: 'GET',
                    params: {
                        action: 'deleteMenuInfoById' + EVN.suffix
                    }
                },

                // 3.5 删除二级菜单
                getDeleteSecondMenuInfoById: {
                    method: 'GET',
                    params: {
                        action: 'deleteSecMenuInfoById' + EVN.suffix
                    }
                },

                // 按钮维护模块

                // 3.1 查找所有菜单
                getFindAllMenuInfo: {
                    method: 'GET',
                    params: {
                        action: 'findAllMenuInfo' + EVN.suffix
                    }
                },

                // 3.2 更新按钮
                postUpdateButtonInfo: {
                    method: 'POST',
                    params: {
                        action: 'updateButtonInfo' + EVN.suffix
                    }
                },

                // 3.3 根据菜单ID查询按钮
                getFindButtonInfoByMenuId: {
                    method: 'GET',
                    params: {
                        action: 'findButtonInfoByMenuId' + EVN.suffix
                    }
                },

                // 3.4 保存按钮
                postSaveButtonInfo: {
                    method: 'POST',
                    params: {
                        action: 'saveButtonInfo' + EVN.suffix
                    }
                },

                // 3.5 删除按钮
                getDeleteButtonInfoById: {
                    method: 'GET',
                    params: {
                        action: 'deleteButtonInfoById' + EVN.suffix
                    }
                },

                // 角色维护模块

                // 3.1 查询角色
                getFindPageRoleInfo: {
                    method: 'GET',
                    params: {
                        action: 'findPageRoleInfo' + EVN.suffix
                    }
                },
                // 3.1 查询未删除的角色
                getFindRoleInfoList: {
                    method: 'GET',
                    params: {
                        action: 'findRoleInfoList' + EVN.suffix
                    }
                },

                // 3.2 保存角色
                postSaveRoleInfo: {
                    method: 'POST',
                    params: {
                        action: 'saveRoleInfo' + EVN.suffix
                    }
                },

                // 3.3 更新角色
                postUpdateRoleInfo: {
                    method: 'POST',
                    params: {
                        action: 'updateRoleInfo' + EVN.suffix
                    }
                },

                // 3.4 删除角色
                getDeleteRoleInfoById: {
                    method: 'GET',
                    params: {
                        action: 'deleteRoleInfoById' + EVN.suffix
                    }
                },

                // 3.1 查找菜单树
                getFindMenuByRoleId: {
                    method: 'GET',
                    params: {
                        action: 'findMenuByRoleId' + EVN.suffix
                    }
                },

                // 3.2 添加角色菜单按钮关系
                postAddRoleAndMenuAndBtn: {
                    method: 'POST',
                    params: {
                        action: 'addRoleAndMenuAndBtn' + EVN.suffix
                    }
                },

                // 3.3 删除角色菜单按钮关系
                getDeleteRoleAndMenuAndBtn: {
                    method: 'GET',
                    params: {
                        action: 'deleteRoleAndMenuAndBtn' + EVN.suffix
                    }
                },

                // 3.4 查找按钮
                getFindButtonInfoList: {
                    method: 'GET',
                    params: {
                        action: 'findButtonInfoList' + EVN.suffix
                    }
                },

                // 管理员模块

                // 3.1 查询用户
                getFindUserInfo: {
                    method: 'GET',
                    params: {
                        action: 'findUserInfo' + EVN.suffix
                    }
                },

                // 3.2 保存用户
                postSaveUserInfo: {
                    method: 'POST',
                    params: {
                        action: 'saveUserInfo' + EVN.suffix
                    }
                },

                // 3.3 更新用户
                postUpdateUserInfo: {
                    method: 'POST',
                    params: {
                        action: 'updateUserInfo' + EVN.suffix
                    }
                },

                // 3.4 删除用户
                getDeleteUserById: {
                    method: 'GET',
                    params: {
                        action: 'deleteUserById' + EVN.suffix
                    }
                },

                // 3.1 菜单按钮
                getFindRoleMenuByRoleId: {
                    method: 'GET',
                    params: {
                        action: 'findRoleMenuByRoleId' + EVN.suffix
                    }
                },
            }
        );
    }

})(angular);

