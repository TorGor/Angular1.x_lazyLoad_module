(function() {

    angular
        .module('admin.transactionsDetail')
        .controller('TransactionsDetailController', TransactionsDetailController);

    TransactionsDetailController.$inject = [
        '$scope',
        '$rootScope',
        'URL',
        'adminService'
    ];

    function TransactionsDetailController(
        $scope,
        $rootScope,
        URL,
        adminService
    ) {

        // 原始的数据
        $scope.transactionsDetail = [];

        // 过滤出来的数据
        $scope.showTransactionsDetail = [];
        $scope.transactionsDetailReload = 1;
        $scope.transactionsDetailAoData = {};
        $scope.transactionsDetailSearch = '';

        // 初始化table数据
        $scope.initTransactionsDetailData = function () {
            $scope.transactionsDetail = [];
            adminService.getReq(URL.COMMONMODULE, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.transactionsDetail = angular.copy(data.res.data);
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        // 保存
        /**
         *
         * @param transactionsDetail 财务明细数据对象
         * @param item
         */

        $scope.saveTransactionsDetail = function (transactionsDetail, item) {
            var tempData = angular.extend({}, transactionsDetail, item);
            if (!tempData.id) {
                delete tempData.id;
                adminService.postReq(URL.COMMONMODULE, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initTransactionsDetailData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (tempData.id && transactionsDetail.id) {
                adminService.patchReq(URL.COMMONMODULE+'/'+transactionsDetail.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initTransactionsDetailData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除transactionsDetail
        /**
         * @param transactionsDetail 财务明细数据对象
         * @return null
         */
        $scope.deleteTransactionsDetail = function (transactionsDetail) {
            if (transactionsDetail.id) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq(URL.COMMONMODULE+'/'+transactionsDetail.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initTransactionsDetailData();
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
        $scope.addTransactionsDetail = function () {
            $scope.transactionsDetailAoData = {};
            $scope.transactionsDetailSearch = '';
            $scope.transactionsDetail.unshift({
                'id': null,
                'transactionsDetailName': '',
                'transactionsDetailType': '',
                'transactionsDetailStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的财务明细
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.transactionsDetail.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initTransactionsDetailData();
    }
})();
