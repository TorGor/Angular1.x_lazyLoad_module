(function() {

    angular
        .module('admin.gameBrands')
        .controller('BrandsCurrenciesModalController', BrandsCurrenciesModalController);

    BrandsCurrenciesModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'brandsCurrenciesItem'
    ];

    function BrandsCurrenciesModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        brandsCurrenciesItem
    ) {

        var basebrandsCurrencies = angular.copy(brandsCurrenciesItem);

        $scope.brandsCurrenciesModal = brandsCurrenciesItem['currencies'];

        $scope.selectObj = {};

        /**
         * 点击复选框
         * @param value value值
         * @param $event 点击事件
         */
        $scope.selectCurrency = function(value, $event) {
            console.log($scope.brandsCurrenciesModal, 11)
            if($event.target.checked){
               if($scope.brandsCurrenciesModal.indexOf(value) === -1){
                   $scope.brandsCurrenciesModal.push(value)
               }
            }else{
                $scope.brandsCurrenciesModal.splice($scope.brandsCurrenciesModal.indexOf(value), 1)
            }
            console.log($scope.brandsCurrenciesModal, 22)
        };

        $scope.confirmModal = function () {
            basebrandsCurrencies.currencies = $scope.brandsCurrenciesModal;
            $uibModalInstance.close({
                type:'currencies',
                data:basebrandsCurrencies
            });
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss({
                type:'currencies',
                data:basebrandsCurrencies
            });
        };

    }
})();
