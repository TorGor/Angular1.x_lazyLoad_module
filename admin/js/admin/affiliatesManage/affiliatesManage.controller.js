(function() {

    angular
        .module('admin.affiliatesManage')
        .controller('AffiliatesManageController', AffiliatesManageController);

    AffiliatesManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        '$translate',
        'adminService'
    ];

    function AffiliatesManageController(
        $scope,
        $rootScope,
        $uibModal,
        $translate,
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

        $scope.affiliatesManageUrl = $scope.URL.AFFILIATESMANAGE.GET;

        // 原始的数据
        $scope.affiliatesManage = [];
        $scope.affiliatesManageReload = 1;
        $scope.affiliatesManageAoData = {};
        $scope.tempAffiliatesManageAoData = {};

        $scope.trigerSearch = function() {
            if($scope.tempAffiliatesManageAoData.username&&$scope.tempAffiliatesManageAoData.username.length&&($scope.tempAffiliatesManageAoData.username.length<3||$scope.tempAffiliatesManageAoData.username.length>11)){
                $rootScope.alertErrorMsg('username char length should between 3 and 11');
                return;
            }
            $scope.tempAffiliatesManageAoData = Object.assign($scope.tempAffiliatesManageAoData,$scope.affiliatesManageAoData)
            $scope.affiliatesManageReload++
        };

        $scope.resetSearch = function() {
            $scope.affiliatesManageAoData = {};
            $scope.searchTimeStart = undefined;
            $scope.searchTimeEnd = undefined;
            var tempData = $scope.tempAffiliatesManageAoData;
            $scope.tempAffiliatesManageAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.affiliatesManageReload++
        };

        // 初始化table数据
        $scope.initAffiliatesManageData = function () {
            $scope.affiliatesManageReload++;
        };


        // 保存
        /**
         *
         * @param affiliatesManage AFFILIATESMANAGETITLE数据对象
         * @param item
         */

        $scope.saveAffiliatesManage = function (affiliatesManage, item) {
            var tempData = angular.extend({}, affiliatesManage, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.AFFILIATESMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initAffiliatesManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && affiliatesManage.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.AFFILIATESMANAGE.PATCH+'/'+affiliatesManage.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initAffiliatesManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除affiliatesManage
        /**
         * @param affiliatesManage AFFILIATESMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteAffiliatesManage = function (affiliatesManage) {
            if (!$scope.validIsNew(affiliatesManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.AFFILIATESMANAGE.DELETE+'/'+affiliatesManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initAffiliatesManageData();
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

        $scope.showAffiliatesModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/affiliatesManage/affiliatesManageModal.html',
                controller: 'affiliatesManageModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit:edit,
                    modalItem: item,
                    hasPower:$scope.validPower("AFFILIATESMANAGE", ["PATCH"]) && edit !== 1,
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initAffiliatesManageData();
            }, function (data) {

            });
        };

        // 恢复affiliatesManage
        /**
         * @param affiliatesManage AFFILIATESMANAGETITLE数据对象
         * @return null
         */
        $scope.recoverAffiliatesManage = function (affiliatesManage) {
            if (!$scope.validIsNew(affiliatesManage._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.AFFILIATESMANAGE.PUT+'/'+affiliatesManage.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initAffiliatesManageData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                }, 'recover');
            }
        };

        $scope.openNewTab = function(item,state) {
            if(state === 'bankCardsUser'){
                adminService.getReq($rootScope.URL.AFFILIATESMANAGE.SELECTCARDS+'/'+item.userId, {}, {}).then(function (res) {
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
                                windowClass: 'full-screen-modal-window',
                                resolve: {
                                    modalItem: res.data,
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
            if(state === 'summaryAffiliates'){
                adminService.getReq($rootScope.URL.AFFILIATESMANAGE.SELECTSUMMARY+'/'+item.userId, {}, {}).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            var modalInstance = $uibModal.open({
                                animation: true,
                                ariaLabelledBy: 'modal-title',
                                ariaDescribedBy: 'modal-body',
                                templateUrl: '/views/admin/dataPort/summaryAffiliatesModal.html',
                                controller: 'summaryAffiliatesModalController',
                                size: 'lg',
                                scope:$scope,
                                windowClass: 'full-screen-modal-window',
                                resolve: {
                                    modalItem: angular.copy(res.data.data),
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
            if(state === 'usersManage'){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/admin/usersManage/userManageFilterEditModal.html',
                    controller: 'usersManageFilterModalController',
                    size: 'lg',
                    windowClass: 'full-screen-modal-window',
                    scope:$scope,
                    resolve: {
                        filter: {
                            affiliate_id:item.userId
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
                            affiliate_id:item.userId
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
                            affiliate_id:item.userId
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
                            affiliate_id:item.userId
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
                            affiliate_id:item.userId
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

        // 页面加载执行的函数

        $scope.initCurrenciesManageData();
    }
})();
