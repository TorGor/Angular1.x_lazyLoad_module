(function() {

    angular
        .module('admin.promotionsManage')
        .controller('PromotionsManageController', PromotionsManageController);

    PromotionsManageController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function PromotionsManageController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.promotionsManageUrl = $rootScope.URL.PROMOTIONSMANAGE.GET;

        // 原始的数据
        $scope.promotionsManage = [];
        $scope.promotionsManageReload = 1;
        $scope.promotionsManageAoData = {};

        // 初始化table数据
        $scope.initPromotionsManageData = function () {
            $scope.promotionsManageReload++;
        };


        // 保存
        /**
         *
         * @param promotionsManage 转账数据对象
         * @param item
         */

        $scope.editPromotionsManage = function (promotionsManage) {
            if(!promotionsManage.id){
                $rootScope.alertErrorMsg('server data error');
                return;
            }
            adminService.getReq($rootScope.URL.PROMOTIONSMANAGE.GET + '/' + promotionsManage.id, {}, {}).then(function(res) {
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: '/views/admin/promotionsManage/promotionsManageModal.html',
                            controller: 'promotionsModalController',
                            scope: $scope,
                            size: 'lg',
                            resolve: {
                                promotionsItem: res.data.data,
                                edit: true,
                            }
                        });
                        modalInstance.result.then(function(data) {
                            $scope.initPromotionsManageData();
                        }, function(data) {
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });

            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;

            } else if (!$scope.validIsNew(tempData._id) && promotionsManage.id) {
                delete tempData._id;

            }
            return '';
        };

        // 添加按钮
        $scope.addPromotionsManage = function () {
            if (typeof res.data.success === 'boolean') {
                if (res.data.success) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: '/views/admin/promotionsManage/promotionsManageModal.html',
                        controller: 'promotionsModalController',
                        scope: $scope,
                        size: 'lg',
                        resolve: {
                            promotionsItem: false,
                            edit: false,
                        }
                    });
                    modalInstance.result.then(function(data) {
                        $scope.initPromotionsManageData();
                    }, function(data) {
                    });
                } else {
                    $rootScope.alertErrorMsg(res.data.msg);
                }
            }
        };

        // 页面加载执行的函数
    }
})();
