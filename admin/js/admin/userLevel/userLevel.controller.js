(function() {

    angular
        .module('admin.userLevel')
        .controller('UserLevelController', UserLevelController);

    UserLevelController.$inject = [
        '$scope',
        '$rootScope',
        'adminUserLevelService'
    ];

    function UserLevelController(
        $scope,
        $rootScope,
        adminUserLevelService
    ) {

        // 原始的数据
        $scope.userLevel = [];

        // 过滤出来的数据
        $scope.showUserLevel = [];
        $scope.userLevelReload = 1;
        $scope.userLevelAoData = {};
        $scope.userLevelSearch = '';

        // 初始化table数据
        $scope.initUserLevelData = function () {
            $scope.userLevel = [];
            adminUserLevelService.getUserLevelList({}, {}, function (data) {
                console.log(data);
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        $scope.userLevel = angular.copy(data.data);
                        $scope.userLevel.forEach(function (userLevelItem, userLevelIndex) {
                            userLevelItem.id = userLevelIndex +1
                        })
                    } else {
                        $rootScope.alertErrorMsg(data.msg);
                    }
                }
            });
        };


        // 保存
        /**
         *
         * @param userLevel 用户等级数据对象
         * @param item
         */

        $scope.saveUserLevel = function (userLevel, item) {
            var tempData = angular.extend({}, userLevel, item);
            if (!tempData.id) {
                delete tempData.id;
                adminUserLevelService.saveUserLevelInfo({}, tempData, function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.initUserLevelData();
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            } else if (tempData.id) {
                adminUserLevelService.updateUserLevelInfo({}, tempData, function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.initUserLevelData();
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除userLevel
        /**
         * @param userLevel 用户等级数据对象
         * @return null
         */
        $scope.deleteUserLevel = function (userLevel) {
            if (userLevel.id) {
                $rootScope.alertConfirm(function () {
                    adminUserLevelService.deleteUserLevelInfo({ id: userLevel.id }, {}, function (data) {
                        if (typeof data.success === 'boolean') {
                            if (data.success) {
                                $scope.initUserLevelData();
                                $rootScope.toasterSuccess(data.msg);
                            } else {
                                $rootScope.alertErrorMsg(data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        // 添加按钮
        $scope.addUserLevel = function () {
            if(!$scope.userLevel.every(function (userLevelItem) {
                    return userLevelItem.id
                })){
                $rootScope.alertErrorMsg('current item needed save');
                return;
            }
            $scope.userLevelAoData = {};
            $scope.userLevelSearch = '';
            $scope.userLevel.unshift({
                'id': null,
                'code': '',
                'default': 1,
                'level': '1',
                'conditions': [],
                'treatments': [],
                'rebates': []
            });
        };

        /**
         *
         * @param item 添加的用户等级
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.userLevel.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initUserLevelData();
    }
})();
