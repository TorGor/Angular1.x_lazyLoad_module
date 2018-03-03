(function (angular) {
    

    angular
        .module('admin.localeLanguage')
        .factory('adminLocaleLanguageService', adminLocaleLanguageService);

    adminLocaleLanguageService.$inject = ['$resource', 'EVN'];

    /* @ngInject */
    function adminLocaleLanguageService($resource, EVN) {
        return $resource(EVN.server + '/rest/:action',
            {},
            {

                // 查询本地语言
                getLocaleLanguageList: {
                    method: 'GET',
                    params: {
                        action: 'getLocales' + EVN.suffix
                    }
                },

                // 添加本地语言
                postSaveLocaleLanguageInfo: {
                    method: 'POST',
                    params: {
                        action: 'postLocales' + EVN.suffix
                    }
                },

                // 修改本地语言
                patchUpdateLocaleLanguageInfo: {
                    method: 'PATCH',
                    params: {
                        action: 'patchLocales' + EVN.suffix
                    }
                },

                // 删除本地语言
                deleteLocaleLanguage: {
                    method: 'delete',
                    params: {
                        action: 'deleteLocales' + EVN.suffix
                    }
                },

            }
        );
    }

})(angular);

