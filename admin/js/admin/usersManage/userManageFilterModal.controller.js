(function() {

    angular
        .module('admin.usersManage')
        .controller('usersManageFilterModalController', usersManageFilterModalController);

    usersManageFilterModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'filter'
    ];

    function usersManageFilterModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        filter
    ) {

        $scope.filter = filter;

        $scope.genderOptions = [
            {
                label:'male',
                value:'M'
            },
            {
                label:'female',
                value:'F'
            },
            {
                label:'unknown',
                value:'U'
            },
        ];

        $scope.usersManageUrl = $rootScope.URL.USERSMANAGE.GET;

        // 原始的数据
        $scope.usersManage = [];
        $scope.usersManageReload = 1;
        $scope.usersManageAoData = {};
        $scope.tempUsersManageAoData = {};

        $scope.tempUsersManageAoData = window.Object.assign($scope.tempUsersManageAoData, $scope.filter);

        // 初始化table数据
        $scope.initUsersManageData = function () {
            $scope.usersManageReload++;
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showDescriptionDetail = function (data) {
            var tempStr = '';
            if (typeof data == 'object') {
                window.Object.keys(data).map(function (item) {
                    if(typeof data[item] == 'boolean'){
                        tempStr = tempStr + '<span style="width: 180px;text-align: left">'+$translate.instant(item)+'</span>'  + ':' + (data[item]?'Yes':'No') + '</br>'
                    }
                })
            }
            return tempStr;
        };

        // 页面加载执行的函数

    }
})();
