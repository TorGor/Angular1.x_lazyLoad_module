(function() {

    angular
        .module('admin.pspsManage')
        .controller('PspsManageController', PspsManageController);

    PspsManageController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function PspsManageController(
        $scope,
        $rootScope,
        adminService
    ) {

        // 原始的数据
        $scope.pspsManage = [];

        // 过滤出来的数据
        $scope.showPspsManage = [];
        $scope.pspsManageReload = 1;
        $scope.pspsManageAoData = {};
        $scope.pspsManageSearch = '';

        // 初始化table数据
        $scope.initPspsManageData = function () {
            $scope.pspsManage = [];
            adminService.getReq($rootScope.URL.PSPSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.pspsManage = angular.copy(data.res.data);
                        $scope.pspsManage.forEach(function (pspsManageItem, pspsManageIndex) {
                            pspsManageItem.id = pspsManageIndex +1;
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
         * @param pspsManage PSPSMANAGETITLE数据对象
         * @param item
         */

        $scope.savePspsManage = function (pspsManage, item) {
            var tempData = angular.extend({}, pspsManage, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.PSPSMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initPspsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && pspsManage.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.PSPSMANAGE.PATCH+'/'+pspsManage.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initPspsManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除pspsManage
        /**
         * @param pspsManage PSPSMANAGETITLE数据对象
         * @return null
         */
        $scope.deletePspsManage = function (pspsManage) {
            if (!$scope.validIsNew(pspsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.PSPSMANAGE.DELETE+'/'+pspsManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initPspsManageData();
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
        $scope.addPspsManage = function () {
            $scope.pspsManageAoData = {};
            $scope.pspsManageSearch = '';
            $scope.pspsManage.unshift({
                '_id': ($scope.pspsManage.length+1) + 'null',
                'pspsManageName': '',
                'pspsManageType': '',
                'pspsManageStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的PSPSMANAGETITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.pspsManage.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initPspsManageData();
    }
})();
