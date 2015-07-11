(function() {

    "use strict";

    angular
        .module("Authentication")
        .factory("AccessHandlerService", AccessHandlerService);

    function AccessHandlerService() {
        var service = {
            validateAccess: validateAccess
        }

        return service;

        function validateAccess(event, toState, currentUser) {
            console.log(toState);
            var isValidRole,
                currentUserRole = currentUser.roleId,
                authorizedRoles = toState.data.roles,
                totalAuthorizedRoles = toState.data.roles.length;

            // check the validity of the current role within the list of allowed roles for the view
            for (var i = 0; i < totalAuthorizedRoles; i++) {

                if (currentUserRole === authorizedRoles[i]) {
                    isValidRole = true;
                    break;
                }
            }

            // restrict route change
            if (!isValidRole) {
                event.preventDefault();
                isValidRole = false;
                toastr.warning('You do not have access to the page.');
            }
            return isValidRole;
        }
    }

})();
