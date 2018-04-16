(function() {

    angular
        .module('admin.bankCards')
        .controller('UserBankCardsController', UserBankCardsController);

    UserBankCardsController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function UserBankCardsController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        // 原始的数据
        $scope.userBankCards = [];
        $scope.showUserBankCards = [];
        $scope.userBankCardsReload = 1;
        $scope.userBankCardsAoData = {};
        $scope.userBankCardsSearch = '';

        // 初始化table数据
        $scope.initBankCardsData = function (userId) {
            adminService.getReq(('/rest/getCardsAffiliates'||$rootScope.URL.BANKCARDS.GET)+'/'+userId, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.userBankCards = angular.copy(res.data.data);
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        // 页面加载执行的函数

        try {
            var urlParams = $scope.getUrlParams();
            if(urlParams.user_id){
                $scope.initBankCardsData(urlParams.user_id);
            }
        }catch (e){
            console.error(e)
        }
    }
})();
