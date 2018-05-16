/** =========================================================
 * Module: access-login.js
 * Demo for login api
 ========================================================= */

(function () {

    angular
        .module('login')
        .controller('LoginFormController', LoginFormController);

    LoginFormController.$inject = ['$scope', 'loginService', '$state', '$timeout'];

    function LoginFormController($scope, loginService, $state, $timeout) {
        // bind here all data from the form
        $scope.account = {
            username: '',
            password: '',
            isSuper: 0
        };
        // place the message if something goes wrong
        $scope.authMsg = '';

        $scope.login = function () {
            $scope.authMsg = '';
            if ($scope.loginForm.$valid) {
                loginService.userLogin({}, {
                    username: $scope.account.username,
                    password: $scope.account.password,
                    isSuper: $scope.account.isSuper
                }, function (response) {
                    console.log(response, 'response');
                    if (response.success && response.data == 'true') {
                        if ($scope.account.isSuper == '1') {
                            window.location.href = '/superAdmin.html';
                        } else {
                            window.location.href = '/admin.html';
                        }
                    } else {
                        $scope.authMsg = response.msg;
                    }
                }, function () {
                    $scope.authMsg = 'Server Request Error';
                });
            }
            else {
                // set as dirty if the user click directly to login so we show the validation messages
                /* jshint -W106 */
                $scope.loginForm.account_email.$dirty = true;
                $scope.loginForm.account_password.$dirty = true;
            }
        };
    }
})();
