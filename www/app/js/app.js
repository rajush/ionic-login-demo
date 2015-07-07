/*eslint-disable */


// angular.module is a global place for creating, registering and retrieving Angular modules
// "starter" is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of "requires"
// "starter.controllers" is found in controllers.js
angular
    .module("starter", ["ionic", "starter.controllers", "Authentication"])
    .config(config)
    .run(run);

function run($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
}

function config($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state("login", {
        url: "/login",
        controller: "LoginController as vm"
    })

    .state("app", {
        url: "/app",
        abstract: true,
        templateUrl: "app/templates/menu.html",
        controller: "AppCtrl"
    })

    .state("app.home", {
        url: "/home",
        views: {
            "menuContent": {
                templateUrl: "app/templates/home.html"
            }
        },
        data: {
            roles: [1, 2, 3]
        }
    })

    .state("app.dashboard", {
        url: "/dashboard",
        views: {
            "menuContent": {
                templateUrl: "app/templates/dashboard.html"
            }
        },
        data: {
            roles: [1, 2, 3]
        }
    })

    .state("app.playlists", {
        url: "/playlists",
        views: {
            "menuContent": {
                templateUrl: "app/templates/playlists.html",
                controller: "PlaylistsCtrl"
            }
        },
        data: {
            roles: [1]
        }
    })

    .state("app.single", {
        url: "/playlists/:playlistId",
        views: {
            "menuContent": {
                templateUrl: "app/templates/playlist.html",
                controller: "PlaylistCtrl"
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise("login");
}
