(function() {

    angular
        .module('admin.withdrawsManage')
        .controller('WithdrawsManageController', WithdrawsManageController);

    WithdrawsManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function WithdrawsManageController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.walletOptions = [];

        $scope.initWalletOptionsData = function () {
            $scope.walletOptions = [];
            adminService.getReq($rootScope.URL.WALLETSMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.walletOptions.push(tempObj)
                                //if(!objItem.disabled){
                                //    $scope.walletOptions.push(tempObj)
                                //}
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        //pending|auditing|approved|declined|paid|reviewing|finished

        $scope.statusOptions = [
            {
                label:'pending',
                value:'pending'
            },
            {
                label:'auditing',
                value:'auditing'
            },
            {
                label:'approved',
                value:'approved'
            },
            {
                label:'declined',
                value:'declined'
            },
            {
                label:'finished',
                value:'finished'
            },
            {
                label:'paid',
                value:'paid'
            },
            {
                label:'reviewing',
                value:'reviewing'
            },
        ];

        $scope.search = {
            wallet: [],
            status: []
        };

        $scope.withdrawsManageUrl = $rootScope.URL.WITHDRAWSMANAGE.GET;

        // 原始的数据
        $scope.withdrawsManage = [];
        $scope.withdrawsManageReload = 1;
        $scope.withdrawsManageAoData = {};
        $scope.tempWithdrawsManageAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempWithdrawsManageAoData = angular.extend($scope.tempWithdrawsManageAoData,$scope.withdrawsManageAoData)
        };

        $scope.resetSearch = function() {
            $scope.withdrawsManageAoData = {};
            $scope.search = {
                wallet: [],
                status: []
            };
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempWithdrawsManageAoData;
            $scope.tempWithdrawsManageAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            }
        };

        // 初始化table数据
        $scope.initWithdrawsManageData = function () {
            $scope.withdrawsManageReload++;
        };

        /**
         *  显示提款详情
         * @param item withdraws项目详情
         */
        $scope.showWithdrawsDetail = function (item) {
            if(!item.id){
                $rootScope.alertErrorMsg('server data error');
                return;
            }
            adminService.getReq($rootScope.URL.WITHDRAWSMANAGE.GETDETAIL + '/' + item.id, {}, {}).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: '/views/admin/withdrawsManage/withdrawsManageDetailModal.html',
                            controller: 'WithdrawsManageModalController',
                            scope:$scope,
                            resolve: {
                                withdrawsDetail: res.data.data
                            },
                            size: 'lg',
                        });
                        modalInstance.result.then(function(data) {
                        }, function(data) {
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        /**
         *  进入审批流程
         * @param item withdraws项目详情
         * @param approve 到审批的哪一步了
         */
        $scope.approveWithdrawsManage = function (item, approve) {
            if(!item.id || !approve){
                $rootScope.alertErrorMsg('server data error');
                return;
            }
            console.log(approve,'approve')
            var tempUrl = $rootScope.URL.WITHDRAWSMANAGE && $rootScope.URL.WITHDRAWSMANAGE['GET'+approve.toUpperCase()];
            adminService.getReq(tempUrl + '/' + item.id, {admin_id:window.userInfo.adminId || ''}, {}).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        var tempData = angular.copy(res.data.data);
                        tempData.approve = approve;
                        tempData.itemId = item.id;
                        var modalInstance = $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: '/views/admin/withdrawsManage/withdrawsManageModal.html',
                            controller: 'WithdrawsManageApproveModalController',
                            scope:$scope,
                            resolve: {
                                withdrawsDetail: tempData
                            },
                            size: 'lg',
                        });
                        modalInstance.result.then(function(data) {
                            $scope.initWithdrawsManageData()
                        }, function(data) {
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        // 页面加载执行的函数

        $scope.initWalletOptionsData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.withdrawsManageAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.withdrawsManageAoData.start_time) {
                        delete $scope.withdrawsManageAoData.start_time;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.withdrawsManageAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.withdrawsManageAoData.end_time) {
                        delete $scope.withdrawsManageAoData.end_time;
                    }
                }
            }
        });

        $scope.$watch('search.wallet.length+search.status.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.withdrawsManageAoData.wallet = $scope.search.wallet.join(',');
                $scope.withdrawsManageAoData.status = $scope.search.status.join(',');
            }
        });

        $scope.urlUsername = '';

        try {
            var urlParams = $scope.getUrlParams();
            if(urlParams._username){
                $scope.urlUsername = urlParams._username;
            }
            if(urlParams.user_id){
                $scope.tempWithdrawsManageAoData.user_id = urlParams.user_id;
            }
        }catch (e){
            console.error(e)
        }
    }
})();
