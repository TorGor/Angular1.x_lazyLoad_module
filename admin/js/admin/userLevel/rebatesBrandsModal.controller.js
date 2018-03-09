(function() {

    angular
        .module('admin.userLevel')
        .controller('UserLevelRebatesBrandsModalController', UserLevelRebatesBrandsModalController);

    UserLevelRebatesBrandsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'item'
    ];

    function UserLevelRebatesBrandsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
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
        $scope.rebatesBrandsModal = [];

        // 过滤出来的数据
        $scope.showRebatesBrandsModal = [];
        $scope.rebatesBrandsModalReload = 1;
        $scope.rebatesBrandsModalAoData = {};
        $scope.rebatesBrandsModalSearch = '';

        // 初始化table数据
        $scope.initRebatesBrandsModalData = function () {
            $scope.rebatesBrandsModal = [];
            if(item['brands'].length){
                $scope.rebatesBrandsModal = item['brands'];
            }
        };


        // 保存
        /**
         *
         * @param rebatesBrandsModal 用户等级数据对象
         * @param item
         */

        $scope.saveRebatesBrandsModal = function (rebatesBrandsModal, item) {
            var tempData = angular.extend({}, rebatesBrandsModal, item);
            return '';
        };

        // 删除rebatesModal
        /**
         * @param rebatesBrandsModal 用户等级数据对象
         * @return null
         */
        $scope.deleteRebatesBrandsModal = function (rebatesBrandsModal) {
        };

        // 添加按钮
        $scope.addRebatesBrandsModal = function () {
            $scope.rebatesBrandsModalAoData = {};
            $scope.rebatesBrandsModalSearch = '';
            $scope.rebatesBrandsModal.unshift({
                'id': null,
                'rebatesModalName': '',
                'rebatesModalType': '',
                'rebatesModalStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的用户等级
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.rebatesBrandsModal.splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            $uibModalInstance.close('neededUpdateUserLevel');
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initRebatesBrandsModalData();
    }
})();
