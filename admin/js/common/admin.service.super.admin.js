(function (angular) {
    

    angular
        .module('admin')
        .factory('adminService', adminService);

    adminService.$inject = ['$resource', 'EVN'];

    /* @ngInject */
    function adminService($resource, EVN) {
        return $resource(EVN.server + '/admin/:action',
            {},
            {

                // 3.1 查询一级菜单
                getFindRootMenuInfo: {
                    method: 'GET',
                    params: {
                        action: 'findRootMenuInfo' + EVN.suffix
                    }
                },

            }
        );
    }

})(angular);

