(function() {

    angular
        .module('admin.button')
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
            if(!$scope.validPower("MANAGEBUTTON", ["LEFTGET"])){
                return '';
            }
            superAdminService.getReq($rootScope.URL.MANAGEBUTTON.LEFTGET,{}, {}).then(function (data) {
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
            if(!$scope.validPower("MANAGEBUTTON", ["RIGHTGET"])){
                return '';
            }
            // $scope.buttons = [];
            console.log(secondLevelMenu, 'getSecondLevelButtons');
            $scope.currentSelectMenu = angular.copy(secondLevelMenu);
            if (secondLevelMenu.id) {
                // $scope.buttons = [];
                superAdminService.getReq($rootScope.URL.MANAGEBUTTON.RIGHTGET,{ 'menuId': secondLevelMenu.id }, {}).then(function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.buttons = angular.copy(data.data);
                            $scope.buttonsReload++;
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
                if(!$scope.validPower("MANAGEBUTTON", ["RIGHTPOST"])){
                    return '';
                }
                delete tempData.id;
                superAdminService.postReq($rootScope.URL.MANAGEBUTTON.RIGHTPOST,{}, tempData).then(function (data) {
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
                if(!$scope.validPower("MANAGEBUTTON", ["RIGHTPATCH"])){
                    return '';
                }
                superAdminService.patchReq($rootScope.URL.MANAGEBUTTON.RIGHTPATCH,{}, tempData).then(function (data) {
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
            if(!$scope.validPower("MANAGEBUTTON", ["RIGHTDELETE"])){
                return '';
            }
            if (button.id) {
                $rootScope.alertConfirm(function () {
                    superAdminService.deleteReq($rootScope.URL.MANAGEBUTTON.RIGHTDELETE,{ id: button.id }, {}).then(function (data) {
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
