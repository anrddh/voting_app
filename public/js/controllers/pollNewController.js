Polls.controller("pollNewController", function($scope, $http) {
	$scope.options = [{fname: "Coke", id: "1", text: ""}, {fname: "Pepsi", id: "2", text: ""}];
	$scope.formTitle = {  };

	$scope.addOption = function() {
		var lastElement= $scope.options.length+1;
		$scope.options.push({
			fname: "Option " + lastElement,
			id: lastElement,
			text: ""
		});
	};

	$scope.remOption = function() {
		$scope.options.splice(-1,1);
	};

	$scope.processForm = function() {
		$http.post("/api/polls", $scope.formTitle)
			.success(function(data) {
				$scope.formTitle = {};
				$scope.options = [{fname: "Coke", id: "1", text: ""}, {fname: "Pepsi", id: "2", text: ""}];
				console.log(data);
			})
			.error(function(data) {
				console.log("Error: " + data);
			});

		$http.post("/api/polls/options")
			.success(function(data) {

			})
			.error(function(data) {
				console.log("Error: " + data);
			});
	};
});