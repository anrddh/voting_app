Polls.controller("authController", ['$scope', 'auth', function($scope, auth) {
    $scope.user = {};

    $scope.register = function() {
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