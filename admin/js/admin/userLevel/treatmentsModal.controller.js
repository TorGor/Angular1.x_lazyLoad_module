(function() {

    angular
        .module('admin.userLevel')
        .controller('UserLevelTreatmentsModalController', UserLevelTreatmentsModalController);

    UserLevelTreatmentsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'item'
    ];

    function UserLevelTreatmentsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        item
    ) {

        // 原始的数据
        $scope.treatmentsModal = [];

        // 过滤出来的数据
        $scope.showTreatmentsModal = [];
        $scope.treatmentsModalReload = 1;
        $scope.treatmentsModalAoData = {};
        $scope.treatmentsModalSearch = '';

        // 初始化table数据
        $scope.initTreatmentsModalData = function () {
            $scope.treatmentsModal = [];
        };


        // 保存
        /**
         *
         * @param treatmentsModal 用户等级数据对象
         * @param item
         */

        $scope.saveTreatmentsModal = function (treatmentsModal, item) {
            var tempData = angular.extend({}, treatmentsModal, item);
            return '';
        };

        // 删除treatmentsModal
        /**
         * @param treatmentsModal 用户等级数据对象
         * @return null
         */
        $scope.deleteTreatmentsModal = function (treatmentsModal) {
        };

        // 添加按钮
        $scope.addTreatmentsModal = function () {
            $scope.treatmentsModalAoData = {};
            $scope.treatmentsModalSearch = '';
            $scope.treatmentsModal.unshift({
                'id': null,
                'treatmentsModalName': '',
                'treatmentsModalType': '',
                'treatmentsModalStatus': '1',
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
                $scope.treatmentsModal.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initTreatmentsModalData();
    }
})();
