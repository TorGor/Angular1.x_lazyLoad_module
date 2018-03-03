(function (angular) {
    

    angular
        .module('admin.commonModule')
        .factory('adminCommonModuleService', adminCommonModuleService);

    adminCommonModuleService.$inject = ['$resource', 'EVN'];

    /* @ngInject */
    function adminCommonModuleService($resource, EVN) {
        return $resource(EVN.server + '/rest/:action',
            {},
            {

                // 查询COMMONMODULETITLE
                getCommonModuleList: {
                    method: 'GET',
                    params: {
                        action: '' + EVN.suffix
                    }
                },

                // 添加COMMONMODULETITLE
                saveCommonModuleInfo: {
                    method: 'POST',
                    params: {
                        action: '' + EVN.suffix
                    }
                },

                // 修改COMMONMODULETITLE
                updateCommonModuleInfo: {
                    method: 'PUT',
                    params: {
                        action: '' + EVN.suffix
                    }
                },

                // 删除COMMONMODULETITLE
                deleteCommonModuleInfoById: {
                    method: 'GET',
                    params: {
                        action: '' + EVN.suffix
                    }
                },

            }
        );
    }

})(angular);

