/*eslint-disable */
(function() {

    "use strict";

    angular
        .module("Authentication", ["ngCookies"])
        .factory("AuthenticationService", AuthenticationService)
        .factory("Base64", Base64);

    //AuthenticationService.$inject = ["Base64", "$http", "$cookieStore", "$rootScope", "$state", "$log", "$timeout"];

    function AuthenticationService(Base64, $http, $cookieStore, $rootScope, $state, $log, $timeout) {
        var service = {
            login: login,
            setCredentials: setCredentials,
            clearCredentials: clearCredentials
        }

        return service;

        /* ========================================================================================================== */

        function login(username, password, callback) {
            var response = {};

            if (angular.isUndefined(username) && angular.isUndefined(password) || (username === "" || password === "")) {
                toastr.options.positionClass = "toast-bottom-right";
                toastr.warning('Username and password are requied.');
                callback(response);
            } else {
                /* Dummy authentication for testing, uses $timeout to simulate api call
                 ----------------------------------------------*/
                $timeout(function() {
                    var req = {
                        method: "GET",
                        url: "app/authentication/data/users.json" // Dummy user list to authenticate the user credentials
                    };

                    $http(req)
                        .success(function(data) {
                            var totalUsers = data.users.length;
                            for (var i = 0; i < totalUsers; i++) {
                                if (angular.equals(data.users[i].username, username) && angular.equals(data.users[i].password, password)) {
                                    var authorizedUser = data.users[i];

                                    // Send success callback if authorized user
                                    response.success = authorizedUser;
                                    toastr.options.positionClass = "toast-bottom-right";
                                    toastr.success("Successfully logged in.");
                                    break;
                                }
                            }
                            if (!authorizedUser) {
                                toastr.options.positionClass = "toast-middle-center";
                                toastr.error('Invalid username or password.');
                            }

                            callback(response);
                        })
                        .error(function(data, status) {
                            console.log(data, status);
                            response.message = "Error authenticating user. " + "HTTP Status: " + status;
                            toastr.options.positionClass = "toast-middle-center";
                            toastr.error(response.message);

                            callback(response);
                        });
                }, 2000);
            }
        }

        function setCredentials(username, password, userData) {
            var authdata = Base64.encode(username + ':' + password);
            var userpassword = Base64.encode(password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    userpassword: userpassword,
                    userRole: userData.role,
                    roleId: userData.roleId
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }

        function clearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove("globals");
        }

    }

    function Base64() {
        /* jshint ignore:start */

        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        return {
            encode: function(input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
            },

            decode: function(input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    window.alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";

                } while (i < input.length);

                return output;
            }
        };

        /* jshint ignore:end */
    }

})();
