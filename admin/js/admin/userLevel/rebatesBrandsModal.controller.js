(function() {

    angular
        .module('admin.userLevel')
        .controller('UserLevelRebatesBrandsModalController', UserLevelRebatesBrandsModalController);

    UserLevelRebatesBrandsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'RebatesBrandsItem'
    ];

    function UserLevelRebatesBrandsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        RebatesBrandsItem
    ) {

        // 原始的数据
        $scope.rebatesBrandsModal = [];

        // 过滤出来的数据
        $scope.showRebatesBrandsModal = [];
        $scope.rebatesBrandsModalReload = 1;
        $scope.rebatesBrandsModalAoData = {};
        $scope.rebatesBrandsModalSearch = '';

        var baseRebatesBrands = angular.copy(RebatesBrandsItem['brands']);

        // 初始化table数据
        $scope.initRebatesBrandsModalData = function () {
            $scope.rebatesBrandsModal = [];
            console.log(RebatesBrandsItem,'RebatesBrandsItem')
            if(RebatesBrandsItem['brands'].length){
                $scope.rebatesBrandsModal = RebatesBrandsItem['brands'];
                $scope.rebatesBrandsModal.forEach(function (rebatesBrandsItem, rebatesBrandsIndex) {
                    rebatesBrandsItem.id = rebatesBrandsIndex + 1;
                })
            }
        };


        // 保存
        /**
         *
         * @param rebatesBrandsModal 用户等级数据对象
         * @param RebatesBrandsItem
         */

        $scope.saveRebatesBrandsModal = function (rebatesBrandsModal, RebatesBrandsItem) {
            rebatesBrandsModal.id = $scope.rebatesBrandsModal.length;
            window.Object.assign(rebatesBrandsModal, RebatesBrandsItem);
        };

        // 删除rebatesModal
        /**
         * @param rebatesBrandsModal 用户等级数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteRebatesBrandsModal = function (rebatesBrandsModal, index) {
            $scope.rebatesBrandsModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addRebatesBrandsModal = function () {
            $scope.rebatesBrandsModalAoData = {};
            $scope.rebatesBrandsModalSearch = '';
            $scope.rebatesBrandsModal.unshift({
                'id': null,
                "brand": "",
                "rate": ''
            });
        };

        /**
         *
         * @param RebatesBrandsItem 添加的用户等级
         * @param index 添加的index
         */

        $scope.cancelSave = function (RebatesBrandsItem, index) {
            if (RebatesBrandsItem.id == null) {
                $scope.rebatesBrandsModal.splice(index, 1);
            }
        };

        $scope.confirmModalRebatesBrand = function () {
            $scope.rebatesBrandsModal = $scope.rebatesBrandsModal.filter(function (rebatesBrandsItem) {
                return rebatesBrandsItem.id;
            });
            $scope.rebatesBrandsModal.forEach(function (rebatesBrandsItem, rebatesBrandsIndex) {
                if(rebatesBrandsItem.id){
                    delete rebatesBrandsItem.id;
                }
            });
            $uibModalInstance.close('neededUpdateUserLevelRebates');
        };

        $scope.cancelModalRebatesBrand = function () {
            RebatesBrandsItem['brands'] = baseRebatesBrands;
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initRebatesBrandsModalData();
    }
})();
