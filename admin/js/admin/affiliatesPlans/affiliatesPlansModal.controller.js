(function() {

    angular
        .module('admin.affiliatesPlans')
        .controller('affiliatesPlansModalController', affiliatesPlansModalController);

    affiliatesPlansModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'hasPower',
        'edit',
        'modalItem'
    ];

    function affiliatesPlansModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        hasPower,
        edit,
        modalItem
    ) {

        $scope.hasPower = hasPower;

        $scope.edit = edit;

        $scope.modalItem = angular.copy(modalItem);

        // 原始的数据
        $scope.methodsNameModal = [];

        // 过滤出来的数据
        $scope.showMethodsNameModal = [];
        $scope.methodsNameModalReload = 1;
        $scope.methodsNameModalAoData = {};
        $scope.methodsNameModalSearch = '';

        // 初始化table数据
        $scope.initMethodsNameModalData = function () {
            if(edit == 2){
                $scope.modalItem = {
                    "code": "",
                    "level": "",
                    "stages": []
                }
            }else{
                if($scope.modalItem['stages']&&$scope.modalItem['stages'].length){
                    $scope.methodsNameModal = $scope.modalItem['stages'];
                    $scope.methodsNameModal.forEach(function (methodsNameItem, methodsNameIndex) {
                        methodsNameItem.id = methodsNameIndex + 1;
                        if(methodsNameItem.profit){
                            methodsNameItem.minProfit = methodsNameItem.profit.min || '';
                            methodsNameItem.maxProfit = methodsNameItem.profit.max || '';
                        }
                    })
                }
            }
        };

        $scope.checkStagesDataActiveUsers = function(data) {
            if(!data){
                return $scope.checkRequiredData(data)
            }
            if(/^[1-9][0-9]?$/.test(data)&&window.parseInt(data)>4){

            }else{
                return 'integer number min 5'
            }
        };

        $scope.checkStagesDataRate = function(data) {
            var tempData = window.parseFloat(data).toFixed(2);
            if(!data){
                return $scope.checkRequiredData(data)
            }
            if(tempData<0.01||tempData>0.6){
                return '0.01-0.6'
            }
        };

        // 保存
        /**
         *
         * @param methodsNameModal 渠道名称数据对象
         * @param data
         */

        $scope.saveMethodsNameModal = function (methodsNameModal, data) {
            if(window.parseInt(data.minProfit)>window.parseInt(data.maxProfit)){
                $rootScope.alertErrorMsg('maxProfit should greater than minProfit');
                return '';
            }
            $scope.methodsNameModal.forEach(function (methodsNameModalItem) {
                if(methodsNameModalItem.id == methodsNameModal.id){
                    window.Object.assign(methodsNameModalItem, data);
                    if($scope.validIsNew(methodsNameModalItem.id)){
                        methodsNameModalItem.id = window.parseInt(methodsNameModalItem.id, 10)
                        $scope.methodsNameModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param methodsNameModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteMethodsNameModal = function (methodsNameModal, index) {
            $scope.methodsNameModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addMethodsNameModal = function () {
            $scope.methodsNameModalAoData = {};
            $scope.methodsNameModalSearch = '';
            $scope.methodsNameModal.unshift({
                'id': ($scope.methodsNameModal.length+1) + 'null',
                'level':'',
                'minProfit':'',
                'maxProfit':'',
                'rate':'',
            });
        };

        /**
         *
         * @param modalItem 添加的渠道名称
         * @param index 添加的index
         */

        $scope.cancelSaveModal = function (item, index) {
            if ($scope.validIsNew(item.id)) {
                $scope.methodsNameModal.splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            if($scope.methodsNameModal && $scope.methodsNameModal.length){
                var tempObj = {};
                var sameKey = false;
                $scope.methodsNameModal.map(function(nameItem) {
                    if(tempObj[nameItem.level]){
                        sameKey = true
                    }
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same level,just remove one');
                    return '';
                }
            }
            var tempData = angular.copy($scope.modalItem);
            tempData.stages = angular.copy($scope.showMethodsNameModal);

            tempData.stages.forEach(function(stagesItem) {
                if(stagesItem.id){
                    delete stagesItem.id;
                }
            })
            if(tempData._id){
                delete tempData._id;
            }
            if(edit ==2){
                adminService.postReq($rootScope.URL.AFFILIATESPLANS.POST, {}, tempData).then(function (res) {
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
            }else if(edit == 3){
                adminService.patchReq($rootScope.URL.AFFILIATESPLANS.PATCH+'/'+tempData.code, {}, tempData).then(function (res) {
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

        // 页面加载执行的函数

        $scope.initMethodsNameModalData();

    }
})();
