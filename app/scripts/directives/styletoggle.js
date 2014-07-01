'use strict';

angular.module('webLaseAppApp')
  .directive('submit', function () {
    return {
    	template: 'SUBMIT',
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.bind('click', function(){
			angular.element('#bb').addClass( "while-viewing" );
			angular.element('#title').css("color", "black");
			angular.element('#description').css("color", "white");  
        })
      }
    };
  })
  .directive('view',function () {
    return {
    	template: 'VIEW',
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.bind('click', function(){
				angular.element('#bb').removeClass( "while-viewing" );
				angular.element('#title').css("color", "white");
				angular.element('#description').css("color", "black"); 
        })
      }
    };
  })