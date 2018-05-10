(function() {

    angular
        .module('admin.bigwinsManage')
        .controller('BigwinsManageController', BigwinsManageController);

    BigwinsManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function BigwinsManageController(
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
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.statusOptions = [
            {
                label:'pending',
                value:'pending'
            },
            {
                label:'approved',
                value:'approved'
            },
            {
                label:'reviewing',
                value:'reviewing'
            },
            {
                label:'succeed',
                value:'succeed'
            },
            {
                label:'revoked',
                value:'revoked'
            }
        ];

        $scope.bigwinsManageUrl = $rootScope.URL.BIGWINSMANAGE.GET;

        // 原始的数据
        $scope.bigwinsManage = [];
        $scope.bigwinsManageReload = 1;
        $scope.bigwinsManageAoData = {};
        $scope.tempBigwinsManageAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempBigwinsManageAoData = Object.assign($scope.tempBigwinsManageAoData,$scope.bigwinsManageAoData);
            $scope.bigwinsManageReload++;
        };

        $scope.resetSearch = function() {
            $scope.bigwinsManageAoData = {};
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempBigwinsManageAoData;
            $scope.tempBigwinsManageAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.bigwinsManageReload++;
        };

        // 初始化table数据
        $scope.initBigwinsManageData = function () {
            $scope.bigwinsManageReload++;
        };


        $scope.auditBigwinsManage = function (item) {
            if(!item.id){
                $rootScope.alertErrorMsg('server data error');
                return;
            }
            adminService.getReq($rootScope.URL.BIGWINSMANAGE.GETAUDIT + '/' + item.id, {admin_id:(window.userInfo.adminId || ''),adminname: (window.userInfo && window.userInfo.username || ''),}, {}).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    console.log(res.data.data)
                    var tempData = {
                        data: res.data.data,
                        _itemId:item.id
                    };
                    if (res.data.success) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: '/views/admin/bigwinsManage/bigwinsManageModal.html',
                            controller: 'bigwinsManageModalController',
                            resolve: {
                                modalItem: tempData,
                            },
                            size: 'lg',
                        });
                        modalInstance.result.then(function(data) {
                            $scope.initBigwinsManageData();
                        }, function(data) {
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        // 页面加载执行的函数

        $scope.initBrandOptionsData();

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.bigwinsManageAoData.start_time = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.bigwinsManageAoData.start_time) {
                        delete $scope.bigwinsManageAoData.start_time;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.bigwinsManageAoData.end_time = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.bigwinsManageAoData.end_time) {
                        delete $scope.bigwinsManageAoData.end_time;
                    }
                }
            }
        });

    }
})();
