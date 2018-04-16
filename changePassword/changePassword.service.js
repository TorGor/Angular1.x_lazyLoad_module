(function (angular) {


    angular
        .module('changePassword')
        .factory('changePasswordService', changePasswordService);

    changePasswordService.$inject = ['$resource', 'EVN'];

    /* @ngInject */
    function changePasswordService($resource, EVN) {
        return $resource(EVN.server + '/admin/:action',
            {},
            {
                // 检验密码
                postVerificationPassWord: {
                    method: 'POST',
                    params: {
                        action: 'VerificationPassWord' + EVN.suffix
                    }
                },
                // 更新密码
                postUpdatePassWord: {
                    method: 'POST',
                    params: {
                        action: 'updateUserPassWord' + EVN.suffix
                    }
                },

            }
        );
    }

})(angular);

