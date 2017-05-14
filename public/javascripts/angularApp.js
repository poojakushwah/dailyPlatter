var app = angular.module('dailyPlatter', ['ui.router', 'components', 'ngAnimate']);



app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/login');

	$stateProvider
		.state('login', {
			url: "/login",
			templateUrl: "partials/login.html",
			authenticate: false,
			controller: "LoginUserCtrl"
		})
		.state('home', {
			url: "/home",
			templateUrl: "partials/home.html",
			controller: "MainCtrl",
			authenticate: true,
			resolve: {
				postPromise: ['dataFactory', function(dataFactory){
			      return dataFactory.initData();
			    }]
			}
		})
		.state('account', {
			url: "/account",
			templateUrl: "partials/account.html",
			controller: "AccountCtrl",
			authenticate: true,
			resolve: {
				postPromise: ['dataFactory', function(dataFactory){
			      return dataFactory.initData();
			    }]
			}
			
		})
		.state('account_add', {
			url: "/account_add",
			templateUrl: "partials/accountAdd.html",
			controller: "AddAccountCtrl",
			authenticate: true,
			resolve: {
				postPromise: ['dataFactory', function(dataFactory){
			      return dataFactory.initData();
			    }]
			}
		})
		.state('project', {
			url: "/project",
			templateUrl: "partials/project.html",
			controller: "ProjectCtrl",
			authenticate: true,
			resolve: {
				postPromise: ['dataFactory', function(dataFactory){
			      return dataFactory.initData();
			    }]
			}
			
		})
		.state('project_add', {
			url: "/project_add",
			templateUrl: "partials/projectAdd.html",
			controller: "AddProjectCtrl",
			authenticate: true,
			resolve: {
				postPromise: ['dataFactory', function(dataFactory){
			      return dataFactory.initData();
			    }]
			}
		})
		.state('project_details', {
			url: "/project_details/{id}",
			templateUrl: "partials/projectDetails.html",
			controller: "UpdateProjectCtrl",
			authenticate: true,
			resolve: {
				postPromise: ['dataFactory', function(dataFactory){
			      return dataFactory.initData();
			    }]
			}
			
		})
		.state('project_edit', {
			url: "/project_edit/{id}",
			templateUrl: "partials/projectEdit.html",
			controller: "UpdateProjectCtrl",
			authenticate: true
			
		})

		.state('task', {
			url: "/task",
			templateUrl: "partials/task.html",
			controller: "TaskCtrl",
			authenticate: true,
			resolve: {
				postPromise: ['dataFactory', function(dataFactory){
			      return dataFactory.initData();
			    }]
			}
			
		})
		.state('task_add', {
			url: "/task_add/{id}",
			templateUrl: "partials/taskAdd.html",
			controller: "AddTaskCtrl",
			authenticate: true,
			resolve: {
				postPromise: ['dataFactory', function(dataFactory){
			      return dataFactory.getProjects();
			    }]
			}
		})
		.state('task_details', {
			url: "/task_details/{id}",
			templateUrl: "partials/taskDetails.html",
			controller: "UpdateTaskCtrl",
			authenticate: true,
			resolve: {
				postPromise: ['dataFactory', function(dataFactory){
			      return dataFactory.getProjects();
			    }]
			}
			
		})
		.state('task_edit', {
			url: "/task_edit/{id}",
			templateUrl: "partials/taskEdit.html",
			controller: "UpdateTaskCtrl",
			authenticate: true
			
		})
		
		.state('assignment', {
			url: "/assignment",
			templateUrl: "partials/assignment.html",
			controller: "AssignmentCtrl",
			authenticate: true,
			resolve: {
				postPromise: ['dataFactory', function(dataFactory){
			      return dataFactory.initData();
			    }]
			}
		})
		.state('assignment_details', {
			url: "/assignment_details/{id}",
			templateUrl: "partials/assignment_details.html",
			controller: "AssignmentCtrl",
			authenticate: true,
			resolve: {
				postPromise: ['dataFactory', function(dataFactory){
			      return dataFactory.getUsers();
			    }]
			}
			
		})

		.state('assignment_pending', {
			url: "/assignment_pending",
			templateUrl: "partials/assigment_pending.html",
			controller: "AssignmentCtrl",
			authenticate: true,
			resolve: {
				postPromise: ['dataFactory', function(dataFactory){
			      return dataFactory.initData();
			    }]
			}
		})
		
		.state('user', {
			url: "/user",
			templateUrl: "partials/user.html",
			controller: "UserCtrl",
			authenticate: true,
			resolve: {
				postPromise: ['dataFactory', function(dataFactory){
			      return dataFactory.initData();
			    }]
			}
			
		})
		.state('user_add', {
			url: "/user_add",
			templateUrl: "partials/userAdd.html",
			controller: "AddUserCtrl",
			authenticate: true
		})
		
		.state('user_details', {
			url: "/user_details/{id}",
			templateUrl: "partials/userDetails.html",
			controller: "UpdateUserCtrl",
			authenticate: true
			
		})

		.state('user_edit', {
			url: "/user_edit/{id}",
			templateUrl: "partials/userEdit.html",
			controller: "UpdateUserCtrl",
			authenticate: true
			
		})

		.state('timesheet', {
			url: "/timesheet",
			templateUrl: "partials/timesheet.html",
			controller: "TimesheetCtrl",
			authenticate: true,
			resolve: {
				postPromise: ['dataFactory', function(dataFactory){
			      return dataFactory.initData();
			    }]
			}
		})

		.state('timesheet_add', {
			url: "/timesheet_add",
			templateUrl: "partials/timesheetAdd.html",
			controller: "AddTimesheetCtrl",
			authenticate: true,
			resolve: {
				postPromise: ['dataFactory', function(dataFactory){
			      return dataFactory.initData();
			    }]
			}
		})



		.state('timesheet_add_user', {
			url: "/timesheet_add/{id}",
			templateUrl: "partials/timesheetAddByUser.html",
			controller: "AddTimesheetUserCtrl",
			authenticate: true,
			resolve: {
				postPromise: ['dataFactory', function(dataFactory){
			      return dataFactory.initData();
			    }]
			}
		})


		.state('report', {
			url: "/report",
			templateUrl: "partials/report.html",
			authenticate: true
		})
		.state('leave', {
			url: "/leave",
			templateUrl: "partials/leave.html",
			authenticate: true
		})

}]);

app.controller('MainCtrl' , ['$scope', 'dataFactory', 'authentication', '$state', function($scope, dataFactory, authentication, $state){
	$scope.projects = dataFactory.projects;
	$scope.tasks = dataFactory.tasks;
	// console.log($rootScope.isLoggedIn)
	// $scope.isLoggedIn = authentication.isLoggedIn();
	// $scope.currentUser = authentication.currentUser();
	$scope.logout = function(){
		// console.log("logout...");
		authentication.logout();
		$state.go('login');
	}
}]);


app.filter('getByProperty', function() {
    return function(propertyName, propertyValue, collection) {
        var i=0, len=collection.length;
        // console.log(propertyName+"<>"+propertyValue);
        // console.log(collection);
        for (i=0; i<len; i++) {
            // console.log(collection[i][propertyName] + "--->"+propertyValue)
           
            if (collection[i][propertyName] == propertyValue) {
                // console.log("found....");
                return collection[i];
            }
        }
        return null;
    }
});


app.factory('dataFactory', ['$http', '$window', '$state', 'authentication' ,function($http, $window, $state, authentication){
	//  var prj  = [
	// 	{"projectid": "12001", "projectname" : "AOL1 Test proj 1", "account" : "Sizmek"},
	// 	{"projectid": "12002", "projectname" : "AOL2 Test proj 2", "account" : "Sizmek"},
	// 	{"projectid": "12003", "projectname" : "AOL3 Test proj 3", "account" : "Sizmek"},
	// 	{"projectid": "12004", "projectname" : "AOL4 Test proj 4", "account" : "Sizmek"},
	// 	{"projectid": "12005", "projectname" : "AOL5 Test proj 5", "account" : "Sizmek"},
	// 	{"projectid": "12006", "projectname" : "AOL6 Test proj 6", "account" : "Sizmek"}
	// ]
	var obj = {
		"accounts": [],
		"projects": [],
		"users": [],
		"tasks": [],
		"timesheets": []
	};
	// obj.projects = prj;
	obj.getProjects = function(){
		return $http.get('/api/projects', {
			headers: {
          				Authorization: 'Bearer '+ authentication.getToken()
        			}
        	}
        ).success(function(data){
			// console.log(data)
			angular.copy(data, obj.projects);
		}).error(function(err){
			console.log(err.status);
			if(err.status == "401"){
				// $state.go('login');
			}
		});
	};
	obj.getProjectbyID = function(id){
		return $http.get('/api/projectDetails/' +id).then(function(res){
			return res.data;
		});
	}
	obj.createProject = function(prj){
		return $http.post('/api/createProject', prj)
		.success(function(data){
			// console.log(data);
			// obj.projects.push(data);
		})
		.error(function(err){
			console.log(err.error);
		});
	};
	obj.updateProject = function(id, prj){
		return $http.put('/api/updateProject/'+ id, prj).success(function(data){
			//console.log("data updated!");
		})
	};
	obj.getTasksByProject = function(id){
		return $http.get('/api/tasksByProject/'+ id).then(function(res){
			return res.data;
		});
	}
	
	//---
	obj.getUsers = function(){
		return $http.get('/api/users').success(function(data){
			angular.copy(data, obj.users);
		});
	};
	obj.getUserbyID = function(id){
		return $http.get('/api/userDetails/' +id).then(function(res){
			return res.data;
		});
	}
	obj.createUser = function(inputdata){
		return $http.post('/api/createUser', inputdata).success(function(data){
			//obj.projects.push(data);
		});
	};
	obj.updateUser = function(id, inputdata){
		return $http.put('/api/updateUser/'+ id, inputdata).success(function(data){
			//console.log("data updated!");
		})
	};
	//---
	obj.getTasks = function(){
		return $http.get('/api/tasks').success(function(data){
			angular.copy(data, obj.tasks);
		});
	};
	obj.getTaskbyID = function(id){
		return $http.get('/api/taskDetails/' +id).then(function(res){
			return res.data;
		});
	}
	obj.createTask = function(inputdata){
		return $http.post('/api/createTask', inputdata).success(function(data){
			//obj.projects.push(data);
		});
	};
	obj.updateTask = function(id, inputdata){
		return $http.put('/api/updateTask/'+ id, inputdata).success(function(data){
			//console.log("data updated!");
		})
	};

	//-- Timesheet
	obj.getTimesheets = function(){
		return $http.get('/api/timesheets').success(function(data){
			angular.copy(data, obj.timesheets);
		});
	};
	obj.createTimesheet = function(inputdata){
		return $http.post('/api/createTimesheet', inputdata).success(function(data){
			
		});
	};


	// obj.saveAssignment = function(inputdata){
	// 	return $http.put('/api/saveAssignment', inputdata).success(function(data){
	// 		//obj.projects.push(data);
	// 	});
	// };



	//---
	// obj.taskStatusList = [
	// 						{id: 1, "In Queue"}, 
	// 						{id: 2, "Assign"}, 
	// 						{id: 3, ""}, 
	// 						{id: 4, ""}, 
	// 						{id: 5, ""}
	// 					]


	obj.getAccounts = function(){
		// var acc = [
		// 	{"name" : "Siz 1", "status":1},
		// 	{"name" : "Siz 2", "status":1},
		// 	{"name" : "Siz 3", "status":1},
		// 	{"name" : "Siz 4", "status":1}
		// ]
		return $http.get('/api/accounts').success(function(data){
			angular.copy(data, obj.accounts);
		});
		//obj.accounts = acc//["Emil", "Tobias", "Linus"];
	}
	obj.createAccount = function(prj){
		return $http.post('/api/createAccount', prj)
		.success(function(data){
			// console.log(data);
			// obj.projects.push(data);
		})
		.error(function(err){
			console.log(err.error);
		});
	};
	
	obj.downloadTimesheet = function(data){
		console.log("factory downloadTimesheet");
		// console.log(data);
		return $http.get('/api/download').success(function(data){
			console.log(data);
		});
	}
	obj.initData = function(){
		obj.getProjects();
		obj.getAccounts();
		obj.getUsers();
		obj.getTasks();
		obj.getTimesheets();
	}

	return obj;

}]);

// $filter('date')(date_value, format, timezone)


app.service('authentication', ['$http', '$window', function($http, $window){
	var saveToken = function (token) {
      $window.localStorage['dailyplatter'] = token;
    };

    var getToken = function () {
      return $window.localStorage['dailyplatter'];
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

    var register = function(user) {
    	console.log(user);
      return $http.post('/api/register', user).success(function(data){
        saveToken(data.token);
      });
    };

    var login = function(user) {
      return $http.post('/api/login', user).success(function(data) {
        saveToken(data.token);
      });
    };

    var logout = function() {
      $window.localStorage.removeItem('dailyplatter');
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout
    };
}]);

function run($rootScope, authentication, $state) {
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		$rootScope.isLoggedIn = authentication.isLoggedIn();
  		$rootScope.currentUser = authentication.currentUser();
		console.log("isLoggedIn--"+$rootScope.isLoggedIn);
    	// console.log(toParams);
    	if (toState.authenticate && !authentication.isLoggedIn()){
	      $state.transitionTo("login");
	      event.preventDefault(); 
	    }else{
	    	// console.log(toState.name)
	    	if(toState.name === "login" && authentication.isLoggedIn()){
	    		$state.transitionTo("home");
	      		event.preventDefault(); 
	    	}
	    }
  	});

  	// $rootScope.isLoggedIn = authentication.isLoggedIn();
  	// $rootScope.currentUser = authentication.currentUser();

}

app.run(['$rootScope', 'authentication', '$state', run]);

