(function() {

    angular
        .module('admin.transfersList')
        .controller('TransfersListController', TransfersListController);

    TransfersListController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function TransfersListController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.transfersList = [];

        // 过滤出来的数据
        $scope.showTransfersList = [];
        $scope.transfersListReload = 1;
        $scope.transfersListAoData = {};
        $scope.transfersListSearch = '';

        // 初始化table数据
        $scope.initTransfersListData = function () {
            $scope.transfersList = [];
            adminService.getReq($rootScope.URL.TRANSFERSLIST.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.transfersList = angular.copy(res.data.data);
                        $scope.transfersList.forEach(function (transfersListItem, transfersListIndex) {
                            transfersListItem._id = transfersListIndex +1;
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
         * @param transfersList TRANSFERSLISTTITLE数据对象
         * @param item
         */

        $scope.saveTransfersList = function (transfersList, item) {
            var tempData = angular.extend({}, transfersList, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.TRANSFERSLIST.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initTransfersListData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && transfersList.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.TRANSFERSLIST.PATCH+'/'+transfersList.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initTransfersListData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除transfersList
        /**
         * @param transfersList TRANSFERSLISTTITLE数据对象
         * @return null
         */
        $scope.deleteTransfersList = function (transfersList) {
            if (!$scope.validIsNew(transfersList._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.TRANSFERSLIST.DELETE+'/'+transfersList.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initTransfersListData();
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
        $scope.addTransfersList = function () {
            $scope.transfersListAoData = {};
            $scope.transfersListSearch = '';
            $scope.transfersList.unshift({
                '_id': ($scope.transfersList.length+1) + 'null',
                'transfersListName': '',
                'transfersListType': '',
                'transfersListStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的TRANSFERSLISTTITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.transfersList.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initTransfersListData();
    }
})();
