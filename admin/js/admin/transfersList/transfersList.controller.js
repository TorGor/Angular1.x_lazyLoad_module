(function() {

    angular
        .module('admin.transfersList')
        .controller('TransfersListController', TransfersListController);

    TransfersListController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function TransfersListController(
        $scope,
        $rootScope,
        adminService
    ) {

        $scope.search = {
            sourceWallet: [],
            destinationWallet: []
        };

        $scope.transfersListUrl = $rootScope.URL.TRANSFERSLIST.GET;

        // 原始的数据
        $scope.transfersList = [];
        $scope.transfersListReload = 1;
        $scope.transfersListAoData = {};

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


        // 页面加载执行的函数

        $scope.initWalletOptionsData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.transfersListAoData.start_time = $scope.searchTimeStart.format('YYYY-MM-DD') + ' 00:00:00';
                } else {
                    if ($scope.transfersListAoData.start_time) {
                        delete $scope.transfersListAoData.start_time;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.transfersListAoData.end_time = $scope.searchTimeEnd.format('YYYY-MM-DD') + ' 23:59:59';
                } else {
                    if ($scope.transfersListAoData.end_time) {
                        delete $scope.transfersListAoData.end_time;
                    }
                }
            }
        });

        $scope.$watch('search.sourceWallet.length+search.destinationWallet.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.transfersListAoData.source_wallet = $scope.search.sourceWallet.join(',')
                $scope.transfersListAoData.destination_wallet = $scope.search.destinationWallet.join(',')
            }
        });
    }
})();
