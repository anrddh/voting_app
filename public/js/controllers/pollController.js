Polls.controller("pollController", function($scope, $http) {
	var get_opts= function(i) {
		$http.get('/api/polls/options/' + $scope.polls[i]["_id"])
			.success(function(data_o) {
				$scope.polls[i].options.push(data_o);
			})
			.error(function(data_o) {
				console.log('Error: ' + data_O);
			});
	}

	$http.get('/api/polls')
		.success(function(data) {
			$scope.polls = data;
			for(i = 0; i < $scope.polls.length; i++) {
				$scope.polls[i].options = [];
				get_opts(i);
			}
			console.log($scope.polls);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		})

	$scope.thumbsUp = function(opt) {
		console.log(opt["_id"]);
		opt.votes += 1;
		console.log(opt);
		$http.post('/api/polls/options/upVote', opt)
			.success(function(data) {
				console.log(data);
			})
			.error(function(data) {
				console.log("Error: " + data);
			});
	}
});