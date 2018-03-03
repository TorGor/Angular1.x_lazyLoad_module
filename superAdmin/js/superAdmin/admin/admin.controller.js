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

        /**
         * 传入的字符串全部替换成*
         *
         * @param {any} str 字符串
         */
        $scope.replaceStr = function(str) {
            if (typeof str === 'string') {
                return (str).replace(/[\w\W]/g, '*');
            } else {
                return '';
            }
        };

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.adminsAoData.start = $scope.searchTimeStart.format('YYYY-MM-DD') + ' 00:00:00';
                } else {
                    if ($scope.adminsAoData.start) {
                        delete $scope.adminsAoData.start;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.adminsAoData.start = $scope.searchTimeEnd.format('YYYY-MM-DD') + ' 23:59:59';
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
