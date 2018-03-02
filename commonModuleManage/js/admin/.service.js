(function (angular) {
    

    angular
        .module('admin.commonModule')
        .factory('adminCommonModuleService', adminCommonModuleService);

    adminCommonModuleService.$inject = ['$resource', 'EVN'];

    /* @ngInject */
    function adminCommonModuleService($resource, EVN) {
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

