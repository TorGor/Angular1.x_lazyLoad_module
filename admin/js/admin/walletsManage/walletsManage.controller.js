(function() {

    angular
        .module('admin.walletsManage')
        .controller('WalletsManageController', WalletsManageController);

    WalletsManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function WalletsManageController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.brandOptions = [];

        $scope.initBrandOptionsData = function () {
            $scope.brandOptions = [];
            adminService.getReq($rootScope.URL.GAMEBRANDS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.brandOptions.push(tempObj)
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.localesOptions = [];

        $scope.initLocalesOptionsData = function () {
            $scope.localesOptions = [];
            adminService.getReq($rootScope.URL.LOCALELANGUAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.name||'',
                                    value:objItem.code||''
                                };
                                if(objItem.supported){
                                    $scope.localesOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.booleanOptons = [
            {
                label: 'Yes',
                value: true
            },
            {
                label: 'No',
                value: false
            }
        ];

        $scope.statusOptons = [
            {
                label: 'OPEN',
                value: 'OPEN'
            },
            {
                label: 'MAINTAIN',
                value: 'MAINTAIN'
            },
            {
                label: 'CLOSED',
                value: 'CLOSED'
            }
        ];

        // 原始的数据
        $scope.walletsManage = [];

        // 过滤出来的数据
        $scope.showWalletsManage = [];
        $scope.walletsManageReload = 1;
        $scope.walletsManageAoData = {};
        $scope.walletsManageSearch = '';

        // 初始化table数据
        $scope.initWalletsManageData = function () {
            adminService.getReq($rootScope.URL.WALLETSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.walletsManage = angular.copy(res.data.data);
                        $scope.walletsManage.forEach(function(walletItem) {
                            if(walletItem.merchant){
                                walletItem.merchantKey = walletItem.merchant.key||'';
                                walletItem.merchantName = walletItem.merchant.name||'';
                                delete walletItem.merchant;
                            }else{
                                walletItem.merchantKey = '';
                                walletItem.merchantName = '';
                            }
                            if(walletItem.setting){
                                if(walletItem.setting.record){
                                    walletItem.recordsDuration = walletItem.setting.record.duration||'';
                                    walletItem.recordsParamsTimeFormat = walletItem.setting.record.timeFormat||'';
                                    walletItem.recordsTimezone = walletItem.setting.record.timezone||'';
                                    delete walletItem.setting.record;
                                }else{
                                    walletItem.recordsDuration = '';
                                    walletItem.recordsParamsTimeFormat = '';
                                    walletItem.recordsTimezone = '';
                                }
                                if(walletItem.setting.user){
                                    walletItem.usernamePrefix = walletItem.setting.user.prefix||'';
                                    walletItem.syncPassword = walletItem.setting.user.syncPassword||'';
                                    delete walletItem.setting.user
                                }else{
                                    walletItem.usernamePrefix = '';
                                    walletItem.syncPassword = '';
                                }
                                delete walletItem.setting;
                            }
                        });
                        $scope.walletsManageReload++;
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.showWalletsManageModal = function (modalItem,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/walletsManage/walletsManageModal.html',
                controller: 'walletsManageModalController',
                scope: $scope,
                size: 'lg',
                resolve:{
                    modalItem:modalItem,
                    edit:edit,
                    hasPower:$scope.hasPower && edit!==1
                }
            });
            modalInstance.result.then(function(data) {
                $scope.initWalletsManageData();
            }, function(data) {
            });
        };

        // 删除walletsManage
        /**
         * @param walletsManage WALLETSMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteWalletsManage = function (walletsManage) {
            if (!$scope.validIsNew(walletsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.WALLETSMANAGE.DELETE+'/'+walletsManage.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initWalletsManageData();
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

        // 恢复walletsManage
        /**
         * @param walletsManage WALLETSMANAGETITLE数据对象
         * @return null
         */
        $scope.recoverWalletsManage = function (walletsManage) {
            if (!$scope.validIsNew(walletsManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.putReq($rootScope.URL.WALLETSMANAGE.PUT+'/'+walletsManage.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initWalletsManageData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                }, 'recover');
            }
        };

        $scope.hasPower = $scope.validPower("WALLETSMANAGE", ["PATCH", "POST"]);

        // 页面加载执行的函数

        $scope.initWalletsManageData();


        if($scope.hasPower){

            $scope.initBrandOptionsData();

            $scope.initLocalesOptionsData();
        }

    }
})();
