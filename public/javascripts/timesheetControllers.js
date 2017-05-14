app.controller('TimesheetCtrl', ['$scope','$stateParams','dataFactory', '$location', function($scope, $stateParams, dataFactory, $location){
	$scope.timesheets = dataFactory.timesheets;
	$scope.tasks = dataFactory.tasks;
	$scope.users = dataFactory.users;

	if($stateParams.id){
		for(var i=0; i<$scope.users.length; i++){
			if($scope.users[i]._id == $stateParams.id){
				$scope.user = $scope.users[i]
			}
		}
	}
	// console.log($scope.timesheets);

	
}]);

app.controller('AddTimesheetCtrl', ['$scope','$stateParams','dataFactory', '$state', function($scope, $stateParams, dataFactory, $state){
	$scope.timesheets = dataFactory.timesheets;
	$scope.tasks = dataFactory.tasks;
	console.log($scope.tasks);
	$scope.users = dataFactory.users;

	$scope.add = function() {
		// console.log($scope.user);
		// console.log($scope.task);
		// console.log($scope.effortdate);
		// console.log($scope.effort);

		dataFactory.createTimesheet({
			"user": $scope.user._id, 
			"task" : $scope.task._id, 
			"date" : $scope.effortdate,
			"effort" : $scope.effort,
			"status" : 0

		}).success(function(data){
			$state.go('timesheet');
			console.log("data saved!!");
			$scope.message = {"type": 1, "text": "Project created successfully!"}	
		}).error(function(err){
			console.log("show error message---", err);
			$scope.message = {"type": -1, "text": err.error}
		})

	}
	
}]);

app.controller('AddTimesheetUserCtrl', ['$scope','$stateParams','dataFactory', '$state', '$filter', function($scope, $stateParams, dataFactory, $state, $filter){
	$scope.timesheets = dataFactory.timesheets;
	$scope.tasks = dataFactory.tasks;
	$scope.users = dataFactory.users;
	
	if($stateParams.id){
		for(var i=0; i<$scope.users.length; i++){
			if($scope.users[i]._id == $stateParams.id){
				$scope.user = $scope.users[i]
			}
		}
	}
	
	$scope.add = function() {
		console.log($scope.user);
		console.log($scope.task);
		console.log($scope.effortdate);
		console.log($scope.effort);

		dataFactory.createTimesheet({
			"user": $scope.user._id, 
			"task" : $scope.task._id, 
			"date" : $scope.effortdate,
			"effort" : $scope.effort,
			"status" : 0

		}).success(function(data){
			$state.go('timesheet');
			console.log("data saved!!");
			$scope.message = {"type": 1, "text": "Project created successfully!"}	
		}).error(function(err){
			console.log("show error message---", err);
			$scope.message = {"type": -1, "text": err.error}
		})

	}
	
}]);


