(function() {

    angular
        .module('admin.affiliatesPlans')
        .controller('AffiliatesPlansController', AffiliatesPlansController);

    AffiliatesPlansController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function AffiliatesPlansController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        // 原始的数据
        $scope.affiliatesPlans = [];

        // 过滤出来的数据
        $scope.showAffiliatesPlans = [];
        $scope.affiliatesPlansReload = 1;
        $scope.affiliatesPlansAoData = {};
        $scope.affiliatesPlansSearch = '';

        // 初始化table数据
        $scope.initAffiliatesPlansData = function () {
            adminService.getReq($rootScope.URL.AFFILIATESPLANS.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.affiliatesPlans = angular.copy(res.data.data);
                        $scope.affiliatesPlans.forEach(function (affiliatesPlansItem, affiliatesPlansIndex) {
                            affiliatesPlansItem._id = affiliatesPlansIndex +1;
                        });
                        $scope.affiliatesPlansReload++;
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.showAffiliatesPlansModal = function (item,edit) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/affiliatesPlans/affiliatesPlansModal.html',
                controller: 'affiliatesPlansModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    edit:edit,
                    modalItem: item,
                    hasPower:$scope.validPower("AFFILIATESPLANS", ["PATCH", "POST"]) && edit !== 1,
                }
            });
            modalInstance.result.then(function (data) {
                $scope.initAffiliatesPlansData();
            }, function (data) {

            });
        };

        // 删除affiliatesPlans
        /**
         * @param affiliatesPlans AFFILIATESPLANSTITLE数据对象
         * @return null
         */
        $scope.deleteAffiliatesPlans = function (affiliatesPlans) {
            if (!$scope.validIsNew(affiliatesPlans._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.AFFILIATESPLANS.DELETE+'/'+affiliatesPlans.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initAffiliatesPlansData();
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

        // 恢复affiliatesPlans
        /**
         * @param affiliatesPlans AFFILIATESPLANSTITLE数据对象
         * @return null
         */
        $scope.recoverAffiliatesPlans = function (affiliatesPlans) {
            if (!$scope.validIsNew(affiliatesPlans._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.putReq($rootScope.URL.AFFILIATESPLANS.PUT+'/'+affiliatesPlans.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initAffiliatesPlansData();
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

        // 页面加载执行的函数

        $scope.initAffiliatesPlansData();
    }
})();
