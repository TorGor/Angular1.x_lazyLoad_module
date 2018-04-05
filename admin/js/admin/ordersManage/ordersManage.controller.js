(function() {

    angular
        .module('admin.ordersManage')
        .controller('OrdersManageController', OrdersManageController);

    OrdersManageController.$inject = [
        '$scope',
        '$uibModal',
        '$rootScope',
        'adminService'
    ];

    function OrdersManageController(
        $scope,
        $uibModal,
        $rootScope,
        adminService
    ) {

        $scope.search = {
            wallet: [],
            method: []
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
                                $scope.walletOptions.push(tempObj)
                                //if(!objItem.disabled){
                                //    $scope.walletOptions.push(tempObj)
                                //}
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.methodOptions = [];

        $scope.initMethodOptionsData = function () {
            $scope.methodOptions = [];
            adminService.getReq($rootScope.URL.PAYMENTMETHODS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                $scope.methodOptions.push(tempObj)
                                //if(!objItem.disabled){
                                //    $scope.methodOptions.push(tempObj)
                                //}
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.ordersManageUrl = $rootScope.URL.ORDERSMANAGE.GET;

        // 原始的数据
        $scope.ordersManage = [];

        $scope.advancedSearch = false;

        // 过滤出来的数据
        $scope.ordersManageReload = 1;
        $scope.ordersManageAoData = {};
        $scope.tempOrdersManageAoData = {};
        $scope.ordersManageAoData.wallet = ''
        $scope.ordersManageAoData.method = ''

        $scope.trigerSearch = function() {
            $scope.tempOrdersManageAoData = angular.extend($scope.tempOrdersManageAoData,$scope.ordersManageAoData)
        };

        $scope.resetSearch = function() {
            $scope.ordersManageAoData = {};
            $scope.ordersManageAoData.wallet = ''
            $scope.ordersManageAoData.method = ''
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            $scope.search = {
                wallet: [],
                method: []
            };
            var tempData = $scope.tempOrdersManageAoData;
            $scope.tempOrdersManageAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            }
        };

        $scope.initOrdersManageData = function() {
            $scope.ordersManageReload++
        };

        $scope.showAdvanceSearch = function() {
            $scope.advancedSearch = !$scope.advancedSearch
        };


        // 删除ordersManage
        /**
         * @param ordersManage ORDERSMANAGETITLE数据对象
         * @return null
         */
        $scope.deleteOrdersManage = function (ordersManage) {
            if (ordersManage.code) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.ORDERSMANAGE.DELETE+'/'+ordersManage.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initOrdersManageData();
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
        $scope.manualOrdersManage = function (item) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/ordersManage/orderAddModal.html',
                controller: 'OrderAddModalController',
                resolve: {
                    item: item
                },
                size: 'md'
            });
            modalInstance.result.then(function(data) {
                $scope.initOrdersManageData()
            }, function(data) {
            });
        };

        // 详细按钮
        $scope.ordersDetailManage = function (item) {
            if(!item.id){
                $rootScope.alertErrorMsg('server data error');
                return;
            }
            adminService.getReq($rootScope.URL.ORDERSMANAGE.GETDETAIL + '/' + item.id, {}, {}).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    console.log(res.data.data)
                    if (res.data.success) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: '/views/admin/ordersManage/orderDetailModal.html',
                            controller: 'OrderDetailModalController',
                            resolve: {
                                orderDetail: res.data.data
                            },
                            size: 'lg',
                        });
                        modalInstance.result.then(function(data) {
                        }, function(data) {
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        /**
         *
         * @param item 添加的ORDERSMANAGETITLE
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.ordersManage.splice(index, 1);
            }
        };

        //页面加载执行
        $scope.initWalletOptionsData();
        $scope.initMethodOptionsData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.ordersManageAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.ordersManageAoData.start_time) {
                        delete $scope.ordersManageAoData.start_time;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.ordersManageAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.ordersManageAoData.end_time) {
                        delete $scope.ordersManageAoData.end_time;
                    }
                }
            }
        });

        $scope.$watch('search.wallet.length+search.method.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.ordersManageAoData.wallet = $scope.search.wallet.join(',');
                $scope.ordersManageAoData.method = $scope.search.method.join(',');
            }
        });

    }
})();
