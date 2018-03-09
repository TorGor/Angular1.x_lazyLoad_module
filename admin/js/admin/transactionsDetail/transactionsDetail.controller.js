(function() {

    angular
        .module('admin.transactionsDetail')
        .controller('TransactionsDetailController', TransactionsDetailController);

    TransactionsDetailController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function TransactionsDetailController(
        $scope,
        $rootScope,
        adminService
    ) {

        $scope.transactionsDetail = [];
        $scope.transactionsDetailReload = 1;
        $scope.transactionsDetailAoData = {
            timezone: "+10:00"
        };
        $scope.transactionsUrl = URL.TRANSACTIONSDETAIL;

    }
})();
