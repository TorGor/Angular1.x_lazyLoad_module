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
