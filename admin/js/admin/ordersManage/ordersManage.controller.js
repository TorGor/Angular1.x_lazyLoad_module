(function() {

    angular
        .module('admin.ordersManage')
        .controller('OrdersManageController', OrdersManageController);

    OrdersManageController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function OrdersManageController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.ordersManage = [];

        // 过滤出来的数据
        $scope.showOrdersManage = [];
        $scope.ordersManageReload = 1;
        $scope.ordersManageAoData = {};
        $scope.ordersManageSearch = '';

        // 初始化table数据
        $scope.initOrdersManageData = function () {
            $scope.ordersManage = [];
            adminService.getReq(URL.ORDERSMANAGE, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.ordersManage = angular.copy(data.res.data);
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        // 保存
        /**
         *
         * @param ordersManage ORDERSMANAGETITLE数据对象
         * @param item
         */

        $scope.saveOrdersManage = function (ordersManage, item) {
            var tempData = angular.extend({}, ordersManage, item);
            if (!tempData.id) {
                delete tempData.id;
                adminService.postReq(URL.ORDERSMANAGE, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initOrdersManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (tempData.id && ordersManage.id) {
                adminService.patchReq(URL.ORDERSMANAGE+'/'+ordersManage.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initOrdersManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除ordersManage
        /**
         * @param ordersManage ORDERSMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteOrdersManage = function (ordersManage) {
            if (ordersManage.id) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq(URL.ORDERSMANAGE+'/'+ordersManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initOrdersManageData();
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
        $scope.addOrdersManage = function () {
            $scope.ordersManageAoData = {};
            $scope.ordersManageSearch = '';
            $scope.ordersManage.unshift({
                'id': null,
                'ordersManageName': '',
                'ordersManageType': '',
                'ordersManageStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的ORDERSMANAGETITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.ordersManage.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initOrdersManageData();
    }
})();
