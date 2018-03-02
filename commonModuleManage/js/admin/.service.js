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

                // 查询COMMONMODULETITLE
                getCommonModuleInfo: {
                    method: 'GET',
                    params: {
                        action: '' + EVN.suffix
                    }
                },

                // 添加COMMONMODULETITLE
                postSaveCommonModuleInfo: {
                    method: 'POST',
                    params: {
                        action: '' + EVN.suffix
                    }
                },

                // 修改COMMONMODULETITLE
                postUpdateCommonModuleInfo: {
                    method: 'PUT',
                    params: {
                        action: '' + EVN.suffix
                    }
                },

                // 删除COMMONMODULETITLE
                getDeleteCommonModuleInfoById: {
                    method: 'GET',
                    params: {
                        action: '' + EVN.suffix
                    }
                },

            }
        );
    }

})(angular);

