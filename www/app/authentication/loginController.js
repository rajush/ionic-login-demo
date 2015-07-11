/*eslint-disable */
(function() {

    "use strict";

    angular
        .module("Authentication")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["$scope", "$state", "$ionicModal", "$stateParams", "$log", "AuthenticationService"];

    function LoginController($scope, $state, $ionicModal, $stateParams, $log, AuthenticationService) {
        //     // With the new view caching in Ionic, Controllers are only called
        //     // when they are recreated or on app start, instead of every page change.
        //     // To listen for when this page is active (for example, to refresh data),
        //     // listen for the $ionicView.enter event:
        //     //$scope.$on("$ionicView.enter", function(e) {
        //     //});

        var vm = this;
        vm.login = login;

        $scope.$on("$ionicView.enter", function(e) {
            // loading asynchronous modal. Using promise and then calling it
            $ionicModal.fromTemplateUrl("app/authentication/login.html", {
                scope: $scope,
                animation: "slide-in-up",
                backdropClickToClose: false,
                hardwareBackButtonClose: true,
                focusFirstInput: true
            }).then(function(modal) {
                $scope.modal = modal;
                $scope.modal.show();

                // Reset login status
                AuthenticationService.clearCredentials();
            });
        });

        //Cleanup the modal when we"re done with it!
        $scope.$on("$destroy", function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on("modal.hidden", function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on("modal.removed", function() {
            // Execute action
        });

        /* ========================================================================================================== */

        function login() {
            vm.loading = true;
            return AuthenticationService.login(vm.username, vm.password, function(callback) {
                // On successful login
                if (callback.success) {
                    var userData = callback.success;
                    console.log(userData);
                    AuthenticationService.setCredentials(vm.username, vm.password, userData);
                    $scope.modal.hide();
                    $state.go("app.home");
                    vm.username = undefined;
                    vm.password = undefined;
                    vm.loading = false;
                } else {
                    vm.loading = false;
                }
            });
        }
    }

})();
