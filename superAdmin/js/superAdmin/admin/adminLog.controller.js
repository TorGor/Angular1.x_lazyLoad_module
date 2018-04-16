(function() {


    angular
        .module('superAdmin.admin')
        .controller('SuperAdminAdminLogController', SuperAdminAdminLogController);

    SuperAdminAdminLogController.$inject = [
        '$scope',
        '$rootScope',
        'superAdminService'
    ];

    function SuperAdminAdminLogController(
        $scope,
        $rootScope,
        superAdminService
    ) {

        $scope.adminsLog = [];
        $scope.adminsLogReload = 1;
        $scope.tempAdminsLogAoData = {};
        $scope.adminsLogAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempAdminsLogAoData = Object.assign($scope.tempAdminsLogAoData,$scope.adminsLogAoData)
        };

        $scope.resetSearch = function() {
            $scope.adminsLogAoData = {};
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempAdminsLogAoData;
            $scope.tempAdminsLogAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            }
        };

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.adminsAoData.beginTime = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.adminsAoData.beginTime) {
                        delete $scope.adminsAoData.beginTime;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.adminsAoData.endTime = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.adminsAoData.endTime) {
                        delete $scope.adminsAoData.endTime;
                    }
                }
            }
        });


        // 页面加载执行的函数
    }
})();
