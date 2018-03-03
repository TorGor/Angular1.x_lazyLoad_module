(function (angular) {
    

    angular
        .module('admin.userLevel')
        .factory('adminUserLevelService', adminUserLevelService);

    adminUserLevelService.$inject = ['$resource', 'EVN'];

    /* @ngInject */
    function adminUserLevelService($resource, EVN) {
        return $resource(EVN.server + '/rest/:action',
            {},
            {

                // 查询用户等级
                getUserLevelList: {
                    method: 'GET',
                    params: {
                        action: 'userLevel' + EVN.suffix
                    }
                },

                // 添加用户等级
                saveUserLevelInfo: {
                    method: 'POST',
                    params: {
                        action: '' + EVN.suffix
                    }
                },

                // 修改用户等级
                updateUserLevelInfo: {
                    method: 'PUT',
                    params: {
                        action: '' + EVN.suffix
                    }
                },

                // 删除用户等级
                deleteUserLevelInfo: {
                    method: 'GET',
                    params: {
                        action: '' + EVN.suffix
                    }
                },

            }
        );
    }

})(angular);

