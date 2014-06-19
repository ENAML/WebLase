'use strict';

angular.module('webLaseAppApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.moreThanOne = function(flowArray) {

      if (flowArray.length >= 1) {
        flowArray[0] = flowArray[1];
        flowArray.pop();
        console.log(flowArray.length);
      }
    };
  });
