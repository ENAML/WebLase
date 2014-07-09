angular.module('webLaseAppApp')
  .controller('guccifame', function ($scope, $http) {

    $scope.embedCode = "";

    $scope.changeCode = function() {


      $http.post('/changeCode', {'embedCode': $scope.embedCode}).success(function(){
        console.log('submitted');
      });

      $scope.embedCode = "";

    };

    $scope.resetQueue = function() {
      $http.post('/resetQueue').success(function(){
        console.log('queue reset');
      })
    }

// // end admin page

});