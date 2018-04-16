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

        $scope.admins = [];
        $scope.adminsReload = 1;
        $scope.adminsAoData = {};

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.adminsAoData.start = $scope.searchTimeStart.utc().format('YYYY-MM-DD') + ' 00:00:00';
                } else {
                    if ($scope.adminsAoData.start) {
                        delete $scope.adminsAoData.start;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.adminsAoData.end = $scope.searchTimeEnd.utc().format('YYYY-MM-DD') + ' 23:59:59';
                } else {
                    if ($scope.adminsAoData.end) {
                        delete $scope.adminsAoData.end;
                    }
                }
            }
        });


        // 页面加载执行的函数
    }
})();
