app.controller('AssignmentCtrl', ['$scope','$stateParams','dataFactory', '$state', '$filter', function($scope, $stateParams, dataFactory, $state, $filter){
	$scope.tasks = dataFactory.tasks;
	$scope.users = dataFactory.users;
	$scope.inputData = [];
	$scope.today = new Date();
	if($stateParams.id){
		var tsk = dataFactory.getTaskbyID($stateParams.id);
		tsk.then(function(data){
			$scope.selectedTask = data;
			for(var i=0; i<$scope.selectedTask.allocation.length; i++){
				$scope.inputData.push({
					"user":$filter('getByProperty')('_id', $scope.selectedTask.allocation[i].user._id, $scope.users), 
					"date":new Date($scope.selectedTask.allocation[i].date), 
					"effort" : $scope.selectedTask.allocation[i].effort});
			}
		});
	}
	

	$scope.addResoruceRow = function(){
		var usr = {}
		var dt = new Date();
		var oldDt = new Date();
		if($scope.inputData.length > 0){
			usr = $scope.inputData[$scope.inputData.length-1].user;
			var oldDt = new Date($scope.inputData[$scope.inputData.length-1].date);
			dt = new Date();
			dt.setUTCFullYear(oldDt.getFullYear());
			dt.setUTCMonth(oldDt.getMonth());
			dt.setUTCDate(oldDt.getDate()+1);
			dt.setUTCHours(0);
			dt.setUTCMinutes(0);
			dt.setUTCSeconds(0);
			dt.setUTCMilliseconds(0);
			
		}else{
			dt = new Date();
			dt.setUTCFullYear(oldDt.getFullYear());
			dt.setUTCMonth(oldDt.getMonth());
			dt.setUTCDate(oldDt.getDate());
			dt.setUTCHours(0);
			dt.setUTCMinutes(0);
			dt.setUTCSeconds(0);
			dt.setUTCMilliseconds(0);
		}
		$scope.inputData.push({"user":usr, "date":dt, "effort" : 0});
	}
	$scope.removeResoruceRow = function(_id){
		$scope.inputData.splice(_id, 1)
	};
	$scope.saveAssignment = function(){
		console.log("check here: assigned hour should not greater than estimated effort");
		dataFactory.updateTask($scope.selectedTask._id, {
			"allocation" : $scope.inputData,
			"status" 	: "assign"
		});
		$state.go('assignment');
		//
	};
	$scope.calculateRemainingEffort = function(data){
		// console.log(data);
		// console.log("================"+data.allocation.length)
		$scope.today = new Date()
		var remainingEffort = 0;
		for(var i=0; i<data.allocation.length; i++){
			var td = $filter('date')($scope.today, "dd/MM/yyyy");
			var ad = $filter('date')(data.allocation[i].date, "dd/MM/yyyy");
			if(ad >= td){
				// console.log(ad+"----yes.."+ data.allocation[i].effort)
				remainingEffort += data.allocation[i].effort 
			}
		}
		// console.log(remainingEffort)
		return remainingEffort;
	};
	$scope.addDay = function(_date, dayCount){
		return new Date(_date.getFullYear(),_date.getMonth(),_date.getDate()+dayCount)

		 
	}
	// $scope.convertToUTCDate = function(_date){
	// 	var _utc = new Date();

	// }

}]);
