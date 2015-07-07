angular.module("starter.controllers", [])

.controller("AppCtrl", function($scope, $state, $ionicModal, $timeout, $ionicHistory) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    $scope.$on("$ionicView.afterLeave", function(e) {
        //clearing the cache before leaving the view to re-run controller every time you enter back again:
        $ionicHistory.clearCache();
    });


    // function Toast(type, css, msg) {
    //     this.type = type;
    //     this.css = css;
    //     this.msg = 'This is positioned in the ' + msg + '. You can also style the icon any way you like.';
    // }
    //
    // var toasts = [
    //     new Toast('error', 'toast-bottom-full-width', 'This is positioned in the bottom full width. You can also style the icon any way you like.'),
    //     new Toast('info', 'toast-top-full-width', 'top full width'),
    //     new Toast('warning', 'toast-top-left', 'This is positioned in the top left. You can also style the icon any way you like.'),
    //     new Toast('success', 'toast-top-right', 'top right'),
    //     new Toast('warning', 'toast-bottom-right', 'bottom right'),
    //     new Toast('error', 'toast-bottom-left', 'bottom left')
    // ];
    //
    // var i = 0;
    //
    // delayToasts();
    //
    // function delayToasts() {
    //     if (i === toasts.length) {
    //         return;
    //     }
    //     var delay = i === 0 ? 0 : 2100;
    //     console.log("delay:", delay);
    //     window.setTimeout(function() {
    //         showToast();
    //     }, delay);
    //
    // }
    //
    // function showToast() {
    //     var t = toasts[i];
    //     toastr.options.positionClass = t.css;
    //     toastr[t.type](t.msg);
    //     i++;
    //     console.log(i);
    //     delayToasts();
    // }

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    // Display a success toast, with a title
    toastr.success('Loaded AppCtrl');

    $scope.logout = function() {
        $state.go("login");
    };

    // // Form data for the login modal
    // $scope.loginData = {};
    //
    // // Create the login modal that we will use later
    // $ionicModal.fromTemplateUrl("templates/login.html", {
    //     scope: $scope
    // }).then(function(modal) {
    //     $scope.modal = modal;
    // });
    //
    // // Triggered in the login modal to close it
    // $scope.closeLogin = function() {
    //     $scope.modal.hide();
    // };
    //
    // // Open the login modal
    // $scope.login = function() {
    //     $scope.modal.show();
    // };
    //
    //
    // // Perform the login action when the user submits the login form
    // $scope.doLogin = function() {
    //     console.log("Doing login", $scope.loginData);
    //
    //     // Simulate a login delay. Remove this and replace with your login
    //     // code if using a login system
    //     $timeout(function() {
    //         $scope.closeLogin();
    //     }, 1000);
    // };
})

.controller("PlaylistsCtrl", function($scope) {
    $scope.playlists = [{
        title: "Reggae",
        id: 1
    }, {
        title: "Chill",
        id: 2
    }, {
        title: "Dubstep",
        id: 3
    }, {
        title: "Indie",
        id: 4
    }, {
        title: "Rap",
        id: 5
    }, {
        title: "Cowbell",
        id: 6
    }];
})

.controller("PlaylistCtrl", function($scope, $stateParams) {});
