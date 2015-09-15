Polls.controller("pollController", function($scope, $routeParams, $http, auth, $route) {
	if($routeParams.id) {
		$scope.poll_id = $routeParams.id;
		$http.get('/api/poll/'+$routeParams.id)
		.success(function(data) {
			$scope.polls = [data];
			for(i = 0; i < $scope.polls.length; i++) {
				$scope.polls[i].del = false;
				if($scope.polls[i].author === auth.currentUser()) {
					$scope.polls[i].del = true;
				}
				$scope.polls[i].options = [];
				get_opts(i);
			}
		})
		.error(function(data) {
			console.log('Error: ' + data);
		})
	} else {
		console.log("yo");
		$http.get('/api/polls')
		.success(function(data) {
			$scope.polls = data;
			for(i = 0; i < $scope.polls.length; i++) {
				$scope.polls[i].del = false;
				if($scope.polls[i].author === auth.currentUser()) {
					$scope.polls[i].del = true;
				}
				$scope.polls[i].options = [];
				get_opts(i);
			}
		})
		.error(function(data) {
			console.log('Error: ' + data);
		})
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

	$scope.delete = function(poll) {
		$http.delete('/api/polls/delete/' + poll["_id"], {headers: {Authorization: 'Bearer '+auth.getToken()}})
				.success(function() {
					$scope.polls.splice($scope.polls.indexOf(poll),1);
				})
				.error(function(data) {
					console.log("Error: "+data);
				});
	};

	$scope.thumbsUp = function(opt, poll) {
		opt.votes += 1;
		poll.data[poll.options[0].indexOf(opt)] += 1;
		$http.post('/api/polls/options/upVote', opt)
			.error(function(data) {
				console.log("Error: " + data);
			});
	}
});