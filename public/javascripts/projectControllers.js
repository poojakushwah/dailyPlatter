app.controller('ProjectCtrl', ['$scope','$stateParams','dataFactory', function($scope, $stateParams, dataFactory){
	$scope.projects = dataFactory.projects;
	$scope.accounts = dataFactory.accounts
	// $scope.test = $state;
}]);

app.controller('AddProjectCtrl', ['$scope','$stateParams','dataFactory', '$state', function($scope, $stateParams, dataFactory, $state){
	$scope.projects = dataFactory.projects;
	$scope.accounts = dataFactory.accounts;
	$scope.startdate = new Date();
	$scope.enddate = new Date();
	$scope.message = {"type": 0, "text": ""};
	// console.log($scope.accounts)
	// console.log($stateParams.id)
	$scope.add = function() {
		// $scope.projects.push({"projectid": $scope.projectId, "projectname" : $scope.name, "account" : $scope.account})
		// console.log($scope.account._id);
		dataFactory.createProject({
			"projectid": $scope.projectId, 
			"projectname" : $scope.name, 
			"account" : $scope.account._id,
			"startdate" : $scope.startdate,
			"enddate" : $scope.enddate,
			"billablehours" : $scope.billableHour,
			"amount" : $scope.billableAmount,
			"invoiced" : $scope.invoiced,
			"status" : 0

		}).success(function(data){
			$state.go('project');
			console.log("data saved!!");
			$scope.message = {"type": 1, "text": "Project created successfully!"}	
		}).error(function(err){
			console.log("show error message---", err);
			$scope.message = {"type": -1, "text": err.error}
		})
		
		// $scope.projectId = "";
		// $scope.name = "";
		// $scope.account = "";
	}
}])

app.controller('UpdateProjectCtrl', ['$scope','$stateParams','dataFactory', '$state', '$filter', function($scope, $stateParams, dataFactory, $state, $filter){
	$scope.projects = dataFactory.projects;
	$scope.accounts = dataFactory.accounts
	// console.log($scope.projects);
	// var found = $filter('getByProperty')('name', 'Others', $scope.accounts);
	// console.log(found)
	var prj = dataFactory.getProjectbyID($stateParams.id);
	prj.then(function(data){
		$scope.currProject = data;
		$scope.resetPage();
		// $scope.projectId = $scope.currProject.projectid;
		// $scope.name = $scope.currProject.projectname;
		// console.log($scope.currProject.account);
		
		// $scope.accounts[1];
	
	});
	var projectTask = dataFactory.getTasksByProject($stateParams.id);
	projectTask.then(function(data){
		// console.log(data);
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
		// $scope.account = $scope.currProject.account;
		$scope.account = $filter('getByProperty')('_id', $scope.currProject.account._id, $scope.accounts)
	};
}]);