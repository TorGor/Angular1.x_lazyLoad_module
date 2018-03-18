(function() {

    angular
        .module('admin.gameCategories')
        .controller('GameCategoriesController', GameCategoriesController);

    GameCategoriesController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function GameCategoriesController(
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
        $scope.gameCategories = [];

        // 过滤出来的数据
        $scope.showGameCategories = [];
        $scope.gameCategoriesReload = 1;
        $scope.gameCategoriesAoData = {};
        $scope.gameCategoriesSearch = '';

        // 初始化table数据
        $scope.initGameCategoriesData = function () {
            $scope.gameCategories = [];
            adminService.getReq($rootScope.URL.GAMECATEGORIES.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.gameCategories = angular.copy(res.data.data);
                        $scope.gameCategories.forEach(function (paymentMethodsItem, paymentMethodsIndex) {
                            paymentMethodsItem._id = paymentMethodsIndex +1;
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        // 展示弹窗
        $scope.showGameCategoriesNameModal = function (item) {
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
                    $scope.gameCategories.forEach(function(gameCategoriesItem) {
                        if (gameCategoriesItem.id == data.data.id) {
                            gameCategoriesItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.gameCategoriesReload++;
                        }
                    });
                }
            }, function (data) {
                if(data.type == 'name'){
                    $scope.gameCategories.forEach(function(gameCategoriesItem) {
                        if (gameCategoriesItem.id == data.data.id) {
                            gameCategoriesItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.gameCategoriesReload++;
                        }
                    });
                }
            });
        };

        // 保存
        /**
         *
         * @param gameCategories GAMECATEGORIESTITLE数据对象
         * @param item
         */

        $scope.saveGameCategories = function (gameCategories, item) {
            var tempData = angular.extend({}, gameCategories, item);
            if ($scope.validIsNew(gameCategories._id)) {
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
                adminService.postReq($rootScope.URL.GAMECATEGORIES.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGameCategoriesData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(gameCategories._id) && gameCategories.id) {
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
                adminService.patchReq($rootScope.URL.GAMECATEGORIES.PATCH+'/'+gameCategories.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGameCategoriesData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除gameCategories
        /**
         * @param gameCategories GAMECATEGORIESTITLE数据对象
         * @return null
         */
        $scope.deleteGameCategories = function (gameCategories) {
            if (!$scope.validIsNew(gameCategories._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.GAMECATEGORIES.DELETE+'/'+gameCategories.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initGameCategoriesData();
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
        $scope.addGameCategories = function () {
            $scope.gameCategoriesAoData = {};
            $scope.gameCategoriesSearch = '';
            $scope.gameCategories.unshift({
                '_id': ($scope.gameCategories.length+1) + 'null',
                'name': []
            });
        };

        /**
         *
         * @param item 添加的GAMECATEGORIESTITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.gameCategories.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initGameCategoriesData();

        $scope.initLocalesOptionsData()
    }
})();
