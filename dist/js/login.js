(function() {

    angular
        .module('login', []);
})();
/** =========================================================
 * Module: access-login.js
 * Demo for login api
 ========================================================= */

(function() {

    angular
        .module('login')
        .controller('LoginFormController', LoginFormController);

    LoginFormController.$inject = ['$scope', '$http', '$state'];
    function LoginFormController($scope, $http, $state) {
        // bind here all data from the form
        $scope.account = {};
        // place the message if something goes wrong
        $scope.authMsg = '';

        $scope.login = function() {
            $scope.authMsg = '';

            if ($scope.loginForm.$valid) {

                $http
                    .post('api/account/login', { email: $scope.account.email, password: $scope.account.password })
                    .then(function(response) {
                        // assumes if ok, response is an object with some data, if not, a string with error
                        // customize according to your api
                        if (!response.account) {
                            $scope.authMsg = 'Incorrect credentials.';
                        } else {
                            $state.go('app.dashboard');
                        }
                    }, function() {
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
