(function() {

    angular
        .module('admin.promotionsManage')
        .controller('promotionsModalController', promotionsModalController);

    promotionsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        'promotionsItem',
        'edit',
        '$translate'
    ];

    function promotionsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        promotionsItem,
        edit,
        $translate
    ) {

        $scope.edit = edit;

        if(edit){
            $scope.promotionsItem = angular.copy(promotionsItem)
        }else{
            $scope.promotionsItem = {
                banner: '',
                currency: $scope.currencyOptions[0] && $scope.currencyOptions[0].value || '',
                brand: $scope.brandOptions[0] && $scope.brandOptions[0].value || '',
                startTime: '',
                endTime: '',
                categories: [],
                title: [],
                content: [],
            };
        }

        console.log($scope.promotionsItem,88888)

        if($scope.promotionsItem.period){
            $scope.promotionsItem.startTime = $scope.promotionsItem.period.from || '';
            $scope.promotionsItem.endTime = $scope.promotionsItem.period.to || '';
            delete $scope.promotionsItem.period
        }

        $scope.timeStart = $scope.promotionsItem.startTime || '';
        $scope.timeEnd = $scope.promotionsItem.endTime || '';

        /**
         * 点击复选框
         * @param value value值
         * @param $event 点击事件
         */
        $scope.selectRank = function(value, $event) {
            if($event.target.checked){
                if($scope.promotionsItem.ranks.indexOf(value) === -1){
                    $scope.promotionsItem.ranks.push(value)
                }
            }else{
                $scope.promotionsItem.ranks.splice($scope.promotionsItem.ranks.indexOf(value), 1)
            }
        };

        // 过滤出来的数据
        $scope.showConditionsModal = [];
        $scope.conditionsModalReload = 1;
        $scope.conditionsModalAoData = {};
        $scope.conditionsModalSearch = '';

        // 初始化table数据
        $scope.initConditionsModalData = function () {
            $scope.promotionsItem['conditions'].forEach(function (conditionsItem, conditionsIndex) {
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
            $scope.promotionsItem['conditions'].forEach(function (conditionsModalItem) {
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
            $scope.promotionsItem['conditions'].splice(index, 1)
        };

        // 添加按钮
        $scope.addConditionsModal = function () {
            $scope.conditionsModalAoData = {};
            $scope.conditionsModalSearch = '';
            $scope.promotionsItem['conditions'].unshift({
                'id': ($scope.promotionsItem['conditions'].length+1) + 'null',
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
                $scope.promotionsItem.splice(index, 1);
            }
        };


        // 过滤出来的数据
        $scope.showTreatmentsModal = [];
        $scope.treatmentsModalReload = 1;
        $scope.treatmentsModalAoData = {};
        $scope.treatmentsModalSearch = '';


        // 初始化table数据
        $scope.initTreatmentsModalData = function () {
            $scope.promotionsItem['treatments'].forEach(function (treatmentsItem, treatmentsIndex) {
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
            $scope.promotionsItem['treatments'].forEach(function (treatmentsModalItem) {
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
            $scope.promotionsItem['treatments'].splice(index, 1)
        };

        // 添加按钮
        $scope.addTreatmentsModal = function () {
            $scope.treatmentsModalAoData = {};
            $scope.treatmentsModalSearch = '';
            $scope.promotionsItem['treatments'].unshift({
                'id': ($scope.promotionsItem['treatments'].length+1) + 'null',
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
                $scope.promotionsItem.splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            var tempData = angular.copy($scope.promotionsItem);
            if(window.Array.isArray(tempData['title'])){
                tempData['title'].forEach(function(titleItem) {
                    if(titleItem.id){
                        delete titleItem.id;
                    }
                })
            }
            if(window.Array.isArray(tempData['content'])){
                tempData['content'].forEach(function(contentItem) {
                    if(contentItem.id){
                        delete contentItem.id;
                    }
                })
            }
            if (!edit) {
                adminService.postReq($rootScope.URL.PROMOTIONSMANAGE.POST, {}, tempData).then(function (res) {
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
                adminService.patchReq($rootScope.URL.PROMOTIONSMANAGE.PATCH+'/'+promotionsManage.id, {}, tempData).then(function (res) {
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

        $scope.initConditionsModalData();

        $scope.initTreatmentsModalData();

        $scope.$watch('timeStart+timeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.timeStart) {
                    $scope.promotionsItem.startTime = $scope.timeStart.format && $scope.timeStart.format('YYYY-MM-DD') + ' 00:00:00';
                } else {
                    $scope.promotionsItem.startTime = '';
                }
                if ($scope.timeEnd) {
                    $scope.promotionsItem.endTime = $scope.timeEnd.format && $scope.timeEnd.format('YYYY-MM-DD') + ' 23:59:59';
                } else {
                    $scope.promotionsItem.endTime = '';
                }
            }
        });

    }
})();
