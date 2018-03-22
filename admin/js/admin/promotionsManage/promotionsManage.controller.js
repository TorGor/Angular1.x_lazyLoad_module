(function() {

    angular
        .module('admin.promotionsManage')
        .controller('PromotionsManageController', PromotionsManageController);

    PromotionsManageController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function PromotionsManageController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.promotionsManage = [];

        // 过滤出来的数据
        $scope.showPromotionsManage = [];
        $scope.promotionsManageReload = 1;
        $scope.promotionsManageAoData = {};
        $scope.promotionsManageSearch = '';

        // 初始化table数据
        $scope.initPromotionsManageData = function () {
            $scope.promotionsManage = [];
            adminService.getReq($rootScope.URL.PROMOTIONSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.promotionsManage = angular.copy(res.data.data);
                        $scope.promotionsManage.forEach(function (promotionsManageItem, promotionsManageIndex) {
                            promotionsManageItem._id = promotionsManageIndex +1;
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
         * @param promotionsManage PROMOTIONSMANAGETITLE数据对象
         * @param item
         */

        $scope.savePromotionsManage = function (promotionsManage, item) {
            var tempData = angular.extend({}, promotionsManage, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.PROMOTIONSMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initPromotionsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && promotionsManage.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.PROMOTIONSMANAGE.PATCH+'/'+promotionsManage.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initPromotionsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除promotionsManage
        /**
         * @param promotionsManage PROMOTIONSMANAGETITLE数据对象
         * @return null
         */
        $scope.deletePromotionsManage = function (promotionsManage) {
            if (!$scope.validIsNew(promotionsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.PROMOTIONSMANAGE.DELETE+'/'+promotionsManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initPromotionsManageData();
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
        $scope.addPromotionsManage = function () {
            $scope.promotionsManageAoData = {};
            $scope.promotionsManageSearch = '';
            $scope.promotionsManage.unshift({
                '_id': ($scope.promotionsManage.length+1) + 'null',
                'promotionsManageName': '',
                'promotionsManageType': '',
                'promotionsManageStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的PROMOTIONSMANAGETITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.promotionsManage.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initPromotionsManageData();
    }
})();
