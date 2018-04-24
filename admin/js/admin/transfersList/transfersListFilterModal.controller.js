(function() {

    angular
        .module('admin.transfersList')
        .controller('TransfersListFilterModalController', TransfersListFilterModalController);

    TransfersListFilterModalController.$inject = [
        '$scope',
        '$uibModalInstance',
        '$rootScope',
        'filter',
        'adminService'
    ];

    function TransfersListFilterModalController(
        $scope,
        $uibModalInstance,
        $rootScope,
        filter,
        adminService
    ) {

        $scope.search = {
            sourceWallet: [],
            result: [],
            destinationWallet: []
        };

        $scope.transfersListUrl = $rootScope.URL.TRANSFERSLIST.GET;

        // 原始的数据
        $scope.transfersList = [];
        $scope.transfersListReload = 1;
        $scope.transfersListAoData = {};
        $scope.tempTransfersListAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempTransfersListAoData = Object.assign($scope.tempTransfersListAoData,$scope.transfersListAoData);
            $scope.transfersListReload++;
        };

        $scope.resetSearch = function() {
            $scope.transfersListAoData = {};
            $scope.search = {
                sourceWallet: [],
                result: [],
                destinationWallet: []
            };
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempTransfersListAoData;
            $scope.tempTransfersListAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.transfersListReload++;
        };

        // 初始化table数据
        $scope.initTransfersListData = function () {
            $scope.transfersListReload++;
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

        $scope.resultOptions = [
            {
                label:'succeed',
                value:'succeed'
            },
            {
                label:'failed',
                value:'failed'
            },
            {
                label:'processing',
                value:'processing'
            },
        ];

        // 页面加载执行的函数

        $scope.initWalletOptionsData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.transfersListAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.transfersListAoData.start_time) {
                        delete $scope.transfersListAoData.start_time;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.transfersListAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.transfersListAoData.end_time) {
                        delete $scope.transfersListAoData.end_time;
                    }
                }
            }
        });

        $scope.$watch('search.sourceWallet.length+search.destinationWallet.length+search.result.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.transfersListAoData.source_wallet = $scope.search.sourceWallet.join(',')
                $scope.transfersListAoData.destination_wallet = $scope.search.destinationWallet.join(',')
                $scope.transfersListAoData.result = $scope.search.result.join(',')
            }
        });

        $scope.filter = filter;

        $scope.urlUsername = $scope.filter.username||'';

        if($scope.filter.username){
            delete $scope.filter.username
        }

        $scope.transfersListAoData = window.Object.assign($scope.transfersListAoData, $scope.filter)

        $scope.tempTransfersListAoData = window.Object.assign($scope.tempTransfersListAoData, $scope.filter)

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
