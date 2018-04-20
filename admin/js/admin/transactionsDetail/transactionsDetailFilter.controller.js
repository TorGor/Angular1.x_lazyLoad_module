(function() {

    angular
        .module('admin.transactionsDetail')
        .controller('TransactionsDetailFilterController', TransactionsDetailFilterController);

    TransactionsDetailFilterController.$inject = [
        '$scope',
        '$uibModalInstance',
        '$rootScope',
        'filter',
        '$translate',
        'adminService'
    ];

    function TransactionsDetailFilterController(
        $scope,
        $uibModalInstance,
        $rootScope,
        filter,
        $translate,
        adminService
    ) {

        $scope.filter = filter;

        $scope.transactionsDetail = [];
        $scope.transactionsDetailReload = 1;
        $scope.tempTransactionsDetailAoData = {
            user_id: '',
            affiliate_id: '',
            service_id: '',
            min_amount: '',
            max_amount: '',
            wallet_code: '',
            timezone: "+00:00"
        };

        $scope.showDescriptionDetail = function (data) {
            var tempStr = '';
            if (typeof data == 'object') {
                window.Object.keys(data).map(function (item) {
                    if(typeof data[item] == 'string'){
                        tempStr = $translate.instant(item) + ':' + data[item] + '\n'
                    }
                })
            }
            return tempStr;
        };

        $scope.tempTransactionsDetailAoData = window.Object.assign($scope.tempTransactionsDetailAoData, $scope.filter)

        $scope.transactionsUrl = $rootScope.URL.TRANSACTIONSDETAIL.GET;

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        //页面加载运行的函数

    }
})();
