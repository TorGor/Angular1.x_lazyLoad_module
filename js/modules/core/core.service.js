(function (angular) {
    

    angular
        .module('app.core')
        .factory('userSelfService', userSelfService);

    userSelfService.$inject = ['$resource', 'EVN'];

    /* @ngInject */
    function userSelfService($resource, EVN) {
        return $resource(EVN.server + '/user/:action',
            {},
            {
                // 获取用户自己的信息
                getUserSelfInfo: {
                    method: 'GET',
                    params: {
                        action: 'getUserInfo' + EVN.suffix
                    }
                },
                // 用户登出
                getUserLogout: {
                    method: 'GET',
                    params: {
                        action: 'logout' + EVN.suffix
                    }
                },

            }
        );
    }

})(angular);

