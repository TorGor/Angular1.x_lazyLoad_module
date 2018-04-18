(function() {

    angular
        .module('admin.bankCards')
        .controller('UserBankCardsModalController', UserBankCardsModalController);

    UserBankCardsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'modalItem'
    ];

    function UserBankCardsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        modalItem
    ) {

        // 原始的数据
        $scope.userBankCards = [];
        $scope.showUserBankCards = [];
        $scope.userBankCardsReload = 1;
        $scope.userBankCardsAoData = {};
        $scope.userBankCardsSearch = '';

        // 初始化table数据
        $scope.initBankCardsData = function () {
            $scope.userBankCards = modalItem.data
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数
        $scope.initBankCardsData();
    }
})();
