(function() {

    angular
        .module('admin.couponsManage')
        .controller('CouponsManageController', CouponsManageController);

    CouponsManageController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function CouponsManageController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.couponsManage = [];

        // 过滤出来的数据
        $scope.showCouponsManage = [];
        $scope.couponsManageReload = 1;
        $scope.couponsManageAoData = {};
        $scope.couponsManageSearch = '';

        // 初始化table数据
        $scope.initCouponsManageData = function () {
            $scope.couponsManage = [];
            adminService.getReq($rootScope.URL.COUPONSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.couponsManage = angular.copy(res.data.data);
                        $scope.couponsManage.forEach(function (couponsManageItem, couponsManageIndex) {
                            couponsManageItem.id = couponsManageIndex +1;
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
         * @param couponsManage COUPONSMANAGETITLE数据对象
         * @param item
         */

        $scope.saveCouponsManage = function (couponsManage, item) {
            var tempData = angular.extend({}, couponsManage, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.COUPONSMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initCouponsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && couponsManage.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.COUPONSMANAGE.PATCH+'/'+couponsManage.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initCouponsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除couponsManage
        /**
         * @param couponsManage COUPONSMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteCouponsManage = function (couponsManage) {
            if (!$scope.validIsNew(couponsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.COUPONSMANAGE.DELETE+'/'+couponsManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initCouponsManageData();
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
        $scope.addCouponsManage = function () {
            $scope.couponsManageAoData = {};
            $scope.couponsManageSearch = '';
            $scope.couponsManage.unshift({
                '_id': ($scope.couponsManage.length+1) + 'null',
                'couponsManageName': '',
                'couponsManageType': '',
                'couponsManageStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的COUPONSMANAGETITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.couponsManage.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initCouponsManageData();
    }
})();
