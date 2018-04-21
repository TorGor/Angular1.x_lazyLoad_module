(function() {

    angular
        .module('admin.appliesUse')
        .controller('AppliesUseController', AppliesUseController);

    AppliesUseController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function AppliesUseController(
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

        $scope.search = {
            products: [],
            status: [],
            brands: [],
            wallets: [],
        };

        $scope.statusOptions = [
            {
                label:'pending',
                value:'pending'
            },
            {
                label:'succeed',
                value:'succeed'
            },
            {
                label:'failed',
                value:'failed'
            },
            {
                label:'revoked',
                value:'revoked'
            },
            {
                label:'processing',
                value:'processing'
            }
        ];

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

        $scope.appliesUseUrl = $rootScope.URL.APPLIESUSE.GET;

        // 原始的数据
        $scope.appliesUse = [];

        // 过滤出来的数据
        $scope.showAppliesUse = [];
        $scope.appliesUseReload = 1;
        $scope.appliesUseAoData = {};
        $scope.tempAppliesUseAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempAppliesUseAoData = Object.assign($scope.tempAppliesUseAoData,$scope.appliesUseAoData)
        };

        $scope.resetSearch = function() {
            $scope.search = {
                products: [],
                status: [],
                brands: [],
                wallets: [],
            };
            $scope.appliesUseAoData = {};
            var tempData = $scope.tempAppliesUseAoData;
            $scope.tempAppliesUseAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            }
        };

        // 初始化table数据
        $scope.initAppliesUseData = function () {
            $scope.appliesUseReload++;
        };

        $scope.appliesUseAudit = function (item) {
            if(!item.id){
                $rootScope.alertErrorMsg('server data error');
                return;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/appliesUse/appliesUseAuditModal.html',
                controller: 'AppliesUseAuditModalController',
                resolve: {
                    item: item
                },
                size: 'lg',
            });
            modalInstance.result.then(function(data) {
                $scope.initAppliesUseData()
            }, function(data) {
            });
        };


        $scope.appliesUseRevoke = function (item) {
            if(!item.id){
                $rootScope.alertErrorMsg('server data error');
                return;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/appliesUse/appliesUseRevokeModal.html',
                controller: 'AppliesUseRevokeModalController',
                resolve: {
                    item: item
                },
                size: 'lg',
            });
            modalInstance.result.then(function(data) {
                $scope.initAppliesUseData()
            }, function(data) {
            });
        };

        // 页面加载执行的函数

        $scope.initWalletOptionsData();

        $scope.initBrandOptionsData();

        $scope.initProductManageData();

        $scope.$watch('search.products.length+search.status.length+search.brands.length+search.wallets.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.appliesUseAoData.products = $scope.search.products.join(',');
                $scope.appliesUseAoData.status = $scope.search.status.join(',');
                $scope.appliesUseAoData.brands = $scope.search.brands.join(',');
                $scope.appliesUseAoData.wallets = $scope.search.wallets.join(',');
            }
        });

        $scope.urlUsername = '';

        // try {
        //     var urlParams = $scope.getUrlParams();
        //     if(urlParams._username){
        //         $scope.urlUsername = urlParams._username;
        //     }
        //     if(urlParams.user_id){
        //         $scope.tempAppliesUseAoData.user_id = urlParams.user_id;
        //     }
        // }catch (e){
        //     console.error(e)
        // }
    }
})();
