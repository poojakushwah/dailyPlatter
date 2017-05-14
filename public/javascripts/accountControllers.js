app.controller('AccountCtrl', ['$scope','$stateParams','dataFactory', function($scope, $stateParams, dataFactory){
	// $scope.projects = dataFactory.projects;
	$scope.accounts = dataFactory.accounts
	console.log($scope.accounts);
}]);

app.controller('AddAccountCtrl', ['$scope','$stateParams','dataFactory', '$state', function($scope, $stateParams, dataFactory, $state){
	// $scope.projects = dataFactory.projects;
	// $scope.accounts = dataFactory.accounts;
	// $scope.startdate = new Date();
	// $scope.enddate = new Date();
	$scope.message = {"type": 0, "text": ""};
	
	$scope.add = function() {
		
		dataFactory.createAccount({
			"accountname" : $scope.name, 
			"status" : 0

		}).success(function(data){
			$state.go('account');
			console.log("data saved!!");
			$scope.message = {"type": 1, "text": "Account created successfully!"}	
		}).error(function(err){
			console.log("show error message---", err);
			$scope.message = {"type": -1, "text": err.error}
		})
		
		
	}
}])

app.controller('UpdateAccountCtrl', ['$scope','$stateParams','dataFactory', '$state', '$filter', function($scope, $stateParams, dataFactory, $state, $filter){
	$scope.projects = dataFactory.projects;
	$scope.accounts = dataFactory.accounts
	
	var prj = dataFactory.getProjectbyID($stateParams.id);
	prj.then(function(data){
		$scope.currProject = data;
		$scope.resetPage();
	
	});
	var projectTask = dataFactory.getTasksByProject($stateParams.id);
	projectTask.then(function(data){
		$scope.projectTask = data;
	});
	
	$scope.update = function() {
		dataFactory.updateProject($stateParams.id, {
			"projectid": $scope.projectId, 
			"projectname" : $scope.name, 
			"account" : $scope.account._id,
			"startdate" : $scope.startdate,
			"enddate" : $scope.enddate,
			"billablehours" : $scope.billableHour,
			"amount" : $scope.billableAmount,
			"invoiced" : $scope.invoiced,
			"status" : $scope.status
		});
		$state.go('project');
	}
	$scope.resetPage = function(){
		$scope.projectId = $scope.currProject.projectid;
		$scope.name = $scope.currProject.projectname;
		$scope.startdate = new Date($scope.currProject.startdate);
		$scope.enddate = new Date($scope.currProject.enddate);
		$scope.billableHour = $scope.currProject.billablehours;
		$scope.billableAmount = $scope.currProject.amount;
		$scope.invoiced = $scope.currProject.invoiced;
		$scope.status = $scope.currProject.status;
		$scope.id = $scope.currProject._id;
		$scope.account = $filter('getByProperty')('_id', $scope.currProject.account._id, $scope.accounts)
	};
}]);