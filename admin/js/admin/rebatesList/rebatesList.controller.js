(function() {

    angular
        .module('admin.rebatesList')
        .controller('RebatesListController', RebatesListController);

    RebatesListController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function RebatesListController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.rebatesList = [];

        // 过滤出来的数据
        $scope.showRebatesList = [];
        $scope.rebatesListReload = 1;
        $scope.rebatesListAoData = {};
        $scope.rebatesListSearch = '';

        // 初始化table数据
        $scope.initRebatesListData = function () {
            $scope.rebatesList = [];
            adminService.getReq($rootScope.URL.REBATESLIST.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.rebatesList = angular.copy(res.data.data);
                        $scope.rebatesList.forEach(function (rebatesListItem, rebatesListIndex) {
                            rebatesListItem._id = rebatesListIndex +1;
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
         * @param rebatesList REBATESLISTTITLE数据对象
         * @param item
         */

        $scope.saveRebatesList = function (rebatesList, item) {
            var tempData = angular.extend({}, rebatesList, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.REBATESLIST.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initRebatesListData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && rebatesList.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.REBATESLIST.PATCH+'/'+rebatesList.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initRebatesListData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除rebatesList
        /**
         * @param rebatesList REBATESLISTTITLE数据对象
         * @return null
         */
        $scope.deleteRebatesList = function (rebatesList) {
            if (!$scope.validIsNew(rebatesList._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.REBATESLIST.DELETE+'/'+rebatesList.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initRebatesListData();
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
        $scope.addRebatesList = function () {
            $scope.rebatesListAoData = {};
            $scope.rebatesListSearch = '';
            $scope.rebatesList.unshift({
                '_id': ($scope.rebatesList.length+1) + 'null',
                'rebatesListName': '',
                'rebatesListType': '',
                'rebatesListStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的REBATESLISTTITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.rebatesList.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initRebatesListData();
    }
})();
