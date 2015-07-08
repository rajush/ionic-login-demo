/*eslint-disable */


// angular.module is a global place for creating, registering and retrieving Angular modules
// "starter" is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of "requires"
// "starter.controllers" is found in controllers.js
angular
    .module("starter", ["ionic", "starter.controllers", "Authentication"])
    .config(config)
    .run(run);

run.$inject = ["$rootScope", "$ionicPlatform", "$cookieStore", "$location", "$http", "$state"];

function run($rootScope, $ionicPlatform, $cookieStore, $location, $http, $state) {
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

    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get("globals") || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common["Authentication"] = "Basic" + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on("locationChangeStart", function(event, next, current) {
        // redirect to login page if not logged in
        if ($location.path() !== "/login" && !$rootScope.globals.currentUser) {
            $location.path("/login");
        }
    });

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
        // anywhere other than login and is logged in
        if (toState.name != "login" && $rootScope.globals.currentUser) {
            console.log(toState.url);
            // user role access control
            if (toState.url === "/") {
                event.preventDefault();
            }
        }
    })
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
