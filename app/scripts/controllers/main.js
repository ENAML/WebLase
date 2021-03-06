// 'use strict';

angular.module('webLaseAppApp')
  .controller('MainCtrl', function ($scope, $http, $upload, $timeout) {


    $scope.getQueue = function() {
      $http.get('/queue').success(function(data) {
        var imageArray = angular.fromJson(data).queue;
        $scope.queueLength = imageArray.length; //fix so don't need +1
        console.log($scope.queueLength);

      });

    };



    $scope.uploadCanvas = function() {
      var canvas = document.getElementById('paint');
      var dataURL = canvas.toDataURL();
      console.log(dataURL);

      $http.post('/UploadCanvas', {'files': dataURL}).success(function(data){
        console.log(data);
        $scope.getQueue();
        $scope.clearCanvas();
      });

      // $.ajax({
      //   type: "POST",
      //   url: "/UploadCanvas",
      //   data: {
      //     files: dataURL
      //   }
      // }).done(function() {
      //   console.log('all_saved');
      //   $scope.getQueue();
      // });
      // $scope.clearCanvas();

    };

    $scope.clearCanvas = function() {

      var canvas = document.getElementById('paint');
      var context = canvas.getContext('2d');

      context.clearRect(0, 0, canvas.width, canvas.height);
    };

    $scope.initial = false; // hi


    $scope.view = function() {
      $scope.initial = false;

    };

    $scope.submit = function() {
      $scope.initial = true;
      $timeout(window.onCanvas); //need $timeout b/c canvas isn't ready immediate and waits for next event loop
    };


  $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.

    console.log($files);
    $scope.files = $files;
  };



  $scope.submitFiles = function($files) {
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = $upload.upload({
        url: '/Upload', //upload.php script, node.js route, or servlet url
        // method: 'POST' or 'PUT',
        // headers: {'header-key': 'header-value'},
        // withCredentials: true,
        data: {myObj: $scope.myModelObj},
        file: file, // or list of files: $files for html5 only
        /* set the file formData name ('Content-Desposition'). Default is 'file' */
        //fileFormDataName: myFile, //or a list of names for multiple files (html5).
        /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
        //formDataAppender: function(formData, key, val){}
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
        $scope.getQueue();
      });
      //.error(...)
      //.then(success, error, progress);
      //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
    }
    /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed.
       It could also be used to monitor the progress of a normal http post/put request with large data*/
    // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
    // get rid of arrow on click

// $('div').click('#arrow', function() {
//     $('#arrow').css("display","none");
// })

  };
});


