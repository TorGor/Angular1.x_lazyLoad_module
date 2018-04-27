(function() {

    angular
        .module('admin.bankCards')
        .controller('BankCardsFilterModalController', BankCardsFilterModalController);

    BankCardsFilterModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'filter',
        'adminService'
    ];

    function BankCardsFilterModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        filter,
        adminService
    ) {

        // 原始的数据
        $scope.bankCards = [];
        $scope.bankCardsReload = 1;
        $scope.bankCardsAoData = {};
        $scope.tempBankCardsAoData = {};

        $scope.trigerSearch = function() {
            if($scope.bankCardsAoData.account_number){
                if($scope.bankCardsAoData.account_number.length<3||$scope.bankCardsAoData.account_number.length>20){
                    $rootScope.alertErrorMsg('account number length should between 3 and 20');
                    return;
                }
            }
            $scope.tempBankCardsAoData = Object.assign($scope.tempBankCardsAoData,$scope.bankCardsAoData)
            $scope.bankCardsReload++;
        };

        $scope.resetSearch = function() {
            $scope.bankCardsAoData = {};
            var tempData = $scope.tempBankCardsAoData;
            $scope.tempBankCardsAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            }
            $scope.bankCardsReload++;
        };

        // 初始化table数据
        $scope.initBankCardsData = function () {
            $scope.bankCardsReload++;
        };

        $scope.filter = filter;

        $scope.bankCardsUrl = $rootScope.URL.USERSMANAGE.SELECTCARDS+'/'+$scope.filter.user_id||'';

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };
        // 页面加载执行的函数
    }
})();
