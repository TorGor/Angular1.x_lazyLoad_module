(function() {

    angular
        .module('admin.ordersManage')
        .controller('OrderManageFilterModalController', OrderManageFilterModalController);

    OrderManageFilterModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'filter',
        'adminService',
        '$translate'
    ];

    function OrderManageFilterModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        filter,
        adminService,
        $translate
    ) {

        $scope.search = {
            wallet: [],
            method: []
        };

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

        $scope.methodOptions = [];

        $scope.initMethodOptionsData = function () {
            $scope.methodOptions = [];
            adminService.getReq($rootScope.URL.PAYMENTMETHODS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.methodOptions.push(tempObj)
                                //if(!objItem.disabled){
                                //    $scope.methodOptions.push(tempObj)
                                //}
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.ordersManageUrl = $rootScope.URL.ORDERSMANAGE.GET;

        // 原始的数据
        $scope.ordersManage = [];

        $scope.advancedSearch = false;

        // 过滤出来的数据
        $scope.ordersManageReload = 1;
        $scope.ordersManageAoData = {};
        $scope.tempOrdersManageAoData = {};
        $scope.ordersManageAoData.wallet = ''
        $scope.ordersManageAoData.method = ''

        $scope.trigerSearch = function() {
            $scope.tempOrdersManageAoData = Object.assign($scope.tempOrdersManageAoData,$scope.ordersManageAoData);
            $scope.ordersManageReload++;
        };

        $scope.resetSearch = function() {
            $scope.ordersManageAoData = {};
            $scope.ordersManageAoData.wallet = ''
            $scope.ordersManageAoData.method = ''
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            $scope.search = {
                wallet: [],
                method: []
            };
            var tempData = $scope.tempOrdersManageAoData;
            $scope.tempOrdersManageAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.ordersManageReload++;
        };

        $scope.initOrdersManageData = function() {
            $scope.ordersManageReload++
        };

        $scope.showAdvanceSearch = function() {
            $scope.advancedSearch = !$scope.advancedSearch
        };

        //页面加载执行
        $scope.initWalletOptionsData();
        $scope.initMethodOptionsData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.ordersManageAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.ordersManageAoData.start_time) {
                        $scope.ordersManageAoData.start_time = '';
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.ordersManageAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.ordersManageAoData.end_time) {
                        $scope.ordersManageAoData.end_time = '';
                    }
                }
            }
        });

        $scope.$watch('search.wallet.length+search.method.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.ordersManageAoData.wallet = $scope.search.wallet.join(',');
                $scope.ordersManageAoData.method = $scope.search.method.join(',');
            }
        });

        $scope.filter = filter;

        $scope.urlUsername = $scope.filter.username||'';

        if($scope.filter.username){
            delete $scope.filter.username
        }

        $scope.ordersManageAoData  = window.Object.assign($scope.ordersManageAoData, $scope.filter);
        $scope.tempOrdersManageAoData  = window.Object.assign($scope.tempOrdersManageAoData, $scope.filter);

        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();
