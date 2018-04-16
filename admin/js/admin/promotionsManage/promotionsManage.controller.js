(function() {

    angular
        .module('admin.promotionsManage')
        .controller('PromotionsManageController', PromotionsManageController);

    PromotionsManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function PromotionsManageController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.search = {
            currency: []
        };

        $scope.statusOptions = [
            {
                label:'publish',
                value:'publish'
            },
            {
                label:'draft',
                value:'draft'
            }
        ];

        $scope.currencyOptions = [];
        $scope.currencySearchOptions = [];

        $scope.initCurrenciesManageData = function () {
            $scope.currencyOptions = [];
            $scope.currencySearchOptions = [];
            adminService.getReq($rootScope.URL.CURRENCIESMANAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.name||'',
                                    value:objItem.code||''
                                };
                                $scope.currencySearchOptions.push(tempObj);
                                if(objItem.supported){
                                    $scope.currencyOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
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
                                // if(objItem.supported){
                                //     $scope.brandOptions.push(tempObj)
                                // }
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

        //“DEPOSIT”,” LIVE”, “LOTTERY”,”REBATE”,”SLOTS”,”SPORTS”
        $scope.categoriesOptions = [
            {
                label:'DEPOSIT',
                value:'DEPOSIT'
            },
            {
                label:'LIVE',
                value:'LIVE'
            },
            {
                label:'LOTTERY',
                value:'LOTTERY'
            },
            {
                label:'REBATE',
                value:'REBATE'
            },
            {
                label:'SLOTS',
                value:'SLOTS'
            },
            {
                label:'SPORTS',
                value:'SPORTS'
            },
        ];

        $scope.promotionsManageUrl = $rootScope.URL.PROMOTIONSMANAGE.GET;

        // 原始的数据
        $scope.promotionsManage = [];
        $scope.promotionsManageReload = 1;
        $scope.promotionsManageAoData = {};
        $scope.tempPromotionsManageAoData = {};

        // 初始化table数据
        $scope.initPromotionsManageData = function () {
            $scope.promotionsManageReload++;
        };

        $scope.trigerSearch = function() {
            $scope.tempPromotionsManageAoData = Object.assign($scope.tempPromotionsManageAoData,$scope.promotionsManageAoData)
        };

        $scope.resetSearch = function() {
            $scope.promotionsManageAoData = {};
            $scope.search = {
                currency: []
            };
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempPromotionsManageAoData;
            $scope.tempPromotionsManageAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            }
        };


        // 保存
        /**
         *
         * @param promotionsManage 转账数据对象
         */

        $scope.editPromotionsManage = function (promotionsManage,edit) {
            if(!promotionsManage.id){
                $rootScope.alertErrorMsg('server data error');
                return;
            }
            adminService.getReq($rootScope.URL.PROMOTIONSMANAGE.GETDETAIL + '/' + promotionsManage.id, {}, {}).then(function(res) {
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: '/views/admin/promotionsManage/promotionsManageModal.html',
                            controller: 'promotionsModalController',
                            scope: $scope,
                            size: 'lg',
                            resolve: {
                                promotionsItem: res.data.data,
                                edit: edit,
                                hasPower:$scope.hasPower&&edit!==1
                            }
                        });
                        modalInstance.result.then(function(data) {
                            $scope.initPromotionsManageData();
                        }, function(data) {
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        // 添加按钮
        $scope.addPromotionsManage = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/promotionsManage/promotionsManageModal.html',
                controller: 'promotionsModalController',
                scope: $scope,
                size: 'lg',
                resolve: {
                    promotionsItem: false,
                    edit: 2,
                    hasPower:$scope.hasPower
                }
            });
            modalInstance.result.then(function(data) {
                $scope.initPromotionsManageData();
            }, function(data) {
            });
        };

        $scope.hasPower = $scope.validPower("PROMOTIONSMANAGE", ["POST","PATCH"]);

        // 页面加载执行的函数

        $scope.initCurrenciesManageData();

        if($scope.hasPower){

            //$scope.initBrandOptionsData();

            $scope.initLocalesOptionsData()
        }

        $scope.$watch('search.currency.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.promotionsManageAoData.currency = $scope.search.currency.join(',');
            }
        });
    }
})();
