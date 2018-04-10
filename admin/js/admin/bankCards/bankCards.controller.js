(function() {

    angular
        .module('admin.bankCards')
        .controller('BankCardsController', BankCardsController);

    BankCardsController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function BankCardsController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        // 原始的数据
        $scope.bankCards = [];
        $scope.bankCardsReload = 1;
        $scope.bankCardsAoData = {};
        $scope.tempBankCardsAoData = {};

        $scope.bankCardsUrl = $rootScope.URL.BANKCARDS.GET;

        $scope.trigerSearch = function() {
            if($scope.bankCardsAoData.account_number){
                if($scope.bankCardsAoData.account_number.length<3||$scope.bankCardsAoData.account_number.length>20){
                    $rootScope.alertErrorMsg('account number length should between 3 and 20');
                    return;
                }
            }
            $scope.tempBankCardsAoData = Object.assign($scope.tempBankCardsAoData,$scope.bankCardsAoData)
        };

        $scope.resetSearch = function() {
            $scope.bankCardsAoData = {};
            var tempData = $scope.tempBankCardsAoData;
            $scope.tempBankCardsAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            }
        };

        // 初始化table数据
        $scope.initBankCardsData = function () {
            $scope.bankCardsReload++;
        };

        // 保存
        /**
         *
         * @param bankCards BANKCARDSTITLE数据对象
         * @param item
         */

        $scope.saveBankCards = function (bankCards, item) {
            var tempData = angular.extend({}, bankCards, item);
            if ($scope.validIsNew(tempData._id)) {
                delete tempData._id;
                adminService.postReq($rootScope.URL.BANKCARDS.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initBankCardsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (!$scope.validIsNew(tempData._id) && bankCards.id) {
                delete tempData._id;
                adminService.patchReq($rootScope.URL.BANKCARDS.PATCH+'/'+bankCards.id, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initBankCardsData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除bankCards
        /**
         * @param bankCards BANKCARDSTITLE数据对象
         * @return null
         */
        $scope.deleteBankCards = function (bankCards) {
            if (!$scope.validIsNew(bankCards._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.BANKCARDS.DELETE+'/'+bankCards.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initBankCardsData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        // 恢复bankCards
        /**
         * @param bankCards BANKCARDSTITLE数据对象
         * @return null
         */
        $scope.recoverBankCards = function (bankCards) {
            if (!$scope.validIsNew(bankCards._id)) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.BANKCARDS.PUT+'/'+bankCards.id, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initBankCardsData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                }, 'recover');
            }
        };

        // 页面加载执行的函数

        try {
            var urlParams = $scope.getUrlParams();
            if(urlParams._username){
                $scope.tempBankCardsAoData.account_name = urlParams._username;
                $scope.bankCardsAoData.account_name = urlParams._username;
            }
        }catch (e){
            console.error(e)
        }
    }
})();
