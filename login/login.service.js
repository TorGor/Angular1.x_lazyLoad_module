(function (angular) {


    angular
        .module('login')
        .factory('loginService', loginService);

    loginService.$inject = ['$resource', 'EVN'];

    /* @ngInject */
    function loginService($resource, EVN) {
        return $resource(EVN.server + '/login/:action',
            {},
            {
                // 登录
                userLogin: {
                    method: 'POST',
                    params: {
                        action: 'userLogin' + EVN.suffix
                    }
                },

            }
        );
    }

})(angular);

