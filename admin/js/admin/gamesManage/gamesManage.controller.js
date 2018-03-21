(function() {

    angular
        .module('admin.gamesManage')
        .controller('GamesManageController', GamesManageController);

    GamesManageController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function GamesManageController(
        $scope,
        $rootScope,
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
            });
            return arr;
        };


        // 保存
        /**
         *
         * @param gamesManage GAMESMANAGETITLE数据对象
         * @param item
         */

        $scope.saveGamesManage = function (gamesManage, item) {
            var tempData = angular.extend({}, gamesManage, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.GAMESMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGamesManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && gamesManage.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.GAMESMANAGE.PATCH+'/'+gamesManage.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initGamesManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
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
            $scope.gamesManageAoData = {};
            $scope.gamesManageSearch = '';
            $scope.gamesManage.unshift({
                _id: ($scope.gamesManage.length+1) + 'null',
                name: [],
                product_code: $scope.productOptions[0] && $scope.productOptions[0].value || '',
                brand_code: $scope.brandOptions[0] && $scope.brandOptions[0].value || '',
                flash_code:'',
                html5_code:'',
                app_code:'',
                apk_code:'',
                windows_code: '',
                ftp_code: '',
                flash_demo_supported: '',
                html5_demo_supported: '',
                image: '',
                lines: '',
                has_jackpot: '',
                current_jackpot: '',
                disabled: '',
                rebateable: '',
                bigwinable: '',
                categories: '',
                is_new: '',
                is_coming_soon: '',
                is_recommend: ''
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
