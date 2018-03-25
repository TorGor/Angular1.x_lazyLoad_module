(function() {

    angular
        .module('admin.gamesProducts')
        .controller('GamesProductsController', GamesProductsController);

    GamesProductsController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function GamesProductsController(
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

        // 原始的数据
        $scope.gamesProducts = [];

        // 过滤出来的数据
        $scope.showGamesProducts = [];
        $scope.gamesProductsReload = 1;
        $scope.gamesProductsAoData = {};

        // 初始化table数据
        $scope.initGamesProductsData = function () {
            $scope.gamesProducts = [];
            adminService.getReq($rootScope.URL.GAMESPRODUCTS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.gamesProducts = angular.copy(res.data.data);
                        $scope.gamesProducts.forEach(function (gamesProductsItem, gamesProductsIndex) {
                            gamesProductsItem._id = gamesProductsIndex +1;
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };


        // 保存
        /**
         *
         * @param gamesProducts GAMESPRODUCTSTITLE数据对象
         * @param item
         */

        $scope.saveGamesProducts = function (gamesProducts, item) {
            var tempData = angular.extend({}, gamesProducts, item);
            if ($scope.validIsNew(gamesProducts._id)) {
                delete tempData._id;
                if(tempData.name && tempData.name.length){
                    var tempObj = {};
                    var sameKey = false;
                    tempData.name.map(function(nameItem) {
                        if(tempObj[nameItem.locale]){
                            sameKey = true
                        }
                        tempObj[nameItem.locale] = nameItem.value
                    });
                    if(sameKey){
                        $rootScope.alertErrorMsg('you set same local,just remove one');
                        return '';
                    }
                    tempData.name = angular.copy(tempObj)
                }
                adminService.postReq($rootScope.URL.GAMESPRODUCTS.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initPaymentMethodsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(gamesProducts._id) && gamesProducts.code) {
                delete tempData._id;
                if(tempData.name && tempData.name.length){
                    var tempObj = {};
                    var sameKey = false;
                    tempData.name.map(function(nameItem) {
                        if(tempObj[nameItem.locale]){
                            sameKey = true
                        }
                        tempObj[nameItem.locale] = nameItem.value
                    });
                    if(sameKey){
                        $rootScope.alertErrorMsg('you set same local,just remove one');
                        return '';
                    }
                    tempData.name = angular.copy(tempObj)
                }
                adminService.patchReq($rootScope.URL.GAMESPRODUCTS.PATCH+'/'+gamesProducts.code, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initPaymentMethodsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        $scope.showGameProductNameModal = function (item) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/paymentMethods/paymentMethodsNameModal.html',
                controller: 'PaymentMethodsNameModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    MethodsNameItem: item,
                    hasPower:$scope.hasPower
                }
            });
            modalInstance.result.then(function (data) {
                if(data.type == 'name'){
                    $scope.gamesProducts.forEach(function(gamesProductsItem) {
                        if (gamesProductsItem.id == data.data.id) {
                            gamesProductsItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.gamesProductsReload++;
                        }
                    });
                }
            }, function (data) {
                if(data.type == 'name'){
                    $scope.gamesProducts.forEach(function(gamesProductsItem) {
                        if (gamesProductsItem.id == data.data.id) {
                            gamesProductsItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.gamesProductsReload++;
                        }
                    });
                }
            });
        };


        // 删除gamesProducts
        /**
         * @param gamesProducts GAMESPRODUCTSTITLE数据对象
         * @return null
         */
        $scope.deleteGamesProducts = function (gamesProducts) {
            if (!$scope.validIsNew(gamesProducts._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.GAMESPRODUCTS.DELETE+'/'+gamesProducts.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initGamesProductsData();
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
        $scope.addGamesProducts = function () {
            $scope.gamesProductsAoData = {};
            $scope.gamesProductsSearch = '';
            $scope.gamesProducts.unshift({
                '_id': ($scope.gamesProducts.length+1) + 'null',
                'code': '',
                'name': [],
                'disabled': true
            });
        };

        /**
         *
         * @param item 添加的GAMESPRODUCTSTITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.gamesProducts.splice(index, 1);
            }
        };

        $scope.hasPower = $scope.validPower("GAMESPRODUCTS", ["PATCH", "POST"])

        // 页面加载执行的函数

        $scope.initGamesProductsData();

        if($scope.hasPower){

            $scope.initLocalesOptionsData();

        }
    }
})();
