(function() {

    angular
        .module('admin.withdrawsManage')
        .controller('WithdrawsManageFilterModalController', WithdrawsManageFilterModalController);

    WithdrawsManageFilterModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'filter',
        'adminService',
        '$translate'
    ];

    function WithdrawsManageFilterModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        filter,
        adminService,
        $translate
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
            $scope.tempWithdrawsManageAoData = Object.assign($scope.tempWithdrawsManageAoData,$scope.withdrawsManageAoData);
            $scope.withdrawsManageReload++;
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
            };
            $scope.withdrawsManageReload++;
        };

        // 初始化table数据
        $scope.initWithdrawsManageData = function () {
            $scope.withdrawsManageReload++;
        };

        // /**
        //  *  显示提款详情
        //  * @param item withdraws项目详情
        //  */
        // $scope.showWithdrawsDetail = function (item) {
        //     if(!item.id){
        //         $rootScope.alertErrorMsg('server data error');
        //         return;
        //     }
        //     adminService.getReq($rootScope.URL.WITHDRAWSMANAGE.GETDETAIL + '/' + item.id, {}, {}).then(function (res) {
        //         if (typeof res.data.success === 'boolean') {
        //             if (res.data.success) {
        //                 var modalInstance = $uibModal.open({
        //                     animation: true,
        //                     ariaLabelledBy: 'modal-title',
        //                     ariaDescribedBy: 'modal-body',
        //                     templateUrl: '/views/admin/withdrawsManage/withdrawsManageDetailModal.html',
        //                     controller: 'WithdrawsManageModalController',
        //                     scope:$scope,
        //                     resolve: {
        //                         withdrawsDetail: res.data.data
        //                     },
        //                     size: 'lg',
        //                 });
        //                 modalInstance.result.then(function(data) {
        //                 }, function(data) {
        //                 });
        //             } else {
        //                 $rootScope.alertErrorMsg(res.data.msg);
        //             }
        //         }
        //     });
        // };


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

        $scope.filter = filter;

        $scope.urlUsername = $scope.filter.username||'';

        if($scope.filter.username){
            delete $scope.filter.username
        }

        $scope.withdrawsManageAoData = window.Object.assign($scope.withdrawsManageAoData, $scope.filter);
        $scope.tempWithdrawsManageAoData = window.Object.assign($scope.tempWithdrawsManageAoData, $scope.filter);

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();
