(function() {

    angular
        .module('admin.transactionsDetail')
        .controller('TransactionsDetailController', TransactionsDetailController);

    TransactionsDetailController.$inject = [
        '$scope',
        '$uibModal',
        '$rootScope',
        'adminService'
    ];

    function TransactionsDetailController(
        $scope,
        $uibModal,
        $rootScope,
        adminService
    ) {

        $scope.serviceOptions = [
            {
                label:'all',
                value:''
            },
            {
                label:'deposit',
                value:'deposit'
            },
            {
                label:'withdraw',
                value:'withdraw'
            },
            {
                label:'transfer',
                value:'transfer'
            },
            {
                label:'coupon',
                value:'coupon'
            },
            {
                label:'relief',
                value:'relief'
            },
            {
                label:'rebate',
                value:'rebate'
            },
            {
                label:'bigwin',
                value:'bigwin'
            },
        ];

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
                                if(!objItem.disabled){
                                    $scope.walletOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.timezone = '+00:00';

        $scope.transactionsDetail = [];
        $scope.transactionsDetailReload = 1;
        $scope.tempTransactionsDetailAoData = {
            user_id: '',
            affiliate_id: '',
            service_id: '',
            min_amount: '',
            max_amount: '',
            wallet_code: '',
            timezone: "+00:00"
        };
        $scope.transactionsDetailAoData = {
            user_id: '',
            affiliate_id: '',
            service_id: '',
            min_amount: '',
            max_amount: '',
            wallet_code: '',
            timezone: "+00:00"
        };

        $scope.trigerSearch = function() {
            if(/[+-]\d{2}:\d{2}$/.test($scope.transactionsDetailAoData.timezone)){
            }else{
                $rootScope.alertErrorMsg('Formatting error,The right example +00:00');
                return;
            }
            $scope.tempTransactionsDetailAoData = angular.extend($scope.tempTransactionsDetailAoData,$scope.transactionsDetailAoData)
        };

        $scope.resetSearch = function() {
            $scope.transactionsDetailAoData = {
                user_id: '',
                affiliate_id: '',
                service_id: '',
                min_amount: '',
                max_amount: '',
                wallet_code: '',
                timezone: "+00:00"
            };
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempTransactionsDetailAoData;
            $scope.tempTransactionsDetailAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize,
                user_id: '',
                affiliate_id: '',
                service_id: '',
                min_amount: '',
                max_amount: '',
                wallet_code: '',
                timezone: "+00:00"
            }
        };

        $scope.advancedSearch = false;

        /**
         * 高级搜索控制
         */
        $scope.switchAdvancedSearch = function () {
            $scope.advancedSearch = !$scope.advancedSearch;
        };

        $scope.transactionsUrl = $rootScope.URL.TRANSACTIONSDETAIL.GET;

        //页面加载运行的函数

        $scope.initWalletOptionsData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.transactionsDetailAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.transactionsDetailAoData.start_time) {
                        delete $scope.transactionsDetailAoData.start_time;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.transactionsDetailAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.transactionsDetailAoData.end_time) {
                        delete $scope.transactionsDetailAoData.end_time;
                    }
                }
            }
        });

    }
})();
