(function() {

    angular
        .module('admin.appliesUse')
        .controller('AppliesUseController', AppliesUseController);

    AppliesUseController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function AppliesUseController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.appliesUse = [];

        // 过滤出来的数据
        $scope.showAppliesUse = [];
        $scope.appliesUseReload = 1;
        $scope.appliesUseAoData = {};
        $scope.appliesUseSearch = '';

        // 初始化table数据
        $scope.initAppliesUseData = function () {
            $scope.appliesUse = [];
            adminService.getReq($rootScope.URL.APPLIESUSE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.appliesUse = angular.copy(data.res.data);
                        $scope.appliesUse.forEach(function (appliesUseItem, appliesUseIndex) {
                            appliesUseItem.id = appliesUseIndex +1;
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
         * @param appliesUse APPLIESUSETITLE数据对象
         * @param item
         */

        $scope.saveAppliesUse = function (appliesUse, item) {
            var tempData = angular.extend({}, appliesUse, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.APPLIESUSE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initAppliesUseData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && appliesUse.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.APPLIESUSE.PATCH+'/'+appliesUse.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initAppliesUseData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除appliesUse
        /**
         * @param appliesUse APPLIESUSETITLE数据对象
         * @return null
         */
        $scope.deleteAppliesUse = function (appliesUse) {
            if (!$scope.validIsNew(appliesUse._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.APPLIESUSE.DELETE+'/'+appliesUse.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initAppliesUseData();
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
        $scope.addAppliesUse = function () {
            $scope.appliesUseAoData = {};
            $scope.appliesUseSearch = '';
            $scope.appliesUse.unshift({
                '_id': ($scope.appliesUse.length+1) + 'null',
                'appliesUseName': '',
                'appliesUseType': '',
                'appliesUseStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的APPLIESUSETITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.appliesUse.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initAppliesUseData();
    }
})();
