(function() {

    angular
        .module('admin.gameRecords')
        .controller('GameRecordsFilterModalController', GameRecordsFilterModalController);

    GameRecordsFilterModalController.$inject = [
        '$scope',
        '$uibModalInstance',
        '$rootScope',
        'filter',
        '$translate',
        'adminService'
    ];

    function GameRecordsFilterModalController(
        $scope,
        $uibModalInstance,
        $rootScope,
        filter,
        $translate,
        adminService
    ) {

        $scope.search = {
            products: [],
            brands: []
        };

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

        $scope.productOptions = [];
        $scope.productSearchOptions = [];

        $scope.initProductManageData = function () {
            $scope.productOptions = [];
            $scope.productSearchOptions = [];
            adminService.getReq($rootScope.URL.GAMESPRODUCTS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.productSearchOptions.push(tempObj)
                                if(objItem.disabled == false){
                                    $scope.productOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.gameRecordsUrl = $rootScope.URL.GAMERECORDS.GET;

        // 原始的数据
        $scope.gameRecords = [];
        $scope.gameRecordsReload = 1;
        $scope.gameRecordsAoData = {};
        $scope.tempGameRecordsAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempGameRecordsAoData = Object.assign($scope.tempGameRecordsAoData,$scope.gameRecordsAoData);
            $scope.gameRecordsReload++;
        };

        $scope.resetSearch = function() {
            $scope.gameRecordsAoData = {};
            $scope.search = {
                products: [],
                brands: []
            };
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempGameRecordsAoData;
            $scope.tempGameRecordsAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.gameRecordsReload++;
        };

        // 初始化table数据
        $scope.initGameRecordsData = function () {
            $scope.gameRecordsReload++;
        };

        // 页面加载执行的函数

        $scope.initProductManageData();

        $scope.initBrandOptionsData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.gameRecordsAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.gameRecordsAoData.start_time) {
                        delete $scope.gameRecordsAoData.start_time;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.gameRecordsAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.gameRecordsAoData.end_time) {
                        delete $scope.gameRecordsAoData.end_time;
                    }
                }
            }
        });

        $scope.$watch('search.products.length+search.brands.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.gameRecordsAoData.products = $scope.search.products.join(',');
                $scope.gameRecordsAoData.brands = $scope.search.brands.join(',');
            }
        });

        $scope.filter = filter;

        $scope.urlUsername = $scope.filter.username||'';

        if($scope.filter.username){
            delete $scope.filter.username
        }

        $scope.gameRecordsAoData = window.Object.assign($scope.gameRecordsAoData, $scope.filter);
        $scope.tempGameRecordsAoData = window.Object.assign($scope.tempGameRecordsAoData, $scope.filter);

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数
    }
})();
