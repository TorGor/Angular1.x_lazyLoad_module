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
        'modalItem'
    ];

    function BrandsProductsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        modalItem
    ) {



        var baseBrandsProducts = angular.copy(modalItem);

        // 初始化table数据
        $scope.initBrandsProductsModalData = function () {
            $scope.brandsProductsModal = [];
            console.log(modalItem,'modalItem')

        };


        $scope.confirmModal = function () {
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
            $scope.brandsProductsModal = $scope.brandsProductsModal.filter(function (modalItem) {
                return !$scope.validIsNew(modalItem.id);
            });
            $scope.brandsProductsModal.forEach(function (modalItem, brandsProductsIndex) {
                if(modalItem.id){
                    delete modalItem.id;
                }
            });
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
