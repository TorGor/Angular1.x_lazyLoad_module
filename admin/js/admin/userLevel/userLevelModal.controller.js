(function() {

    angular
        .module('admin.userLevel')
        .controller('UserLevelModalController', UserLevelModalController);

    UserLevelModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'edit',
        '$uibModal',
        'hasPower',
        'modalItem'
    ];

    function UserLevelModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        edit,
        $uibModal,
        hasPower,
        modalItem
    ) {

        $scope.hasPower = hasPower;

        $scope.edit = edit;

        $scope.modalItem = angular.copy(modalItem);

        $scope.conditionsModal = [];
        $scope.treatmentsModal = [];
        $scope.rebatesModal = [];

        //初始化数据

        $scope.initGameBrandModalData = function () {
            if(edit == 2){
                $scope.modalItem = {
                    'code': '',
                    'default': '0',
                    'level': '',
                    'conditions': [],
                    'treatments': [],
                    'rebates': []
                }
            }
            if(modalItem['conditions']&&modalItem['conditions'].length){
                $scope.conditionsModal = modalItem['conditions'];
                $scope.conditionsModal.forEach(function (conditionsItem, conditionsIndex) {
                    conditionsItem.id = conditionsIndex + 1;
                })
            }else{
                $scope.conditionsModal = [];
            }
            if(modalItem['treatments']&&modalItem['treatments'].length){
                $scope.treatmentsModal = modalItem['treatments'];
                $scope.treatmentsModal.forEach(function (treatmentsItem, treatmentsIndex) {
                    treatmentsItem.id = treatmentsIndex + 1;
                })
            }else{
                $scope.treatmentsModal = [];
            }
            if(modalItem['rebates']&&modalItem['rebates'].length){
                $scope.rebatesModal = modalItem['rebates'];
                $scope.rebatesModal.forEach(function (rebatesItem, rebatesIndex) {
                    rebatesItem.id = rebatesIndex + 1;
                })
            }else{
                $scope.rebatesModal = [];
            }

        };

        //条件开始

        // 过滤出来的数据
        $scope.showConditionsModal = [];
        $scope.conditionsModalReload = 1;
        $scope.conditionsModalAoData = {};
        $scope.conditionsModalSearch = '';

        // 保存
        /**
         *
         * @param conditionsModal 用户等级数据对象
         * @param data
         */

        $scope.saveConditionsModal = function (conditionsModal, data) {
            $scope.conditionsModal.forEach(function (conditionsModalItem) {
                if(conditionsModalItem.id == conditionsModal.id){
                    window.Object.assign(conditionsModalItem, data);
                    if($scope.validIsNew(conditionsModalItem.id)){
                        conditionsModalItem.id = window.parseInt(conditionsModalItem.id, 10)
                    }
                }
            });
        };

        // 删除conditionsModal
        /**
         * @param conditionsModal 用户等级数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteConditionsModal = function (conditionsModal, index) {
            $scope.conditionsModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addConditionsModal = function () {
            $scope.conditionsModalAoData = {};
            $scope.conditionsModalSearch = '';
            $scope.conditionsModal.unshift({
                'id': ($scope.conditionsModal.length+1) + 'null',
                "currency": $scope.currencyOptions[0].value,
                "designation": $scope.designationOptions[0].value,
                "comparison": $scope.comparisonOptions[0].value,
                "value":'',
                "type": $scope.typeOptions[0].value,
                "logicality": $scope.logicalityOptions[0].value
            });
        };

        /**
         *
         * @param item 添加的用户等级
         * @param index 添加的index
         */

        $scope.cancelConditionsSave = function (item, index) {
            if ($scope.validIsNew(item.id)) {
                $scope.conditionsModal.splice(index, 1);
            }
        };


        //条件结束



        //处理开始

        // 过滤出来的数据
        $scope.showTreatmentsModal = [];
        $scope.treatmentsModalReload = 1;
        $scope.treatmentsModalAoData = {};
        $scope.treatmentsModalSearch = '';


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

        $scope.cancelTreatmentsSave = function (item, index) {
            if ($scope.validIsNew(item.id)) {
                $scope.treatmentsModal.splice(index, 1);
            }
        };

        //处理结束


        //返利开始

        // 过滤出来的数据
        $scope.showRebatesModal = [];
        $scope.rebatesModalReload = 1;
        $scope.rebatesModalAoData = {};
        $scope.rebatesModalSearch = '';

        $scope.checkRebatesMax = function(data) {
            if(!data || window.parseFloat(data)<0.01){
                return 'min 0.01'
            }
            return true;
        };

        // 保存
        /**
         *
         * @param rebatesModal 用户等级数据对象
         * @param data
         */

        $scope.saveRebatesModal = function (rebatesModal, data) {
            $scope.rebatesModal.forEach(function (rebatesModalItem) {
                if(rebatesModalItem.id == rebatesModal.id){
                    window.Object.assign(rebatesModalItem, data);
                    if($scope.validIsNew(rebatesModalItem.id)){
                        rebatesModalItem.id = window.parseInt(rebatesModalItem.id, 10)
                    }
                    $scope.rebatesModalReload++;
                }
            });
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
                'id': ($scope.rebatesModal.length+1) + 'null',
                "currency":$scope.currencyOptions[0].value,
                "product": $scope.productOptions[0].value,
                "max":'',
                "days":'',
                "brands":[]
            });
        };

        $scope.showEditRebatesBrandModal = function (RebatesBrandsItem) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/userLevel/rebatesBrandsModal.html',
                controller: 'UserLevelRebatesBrandsModalController',
                size: 'lg',
                scope:$scope,
                resolve: {
                    RebatesBrandsItem: RebatesBrandsItem
                }
            });
            modalInstance.result.then(function (data) {
                if(data.type == 'brands'){
                    $scope.rebatesModal.forEach(function(rebatesModalItem) {
                        if (window.parseInt(rebatesModalItem.id) == window.parseInt(data.data.id)) {
                            rebatesModalItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.rebatesModalReload++;
                        }
                    });
                    console.log($scope.rebatesModal,88888)
                }
                modalInstance = null
            }, function (data) {
                if(data.type == 'brands'){
                    $scope.rebatesModal.forEach(function(rebatesModalItem) {
                        if (window.parseInt(rebatesModalItem.id) == window.parseInt(data.data.id)) {
                            rebatesModalItem[data.type] = angular.copy(data.data[data.type]);
                            $scope.rebatesModalReload++;
                        }
                    });
                }
                modalInstance = null
            });
        };

        /**
         *
         * @param item 添加的用户等级
         * @param index 添加的index
         */

        $scope.cancelRebatesSave = function (item, index) {
            if ($scope.validIsNew(item.id)) {
                $scope.rebatesModal.splice(index, 1);
            }
        };

        //返利结束

        $scope.confirmModal = function () {

            //提取数据

            var tempData = angular.copy($scope.modalItem);
            var tempConditionsModal = $scope.conditionsModal.filter(function (conditionsItem) {
                return !$scope.validIsNew(conditionsItem.id);
            });
            tempConditionsModal.forEach(function (conditionsItem, conditionsIndex) {
                if(conditionsItem.id){
                    delete conditionsItem.id;
                }
            });
            tempData.conditions = angular.copy(tempConditionsModal);

            var tempTreatmentsModal = $scope.treatmentsModal.filter(function (treatmentsItem) {
                return !$scope.validIsNew(treatmentsItem.id);
            });
            tempTreatmentsModal.forEach(function (treatmentsItem, treatmentsIndex) {
                if(treatmentsItem.id){
                    delete treatmentsItem.id;
                }
            });
            tempData.treatments = angular.copy(tempTreatmentsModal);

            var  tempRebatesModal = $scope.rebatesModal.filter(function (rebatesItem) {
                return !$scope.validIsNew(rebatesItem.id);
            });
            tempRebatesModal.forEach(function (rebatesItem, rebatesIndex) {
                if(rebatesItem.id){
                    delete rebatesItem.id;
                }
            });
            tempData.rebates = angular.copy(tempRebatesModal);

            if(edit==2){
                adminService.postReq($rootScope.URL.USERLEVEL.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }else if(edit==3){
                adminService.patchReq($rootScope.URL.USERLEVEL.PATCH+'/'+tempData.code, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }

        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        //页面加载执行

        $scope.initGameBrandModalData();
    }
})();
