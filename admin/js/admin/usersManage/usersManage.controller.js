(function() {

    angular
        .module('admin.usersManage')
        .controller('UsersManageController', UsersManageController);

    UsersManageController.$inject = [
        '$scope',
        '$uibModal',
        '$state',
        '$translate',
        '$rootScope',
        'adminService'
    ];

    function UsersManageController(
        $scope,
        $uibModal,
        $state,
        $translate,
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
            if(['bankCardsUser'].indexOf(state) !== -1){
                adminService.getReq($rootScope.URL.USERSMANAGE.CARDSSELECT, {user_id:item.userId}, {}).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            var modalInstance = $uibModal.open({
                                animation: true,
                                ariaLabelledBy: 'modal-title',
                                ariaDescribedBy: 'modal-body',
                                templateUrl: '/views/admin/bankCards/userBankCardsModal.html',
                                controller: 'UserBankCardsModalController',
                                size: 'lg',
                                scope:$scope,
                                resolve: {
                                    modalItem: angular.copy(res.data),
                                }
                            });
                            modalInstance.result.then(function (data) {

                            }, function (data) {

                            });
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
                return;
            }
            if(state === 'transactionsDetail'){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/admin/transactionsDetail/transactionsDetailFilterModal.html',
                    controller: 'TransactionsDetailFilterController',
                    size: 'lg',
                    windowClass: 'full-screen-modal-window',
                    scope:$scope,
                    resolve: {
                        filter: {
                            user_id:item.userId,
                            timezone:item.timezone,
                        },
                    }
                });
                modalInstance.result.then(function (data) {

                }, function (data) {

                });
            }
            if(state === 'ordersManage'){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/admin/ordersManage/orderManageFilterModal.html',
                    controller: 'OrderManageFilterModalController',
                    size: 'lg',
                    windowClass: 'full-screen-modal-window',
                    scope:$scope,
                    resolve: {
                        filter: {
                            user_id:item.userId
                        },
                    }
                });
                modalInstance.result.then(function (data) {

                }, function (data) {

                });
            }
            if(state === 'withdrawsManage'){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/admin/withdrawsManage/withdrawsManageFilterModal.html',
                    controller: 'WithdrawsManageFilterModalController',
                    size: 'lg',
                    windowClass: 'full-screen-modal-window',
                    scope:$scope,
                    resolve: {
                        filter: {
                            user_id:item.userId
                        },
                    }
                });
                modalInstance.result.then(function (data) {

                }, function (data) {

                });
            }
            if(state === 'transfersList'){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/admin/transfersList/transfersListFilterModal.html',
                    controller: 'TransfersListFilterModalController',
                    size: 'lg',
                    windowClass: 'full-screen-modal-window',
                    scope:$scope,
                    resolve: {
                        filter: {
                            user_id:item.userId
                        },
                    }
                });
                modalInstance.result.then(function (data) {

                }, function (data) {

                });
            }
            if(state === 'gameRecords'){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/admin/gameRecords/gameRecordsFilterModal.html',
                    controller: 'GameRecordsFilterModalController',
                    size: 'lg',
                    windowClass: 'full-screen-modal-window',
                    scope:$scope,
                    resolve: {
                        filter: {
                            user_id:item.userId
                        },
                    }
                });
                modalInstance.result.then(function (data) {

                }, function (data) {

                });
            }
            if(state === 'rebatesList'){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/admin/rebatesList/rebatesListFilterModal.html',
                    controller: 'RebatesListFilterModalController',
                    size: 'lg',
                    windowClass: 'full-screen-modal-window',
                    scope:$scope,
                    resolve: {
                        filter: {
                            user_id:item.userId
                        },
                    }
                });
                modalInstance.result.then(function (data) {

                }, function (data) {

                });
            }
            if(state === 'appliesUse'){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/admin/appliesUse/appliesUseFilterModal.html',
                    controller: 'AppliesUseFilterModalController',
                    size: 'lg',
                    windowClass: 'full-screen-modal-window',
                    scope:$scope,
                    resolve: {
                        filter: {
                            user_id:item.userId
                        },
                    }
                });
                modalInstance.result.then(function (data) {

                }, function (data) {

                });
            }
            // var url = window.location.pathname+$rootScope.$state.href(state)+'?_username='+(item.username||'')+'&user_id='+(item.userId||'');
            // window.open(url,'_blank');
        };

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

        // 页面加载执行

        // try {
        //     var urlParams = $scope.getUrlParams();
        //     if(urlParams.user_id){
        //         $scope.tempUsersManageAoData.affiliate_id = urlParams.user_id;
        //         $scope.usersManageAoData.affiliate_id = urlParams.user_id;
        //     }
        // }catch (e){
        //     console.error(e)
        // }

    }
})();
