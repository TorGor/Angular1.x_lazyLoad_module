(function() {

    angular
        .module('admin.couponsManage')
        .controller('addCouponsController', addCouponsController);

    addCouponsController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        'couponsItem',
        'edit',
        'hasPower',
        '$translate'
    ];

    function addCouponsController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        couponsItem,
        edit,
        hasPower,
        $translate
    ) {

        $scope.edit = edit;

        $scope.hasPower = hasPower;



        if(edit==3||edit==1){
            $scope.couponsItem = angular.copy(couponsItem)
            if(!$scope.couponsItem.treatments || !$scope.couponsItem.treatments.length){
                $scope.couponsItem.treatments = [
                    {
                        type:$scope.treatmentsTypeOptions[0] && $scope.treatmentsTypeOptions[0].value || '',
                        value:'',
                        maxBonus:''
                    }
                ]
            }
            if(window.Array.isArray($scope.couponsItem.conditions)){
                $scope.couponsItem.conditions.forEach(function(conditionsItem) {
                    if(conditionsItem.value){
                        conditionsItem.valueType = conditionsItem.value.type || '';
                        conditionsItem.value = conditionsItem.value.value || '';
                    }
                })
            }
            if(window.Array.isArray($scope.couponsItem.treatments)){
                $scope.couponsItem.treatments.forEach(function(treatmentsItem) {
                    if(treatmentsItem.max){
                        treatmentsItem.maxBonus = treatmentsItem.max || '';
                        delete treatmentsItem.max
                    }
                })
            }
        }else if (edit==2){
            $scope.couponsItem = {
                code: '',
                name: '',
                currency: $scope.currencyOptions[0] && $scope.currencyOptions[0].value || '',
                brand: $scope.brandOptions[0] && $scope.brandOptions[0].value || '',
                wallet: $scope.walletOptions[0] && $scope.walletOptions[0].value || '',
                product: $scope.productOptions[0] && $scope.productOptions[0].value || '',
                type: $scope.typeOptions[0] && $scope.typeOptions[0].value || '',
                startTime: '',
                endTime: '',
                needAudit: $scope.booleanOptons[0] && $scope.booleanOptons[0].value || 'true',
                multipleUse: $scope.booleanOptons[0] && $scope.booleanOptons[0].value || 'true',
                needCertification: $scope.booleanOptons[0] && $scope.booleanOptons[0].value || 'true',
                ranks: [],
                codeOnly: $scope.booleanOptons[0] && $scope.booleanOptons[0].value || 'true',
                isDeleted: $scope.booleanOptons[1] && $scope.booleanOptons[1].value,
                conditions: [],
                treatments: [],
                enabled: $scope.booleanOptons[0].value,
            };
        }

        if($scope.couponsItem.period){
            $scope.couponsItem.startTime = $scope.couponsItem.period.from ? $scope.formatTime($scope.couponsItem.period.from) : '';
            $scope.couponsItem.endTime = $scope.couponsItem.period.to ? $scope.formatTime($scope.couponsItem.period.to) : '';
            delete $scope.couponsItem.period
        }

        $scope.timeStart = $scope.couponsItem.startTime || '';
        $scope.timeEnd = $scope.couponsItem.endTime || '';

        /**
         * 点击复选框
         * @param value value值
         * @param $event 点击事件
         */
        $scope.selectRank = function(value, $event) {
            if($event.target.checked){
                if($scope.couponsItem.ranks.indexOf(value) === -1){
                    $scope.couponsItem.ranks.push(value)
                }
            }else{
                $scope.couponsItem.ranks.splice($scope.couponsItem.ranks.indexOf(value), 1)
            }
        };

        // 过滤出来的数据
        $scope.showConditionsModal = [];
        $scope.conditionsModalReload = 1;
        $scope.conditionsModalAoData = {};
        $scope.conditionsModalSearch = '';

        // 初始化table数据
        $scope.initConditionsModalData = function () {
            $scope.couponsItem['conditions'].forEach(function (conditionsItem, conditionsIndex) {
                conditionsItem.id = conditionsIndex + 1;
            })
        };


        // 保存
        /**
         *
         * @param conditionsModal 渠道名称数据对象
         * @param data
         */

        $scope.saveConditionsModal = function (conditionsModal, data) {
            $scope.couponsItem['conditions'].forEach(function (conditionsModalItem) {
                if(conditionsModalItem.id == conditionsModal.id){
                    window.Object.assign(conditionsModalItem, data);
                    if($scope.validIsNew(conditionsModalItem.id)){
                        conditionsModalItem.id = window.parseInt(conditionsModalItem.id, 10)
                        $scope.conditionsModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param conditionsModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteConditionsModal = function (conditionsModal, index) {
            $scope.couponsItem['conditions'].splice(index, 1)
        };

        // 添加按钮
        $scope.addConditionsModal = function () {
            $scope.conditionsModalAoData = {};
            $scope.conditionsModalSearch = '';
            $scope.couponsItem['conditions'].unshift({
                'id': ($scope.couponsItem['conditions'].length+1) + 'null',
                "type": $scope.conditionsTypeOptions[0] ? $scope.conditionsTypeOptions[0].value : '',
                "valueType": $scope.conditionsValueTypeOptions[0] ? $scope.conditionsValueTypeOptions[0].value : '',
                "value": ''
            });
        };

        /**
         *
         * @param conditionsItem 条件项目
         * @param index 添加的index
         */

        $scope.cancelSaveConditionsModal = function (conditionsItem, index) {
            if ($scope.validIsNew(conditionsItem.id)) {
                $scope.couponsItem['conditions'].splice(index, 1);
            }
        };


        // 过滤出来的数据
        $scope.showTreatmentsModal = [];
        $scope.treatmentsModalReload = 1;
        $scope.treatmentsModalAoData = {};
        $scope.treatmentsModalSearch = '';


        // 初始化table数据
        $scope.initTreatmentsModalData = function () {
            $scope.couponsItem['treatments'].forEach(function (treatmentsItem, treatmentsIndex) {
                treatmentsItem.id = treatmentsIndex + 1;
            })
        };


        // 保存
        /**
         *
         * @param treatmentsModal 处理对象数据对象
         * @param data
         */

        $scope.saveTreatmentsModal = function (treatmentsModal, data) {
            $scope.couponsItem['treatments'].forEach(function (treatmentsModalItem) {
                if(treatmentsModalItem.id == treatmentsModal.id){
                    window.Object.assign(treatmentsModalItem, data);
                    if($scope.validIsNew(treatmentsModalItem.id)){
                        treatmentsModalItem.id = window.parseInt(treatmentsModalItem.id, 10)
                        $scope.treatmentsModalReload ++
                    }
                }
            });
        };

        // 删除处理对象Modal
        /**
         * @param treatmentsModal 处理对象
         * @param index 位置
         * @return null
         */
        $scope.deleteTreatmentsModal = function (treatmentsModal, index) {
            $scope.couponsItem['treatments'].splice(index, 1)
        };

        // 添加按钮
        $scope.addTreatmentsModal = function () {
            $scope.treatmentsModalAoData = {};
            $scope.treatmentsModalSearch = '';
            $scope.couponsItem['treatments'].unshift({
                'id': ($scope.couponsItem['treatments'].length+1) + 'null',
                type:$scope.treatmentsTypeOptions[0] && $scope.treatmentsTypeOptions[0].value || '',
                value:'',
                maxBonus:''
            });
        };

        /**
         *
         * @param treatmentsItem 处理项目
         * @param index 添加的index
         */

        $scope.cancelSaveTreatmentsModal = function (treatmentsItem, index) {
            if ($scope.validIsNew(treatmentsItem.id)) {
                $scope.couponsItem['treatments'].splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            if(!(/[A-Z0-9]{1,20}/.test($scope.couponsItem))){
                $rootScope.alertErrorMsg('code should be A-Z0-9 max 20 char');
                return;
            }
            var tempData = angular.copy($scope.couponsItem);
            tempData['conditions'] = tempData['conditions'].filter(function (item) {
                return !$scope.validIsNew(item.id);
            });
            if(window.Array.isArray(tempData['conditions'])){
                tempData['conditions'].forEach(function(conditionsItem) {
                    if(conditionsItem.id){
                        delete conditionsItem.id;
                    }
                })
            }
            tempData['treatments'] = tempData['treatments'].filter(function (item) {
                return !$scope.validIsNew(item.id);
            });
            if(window.Array.isArray(tempData['treatments'])){
                tempData['treatments'].forEach(function(treatmentsItem) {
                    if(treatmentsItem.id){
                        delete treatmentsItem.id;
                    }
                })
            }
            if (edit==2) {
                adminService.postReq($rootScope.URL.COUPONSMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('success');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (edit==3) {
                adminService.patchReq($rootScope.URL.COUPONSMANAGE.PATCH+'/'+couponsItem.code, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('success');
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

        $scope.checkConditionsMinData = function(data) {
            var temp = window.parseFloat(data);
            if(!data || data<0.01){
                return 'min 0.01';
            }
            return true;
        };

        // 页面加载执行的函数

        $scope.initConditionsModalData();

        $scope.initTreatmentsModalData();

        $scope.$watch('timeStart+timeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.timeStart) {
                    $scope.couponsItem.startTime = $scope.timeStart.format && $scope.timeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    $scope.couponsItem.startTime = '';
                }
                if ($scope.timeEnd) {
                    $scope.couponsItem.endTime = $scope.timeEnd.format && $scope.timeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    $scope.couponsItem.endTime = '';
                }
            }
        });

    }
})();
