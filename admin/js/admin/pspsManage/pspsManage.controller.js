(function() {

    angular
        .module('admin.pspsManage')
        .controller('PspsManageController', PspsManageController);

    PspsManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function PspsManageController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.methodsOptions = [];

        $scope.initMethodsOptions = function() {
            $scope.methodsOptions = [];
            adminService.getReq($rootScope.URL.PAYMENTMETHODS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.paymentMethods = angular.copy(res.data.data);
                        $scope.paymentMethods.forEach(function (paymentMethodsItem, paymentMethodsIndex) {
                            if(!paymentMethodsItem.disabled){
                                var temp = {};
                                temp.label = paymentMethodsItem.code;
                                temp.value = paymentMethodsItem.code;
                                $scope.methodsOptions.push(temp)
                            }
                        });
                        console.log($scope.paymentMethods)
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

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
                        $scope.pspsManage = angular.copy(res.data.data);
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

        /**
         * 展示methods弹窗
         * @param item
         */

        $scope.showPspsMethodsModal = function (item) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/pspsManage/pspsMethodsModal.html',
                controller: 'pspsMethodsModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    PspsMethodsItem: item,
                    hasPower:$scope.hasPower
                }
            });
            modalInstance.result.then(function (data) {
                if(data.type == 'methods'){
                    $scope.pspsManage.forEach(function(pspsManageItem) {
                        if (pspsManageItem.id == data.data.id) {
                            pspsManageItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.pspsManageReload++;
                        }
                    });
                }
            }, function (data) {
                if(data.type == 'methods'){
                    $scope.pspsManage.forEach(function(pspsManageItem) {
                        if (pspsManageItem.id == data.data.id) {
                            pspsManageItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.pspsManageReload++;
                        }
                    });
                }
            });
        };


        // 删除pspsManage
        /**
         * @param pspsManage PSPSMANAGETITLE数据对象
         * @return null
         */
        $scope.deletePspsManage = function (pspsManage) {
            if (!$scope.validIsNew(pspsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.PSPSMANAGE.DELETE+'/'+pspsManage.code, {}, {}).then(function (res) {
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

        // 恢复pspsManage
        /**
         * @param pspsManage PSPSMANAGETITLE数据对象
         * @return null
         */
        $scope.recoverPspsManage = function (pspsManage) {
            if (!$scope.validIsNew(pspsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.putReq($rootScope.URL.PSPSMANAGE.DELETE+'/'+pspsManage.code, {}, {}).then(function (res) {
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
                code: '',
                gateway: '',
                account: '',
                api_key: '',
                activated: true,
                methods: []
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

        $scope.hasPower = $scope.validPower("PSPSMANAGE", ["PATCH", "POST"])

        // 页面加载执行的函数

        $scope.initPspsManageData();

        if($scope.hasPower){

            $scope.initMethodsOptions()

        }
    }
})();
