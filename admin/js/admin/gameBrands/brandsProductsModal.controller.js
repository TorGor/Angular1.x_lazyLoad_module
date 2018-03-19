(function() {

    angular
        .module('admin.gameBrands')
        .controller('BrandsProductsModalController', BrandsProductsModalController);

    BrandsProductsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'brandsProductsItem'
    ];

    function BrandsProductsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        brandsProductsItem
    ) {

        // 原始的数据
        $scope.brandsProductsModal = [];

        // 过滤出来的数据
        $scope.showBrandsProductsModal = [];
        $scope.brandsProductsModalReload = 1;
        $scope.brandsProductsModalAoData = {};
        $scope.brandsProductsModalSearch = '';

        var baseBrandsProducts = angular.copy(BrandsProductsItem);

        // 初始化table数据
        $scope.initBrandsProductsModalData = function () {
            $scope.brandsProductsModal = [];
            console.log(BrandsProductsItem,'BrandsProductsItem')
            if(BrandsProductsItem['products'].length){
                $scope.brandsProductsModal = BrandsProductsItem['products'];
                $scope.brandsProductsModal.forEach(function (brandsProductsItem, brandsProductsIndex) {
                    brandsProductsItem.id = brandsProductsIndex + 1;
                })
            }
        };


        // 保存
        /**
         *
         * @param brandsProductsModal 渠道名称数据对象
         * @param data
         */

        $scope.saveBrandsProductsModal = function (brandsProductsModal, data) {
            $scope.brandsProductsModal.forEach(function (brandsProductsModalItem) {
                if(brandsProductsModalItem.id == brandsProductsModal.id){
                    window.Object.assign(brandsProductsModalItem, data);
                    if($scope.validIsNew(brandsProductsModalItem.id)){
                        brandsProductsModalItem.id = window.parseInt(brandsProductsModalItem.id, 10)
                        $scope.brandsProductsModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param brandsProductsModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteBrandsProductsModal = function (brandsProductsModal, index) {
            $scope.brandsProductsModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addBrandsProductsModal = function () {
            $scope.brandsProductsModalAoData = {};
            $scope.brandsProductsModalSearch = '';
            $scope.brandsProductsModal.unshift({
                'id': ($scope.brandsProductsModal.length+1) + 'null',
                "locale": $scope.localesOptions[0] ? $scope.localesOptions[0].value : '',
                "value": ''
            });
        };

        /**
         *
         * @param BrandsProductsItem 添加的渠道名称
         * @param index 添加的index
         */

        $scope.cancelSaveModal = function (BrandsProductsItem, index) {
            if ($scope.validIsNew(BrandsProductsItem.id)) {
                $scope.brandsProductsModal.splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            $scope.brandsProductsModal = $scope.brandsProductsModal.filter(function (brandsProductsItem) {
                return !$scope.validIsNew(brandsProductsItem.id);
            });
            $scope.brandsProductsModal.forEach(function (brandsProductsItem, brandsProductsIndex) {
                if(brandsProductsItem.id){
                    delete brandsProductsItem.id;
                }
            });
            if($scope.brandsProductsModal && $scope.brandsProductsModal.length){
                var tempObj = {};
                var sameKey = false;
                $scope.brandsProductsModal.map(function(nameItem) {
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
            baseBrandsProducts.products = $scope.brandsProductsModal;
            $uibModalInstance.close({
                type:'products',
                data:baseBrandsProducts
            });
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss({
                type:'products',
                data:baseBrandsProducts
            });
        };

        // 页面加载执行的函数

        $scope.initBrandsProductsModalData();

    }
})();
