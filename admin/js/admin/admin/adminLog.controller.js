(function() {


    angular
        .module('admin.admin')
        .controller('SuperAdminAdminLogController', SuperAdminAdminLogController);

    SuperAdminAdminLogController.$inject = [
        '$scope',
        '$rootScope',
        '$translate',
        'superAdminService'
    ];

    function SuperAdminAdminLogController(
        $scope,
        $rootScope,
        $translate,
        superAdminService
    ) {

        $scope.methodTypeOptions = [
            {
                label:'All',
                value:''
            },
            {
                label:'GET',
                value:'GET'
            },
            {
                label:'POST',
                value:'POST'
            },
            {
                label:'PATCH',
                value:'PATCH'
            },
            {
                label:'DELETE',
                value:'DELETE'
            },
            {
                label:'PUT',
                value:'PUT'
            },
        ];

        $scope.adminsLog = [];
        $scope.adminsLogReload = 1;
        $scope.tempAdminsLogAoData = {};
        $scope.adminsLogAoData = {};

        $scope.trigerSearch = function() {
            $scope.tempAdminsLogAoData = Object.assign($scope.tempAdminsLogAoData,$scope.adminsLogAoData);
            $scope.adminsLogReload++;
        };

        $scope.resetSearch = function() {
            $scope.adminsLogAoData = {};
            $scope.searchTimeStart = undefined
            $scope.searchTimeEnd = undefined
            var tempData = $scope.tempAdminsLogAoData;
            $scope.tempAdminsLogAoData = {
                page:tempData.page,
                pageSize:tempData.pageSize
            };
            $scope.adminsLogReload++;
        };

        $scope.$watch('searchTimeStart+searchTimeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.searchTimeStart) {
                    $scope.adminsLogAoData.beginTime = $scope.searchTimeStart.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.adminsLogAoData.beginTime) {
                        delete $scope.adminsLogAoData.beginTime;
                    }
                }
                if ($scope.searchTimeEnd) {
                    $scope.adminsLogAoData.endTime = $scope.searchTimeEnd.utc().format($rootScope.dateOptionsYYYMMDDHHmmss.format);
                } else {
                    if ($scope.adminsLogAoData.endTime) {
                        delete $scope.adminsLogAoData.endTime;
                    }
                }
            }
        });

        $scope.showDescriptionDetail = function (data) {
            var tempStr = '';
            var tempObj = JSON.parse(data);
            if (typeof tempObj == 'object') {
                window.Object.keys(tempObj).map(function (item) {
                    tempStr = tempStr + '<span style="max-width: 180px;text-align: left">'+$translate.instant(item)+'</span>'  + ':' + tempObj[item].toString() + '</br>'
                })
            }
            return tempStr;
        };


        // 页面加载执行的函数
    }
})();
