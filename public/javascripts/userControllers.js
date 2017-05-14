
app.controller('LoginUserCtrl', ['$scope','$stateParams','authentication', '$state', function($scope, $stateParams, authentication, $state){
	$scope.message = {"type": 0, "text": ""};

	$scope.onSubmit = function() {
		console.log($scope.email, $scope.password);
		authentication.login({
	    	"email" : $scope.email, 
			"password" : $scope.password
		})
	    .error(function(err){
	       console.log(err);
	       $scope.message = {"type": -1, "text": err.message}
	    })
	    .then(function(){
	      $state.go('home');
	      // console.log("login successfully!");
	    });
	}
}]);

app.controller('UserCtrl', ['$scope','$stateParams','dataFactory', function($scope, $stateParams, dataFactory){
	$scope.users = dataFactory.users;
	// $scope.test = $state;
}]);

app.controller('AddUserCtrl', ['$scope','$stateParams','authentication', '$state', function($scope, $stateParams, authentication, $state){
	$scope.add = function() {
		// dataFactory.createUser({
		// 	"name": $scope.name, 
		// 	"email" : $scope.email, 
		// 	"password" : $scope.pwd,
		// 	"usertype" : $scope.userType
		// });
		// $state.go('user');
		authentication
	    .register({
	    	"name": $scope.name, 
			"email" : $scope.email, 
			"password" : $scope.pwd,
			"usertype" : $scope.userType
	    })
	    .error(function(err){
	      alert(err);
	    })
	    .then(function(){
	      // $location.path('profile');
	      console.log("User Save successfully!");
	    });
	}
}])

app.controller('UpdateUserCtrl', ['$scope','$stateParams','dataFactory', '$state', '$filter', function($scope, $stateParams, dataFactory, $state, $filter){
	$scope.users = dataFactory.users
	var user = dataFactory.getUserbyID($stateParams.id);
	user.then(function(data){
		$scope.currUser = data;
		$scope.name = $scope.currUser.name;
		$scope.email = $scope.currUser.email;
		$scope.pwd = $scope.currUser.password;
		$scope.userType = $scope.currUser.usertype;
		
	
	});
	
	$scope.update = function() {
		dataFactory.updateUser($stateParams.id, {
			"name": $scope.name, 
			"email" : $scope.email, 
			"password" : $scope.pwd,
			"usertype" : $scope.userType
		});
		$state.go('user');
	}
	$scope.resetPage = function(){
		$scope.name = $scope.currUser.name;
		$scope.email = $scope.currUser.password;
		$scope.password = $scope.currUser.projectname;
		$scope.usertype = $scope.currUser.usertype;
		
	};
}]);