(function() {

    angular
        .module('superAdmin', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.core',
            'superAdmin.menu',
            'superAdmin.button',
            'superAdmin.role',
            'superAdmin.admin',
        ]);
})();
(function() {

    angular
        .module('superAdmin.menu', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('superAdmin.role', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('superAdmin.admin', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('superAdmin.button', [
            'app.core',
            /* ... */
        ]);
})();
(function() {

    angular
        .module('superAdmin')
        .run(appRun);

    appRun.$inject = [
        '$rootScope',
        '$translate'
    ];

    function appRun(
        $rootScope,
        $translate
    ) {

        $rootScope.superAdminSelect012 = {
            // 0-禁用；1-启用；
            options: [
                {
                    label: $translate.instant('options.forbid'),
                    value: '0'
                },
                {
                    label: $translate.instant('options.enable'),
                    value: '1'
                }
            ],
            // 0-禁用；1-启用；2-删除；''-全部；
            optionsSearch: [
                {
                    label: $translate.instant('options.all'),
                    value: ''
                },
                {
                    label: $translate.instant('options.forbid'),
                    value: '0'
                },
                {
                    label: $translate.instant('options.enable'),
                    value: '1'
                },
                {
                    label: $translate.instant('options.delete'),
                    value: '2'
                }
            ]
        };

    }

})();
(function (angular) {
    

    angular
        .module('superAdmin')
        .factory('superAdminService', superAdminService);

    superAdminService.$inject = ['$resource', 'EVN'];

    /* @ngInject */
    function superAdminService($resource, EVN) {
        return $resource(EVN.server + '/admin/:action0/:action',
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
                getFindUserLog: {
                    method: 'GET',
                    params: {
                        action0:'log',
                        action: 'findLogListByParams' + EVN.suffix
                    }
                },

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


(function() {

    angular
        .module('superAdmin.menu')
        .controller('SuperAdminMenuController', SuperAdminMenuController);

    SuperAdminMenuController.$inject = [
        '$scope',
        '$rootScope',
        'superAdminService',
        '$sce',
        '$uibModal'
    ];

    function SuperAdminMenuController(
        $scope,
        $rootScope,
        superAdminService,
        $sce,
        $uibModal
    ) {

        $scope.superAdminSelect012 = $rootScope.superAdminSelect012;

        $scope.oneLevelMenus = [];

        // 原始的二级数据
        $scope.twoLevelMenus = [];

        // 过滤出来的二级数据
        $scope.twoLevelMenusShow = [];
        $scope.twoLevelMenusShowReload = 1;
        $scope.twoLevelMenusAoData = {
            menuStatus: ''
        };

        $scope.currentSelectMenu = {};

        // 添加一级菜单
        $scope.addOneLevelMenu = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/superAdmin/menu/menu-add-modal.html',
                controller: 'OneLevelMenusModalController',
                resolve: {
                    modalData: function () {
                        return {};
                    },
                    isAdd: true
                }
            });
            modalInstance.result.then(function (data) {
                if (data === 'neededUploadOneLevelMenus') {
                    $scope.initOneLevelMenus();
                }
            }, function (cancel) {

            });
        };

        // 获取二级菜单,初始化列表数据
        /**
         * @param oneLevelMenu 一级菜单对象
         * @return null
         */
        $scope.getSecondLevelMenu = function (oneLevelMenu) {
            $scope.twoLevelMenus = [];
            $scope.currentSelectMenu = angular.copy(oneLevelMenu);
            if ($scope.currentSelectMenu['showSecond'] !== undefined) {
                delete $scope.currentSelectMenu['showSecond'];
            }
            if (oneLevelMenu['showSecond']) {
                oneLevelMenu['showSecond'] = false;
                return;
            }
            console.log(oneLevelMenu, 'oneLevelMenu');
            $scope.oneLevelMenus.forEach(function (oneLevelMenusItem) {
                oneLevelMenusItem['showSecond'] = false;
            });
            if (oneLevelMenu.id) {
                oneLevelMenu['showSecond'] = !oneLevelMenu['showSecond'];
                $scope.twoLevelMenus = [];
                superAdminService.getFindSecMenuInfo({ 'parentid': oneLevelMenu.id, 'pageSize': 50, 'curPage': 1 }, {}, function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            oneLevelMenu['secondLevelMenus'] = angular.copy(data.data.list);
                            $scope.twoLevelMenus = angular.copy(data.data.list);
                            $scope.twoLevelMenusAoData = {
                                menuName: '',
                                menuStatus: ''
                            };
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }
        };

        // 保存二级菜单
        /**
         * @param secondLevelMenu 二级菜单对象
         * @param item 输入的对象
         * @return null
         */
        $scope.saveSecondLevelMenu = function (secondLevelMenu, item) {
            console.log(secondLevelMenu, 'secondLevelMenu');
            console.log(item, 'secondLevelMenuItem');
            var tempData = angular.extend({}, secondLevelMenu, item);
            if (!tempData.id) {
                delete tempData.id;
            }
            superAdminService.postSaveMenuInfo({}, tempData, function (data) {
                console.log(data);
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        $scope.getSecondLevelMenu($scope.currentSelectMenu);
                        $rootScope.toasterSuccess(data.msg);
                    } else {
                        $rootScope.alertErrorMsg(data.msg);
                    }
                }
            });
            return '';
        };

        // 添加二级菜单
        $scope.addSecondLevelMenu = function () {
            if ($scope.currentSelectMenu.id) {
                $scope.twoLevelMenusAoData = {};
                $scope.twoLevelMenus.unshift({
                    'id': null,
                    'menuName': '',
                    'menuCode': '',
                    'menuType': null,
                    'menuStatus': '1',
                    'menuUrl': '',
                    'menuSortNo': 0,
                    'parentId': $scope.currentSelectMenu.id,
                    'isShowTrEdit': true
                });
            }
        };

        /**
         *
         * @param item 添加的对象
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.twoLevelMenus.splice(index, 1);
            }
        };

        // 删除一级菜单
        /**
         * @param oneLevelMenu 一级菜单对象
         * @param $event 事件对象
         * @return null
         */
        $scope.deleteOneLevelMenu = function (oneLevelMenu, $event) {
            console.log(oneLevelMenu, 'oneLevelMenu');
            $event.stopPropagation();
            if (oneLevelMenu.id) {
                $rootScope.alertConfirm(function () {
                    superAdminService.getDeleteMenuInfoById({ 'id': oneLevelMenu.id }, {}, function (data) {
                        console.log(data);
                        if (typeof data.success === 'boolean') {
                            if (data.success) {
                                $scope.initOneLevelMenus();
                                $rootScope.toasterSuccess(data.msg);
                            } else {
                                $rootScope.alertErrorMsg(data.msg);
                            }
                        }
                    });
                });
            }
        };

        // 删除二级菜单
        /**
         * @param secondLevelMenu 二级菜单对象
         * @return null
         */
        $scope.deleteSecondLevelMenu = function (secondLevelMenu) {
            console.log(secondLevelMenu, 'secondLevelMenu');
            if (secondLevelMenu.id) {
                $rootScope.alertConfirm(function () {
                    superAdminService.getDeleteSecondMenuInfoById({ 'id': secondLevelMenu.id }, {}, function (data) {
                        console.log(data);
                        if (typeof data.success === 'boolean') {
                            if (data.success) {
                                $scope.getSecondLevelMenu($scope.currentSelectMenu);
                                $rootScope.toasterSuccess(data.msg);
                            } else {
                                $rootScope.alertErrorMsg(data.msg);
                            }
                        }
                    });
                });
            }
        };

        // 初始化一级菜单
        $scope.initOneLevelMenus = function () {
            superAdminService.getFindRootMenuInfo({}, {}, function (data) {
                console.log(data);
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        var tempData = data.data;
                        tempData.forEach(function (oneLevelMenusItem) {
                            oneLevelMenusItem['secondLevelMenus'] = [];
                            oneLevelMenusItem['showSecond'] = false;
                        });
                        $scope.oneLevelMenus = angular.copy(data.data);
                        if ($scope.oneLevelMenus[0]) {
                            $scope.currentSelectMenu = angular.copy($scope.oneLevelMenus[0]);
                            $scope.getSecondLevelMenu($scope.currentSelectMenu);
                        }
                    } else {
                        $rootScope.alertErrorMsg(data.msg);
                    }
                }
            });
        };

        // 编辑一级菜单
        /**
         * @param oneLevelMenu 一级菜单对象
         * @return null
         */
        $scope.editOneLevelMenu = function (oneLevelMenu, $event) {
            console.log(oneLevelMenu, 'editOneLevelMenu');
            $event.stopPropagation();
            if (oneLevelMenu.id) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/superAdmin/menu/menu-add-modal.html',
                    controller: 'OneLevelMenusModalController',
                    resolve: {
                        modalData: function () {
                            return oneLevelMenu;
                        },
                        isAdd: false
                    }
                });
                modalInstance.result.then(function (data) {
                    if (data === 'neededUploadOneLevelMenus') {
                        $scope.initOneLevelMenus();
                    }
                }, function (cancel) {

                });
            }
        };

        // 页面加载执行的函数

        $scope.initOneLevelMenus();
    }
})();

(function() {

    angular
        .module('superAdmin.menu')
        .controller('OneLevelMenusModalController', OneLevelMenusModalController);

    OneLevelMenusModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'modalData',
        'isAdd',
        'superAdminService'
    ];

    function OneLevelMenusModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        modalData,
        isAdd,
        superAdminService
    ) {

        $scope.oneLevelMenusModal = {};

        $scope.isAdd = isAdd;

        $scope.superAdminSelect012 = $rootScope.superAdminSelect012;

        if (isAdd) {
            $scope.oneLevelMenusModal['menuStatus'] = '1';
        } else {
            $scope.oneLevelMenusModal = angular.copy(modalData);
        }

        $scope.confirm = function () {
            if (isAdd) {
                var tempAddOneLevelMenus = {
                    // "id": "1",
                    'menuName': $scope.oneLevelMenusModal.menuName || '',
                    'menuCode': '',
                    'menuType': '',
                    'menuStatus': $scope.oneLevelMenusModal.menuStatus,
                    'menuUrl': '',
                    'menuSortNo': $scope.oneLevelMenusModal.menuSortNo || '',
                    'parentId': 'root',
                };
                superAdminService.postSaveMenuInfo({}, tempAddOneLevelMenus, function (data) {
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.oneLevelMenusModal = {};
                            $rootScope.toasterSuccess(data.msg);
                            $uibModalInstance.close('neededUploadOneLevelMenus');
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            } else {
                var tempUpdateOneLevelMenus = {
                    'id': $scope.oneLevelMenusModal.id,
                    'menuName': $scope.oneLevelMenusModal.menuName || '',
                    'menuCode': $scope.oneLevelMenusModal.menuCode || '',
                    'menuType': $scope.oneLevelMenusModal.menuType,
                    'menuStatus': $scope.oneLevelMenusModal.menuStatus,
                    'menuUrl': $scope.oneLevelMenusModal.menuUrl,
                    'menuSortNo': $scope.oneLevelMenusModal.menuSortNo,
                    'parentId': 'root',
                };
                superAdminService.postUpdateMenuInfo({}, tempUpdateOneLevelMenus, function (data) {
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.oneLevelMenusModal = {};
                            $rootScope.toasterSuccess(data.msg);
                            $uibModalInstance.close('neededUploadOneLevelMenus');
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

(function() {

    angular
        .module('superAdmin.role')
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
            $scope.roles = [];
            superAdminService.getFindPageRoleInfo({ 'pageSize': 50, 'curPage': 1 }, {}, function (data) {
                console.log(data);
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        $scope.roles = angular.copy(data.data.list);
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
                delete tempData.id;
                superAdminService.postSaveRoleInfo({}, tempData, function (data) {
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
                superAdminService.postUpdateRoleInfo({}, tempData, function (data) {
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
            if (role.id) {
                $rootScope.alertConfirm(function () {
                    superAdminService.getDeleteRoleInfoById({ id: role.id }, {}, function (data) {
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

(function() {

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
    ) {

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
            if (role.id) {
                superAdminService.getFindMenuByRoleId({ 'roleId': role.id }, {}, function (data) {
                    console.log(data, 'getRoleRelationById');
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
                            console.log($scope.oneLevelMenus, '$scope.oneLevelMenus');
                            if (isClick) {
                                $scope.buttons = [];
                                $scope.currentSecondLevelMenu = {};
                            } else {
                                if (!$scope.currentSecondLevelMenu.id) {
                                    for (var i = 0, j = $scope.oneLevelMenus.length; i < j; i++) {
                                        if ($scope.oneLevelMenus[i]['secondLevelMenus'][0]) {
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
            superAdminService.getFindRoleInfoList({ 'pageSize': 50, 'curPage': 1 }, {}, function (data) {
                console.log(data, 'initRolesData');
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        $scope.roles = angular.copy(data.data);
                        if ($scope.roles[0]) {
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
        $scope.getSecondLevelButtons = function (secondLevelMenu, $event) {
            if ($event) {
                $event.stopPropagation();
            }
            if (!$scope.currentRole.id) {
                $rootScope.alertErrorMsg('select role first!');
                return;
            }
            $scope.currentSecondLevelMenu = angular.copy(secondLevelMenu);
            if (secondLevelMenu.id) {
                $scope.buttons = [];
                superAdminService.getFindButtonInfoList({
                    'roleId': $scope.currentRole.id,
                    'menuId': secondLevelMenu.id
                }, {}, function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.buttons = angular.copy(data.data);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }
        };

        // 点击修改button状态
        /**
         * @param button 按钮对象
         * @return null
         */
        $scope.handelClickButton = function (button, $event) {
            $event.preventDefault();
            if (!$scope.currentRole.id || !$scope.currentSecondLevelMenu.id) {
                $rootScope.alertErrorMsg('select role and menu first!');
                return;
            }
            if (button.id) {
                console.log(button, 'button');
                if (button.checked) {
                    superAdminService.postAddRoleAndMenuAndBtn({}, {
                        'roleId': $scope.currentRole.id,
                        'btnId': button.id,
                        'menuId': $scope.currentSecondLevelMenu.id
                    }, function (data) {
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
                    });
                } else {
                    superAdminService.getDeleteRoleAndMenuAndBtn({
                        'roleId': $scope.currentRole.id,
                        'btnId': button.id,
                        'menuId': $scope.currentSecondLevelMenu.id
                    }, {}, function (data) {
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
                    });
                }
            }
        };


        // 页面加载执行的函数

        $scope.initRolesData();
    }
})();

(function() {


    angular
        .module('superAdmin.admin')
        .controller('SuperAdminAdminController', SuperAdminAdminController);

    SuperAdminAdminController.$inject = [
        '$scope',
        '$rootScope',
        'superAdminService'
    ];

    function SuperAdminAdminController(
        $scope,
        $rootScope,
        superAdminService
    ) {

        $scope.superAdminSelect012 = $rootScope.superAdminSelect012;

        // 原始的二级数据
        $scope.admins = [];

        // 过滤出来的二级数据
        $scope.adminsReload = 1;
        $scope.adminsAoData = {
            status: ''
        };
        $scope.tempAdminsAoData = {
            status: ''
        };

        $scope.trigerSearch = function() {
            $scope.tempAdminsAoData = Object.assign($scope.tempAdminsAoData,$scope.adminsAoData)
        };

        $scope.resetSearch = function() {
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            $scope.adminsAoData = {
                status: ''
            };
            var tempData = $scope.tempAdminsAoData;
            $scope.tempAdminsAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize,
                status: ''
            }
        };

        /**
         * 校验密码长度
         *
         * @param {any} str 字符串
         */
        $scope.checkPassword = function(str) {
            if (typeof str === 'string') {
                var tempStr = $scope.checkRequiredData(str);
                if(typeof tempStr === 'string' && tempStr.length){
                    return tempStr;
                }
                if(str.length<6 || str.length>16){
                    return 'password length should be between 6 and 16!';
                }
            }
            return 'password should be string';
        };

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.adminsAoData.start = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.adminsAoData.start) {
                        delete $scope.adminsAoData.start;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.adminsAoData.end = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.adminsAoData.end) {
                        delete $scope.adminsAoData.end;
                    }
                }
            }
        });

        // 保存管理员
        /**
         * @param admin 管理员对象
         * @param item 显示输入的数据对象
         * @return null
         */
        $scope.saveAdmin = function (admin, item) {
            var tempData = angular.extend({}, admin, item);
            if (!tempData.id) {
                delete tempData.id;
                superAdminService.postSaveUserInfo({}, tempData, function (data) {
                    console.log(data);
                    $scope.adminsReload++;
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            } else if (tempData.id) {
                superAdminService.postUpdateUserInfo({}, tempData, function (data) {
                    console.log(data);
                    $scope.adminsReload++;
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }
            return '';

        };

        // 删除admin
        /**
         * @param admin 管理员数据对象
         * @return null
         */
        $scope.deleteAdmin = function (admin) {
            if (admin.id) {
                $rootScope.alertConfirm(function () {
                    superAdminService.getDeleteUserById({ id: admin.id }, {}, function (data) {
                        if (typeof data.success === 'boolean') {
                            if (data.success) {
                                $rootScope.toasterSuccess(data.msg);
                                $scope.adminsReload++;
                            } else {
                                $rootScope.alertErrorMsg(data.msg);
                            }
                        }
                    });
                });
            }
        };

        // 添加按钮
        $scope.addAdmins = function () {
            $scope.admins.unshift({
                'id': null,
                'username': '',
                'password': '',
                'status': '1',
                'level': null,
                'createTime': null,
                'optTime': null,
                'roleId': null,
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
                $scope.admins.splice(index, 1);
            }
        };

        // 页面加载执行的函数
    }
})();

(function() {

    angular
        .module('superAdmin.admin')
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
            superAdminService.getFindRoleInfoList({ 'pageSize': 100, 'curPage': 1 }, {}, function (data) {
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
            superAdminService.getFindUserInfo({ 'pageSize': 100, 'curPage': 1, 'status': 1, 'userName': userName || '' }, {}, function (data) {
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
                superAdminService.getFindRoleMenuByRoleId({ 'roleId': id }, {}, function (data) {
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
                superAdminService.postUpdateUserInfo({}, tempData, function (data) {
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

(function() {


    angular
        .module('superAdmin.admin')
        .controller('SuperAdminAdminLogController', SuperAdminAdminLogController);

    SuperAdminAdminLogController.$inject = [
        '$scope',
        '$rootScope',
        'superAdminService'
    ];

    function SuperAdminAdminLogController(
        $scope,
        $rootScope,
        superAdminService
    ) {

        $scope.adminsLog = [];
        $scope.adminsLogReload = 1;
        $scope.tempAdminsLogAoData = {};
        $scope.adminsLogAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempAdminsLogAoData = Object.assign($scope.tempAdminsLogAoData,$scope.adminsLogAoData)
        };

        $scope.resetSearch = function() {
            $scope.adminsLogAoData = {};
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempAdminsLogAoData;
            $scope.tempAdminsLogAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            }
        };

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.adminsAoData.beginTime = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.adminsAoData.beginTime) {
                        delete $scope.adminsAoData.beginTime;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.adminsAoData.endTime = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.adminsAoData.endTime) {
                        delete $scope.adminsAoData.endTime;
                    }
                }
            }
        });


        // 页面加载执行的函数
    }
})();

(function() {

    angular
        .module('superAdmin.button')
        .controller('SuperAdminButtonController', SuperAdminButtonController);

    SuperAdminButtonController.$inject = [
        '$scope',
        '$rootScope',
        '$translate',
        'superAdminService'
    ];

    function SuperAdminButtonController(
        $scope,
        $rootScope,
        $translate,
        superAdminService
    ) {

        $scope.buttonsOptions = [
            {
                label: $translate.instant('table.button.search'),
                value: '1'
            },
            {
                label: $translate.instant('table.button.add'),
                value: '2'
            },
            {
                label: $translate.instant('table.button.edit'),
                value: '3'
            },
            {
                label: $translate.instant('table.button.delete'),
                value: '4'
            },
            {
                label: $translate.instant('table.button.recover'),
                value: '5'
            }
        ];

        /**
         *
         * @param btnType 1234数字
         * @returns {string} 显示的内容
         */
        $scope.showBtnType = function (btnType) {
            var tempBtnArray = $scope.buttonsOptions.filter(function (optionsItem) {
                return optionsItem.value == btnType;
            });
            if(tempBtnArray.length){
                return tempBtnArray[0].label;
            }
            return '';
        };

        $scope.superAdminSelect012 = $rootScope.superAdminSelect012;

        $scope.oneLevelMenus = [];

        // 原始的二级数据
        $scope.buttons = [];

        // 过滤出来的二级数据
        $scope.showButtons = [];
        $scope.buttonsReload = 1;
        $scope.buttonsAoData = {};

        $scope.currentSelectMenu = {};

        // 初始化一级菜单
        $scope.initOneLevelMenus = function () {
            superAdminService.getFindAllMenuInfo({}, {}, function (data) {
                console.log(data);
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        var allMenus = angular.copy(data.data);
                        $scope.oneLevelMenus = allMenus.filter(function (allMenusItem) {
                            return allMenusItem.parentId == 'root';
                        });
                        $scope.oneLevelMenus = angular.copy($scope.oneLevelMenus);
                        $scope.oneLevelMenus.forEach(function (oneLevelMenusItem) {
                            oneLevelMenusItem.showSecond = false;
                            oneLevelMenusItem.secondLevelMenus = angular.copy(allMenus.filter(function (allMenusItem) {
                                return allMenusItem.parentId == oneLevelMenusItem.id;
                            }));
                        });
                        if (!$scope.currentSelectMenu.id) {
                            for (var i = 0, j = $scope.oneLevelMenus.length; i < j; i++) {
                                if ($scope.oneLevelMenus[i]['secondLevelMenus'][0]) {
                                    $scope.oneLevelMenus[i]['showSecond'] = true;
                                    $scope.currentSelectMenu = angular.copy($scope.oneLevelMenus[i]['secondLevelMenus'][0]);
                                    $scope.getSecondLevelButtons($scope.currentSelectMenu);
                                    break;
                                }
                            }
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
        $scope.getSecondLevelButtons = function (secondLevelMenu, $event) {
            if ($event) {
                $event.stopPropagation();
            }
            $scope.buttons = [];
            console.log(secondLevelMenu, 'getSecondLevelButtons');
            $scope.currentSelectMenu = angular.copy(secondLevelMenu);
            if (secondLevelMenu.id) {
                $scope.buttons = [];
                superAdminService.getFindButtonInfoByMenuId({ 'menuId': secondLevelMenu.id }, {}, function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.buttons = angular.copy(data.data);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }
        };

        // 保存按钮
        /**
         * @param button 按钮数据对象
         * @param item 显示输入的数据
         * @return null
         */
        $scope.saveButton = function (button, item) {
            var tempData = angular.extend({}, button, item);
            if (!tempData.id) {
                delete tempData.id;
                superAdminService.postSaveButtonInfo({}, tempData, function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.getSecondLevelButtons($scope.currentSelectMenu);
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            } else if (tempData.id) {
                superAdminService.postUpdateButtonInfo({}, tempData, function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.getSecondLevelButtons($scope.currentSelectMenu);
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除按钮
        /**
         * @param button 按钮数据对象
         * @return null
         */
        $scope.deleteButton = function (button) {
            if (button.id) {
                $rootScope.alertConfirm(function () {
                    superAdminService.getDeleteButtonInfoById({ id: button.id }, {}, function (data) {
                        if (typeof data.success === 'boolean') {
                            if (data.success) {
                                $scope.getSecondLevelButtons($scope.currentSelectMenu);
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
        $scope.addButtons = function () {
            if ($scope.currentSelectMenu.id) {
                $scope.buttonsAoData = {};
                $scope.buttons.unshift({
                    'id': null,
                    'btnName': '',
                    'btnType': '',
                    'btnCode': '',
                    'btnUrl': '',
                    'btnStatus': '1',
                    'createTime': null,
                    'optTime': null,
                    'menuId': $scope.currentSelectMenu.id,
                    'isShowTrEdit': true
                });
            }
        };

        /**
         *
         * @param item 添加的对象
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.buttons.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initOneLevelMenus();
    }
})();
