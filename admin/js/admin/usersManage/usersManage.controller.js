(function() {

    angular
        .module('admin.usersManage')
        .controller('UsersManageController', UsersManageController);

    UsersManageController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function UsersManageController(
        $scope,
        $rootScope,
        adminService
    ) {

        $scope.usersManageUrl = $rootScope.URL.USERSMANAGE.GET;

        // 原始的数据
        $scope.usersManage = [];
        $scope.usersManageReload = 1;
        $scope.usersManageAoData = {};

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

        // 初始化table数据
        $scope.initUsersManageData = function () {
            $scope.usersManageReload++;
        };

        // 页面加载执行的函数

    }
})();
