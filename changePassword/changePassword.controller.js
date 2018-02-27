/** =========================================================
 * Module: access-login.js
 * Demo for login api
 ========================================================= */

(function() {

    angular
        .module('changePassword')
        .controller('ChangePasswordFormController', ChangePasswordFormController);

    ChangePasswordFormController.$inject = ['$scope', '$http', '$state'];
    function ChangePasswordFormController($scope, $http, $state) {
        // bind here all data from the form
        $scope.account = {};
        // place the message if something goes wrong
        $scope.authMsg = '';

        $scope.changePassword = function() {
            $scope.authMsg = '';

            if ($scope.changePassword.$valid) {

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
                $scope.changePassword.account_email.$dirty = true;
                $scope.changePassword.account_password.$dirty = true;
            }
        };
    }
})();
