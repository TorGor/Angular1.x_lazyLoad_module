(function() {

    angular
        .module('admin.userLevel')
        .controller('UserLevelRebatesModalController', UserLevelRebatesModalController);

    UserLevelRebatesModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$uibModal',
        '$translate',
        'item'
    ];

    function UserLevelRebatesModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $uibModal,
        $translate,
        item
    ) {

        $scope.productOptions = [
            {
                label: 'SLOTS',
                value: 'SLOTS'
            },
            {
                label: 'LIVE',
                value: 'LIVE'
            },
            {
                label: 'SPORTS',
                value: 'SPORTS'
            },
            {
                label: 'LOTTERY',
                value: 'LOTTERY'
            }
        ];

        // 原始的数据
        $scope.rebatesModal = [];

        var baseRebates = angular.copy(item['rebates']);

        // 过滤出来的数据
        $scope.showRebatesModal = [];
        $scope.rebatesModalReload = 1;
        $scope.rebatesModalAoData = {};
        $scope.rebatesModalSearch = '';

        // 初始化table数据
        $scope.initRebatesModalData = function () {
            $scope.rebatesModal = [];
            if(item['rebates'].length){
                $scope.rebatesModal = item['rebates'];
                $scope.rebatesModal.forEach(function (rebatesItem, rebatesIndex) {
                    rebatesItem.id = rebatesIndex + 1;
                })
            }
        };


        // 保存
        /**
         *
         * @param rebatesModal 用户等级数据对象
         * @param item
         */

        $scope.saveRebatesModal = function (rebatesModal, item) {
            rebatesModal.id = $scope.rebatesModal.length;
            window.Object.assign(rebatesModal, item);
        };

        // 删除rebatesModal
        /**
         * @param rebatesModal 用户等级数据对象
         * @return null
         */
        $scope.deleteRebatesModal = function (rebatesModal) {
            $scope.rebatesModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addRebatesModal = function () {
            $scope.rebatesModalAoData = {};
            $scope.rebatesModalSearch = '';
            $scope.rebatesModal.unshift({
                'id': null,
                "currency":$scope.currencyOptions[0].value,
                "product": $scope.productOptions[0].value,
                "max":'',
                "days":'',
                "brands":[]
            });
        };

        $scope.showEditRebatesBrandModal = function (item) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/userLevel/rebatesBrandsModal.html',
                controller: 'UserLevelRebatesBrandsModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    RebatesBrandsItem: item
                }
            });
            modalInstance.result.then(function (data) {
                if (data === 'neededUpdateUserLevelRebates') {}
            }, function (cancel) {

            });
        };

        /**
         *
         * @param item 添加的用户等级
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.rebatesModal.splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            $scope.rebatesModal = $scope.rebatesModal.filter(function (rebatesItem) {
                return rebatesItem.id;
            });
            $scope.rebatesModal.forEach(function (rebatesItem, rebatesIndex) {
                if(rebatesItem.id){
                    delete rebatesItem.id;
                }
            });
            $uibModalInstance.close('neededUpdateUserLevel');
        };

        $scope.cancelModal = function () {
            item['rebates'] = baseRebates;
            $uibModalInstance.dismiss('cancel');
        };
        // 页面加载执行的函数

        $scope.initRebatesModalData();
    }
})();
