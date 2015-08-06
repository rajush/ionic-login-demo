/*eslint-disable */

// angular.module is a global place for creating, registering and retrieving Angular modules
// "starter" is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of "requires"
// "starter.controllers" is found in controllers.js
(function() {

    "use strict";

    angular
        .module("starter", ["ionic", "Authentication", "starter.controllers"])
        .config(config)
        .run(run);

    config.$inject = ["$stateProvider", "$urlRouterProvider"];
    run.$inject = ["$rootScope", "$ionicPlatform", "$cookieStore", "$location", "$http", "$state", "AccessHandlerService"];

    function run($rootScope, $ionicPlatform, $cookieStore, $location, $http, $state, AccessHandlerService) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            console.log("Platform ready");
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

        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            // redirect to login page if not logged in
            if (toState.name !== "login" && !$rootScope.globals.currentUser) {
                console.info("User not logged in");
                event.preventDefault();
                $state.go("login");
            }
            // anywhere other than login and is logged in
            if (toState.name != "login" && $rootScope.globals.currentUser) {
                console.log(toState.url);
                // user role access control
                var currentUser = $rootScope.globals.currentUser;
                var isValidRole = AccessHandlerService.validateAccess(event, toState, currentUser);
                console.log(currentUser.userRole, isValidRole);

                if (fromState.name === "" && isValidRole === false) {
                    console.log("Frorm", fromState);
                    $state.go("login");
                }
            }
        });

    }

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state("login", {
            url: "/login",
            templateUrl: "app/authentication/main.html",
            controller: "LoginController as vm"
        })

        .state("app", {
            url: "/app",
            abstract: true,
            templateUrl: "app/templates/menu.html",
            controller: "MenuController as vm"
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
                    roles: [1, 2]
                }
            })
            .state("app.userlists", {
                url: "/userlists",
                views: {
                    "menuContent": {
                        templateUrl: "app/templates/userlists.html",
                        controller: "UserlistsController"
                    }
                },
                data: {
                    roles: [1]
                }
            })

        .state("app.single", {
            url: "/userlists/:userlistId",
            views: {
                "menuContent": {
                    templateUrl: "app/templates/playlist.html",
                    controller: "PlaylistController"
                }
            },
            data: {
                roles: [1]
            }
        });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise("login");
    }
})();
