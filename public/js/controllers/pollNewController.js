Polls.controller("pollNewController", function($scope, $http) {
	$scope.options = [{fname: "Coke", text: "", votes:0}, {fname: "Pepsi", text: "", votes:0}];
	$scope.formTitle = {  };
	$scope.showSuc = false;

	$scope.addOption = function() {
		var lastElement= $scope.options.length+1;
		$scope.options.push({
			fname: "Option " + lastElement,
			text: "",
			votes: 0
		});
	};

	$scope.remOption = function() {
		$scope.options.splice(-1,1);
	};

	$scope.processForm = function() {
		$http.post("/api/polls", $scope.formTitle)
			.success(function(data) {
				$scope.formTitle = {};
				for(i = 0; i < $scope.options.length; i++) {
					$scope.options[i].id = data["_id"];
					$http.post("/api/polls/options", $scope.options[i])
						.success(function(data_o) {
							$scope.options = [{fname: "Coke", text: "", votes:0}, {fname: "Pepsi", text: "", votes:0}];
							console.log(data_o);
						})
						.error(function(data_o) {
							console.log("Error: " + data_o);
						});
				}
				$scope.showSuc = true;
			})
			.error(function(data) {
				console.log("Error: " + data);
			});
	};
});