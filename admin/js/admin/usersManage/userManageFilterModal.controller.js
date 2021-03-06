(function() {

    angular
        .module('admin.usersManage')
        .controller('usersManageFilterModalController', usersManageFilterModalController);

    usersManageFilterModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'filter'
    ];

    function usersManageFilterModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        filter
    ) {

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


        $scope.genderOptions = [
            {
                label:'male',
                value:'M'
            },
            {
                label:'female',
                value:'F'
            },
            {
                label:'unknown',
                value:'U'
            },
        ];

        $scope.booleanOptons = [
            {
                label: 'Yes',
                value: true
            },
            {
                label: 'No',
                value: false
            }
        ];

        $scope.usersManageUrl = $rootScope.URL.USERSMANAGE.GET;

        // 原始的数据
        $scope.usersManage = [];
        $scope.usersManageReload = 1;
        $scope.usersManageAoData = {};
        $scope.tempUsersManageAoData = {};

        $scope.trigerSearch = function() {
            if($scope.usersManageAoData.username&&$scope.usersManageAoData.username.length&&($scope.usersManageAoData.username.length<3||$scope.usersManageAoData.username.length>11)){
                $rootScope.alertErrorMsg('username char length should between 3 and 11');
                return;
            }
            $scope.tempUsersManageAoData = Object.assign($scope.tempUsersManageAoData,$scope.usersManageAoData)
            $scope.usersManageReload++;
        };

        $scope.resetSearch = function() {
            $scope.usersManageAoData = {};
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempUsersManageAoData;
            $scope.tempUsersManageAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.usersManageReload++;
        };

        // 初始化table数据
        $scope.initUsersManageData = function () {
            $scope.usersManageReload++;
        };

        // 页面加载执行的函数

        $scope.initCurrenciesManageData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.usersManageAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.usersManageAoData.start_time) {
                        $scope.usersManageAoData.start_time = '';
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.usersManageAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.usersManageAoData.end_time) {
                        $scope.usersManageAoData.end_time = '';
                    }
                }
            }
        });

        $scope.showDescriptionDetail = function (data) {
            var tempStr = '';
            if (typeof data == 'object') {
                window.Object.keys(data).map(function (item) {
                    if(typeof data[item] == 'boolean'){
                        tempStr = tempStr + '<span style="width: 180px;text-align: left">'+$translate.instant(item)+'</span>'  + ':' + (data[item]?'Yes':'No') + '</br>'
                    }
                })
            }
            return tempStr;
        };

        $scope.filter = filter;

        $scope.usersManageAoData = window.Object.assign($scope.usersManageAoData, $scope.filter);
        $scope.tempUsersManageAoData = window.Object.assign($scope.tempUsersManageAoData, $scope.filter);

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

    }
})();
