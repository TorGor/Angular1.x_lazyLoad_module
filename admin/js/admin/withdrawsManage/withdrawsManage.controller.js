(function() {

    angular
        .module('admin.withdrawsManage')
        .controller('WithdrawsManageController', WithdrawsManageController);

    WithdrawsManageController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function WithdrawsManageController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.withdrawsManage = [];

        // 过滤出来的数据
        $scope.showWithdrawsManage = [];
        $scope.withdrawsManageReload = 1;
        $scope.withdrawsManageAoData = {};
        $scope.withdrawsManageSearch = '';

        // 初始化table数据
        $scope.initWithdrawsManageData = function () {
            $scope.withdrawsManage = [];
            adminService.getReq($rootScope.URL.WITHDRAWSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.withdrawsManage = angular.copy(data.res.data);
                        $scope.withdrawsManage.forEach(function (withdrawsManageItem, withdrawsManageIndex) {
                            withdrawsManageItem.id = withdrawsManageIndex +1;
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        // 保存
        /**
         *
         * @param withdrawsManage WITHDRAWSMANAGETITLE数据对象
         * @param item
         */

        $scope.saveWithdrawsManage = function (withdrawsManage, item) {
            var tempData = angular.extend({}, withdrawsManage, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.WITHDRAWSMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initWithdrawsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && withdrawsManage.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.WITHDRAWSMANAGE.PATCH+'/'+withdrawsManage.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initWithdrawsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除withdrawsManage
        /**
         * @param withdrawsManage WITHDRAWSMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteWithdrawsManage = function (withdrawsManage) {
            if (!$scope.validIsNew(withdrawsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.WITHDRAWSMANAGE.DELETE+'/'+withdrawsManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initWithdrawsManageData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        // 添加按钮
        $scope.addWithdrawsManage = function () {
            $scope.withdrawsManageAoData = {};
            $scope.withdrawsManageSearch = '';
            $scope.withdrawsManage.unshift({
                '_id': ($scope.withdrawsManage.length+1) + 'null',
                'withdrawsManageName': '',
                'withdrawsManageType': '',
                'withdrawsManageStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的WITHDRAWSMANAGETITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.withdrawsManage.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initWithdrawsManageData();
    }
})();
