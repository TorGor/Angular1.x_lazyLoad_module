(function() {

    angular
        .module('admin.paymentMethods')
        .controller('PaymentMethodsNameModalController', PaymentMethodsNameModalController);

    PaymentMethodsNameModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'hasPower',
        'edit',
        'modalItem'
    ];

    function PaymentMethodsNameModalController(
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
                    "currency": $scope.currencyOptions[0].value,
                    "min": '',
                    "max": '',
                    "disabled": $scope.disabledOptions[1].value,
                    "type": $scope.typeOptions[0].value,
                    "name": []
                }
            }else{
                if($scope.modalItem['name']&&$scope.modalItem['name'].length){
                    $scope.methodsNameModal = $scope.modalItem['name'];
                    $scope.methodsNameModal.forEach(function (methodsNameItem, methodsNameIndex) {
                        methodsNameItem.id = methodsNameIndex + 1;
                    })
                }
            }
        };


        // 保存
        /**
         *
         * @param methodsNameModal 渠道名称数据对象
         * @param data
         */

        $scope.saveMethodsNameModal = function (methodsNameModal, data) {
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
                "locale": $scope.localesOptions[0] ? $scope.localesOptions[0].value : '',
                "value": ''
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
            if(window.parseFloat($scope.modalItem.min||'')>window.parseFloat($scope.modalItem.max||'')){
                $rootScope.alertErrorMsg('min should less than max');
                return '';
            }
            if($scope.methodsNameModal && $scope.methodsNameModal.length){
                var tempObj = {};
                var sameKey = false;
                $scope.methodsNameModal.map(function(nameItem) {
                    if(tempObj[nameItem.locale]){
                        sameKey = true
                    }
                    tempObj[nameItem.locale] = nameItem.value
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same local,just remove one');
                    return '';
                }
            }
            $scope.methodsNameModal = $scope.methodsNameModal.filter(function (methodsNameItem) {
                return !$scope.validIsNew(methodsNameItem.id);
            });
            $scope.methodsNameModal.forEach(function (methodsNameItem, methodsNameIndex) {
                if(methodsNameItem.id){
                    delete methodsNameItem.id;
                }
            });
            var tempData = angular.copy($scope.methodsNameModal)
            if($scope.methodsNameModal && $scope.methodsNameModal.length){
                var tempObj = {};
                var sameKey = false;
                $scope.methodsNameModal.name.map(function(nameItem) {
                    if(tempObj[nameItem.locale]){
                        sameKey = true
                    }
                    tempObj[nameItem.locale] = nameItem.value
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same local,just remove one');
                    return '';
                }
                tempData.name = angular.copy(tempObj)
            }else{
                tempData.name = {}
            }
            if(edit ==2){
                adminService.postReq($rootScope.URL.PAYMENTMETHODS.POST, {}, tempData).then(function (res) {
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
                adminService.patchReq($rootScope.URL.PAYMENTMETHODS.PATCH+'/'+tempData.code, {}, tempData).then(function (res) {
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
            $uibModalInstance.dismiss({});
        };

        // 页面加载执行的函数

        $scope.initMethodsNameModalData();

    }
})();
