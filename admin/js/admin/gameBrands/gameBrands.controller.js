(function() {

    angular
        .module('admin.gameBrands')
        .controller('GameBrandsController', GameBrandsController);

    GameBrandsController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function GameBrandsController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

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

        $scope.currencyOptions = [];

        $scope.initCurrenciesManageData = function () {
            $scope.currencyOptions = [];
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

        $scope.productOptions = [];

        $scope.initProductManageData = function () {
            $scope.productOptions = [];
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
                                if(objItem.disabled === false){
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

        // 原始的数据
        $scope.gameBrands = [];

        // 过滤出来的数据
        $scope.showGameBrands = [];
        $scope.gameBrandsReload = 1;
        $scope.gameBrandsAoData = {};
        $scope.gameBrandsSearch = '';

        // 初始化table数据
        $scope.initGameBrandsData = function () {
            $scope.gameBrands = [];
            adminService.getReq($rootScope.URL.GAMEBRANDS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.gameBrands = angular.copy(res.data.data);
                        $scope.gameBrands.forEach(function (gameBrandsItem, gameBrandsIndex) {
                            gameBrandsItem._id = gameBrandsIndex +1;
                            gameBrandsItem.langs = [];
                            if(gameBrandsItem.languageMap && window.Array.isArray(gameBrandsItem.languageMap) ){
                                gameBrandsItem.languageMap.forEach(function(languageMapItem) {
                                    var tempLangs = {};
                                    tempLangs.our_locale = languageMapItem.local || '';
                                    tempLangs.brand_locale = languageMapItem.brand || '';
                                    gameBrandsItem.langs.push(tempLangs);
                                });
                                delete gameBrandsItem.languageMap;
                            }
                            gameBrandsItem.products = gameBrandsItem.products.map(function(productsItem) {
                                var tempProducts = {};
                                tempProducts.code = productsItem.code;
                                tempProducts.osx_url = productsItem && productsItem.urls && productsItem.urls.osx || '';
                                tempProducts.windows_url = productsItem && productsItem.urls && productsItem.urls.windows || '';
                                tempProducts.ios_url = productsItem && productsItem.urls && productsItem.urls.ios || '';
                                tempProducts.android_url = productsItem && productsItem.urls && productsItem.urls.android || '';
                                return tempProducts;
                            })
                        });
                        console.log($scope.gameBrands)
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        // 展示Name弹窗
        $scope.showBrandsNameModal = function (item) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/paymentMethods/paymentMethodsNameModal.html',
                controller: 'PaymentMethodsNameModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    MethodsNameItem: item
                }
            });
            modalInstance.result.then(function (data) {
                if(data.type == 'name'){
                    $scope.gameBrands.forEach(function(gameBrandsItem) {
                        if (gameBrandsItem._id == data.data._id) {
                            gameBrandsItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.gameBrandsReload++;
                        }
                    });
                }
                modalInstance = null
            }, function (data) {
                if(data.type == 'name'){
                    $scope.gameBrands.forEach(function(gameBrandsItem) {
                        if (gameBrandsItem._id == data.data._id) {
                            gameBrandsItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.gameBrandsReload++;
                        }
                    });
                }
                modalInstance = null
            });
        };

        // 展示Currencies弹窗
        $scope.showBrandsCurrenciesModal = function (item) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/gameBrands/brandsCurrenciesModal.html',
                controller: 'BrandsCurrenciesModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    brandsCurrenciesItem: item
                }
            });
            modalInstance.result.then(function (data) {
                if(data.type == 'currencies'){
                    $scope.gameBrands.forEach(function(gameBrandsItem) {
                        if (gameBrandsItem._id == data.data._id) {
                            gameBrandsItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.gameBrandsReload++;
                        }
                    });
                }
                modalInstance = null
            }, function (data) {
                if(data.type == 'currencies'){
                    $scope.gameBrands.forEach(function(gameBrandsItem) {
                        if (gameBrandsItem._id == data.data._id) {
                            gameBrandsItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.gameBrandsReload++;
                        }
                    });
                }
                modalInstance = null
            });
        };


        // 展示Langs弹窗
        $scope.showBrandsLangsModal = function (item) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/gameBrands/brandsLangsModal.html',
                controller: 'BrandsLangsModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    brandsLangsItem: item
                }
            });
            modalInstance.result.then(function (data) {
                if(data.type == 'langs'){
                    $scope.gameBrands.forEach(function(gameBrandsItem) {
                        if (gameBrandsItem._id == data.data._id) {
                            gameBrandsItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.gameBrandsReload++;
                        }
                    });
                }
                modalInstance = null
            }, function (data) {
                if(data.type == 'langs'){
                    $scope.gameBrands.forEach(function(gameBrandsItem) {
                        if (gameBrandsItem._id == data.data._id) {
                            gameBrandsItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.gameBrandsReload++;
                        }
                    });
                }
                modalInstance = null
            });
        };


        // 展示Products弹窗
        $scope.showBrandsProductsModal = function (item) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/gameBrands/brandsProductsModal.html',
                controller: 'BrandsProductsModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    brandsProductsItem: item
                }
            });
            modalInstance.result.then(function (data) {
                if(data.type == 'products'){
                    $scope.gameBrands.forEach(function(gameBrandsItem) {
                        if (gameBrandsItem._id == data.data._id) {
                            gameBrandsItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.gameBrandsReload++;
                        }
                    });
                }
                modalInstance = null
            }, function (data) {
                if(data.type == 'products'){
                    $scope.gameBrands.forEach(function(gameBrandsItem) {
                        if (gameBrandsItem._id == data.data._id) {
                            gameBrandsItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.gameBrandsReload++;
                        }
                    });
                }
                modalInstance = null
            });
        };

        // 保存
        /**
         *
         * @param gameBrands GAMEBRANDSTITLE数据对象
         * @param item
         */

        $scope.saveGameBrands = function (gameBrands, item) {
            var tempData = angular.extend({}, gameBrands, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.GAMEBRANDS.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGameBrandsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && gameBrands.code) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.GAMEBRANDS.PATCH+'/'+gameBrands.code, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGameBrandsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除gameBrands
        /**
         * @param gameBrands GAMEBRANDSTITLE数据对象
         * @return null
         */
        $scope.deleteGameBrands = function (gameBrands) {
            if (!$scope.validIsNew(gameBrands._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.GAMEBRANDS.DELETE+'/'+gameBrands.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initGameBrandsData();
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

        // 添加按钮
        $scope.addGameBrands = function () {
            $scope.gameBrandsAoData = {};
            $scope.gameBrandsSearch = '';
            $scope.gameBrands.unshift({
                '_id': ($scope.gameBrands.length+1) + 'null',
                'code': '',
                'wallet': '',
                'status': 'OPEN',
                'currencies': [],
                'langs': [],
                'products': []
            });
        };

        /**
         *
         * @param item 添加的GAMEBRANDSTITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.gameBrands.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initGameBrandsData();

        if($scope.validPower("GAMEBRANDS", ["POST", "PATCH"])){

            $scope.initCurrenciesManageData();

            $scope.initLocalesOptionsData();

            $scope.initProductManageData();

            $scope.initWalletOptionsData();
        }
    }
})();
