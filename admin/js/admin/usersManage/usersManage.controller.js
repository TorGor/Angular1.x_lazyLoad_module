(function() {

    angular
        .module('admin.usersManage')
        .controller('UsersManageController', UsersManageController);

    UsersManageController.$inject = [
        '$scope',
        '$uibModal',
        '$state',
        '$rootScope',
        'adminService'
    ];

    function UsersManageController(
        $scope,
        $uibModal,
        $state,
        $rootScope,
        adminService
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

        $scope.showEditUserManageModal = function(item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/usersManage/userManageEditModal.html',
                controller: 'usersManageModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit:edit,
                    modalItem: item,
                    hasPower:$scope.validPower("USERSMANAGE", ["PATCH"]) && edit !== 1,
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initUsersManageData();
            }, function (data) {

            });
        };

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
        };

        $scope.resetSearch = function() {
            $scope.usersManageAoData = {};
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempUsersManageAoData;
            $scope.tempUsersManageAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            }
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
                        delete $scope.usersManageAoData.start_time;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.usersManageAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.usersManageAoData.end_time) {
                        delete $scope.usersManageAoData.end_time;
                    }
                }
            }
        });
        
        $scope.openNewTab = function(item,state) {
            var url = window.location.pathname+$rootScope.$state.href(state)+'?_username='+(item.username||'')+'&user_id='+(item.userId||'');
            window.open(url,'_blank');
        }

    }
})();
