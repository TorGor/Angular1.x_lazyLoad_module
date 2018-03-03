(function (angular) {
    

    angular
        .module('admin.countriesManage')
        .factory('adminCountriesManageService', adminCountriesManageService);

    adminCountriesManageService.$inject = ['$resource', 'EVN'];

    /* @ngInject */
    function adminCountriesManageService($resource, EVN) {
        return $resource(EVN.server + '/rest/:action',
            {},
            {

                // 查询国家管理
                getCountriesManageList: {
                    method: 'GET',
                    params: {
                        action: 'getCountries' + EVN.suffix
                    }
                },

                // 添加国家管理
                saveCountriesManageInfo: {
                    method: 'POST',
                    params: {
                        action: 'postCountries' + EVN.suffix
                    }
                },

                // 修改国家管理
                updateCountriesManageInfo: {
                    method: 'PATCH',
                    params: {
                        action: 'patchCountries' + EVN.suffix
                    }
                },

                // 删除国家管理
                deleteCountriesManageInfoById: {
                    method: 'DELETE',
                    params: {
                        action: 'deleteCountries' + EVN.suffix
                    }
                },

            }
        );
    }

})(angular);

