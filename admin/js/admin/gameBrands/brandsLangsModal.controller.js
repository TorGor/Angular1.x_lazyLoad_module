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
        'modalItem'
    ];

    function BrandsLangsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        modalItem
    ) {



        var baseBrandsLangs = angular.copy(modalItem);

        // 初始化table数据
        $scope.initBrandsLangsModalData = function () {
            $scope.brandsLangsModal = [];
            console.log(modalItem,'modalItem')

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
            $scope.brandsLangsModal = $scope.brandsLangsModal.filter(function (modalItem) {
                return !$scope.validIsNew(modalItem.id);
            });
            $scope.brandsLangsModal.forEach(function (modalItem, brandsLangsIndex) {
                if(modalItem.id){
                    delete modalItem.id;
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
