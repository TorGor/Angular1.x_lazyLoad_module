(function() {

    angular
        .module('admin.menu')
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
            if(!$scope.validPower("MANAGEMENU", ["RIGHTGET"])){
                return '';
            }
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
                superAdminService.getReq($rootScope.URL.MANAGEMENU.RIGHTGET, { 'parentid': oneLevelMenu.id, 'pageSize': 50, 'curPage': 1 }, {}, function (data) {
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
                if(!$scope.validPower("MANAGEMENU", ["RIGHTPOST"])){
                    return '';
                }
                delete tempData.id;
                superAdminService.postReq($rootScope.URL.MANAGEMENU.RIGHTPOST, {}, tempData, function (data) {
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
            }else{
                if(!$scope.validPower("MANAGEMENU", ["RIGHTPATCH"])){
                    return '';
                }
                superAdminService.patchReq($rootScope.URL.MANAGEMENU.RIGHTPATCH, {}, tempData, function (data) {
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
            }

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
            if(!$scope.validPower("MANAGEMENU", ["LEFTDELETE"])){
                return '';
            }
            console.log(oneLevelMenu, 'oneLevelMenu');
            $event.stopPropagation();
            if (oneLevelMenu.id) {
                $rootScope.alertConfirm(function () {
                    superAdminService.deleteReq($rootScope.URL.MANAGEMENU.LEFTDELETE, { 'id': oneLevelMenu.id }, {}, function (data) {
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
            if(!$scope.validPower("MANAGEMENU", ["RIGHTDELETE"])){
                return '';
            }
            console.log(secondLevelMenu, 'secondLevelMenu');
            if (secondLevelMenu.id) {
                $rootScope.alertConfirm(function () {
                    superAdminService.deleteReq($rootScope.URL.MANAGEMENU.RIGHTDELETE, { 'id': secondLevelMenu.id }, {}, function (data) {
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
            if(!$scope.validPower("MANAGEMENU", ["LEFTGET"])){
                return '';
            }
            superAdminService.getReq($rootScope.URL.MANAGEMENU.LEFTGET, {}, {}, function (data) {
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
