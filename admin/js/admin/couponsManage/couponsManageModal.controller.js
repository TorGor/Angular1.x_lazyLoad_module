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
        '$translate'
    ];

    function addCouponsController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        couponsItem,
        edit,
        $translate
    ) {

        $scope.edit = edit;

        if(edit){
            $scope.couponsItem = angular.copy(couponsItem)
            if(!$scope.couponsItem.treatments || !$scope.couponsItem.treatments.length){
                $scope.couponsItem.treatments = [
                    {
                        type:$scope.treatmentsTypeOptions[0] && $scope.treatmentsTypeOptions[0].value || '',
                        value:'',
                        max_bonus:''
                    }
                ]
            }
        }else{
            $scope.couponsItem = {
                code: '',
                name: '',
                currency: $scope.currencyOptions[0] && $scope.currencyOptions[0].value || '',
                brand: $scope.brandOptions[0] && $scope.brandOptions[0].value || '',
                wallet: $scope.walletOptions[0] && $scope.walletOptions[0].value || '',
                product: $scope.productOptions[0] && $scope.productOptions[0].value || '',
                type: $scope.typeOptions[0] && $scope.typeOptions[0].value || '',
                start_time: '',
                end_time: '',
                need_audit: $scope.booleanOptons[0] && $scope.booleanOptons[0].value || 'true',
                multiple_use: $scope.booleanOptons[0] && $scope.booleanOptons[0].value || 'true',
                need_certification: $scope.booleanOptons[0] && $scope.booleanOptons[0].value || 'true',
                ranks: [],
                code_only: $scope.booleanOptons[0] && $scope.booleanOptons[0].value || 'true',
                enabled: $scope.booleanOptons[0] && $scope.booleanOptons[0].value || 'true',
                conditions: [],
                treatments: [
                    {
                        type:$scope.treatmentsTypeOptions[0] && $scope.treatmentsTypeOptions[0].value || '',
                        value:'',
                        max_bonus:''
                    }
                ],
            };
        }

        $scope.timeStart = $scope.couponsItem.start_time || '';
        $scope.timeEnd = $scope.couponsItem.end_time || '';

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
                "value_type": $scope.conditionsValueTypeOptions[0] ? $scope.conditionsValueTypeOptions[0].value : '',
                "value": ''
            });
        };

        $scope.confirmModal = function () {
            var tempData = angular.copy($scope.couponsItem);
            if(window.Array.isArray(tempData['conditions'])){
                tempData['conditions'].forEach(function(conditionsItem) {
                    if(conditionsItem.id){
                        delete conditionsItem.id;
                    }
                })
            }
            if (!edit) {
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
            } else if (edit) {
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

        // 页面加载执行的函数

        $scope.$watch('timeStart+timeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.timeStart) {
                    $scope.couponsItem.start_time = $scope.timeStart.format('YYYY-MM-DD') + ' 00:00:00';
                } else {
                    $scope.couponsItem.start_time = '';
                }
                if ($scope.timeEnd) {
                    $scope.couponsItem.end_time = $scope.timeEnd.format('YYYY-MM-DD') + ' 23:59:59';
                } else {
                    $scope.couponsItem.end_time = '';
                }
            }
        });

    }
})();
