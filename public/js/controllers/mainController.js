Polls.controller("mainController", function($scope, $http, auth, $location) {
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logOut = auth.logOut;

    if(!$scope.isLoggedIn()) {
        $location.path('/polls');
    }

    $scope.thumbsUp = function(opt, poll) {
        console.log(opt["_id"]);
        opt.votes += 1;
        poll.data[poll.options[0].indexOf(opt)] += 1;
        console.log(opt);
        $http.post('/api/polls/options/upVote', opt)
            .error(function(data) {
                console.log("Error: " + data);
            });
    }

    var get_opts= function(i) {
        $http.get('/api/polls/options/' + $scope.polls[i]["_id"])
            .success(function(data_o) {
                $scope.polls[i].options.push(data_o);
                var opt_arr = [];
                var opt_vot_arr = [];
                for(x=0; x<data_o.length;x++) {
                    opt_arr.push(data_o[x].option);
                    opt_vot_arr.push(data_o[x].votes);
                }
                $scope.polls[i].data = opt_vot_arr;
                $scope.polls[i].labels = opt_arr;
            })
            .error(function(data_o) {
                console.log('Error: ' + data_O);
            });
    }

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

    $scope.delete = function(poll) {
        $http.delete('/api/polls/delete/' + poll["_id"], {headers: {Authorization: 'Bearer '+auth.getToken()}})
                .success(function() {
                    $scope.polls.splice($scope.polls.indexOf(poll),1);
                })
                .error(function(data) {
                    console.log("Error: "+data);
                });
    };
});