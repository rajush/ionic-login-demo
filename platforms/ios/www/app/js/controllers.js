/*eslint-disable */

angular
    .module("starter.controllers", [])
    .controller("MenuController", MenuController)
    .controller("PlaylistsController", PlaylistsController)
    .controller("PlaylistController", PlaylistController);

// MenuController.$inject = ["$scope", "$ionicModal", "$timeout", "$ionicHistory"];
// PlaylistsController.$inject = ["$scope"];
// PlaylistController.$inject = ["$scope", "$stateParams"];

function MenuController($scope, $ionicModal, $timeout, $ionicHistory) {

    var vm = this;
    vm.user = "user";

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


}

function PlaylistsController($scope) {
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
}

function PlaylistController($scope, $stateParams) {};
