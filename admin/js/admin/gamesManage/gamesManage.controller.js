(function() {

    angular
        .module('admin.gamesManage')
        .controller('GamesManageController', GamesManageController);

    GamesManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function GamesManageController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

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

        $scope.booleanOptons = [
            {
                label: 'Yes',
                value: 'true'
            },
            {
                label: 'No',
                value: 'false'
            }
        ];

        $scope.gamesManageUrl = $rootScope.URL.GAMESMANAGE.GET;

        // 原始的数据
        $scope.gamesManage = [];
        $scope.gamesManageReload = 1;
        $scope.gamesManageAoData = {};

        // 初始化table数据
        $scope.initGamesManageData = function () {
            $scope.gamesManageReload++;
        };

        $scope.handleGamesManageData = function(arr) {
            arr.forEach(function (gamesManageItem, gamesManageIndex) {
                gamesManageItem._id = gamesManageIndex +1;
                gamesManageItem.currentJackpot = '';
                gamesManageItem.categories = [];
                gamesManageItem.flashCode = gamesManageItem.codes && gamesManageItem.codes.flash || '',
                gamesManageItem.html5Code = gamesManageItem.codes && gamesManageItem.codes.html5 || '',
                gamesManageItem.appCode = gamesManageItem.codes && gamesManageItem.codes.ios || '',
                gamesManageItem.apkCode = gamesManageItem.codes && gamesManageItem.codes.android || '',
                gamesManageItem.windowsCode = gamesManageItem.codes && gamesManageItem.codes.windows || '',
                gamesManageItem.flashDemoSupported = (gamesManageItem.demo && gamesManageItem.demo.flash || 'false').toString(),
                gamesManageItem.html5DemoSupported = (gamesManageItem.demo && gamesManageItem.demo.html5 || 'false').toString()
                if(gamesManageItem.codes){
                    delete gamesManageItem.codes;
                }
                if(gamesManageItem.demo){
                    delete gamesManageItem.demo;
                }
                if(gamesManageItem.worksOn){
                    delete gamesManageItem.worksOn;
                }
            });
            return arr;
        };


        // 保存
        /**
         *
         * @param game GAMESMANAGETITLE数据对象
         */

        $scope.editGamesManage = function (game) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/gamesManage/gamesManageModal.html',
                controller: 'addGamesController',
                scope: $scope,
                size: 'lg',
                resolve:{
                    gamesItem:game,
                    edit:true,
                }
            });
            modalInstance.result.then(function(data) {
                $scope.initGamesManageData()
            }, function(data) {
            });
        };

        // 删除gamesManage
        /**
         * @param gamesManage GAMESMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteGamesManage = function (gamesManage) {
            if (!$scope.validIsNew(gamesManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.GAMESMANAGE.DELETE+'/'+gamesManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initGamesManageData();
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
        $scope.addGamesManage = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/gamesManage/gamesManageModal.html',
                controller: 'addGamesController',
                scope: $scope,
                size: 'lg',
                resolve:{
                    gamesItem:false,
                    edit:false,
                }
            });
            modalInstance.result.then(function(data) {
                $scope.initGamesManageData()
            }, function(data) {
            });
        };

        /**
         *
         * @param item 添加的GAMESMANAGETITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item._id)) {
                $scope.gamesManage.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initProductManageData();

        $scope.initBrandOptionsData();
    }
})();
