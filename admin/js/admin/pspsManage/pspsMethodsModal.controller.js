(function() {

    angular
        .module('admin.pspsManage')
        .controller('pspsMethodsModalController', pspsMethodsModalController);

    pspsMethodsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'hasPower',
        'PspsMethodsItem'
    ];

    function pspsMethodsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        hasPower,
        PspsMethodsItem
    ) {

        $scope.hasPower = hasPower;

        // 原始的数据
        $scope.pspsMethodsModal = [];

        // 过滤出来的数据
        $scope.showPspsMethodsModal = [];
        $scope.pspsMethodsModalReload = 1;
        $scope.pspsMethodsModalAoData = {};
        $scope.pspsMethodsModalSearch = '';

        var basePspsMethods = angular.copy(PspsMethodsItem);

        // 初始化table数据
        $scope.initPspsMethodsModalData = function () {
            $scope.pspsMethodsModal = [];
            console.log(PspsMethodsItem,'PspsMethodsItem')
            if(PspsMethodsItem['methods'].length){
                $scope.pspsMethodsModal = PspsMethodsItem['methods'];
                $scope.pspsMethodsModal.forEach(function (pspsMethodsItem, pspsMethodsIndex) {
                    pspsMethodsItem.id = pspsMethodsIndex + 1;
                    if(pspsMethodsItem['extra_setting'] && pspsMethodsItem['extra_setting']['bank'] && window.Array.isArray(pspsMethodsItem['extra_setting']['bank'])){
                        pspsMethodsItem['extra_setting']['bank'] = pspsMethodsItem['extra_setting']['bank'].join(',')
                    }else{
                        pspsMethodsItem['extra_setting'] = {};
                        pspsMethodsItem['extra_setting']['bank'] = '';
                    }
                })
            }
        };


        // 保存
        /**
         *
         * @param pspsMethodsModal 渠道名称数据对象
         * @param data
         */

        $scope.savePspsMethodsModal = function (pspsMethodsModal, data) {
            $scope.pspsMethodsModal.forEach(function (pspsMethodsModalItem) {
                if(pspsMethodsModalItem.id == pspsMethodsModal.id){
                    pspsMethodsModalItem['code'] = data.code || '';
                    pspsMethodsModalItem['rate'] = data.rate || '';
                    pspsMethodsModalItem['extra_setting'] = {};
                    pspsMethodsModalItem['extra_setting']['bank'] = data['extra_setting.bank'] || '';
                    if($scope.validIsNew(pspsMethodsModalItem.id)){
                        pspsMethodsModalItem.id = window.parseInt(pspsMethodsModalItem.id, 10)
                        $scope.pspsMethodsModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param pspsMethodsModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deletePspsMethodsModal = function (pspsMethodsModal, index) {
            $scope.pspsMethodsModal.splice(index, 1)
        };

        console.log($scope.methodsOptions)

        // 添加按钮
        $scope.addPspsMethodsModal = function () {
            $scope.pspsMethodsModalAoData = {};
            $scope.pspsMethodsModalSearch = '';
            $scope.pspsMethodsModal.unshift({
                'id': ($scope.pspsMethodsModal.length+1) + 'null',
                "code": $scope.methodsOptions[0] ? $scope.methodsOptions[0].value : '',
                "rate": '',
                "extra_setting": {
                    "bank":''
                }
            });
        };

        /**
         *
         * @param PspsMethodsItem 添加的渠道名称
         * @param index 添加的index
         */

        $scope.cancelSaveModal = function (PspsMethodsItem, index) {
            if ($scope.validIsNew(PspsMethodsItem.id)) {
                $scope.pspsMethodsModal.splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            $scope.pspsMethodsModal = $scope.pspsMethodsModal.filter(function (pspsMethodsItem) {
                return !$scope.validIsNew(pspsMethodsItem.id);
            });
            $scope.pspsMethodsModal.forEach(function (pspsMethodsItem, pspsMethodsIndex) {
                if(pspsMethodsItem.id){
                    delete pspsMethodsItem.id;
                }
                if(pspsMethodsItem['extra_setting'] && pspsMethodsItem['extra_setting']['bank']){
                    pspsMethodsItem['extra_setting']['bank'] = pspsMethodsItem['extra_setting']['bank'].split(',');
                    if(pspsMethodsItem['extra_setting']['bank'].length === 0){
                        delete pspsMethodsItem['extra_setting'];
                    }
                }
            });
            basePspsMethods.methods = $scope.pspsMethodsModal;
            $uibModalInstance.close({
                type:'methods',
                data:basePspsMethods
            });
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss({
                type:'methods',
                data:basePspsMethods
            });
        };

        // 页面加载执行的函数

        $scope.initPspsMethodsModalData();

    }
})();
