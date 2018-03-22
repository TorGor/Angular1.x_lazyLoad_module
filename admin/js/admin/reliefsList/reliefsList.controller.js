(function() {

    angular
        .module('admin.reliefsList')
        .controller('ReliefsListController', ReliefsListController);

    ReliefsListController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function ReliefsListController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.reliefsList = [];

        // 过滤出来的数据
        $scope.showReliefsList = [];
        $scope.reliefsListReload = 1;
        $scope.reliefsListAoData = {};
        $scope.reliefsListSearch = '';

        // 初始化table数据
        $scope.initReliefsListData = function () {
            $scope.reliefsList = [];
            adminService.getReq($rootScope.URL.RELIEFSLIST.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.reliefsList = angular.copy(res.data.data);
                        $scope.reliefsList.forEach(function (reliefsListItem, reliefsListIndex) {
                            reliefsListItem._id = reliefsListIndex +1;
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
         * @param reliefsList RELIEFSLISTTITLE数据对象
         * @param item
         */

        $scope.saveReliefsList = function (reliefsList, item) {
            var tempData = angular.extend({}, reliefsList, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.RELIEFSLIST.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initReliefsListData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && reliefsList.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.RELIEFSLIST.PATCH+'/'+reliefsList.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initReliefsListData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除reliefsList
        /**
         * @param reliefsList RELIEFSLISTTITLE数据对象
         * @return null
         */
        $scope.deleteReliefsList = function (reliefsList) {
            if (!$scope.validIsNew(reliefsList._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.RELIEFSLIST.DELETE+'/'+reliefsList.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initReliefsListData();
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
        $scope.addReliefsList = function () {
            $scope.reliefsListAoData = {};
            $scope.reliefsListSearch = '';
            $scope.reliefsList.unshift({
                '_id': ($scope.reliefsList.length+1) + 'null',
                'reliefsListName': '',
                'reliefsListType': '',
                'reliefsListStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的RELIEFSLISTTITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.reliefsList.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initReliefsListData();
    }
})();
