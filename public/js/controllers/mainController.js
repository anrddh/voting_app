Polls.controller("mainController", function($scope, $http, auth, $location) {
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logOut = auth.logOut;

    if(!$scope.isLoggedIn()) {
        $location.path('/polls');
    }

    var get_opts= function(i) {
        $http.get('/api/polls/options/' + $scope.polls[i]["_id"])
            .success(function(data_o) {
                $scope.polls[i].options.push(data_o);
            })
            .error(function(data_o) {
                console.log('Error: ' + data_O);
            });
    };

    $http.get('/api/polls/' + $scope.currentUser())
        .success(function(data) {
            $scope.polls = data;
            for(i = 0; i < $scope.polls.length; i++) {
                $scope.polls[i].options = [];
                get_opts(i);
            }
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
});