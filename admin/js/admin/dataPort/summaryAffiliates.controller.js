(function() {

    angular
        .module('admin.summaryAffiliates')
        .controller('summaryAffiliatesController', summaryAffiliatesController);

    summaryAffiliatesController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function summaryAffiliatesController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        // 原始的数据
        $scope.summaryAffiliates = [];
        $scope.showSummaryAffiliates = [];
        $scope.summaryAffiliatesReload = 1;
        $scope.summaryAffiliatesAoData = {};
        $scope.summaryAffiliatesSearch = '';

        // 初始化table数据
        $scope.initSummaryAffiliatesData = function (userId) {
            adminService.getReq(('/rest/getSummaryAffiliates'||$rootScope.URL.BANKCARDS.GET)+'/'+userId, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.summaryAffiliates = angular.copy(res.data.data);
                        console.log($scope.summaryAffiliates,99999)
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
                $scope.initSummaryAffiliatesData(urlParams.user_id);
            }
        }catch (e){
            console.error(e)
        }
    }
})();
