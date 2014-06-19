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

    $scope.uploadImage = function(flowArray) {
      console.log(flowArray[0]);
      // $http.post('/upload', flowArray[0], {headers: {'Accept': 'image/*', 'Content-Type': undefined }})
      //   .success(function(data) {
      //     flowArray = [];
      //     console.log(data);
      //   })
      //   .error(function(data) {
      //     console.log('error:' + data + ". Get it together, Cline.");
      //   });
      $http.post('/saveImg', {'test': 'hello!', 'name': 'me'}).success(function(data){
        console.log(data);
      });

    };
  });


