/*eslint-disable */

angular
    .module("starter.controllers", [])
    .controller("MenuController", MenuController)
    .controller("UserlistsController", UserlistsController)
    .controller("PlaylistController", PlaylistController);

MenuController.$inject = ["$rootScope", "$scope", "$ionicModal", "$timeout", "$ionicHistory"];
UserlistsController.$inject = ["$scope"];
PlaylistController.$inject = ["$scope", "$stateParams"];

function MenuController($rootScope, $scope, $ionicModal, $timeout, $ionicHistory) {

    var vm = this;

    vm.user = $rootScope.globals.currentUser.username;
    console.log($rootScope.globals);

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on("$ionicView.enter", function(e) {
    //});
    $scope.$on("$ionicView.afterLeave", function(e) {
        //clearing the cache before leaving the view to re-run controller every time you enter back again:
        $ionicHistory.clearCache();
    });

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
    toastr.success('Loaded MenuController');

}

function UserlistsController($scope) {
    $scope.userlists = [{
        name: "Batman",
        id: 1
    }, {
        name: "Superman",
        id: 2
    }, {
        name: "Spiderman",
        id: 3
    }, {
        name: "Ironman",
        id: 4
    }, {
        name: "Captain America",
        id: 5
    }, {
        name: "Hulk",
        id: 6
    }];
}

function PlaylistController($scope, $stateParams) {};
