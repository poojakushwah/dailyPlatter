app.controller('TaskCtrl', ['$scope','$stateParams','dataFactory', function($scope, $stateParams, dataFactory){
	$scope.tasks = dataFactory.tasks;
	console.log($scope.tasks);
	// $scope.test = $state;
}]);

app.controller('AddTaskCtrl', ['$scope','$stateParams','dataFactory', '$state', '$filter', function($scope, $stateParams, dataFactory, $state, $filter){
	$scope.projects = dataFactory.projects;
	$scope.accounts = dataFactory.accounts;
	$scope.taskType = "new";
	$scope.assignDate = new Date();//$filter('date')(new Date(), "dd/MM/yyyy")//new Date();
	$scope.dueDate = new Date();
	$scope.status = "inqueue";
	
	if($stateParams.id){
		$scope.project = $filter('getByProperty')('_id', $stateParams.id, $scope.projects);	
	}
	
	$scope.projectSelected = function(){
		if($scope.name == "" || $scope.name == undefined){
			$scope.name = $scope.project.projectname;
		}
		
		// console.log("projectSelected..")
	}
	$scope.add = function() {
		// $scope.projects.push({"projectid": $scope.projectId, "projectname" : $scope.name, "account" : $scope.account})
		console.log($scope.project._id);
		console.log($scope.name);
		dataFactory.createTask({
			"project" : $scope.project._id,
			"name" : $scope.name,
			"clientidentifier": $scope.clientidentifier,
			"type" : $scope.taskType,
			"assigndate" : $scope.assignDate,
			"duedate" : $scope.dueDate,
			"estEffort" : $scope.estEffort,
			"template" : $scope.templates,
			"keyword" : $scope.keyword,
			"remark" : $scope.remark,
			"eta" : $scope.eta,
			"assets" : $scope.assets,
			"status" : $scope.status
			// "allocation" : {
			// 					"user" : "rakesh dayal",
			// 					"effort" : 46,
			// 					"date"	: $scope.assignDate

			// 				} 
			
		});
		if(!$scope.remainOnSamePage){
			$state.go('task');
		}else{
			$scope.name = "";
			$scope.estEffort = "";
			$scope.templates = "";
			$scope.keyword = "";
			$scope.remark = "";
			$scope.status = "inqueue";
		}
		
		
	}
}])

app.controller('UpdateTaskCtrl', ['$scope','$stateParams','dataFactory', '$state', '$filter', function($scope, $stateParams, dataFactory, $state, $filter){
	// $scope.tasks = dataFactory.tasks
	$scope.projects = dataFactory.projects;
	// console.log($scope.accounts);
	// var found = $filter('getByProperty')('name', 'Others', $scope.accounts);
	// console.log(found)
	var tsk = dataFactory.getTaskbyID($stateParams.id);
	tsk.then(function(data){
		$scope.currTask = data;
		console.log($scope.currTask)
		$scope.assignmentData = []
		$scope.resetPage();
		// $scope.account = $filter('getByProperty')('name', $scope.currProject.account, $scope.accounts)
		// $scope.accounts[1];
	
	});
	
	$scope.update = function() {
		// console.log($scope.project._id)
		dataFactory.updateTask($stateParams.id, {
			"project" : $scope.project._id,
			"name" : $scope.name,
			"clientidentifier": $scope.clientidentifier,
			"type" : $scope.taskType,
			"assigndate" : $scope.assignDate,
			"duedate" : $scope.dueDate,
			"estEffort" : $scope.estEffort,
			"template" : $scope.templates,
			"keyword" : $scope.keyword,
			"remark" : $scope.remark,
			"eta" : $scope.eta,
			"assets" : $scope.assets,
			"status" : $scope.status 
		});
		$state.go('task');
	}
	$scope.resetPage = function(){
		$scope.project = $filter('getByProperty')('_id', $scope.currTask.project._id, $scope.projects)
		$scope.name = $scope.currTask.name;
		$scope.clientidentifier = $scope.currTask.clientidentifier;
		$scope.taskType = $scope.currTask.type;
		$scope.assignDate = new Date($scope.currTask.assigndate);
		$scope.dueDate = new Date($scope.currTask.duedate);
		$scope.estEffort = $scope.currTask.estEffort;
		$scope.templates = $scope.currTask.template;
		$scope.keyword = $scope.currTask.keyword;
		$scope.remark = $scope.currTask.remark;
		$scope.eta = $scope.currTask.eta;
		$scope.assets = $scope.currTask.assets;
		$scope.status = $scope.currTask.status;
		
	};
}]);