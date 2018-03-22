(function() {

    angular
        .module('admin.gamesManage')
        .controller('addGamesController', addGamesController);

    addGamesController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        'couponsItem',
        'edit',
        '$translate'
    ];

    function addGamesController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        gamesItem,
        edit,
        $translate
    ) {

        $scope.edit = edit;

        if(edit){
            $scope.gamesItem = angular.copy(gamesItem)
        }else{
            $scope.gamesItem = {
                name: [],
                product_code: $scope.productOptions[0] && $scope.productOptions[0].value || '',
                brand_code: $scope.brandOptions[0] && $scope.brandOptions[0].value || '',
                flash_code:'',
                html5_code:'',
                app_code:'',
                apk_code:'',
                windows_code: '',
                ftp_code: '',
                flash_demo_supported: '',
                html5_demo_supported: '',
                image: '',
                lines: '',
                has_jackpot: '',
                current_jackpot: '',
                disabled: '',
                rebateable: '',
                bigwinable: '',
                categories: '',
                is_new: '',
                is_coming_soon: '',
                is_recommend: ''
            };
        }


        $scope.timeStart = $scope.gamesItem.startTime || '';
        $scope.timeEnd = $scope.gamesItem.endTime || '';

        /**
         * 点击复选框
         * @param value value值
         * @param $event 点击事件
         */
        $scope.selectRank = function(value, $event) {
            if($event.target.checked){
                if($scope.gamesItem.ranks.indexOf(value) === -1){
                    $scope.gamesItem.ranks.push(value)
                }
            }else{
                $scope.gamesItem.ranks.splice($scope.gamesItem.ranks.indexOf(value), 1)
            }
        };

        // 过滤出来的数据
        $scope.showConditionsModal = [];
        $scope.conditionsModalReload = 1;
        $scope.conditionsModalAoData = {};
        $scope.conditionsModalSearch = '';

        // 初始化table数据
        $scope.initConditionsModalData = function () {
            $scope.gamesItem['conditions'].forEach(function (conditionsItem, conditionsIndex) {
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
            $scope.gamesItem['conditions'].forEach(function (conditionsModalItem) {
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
            $scope.gamesItem['conditions'].splice(index, 1)
        };

        // 添加按钮
        $scope.addConditionsModal = function () {
            $scope.conditionsModalAoData = {};
            $scope.conditionsModalSearch = '';
            $scope.gamesItem['conditions'].unshift({
                'id': ($scope.gamesItem['conditions'].length+1) + 'null',
                "type": $scope.conditionsTypeOptions[0] ? $scope.conditionsTypeOptions[0].value : '',
                "valueType": $scope.conditionsValueTypeOptions[0] ? $scope.conditionsValueTypeOptions[0].value : '',
                "value": ''
            });
        };

        $scope.confirmModal = function () {
            var tempData = angular.copy($scope.gamesItem);
            if (!edit) {
                adminService.postReq($rootScope.URL.GAMESMANAGE.POST, {}, tempData).then(function (res) {
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
                adminService.patchReq($rootScope.URL.GAMESMANAGE.PATCH+'/'+gamesManage.id, {}, tempData).then(function (res) {
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
                    $scope.gamesItem.startTime = $scope.timeStart.format('YYYY-MM-DD') + ' 00:00:00';
                } else {
                    $scope.gamesItem.startTime = '';
                }
                if ($scope.timeEnd) {
                    $scope.gamesItem.endTime = $scope.timeEnd.format('YYYY-MM-DD') + ' 23:59:59';
                } else {
                    $scope.gamesItem.endTime = '';
                }
            }
        });

    }
})();
