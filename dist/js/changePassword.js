(function() {

    angular
        .module('changePassword', []);
})();
/** =========================================================
 * Module: access-login.js
 * Demo for login api
 ========================================================= */

(function () {

    angular
        .module('changePassword')
        .controller('ChangePasswordFormController', ChangePasswordFormController);

    ChangePasswordFormController.$inject = ['$scope', 'changePasswordService', '$state'];

    function ChangePasswordFormController($scope, changePasswordService, $state) {
        $scope.account = {
            oldPassword: '',
            password0: '',
            password1: '',
        };
        $scope.oldPasswordMsg = '';
        $scope.updatePasswordMsg = '';

        $scope.changePassword = function () {

            $scope.oldPasswordMsg = '';
            $scope.updatePasswordMsg = '';

            changePasswordService.postVerificationPassWord({}, {password: $scope.account.oldPassword}, function (data) {
                if (data.success) {
                    changePasswordService.postUpdatePassWord({}, {password: $scope.account.password0}, function (data) {
                        if (data.success) {
                            // window.location.href = '/login.html';
                        } else {
                            $scope.updatePasswordMsg = data.msg || '';
                        }
                    });
                } else {
                    $scope.oldPasswordMsg = data.msg || '';
                }
            });

        };
    }
})();

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

