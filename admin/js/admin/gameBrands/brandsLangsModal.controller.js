(function() {

    angular
        .module('admin.gameBrands')
        .controller('BrandsLangsModalController', BrandsLangsModalController);

    BrandsLangsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'brandsLangsItem'
    ];

    function BrandsLangsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        brandsLangsItem
    ) {

        // 原始的数据
        $scope.brandsLangsModal = [];

        // 过滤出来的数据
        $scope.showBrandsLangsModal = [];
        $scope.brandsLangsModalReload = 1;
        $scope.brandsLangsModalAoData = {};
        $scope.brandsLangsModalSearch = '';

        var baseBrandsLangs = angular.copy(brandsLangsItem);

        // 初始化table数据
        $scope.initBrandsLangsModalData = function () {
            $scope.brandsLangsModal = [];
            console.log(brandsLangsItem,'brandsLangsItem')
            if(brandsLangsItem['langs'].length){
                $scope.brandsLangsModal = brandsLangsItem['langs'];
                $scope.brandsLangsModal.forEach(function (brandsLangsItem, brandsLangsIndex) {
                    brandsLangsItem.id = brandsLangsIndex + 1;
                })
            }
        };


        // 保存
        /**
         *
         * @param brandsLangsModal 渠道名称数据对象
         * @param data
         */

        $scope.saveBrandsLangsModal = function (brandsLangsModal, data) {
            $scope.brandsLangsModal.forEach(function (brandsLangsModalItem) {
                if(brandsLangsModalItem.id == brandsLangsModal.id){
                    window.Object.assign(brandsLangsModalItem, data);
                    if($scope.validIsNew(brandsLangsModalItem.id)){
                        brandsLangsModalItem.id = window.parseInt(brandsLangsModalItem.id, 10)
                        $scope.brandsLangsModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param brandsLangsModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteBrandsLangsModal = function (brandsLangsModal, index) {
            $scope.brandsLangsModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addBrandsLangsModal = function () {
            $scope.brandsLangsModalAoData = {};
            $scope.brandsLangsModalSearch = '';
            $scope.brandsLangsModal.unshift({
                'id': ($scope.brandsLangsModal.length+1) + 'null',
                "our_locale": $scope.localesOptions[0] ? $scope.localesOptions[0].value : '',
                "brand_locale": ''
            });
        };

        /**
         *
         * @param brandsLangsItem 添加的渠道名称
         * @param index 添加的index
         */

        $scope.cancelSaveModal = function (brandsLangsItem, index) {
            if ($scope.validIsNew(brandsLangsItem.id)) {
                $scope.brandsLangsModal.splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            if($scope.brandsLangsModal && $scope.brandsLangsModal.length){
                var tempObj = {};
                var sameKey = false;
                $scope.brandsLangsModal.map(function(nameItem) {
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
            $scope.brandsLangsModal = $scope.brandsLangsModal.filter(function (brandsLangsItem) {
                return !$scope.validIsNew(brandsLangsItem.id);
            });
            $scope.brandsLangsModal.forEach(function (brandsLangsItem, brandsLangsIndex) {
                if(brandsLangsItem.id){
                    delete brandsLangsItem.id;
                }
            });
            baseBrandsLangs.langs = $scope.brandsLangsModal;
            $uibModalInstance.close({
                type:'langs',
                data:baseBrandsLangs
            });
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss({
                type:'langs',
                data:baseBrandsLangs
            });
        };

        // 页面加载执行的函数

        $scope.initBrandsLangsModalData();

    }
})();
