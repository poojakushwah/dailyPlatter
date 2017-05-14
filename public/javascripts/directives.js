var comp = angular.module('components', []);

comp.directive('ddStatus', function(){
	return {
		restrict : 'E',
		templateUrl: 'partials/dropdown_status.html'
	}
});

comp.controller('TypeAheadController', function($scope, dataFactory) { // DI in action
  // dataFac.get('states.json').then(function(data) {
    dataFactory.getProjects().then(function(res){
    	console.log(res.data);//
    	$scope.items = res.data
    });
    
  // });
  $scope.name = ''; // This will hold the selected item
  $scope.onItemSelected = function() { // this gets executed when an item is selected
    console.log('selected=' + $scope.project);
    // $scope.$parent.projectSelected();
  };
});

comp.directive('typeahead', function($timeout) {
  return {
    restrict: 'AEC',
    scope: {
		items: '=',
		prompt:'@',
		title: '@',
		subtitle:'@',
		model: '=',
		onSelect:'&'
	},
	link:function(scope,elem,attrs){
	   scope.handleSelection=function(selectedItem){
	   	// console.log("selectedItem:", selectedItem);
		 scope.model=selectedItem.projectid+" - "+selectedItem.projectname;
		 scope.current=0;
		 scope.selected=true;        
		 $timeout(function(){
			 scope.onSelect();
		  },200);
	  };
	  scope.current=0;
	  scope.selected=true;
	  scope.isCurrent=function(index){
		 return scope.current==index;
	  };
	  scope.setCurrent=function(index){
		 scope.current=index;
	  };
	},
    templateUrl: 'partials/typeahead.html'
  }
});


// comp.factory('dataFac', function($http) {
// 	var obj = {};
// 	obj.getData = function(){
// 		var arr = [
// 				    {
// 					  "name": "New Delhi",
// 					  "abbreviation": "ND"
// 					},
// 					{
// 					  "name": "Delhi",
// 					  "abbreviation": "DEL"
// 					},
// 					{
// 					  "name": "Mumbai",
// 					  "abbreviation": "MU"
// 					},
// 					{
// 					  "name": "Patna",
// 					  "abbreviation": "PAT"
// 					},
// 					{
// 					  "name": "Chapra",
// 					  "abbreviation": "CPR"
// 					}
// 				]
// 		return arr;
// 	}
  
//   return obj
  
// });