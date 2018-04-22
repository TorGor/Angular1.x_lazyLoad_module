(function() {

    angular
        .module('admin.blackLists')
        .controller('BlackListsController', BlackListsController);

    BlackListsController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function BlackListsController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.typeOptions = [
            {
                label:'fraud',
                value:'fraud'
            },
            {
                label:'suspicious',
                value:'suspicious'
            }
        ];

        $scope.isDeletedOptions = [
            {
                label:'All',
                value:''
            },
            {
                label:'Deleted',
                value:'1'
            },
            {
                label:'No Deleted',
                value:'0'
            }
        ];

        $scope.typeOptionsSearch = [
            {
                label:'Fraud',
                value:'fraud'
            },
            {
                label:'Suspicious',
                value:'suspicious'
            }
        ];

        // 原始的数据
        $scope.blackLists = [];

        $scope.blackListsReload = 1;
        $scope.blackListsAoData = {};
        $scope.tempBlackListsAoData = {};
        $scope.blackListsSearch = '';

        $scope.trigerSearch = function() {
            $scope.tempBlackListsAoData = Object.assign($scope.tempBlackListsAoData,$scope.blackListsAoData)
            $scope.blackListsReload++;
        };

        $scope.resetSearch = function() {
            $scope.blackListsAoData = {};
            var tempData = $scope.tempBlackListsAoData;
            $scope.tempBlackListsAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            }
            $scope.blackListsReload++;
        };

        $scope.blackListsUrl = $rootScope.URL.BLACKLISTS.GET;

        // 初始化table数据
        $scope.initBlackListsData = function () {
            $scope.blackListsReload++;
        };

        $scope.showCountriesManageModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/blackLists/blackListsModal.html',
                controller: 'blackListsModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit:edit,
                    modalItem: item,
                    hasPower:$scope.validPower("BLACKLISTS", ["PATCH", "POST"]) && edit !== 1,
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initBlackListsData();
            }, function (data) {

            });
        };

        // 删除blackLists
        /**
         * @param blackLists BLACKLISTSTITLE数据对象
         * @return null
         */
        $scope.deleteBlackLists = function (blackLists) {
            if (blackLists.accountNumber) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.BLACKLISTS.DELETE+'/'+blackLists.accountNumber, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initBlackListsData();
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

        // 恢复blackLists
        /**
         * @param blackLists BLACKLISTSTITLE数据对象
         * @return null
         */
        $scope.recoverBlackLists = function (blackLists) {
            if (blackLists.accountNumber) {
                $rootScope.alertConfirm(function () {
                    adminService.putReq($rootScope.URL.BLACKLISTS.PUT+'/'+blackLists.accountNumber, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initBlackListsData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                },'recover');
            }
        };

    }
})();
