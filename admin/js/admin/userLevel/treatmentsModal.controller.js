(function() {

    angular
        .module('admin.userLevel')
        .controller('UserLevelTreatmentsModalController', UserLevelTreatmentsModalController);

    UserLevelTreatmentsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'item'
    ];

    function UserLevelTreatmentsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        item
    ) {

        $scope.designationOptions = [
            {
                label: 'member-card',
                value: 'member-card'
            },
            {
                label: 'upgrading-bonus',
                value: 'upgrading-bonus'
            },
            {
                label: 'monthly-free-bets',
                value: 'monthly-free-bets'
            },
            {
                label: 'weekly-deposit-bonus',
                value: 'weekly-deposit-bonus'
            },
            {
                label: 'birthday-bonus',
                value: 'birthday-bonus'
            },
            {
                label: 'birthday-party',
                value: 'birthday-party'
            },
            {
                label: 'cs',
                value: 'cs'
            },
            {
                label: 'daily-withdraw-limit',
                value: 'daily-withdraw-limit'
            },
            {
                label: 'big-prize-bonus',
                value: 'big-prize-bonus'
            },
            {
                label: 'holiday-gift',
                value: 'holiday-gift'
            },
            {
                label: 'quarterly-travel-benefit',
                value: 'quarterly-travel-benefit'
            }
        ];

        $scope.typeOptions = [
            {
                label: 'boolean',
                value: 'boolean'
            },
            {
                label: 'amount',
                value: 'amount'
            },
            {
                label: 'coupon',
                value: 'coupon'
            },
            {
                label: 'string',
                value: 'string'
            }
        ];

        var baseTreatments = angular.copy(item);

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
            if(item['treatments'].length){
                $scope.treatmentsModal = item['treatments'];
                $scope.treatmentsModal.forEach(function (treatmentsItem, treatmentsIndex) {
                    treatmentsItem.id = treatmentsIndex + 1;
                })
            }
        };


        // 保存
        /**
         *
         * @param treatmentsModal 用户等级数据对象
         * @param data
         */

        $scope.saveTreatmentsModal = function (treatmentsModal, data) {
            $scope.treatmentsModal.forEach(function (treatmentsModalItem) {
                if(treatmentsModalItem.id == treatmentsModal.id){
                    window.Object.assign(treatmentsModalItem, data);
                    if($scope.validIsNew(treatmentsModalItem.id)){
                        treatmentsModalItem.id = window.parseInt(treatmentsModalItem.id, 10)
                    }
                }
            });
        };

        // 删除treatmentsModal
        /**
         * @param treatmentsModal 用户等级数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteTreatmentsModal = function (treatmentsModal, index) {
            $scope.treatmentsModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addTreatmentsModal = function () {
            $scope.treatmentsModalAoData = {};
            $scope.treatmentsModalSearch = '';
            $scope.treatmentsModal.unshift({
                'id': ($scope.treatmentsModal.length+1) + 'null',
                "currency": $scope.currencyOptions[0].value,
                "designation": $scope.designationOptions[0].value,
                "type": $scope.typeOptions[0].value,
                "value":""
            });
        };

        /**
         *
         * @param item 添加的用户等级
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if ($scope.validIsNew(item.id)) {
                $scope.treatmentsModal.splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            $scope.treatmentsModal = $scope.treatmentsModal.filter(function (treatmentsItem) {
                return !$scope.validIsNew(treatmentsItem.id);
            });
            $scope.treatmentsModal.forEach(function (treatmentsItem, treatmentsIndex) {
                if(treatmentsItem.id){
                    delete treatmentsItem.id;
                }
            });
            baseTreatments['treatments'] = $scope.treatmentsModal
            $uibModalInstance.close({
                type:'treatments',
                data: baseTreatments
            });
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss({
                type:'treatments',
                data: baseTreatments
            });
        };

        // 页面加载执行的函数

        $scope.initTreatmentsModalData();
    }
})();
