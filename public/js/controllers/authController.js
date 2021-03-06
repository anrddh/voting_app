Polls.controller("authController", ['$scope', 'auth', '$location', function($scope, auth, $location) {
    $scope.user = {};

    if(auth.isLoggedIn()) {
        $location.path('/');
    }

    $scope.register = function() {
        console.log(auth);
        auth.register($scope.user).error(function(err) {
            $scope.error = err;
        });
    };

    $scope.logIn = function() {
        auth.logIn($scope.user).error(function(err) {
            $scope.error = err;
        });
    };
}]);