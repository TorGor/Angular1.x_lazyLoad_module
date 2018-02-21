(function() {
    'use strict';

    angular
        .module('superAdmin.button')
        .controller('SuperAdminButtonController', SuperAdminButtonController);

    SuperAdminButtonController.$inject = [
        '$scope',
        '$rootScope',
        'superAdminService',
        'superAdminSelect012'
    ];

    function SuperAdminButtonController(
        $scope,
        $rootScope,
        superAdminService,
        superAdminSelect012
    ) {

        $scope.superAdminSelect012 = superAdminSelect012;

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
            superAdminService.getFindRootMenuInfo({},{},function (data) {
                console.log(data);
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        var tempData = data.data;
                        tempData.forEach(function ( oneLevelMenusItem ) {
                            oneLevelMenusItem['secondLevelMenus'] = [];
                            oneLevelMenusItem['showSecond'] = false;
                        });
                        $scope.oneLevelMenus = angular.copy(data.data);
                    } else {
                        $rootScope.alertErrorMsg(data.msg);
                    }
                }
            });
        };

        // 获取二级菜单,初始化列表数据
        /**
         * @param oneLevelMenu 一级菜单对象
         * @return null
         */
        $scope.getSecondLevelMenu = function ( oneLevelMenu ) {
            console.log(oneLevelMenu,'oneLevelMenu');
            if(oneLevelMenu['showSecond']){
                oneLevelMenu['showSecond'] = false;
                return;
            }
            $scope.oneLevelMenus.forEach(function (oneLevelMenusItem) {
                oneLevelMenusItem['showSecond'] = false;
            });
            if(oneLevelMenu.id){
                oneLevelMenu['showSecond'] = !oneLevelMenu['showSecond'];
                $scope.twoLevelMenus = [];
                superAdminService.getFindSecMenuInfo({"parentid":oneLevelMenu.id,"pageSize":50,"curPage":1},{},function ( data ) {
                    console.log(data)
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            oneLevelMenu['secondLevelMenus'] = angular.copy(data.data.list);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                })
            }
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
            console.log(secondLevelMenu, 'getSecondLevelButtons')
            $scope.currentSelectMenu = angular.copy(secondLevelMenu);
            if(secondLevelMenu.id){
                $scope.buttons = [];
                superAdminService.getFindButtonInfoByMenuId({"menuId":secondLevelMenu.id},{},function ( data ) {
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

        // 保存按钮
        /**
         * @param button 按钮数据对象
         * @param item 显示输入的数据
         * @return null
         */
        $scope.saveButton = function (button, item) {
            var tempData = angular.extend({}, button, item);
            if(!tempData.id){
                delete tempData.id;
                superAdminService.postSaveButtonInfo({},tempData,function ( data ) {
                    console.log(data)
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.getSecondLevelButtons($scope.currentSelectMenu);
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                })
            } else if (tempData.id){
                superAdminService.postUpdateButtonInfo({},tempData,function ( data ) {
                    console.log(data)
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.getSecondLevelButtons($scope.currentSelectMenu);
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                })
            }

        };

        // 删除按钮
        /**
         * @param button 按钮数据对象
         * @return null
         */
        $scope.deleteButton = function (button) {
            if(button.id){
                $rootScope.alertConfirm(function () {
                    superAdminService.getDeleteButtonInfoById({id:button.id},{},function ( data ) {
                        if (typeof data.success === 'boolean') {
                            if (data.success) {
                                $scope.getSecondLevelButtons($scope.currentSelectMenu);
                                $rootScope.toasterSuccess(data.msg);
                            } else {
                                $rootScope.alertErrorMsg(data.msg);
                            }
                        }
                    })
                });
            }
        };

        // 添加按钮
        $scope.addButtons = function () {
            if($scope.currentSelectMenu.id){
                $scope.buttonsAoData = {};
                $scope.buttons.unshift({
                    "id": null,
                    "btnName": "",
                    "btnType": "",
                    "btnCode": "",
                    "btnUrl": "",
                    "btnStatus": "1",
                    "createTime": null,
                    "optTime": null,
                    "menuId": $scope.currentSelectMenu.id,
                    "isShowTrEdit": true
                })
            }
        };

        /**
         *
         * @param item 添加的对象
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if(item.id == null){
                $scope.buttons.splice(index, 1)
            }
        };

        // 页面加载执行的函数

        $scope.initOneLevelMenus();
    }
})();
