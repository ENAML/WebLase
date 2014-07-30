// Socket.io on Front End

var socket = io();
filepicker.setKey("AZJi35K99RVGyLe7OmIeEz");

$scope.messages = [];

$scope.message = {
  user: $scope.currentUser, // should use validation (via backend) later
  content: "",
  image: "",
};

socket.on('chat message', function(msg) {
  $scope.messages.push(msg);
  $scope.$apply();
});

socket.emit("populate", "population notice");

$scope.sendMessage = function() {
  socket.emit('post message', $scope.message);
  $scope.message.content = '';
  $scope.message.image = '';
  $('html, body').animate({scrollTop:$(document).height()}, 'slow');
};

$scope.uploadImage = function() {
  filepicker.pick({
      mimetypes: ['image/*', 'text/plain'],
      //container: 'window',
      services:['URL','COMPUTER', 'FACEBOOK', 'INSTAGRAM'],
    },
    function(InkBlob){
      console.log(JSON.stringify(InkBlob.url));
      var url = JSON.stringify(InkBlob.url); //remove quotes from string
      $scope.message.image = url.substring(1, url.length-1);
      $scope.$apply();
    },
    function(FPError){
      console.log(FPError.toString());
    }
  );
};

// Socket.io on Back End


function chat (server) {

  var socket = io(server);
  socket.on('connection', function(userSocket){
  //socket and userSocket must be diff

    //POPULATE CLIENT SIDE CHATBOX WITH PAST 30 POSTS
    userSocket.on("populate", function(alert){
      Message.find().sort({timestamp: -1}).limit(30).populate("user").exec(function(err, queryResults){
        // result list displays in reverse so have to iterate in reverse
        // limits fetched items to 30 on reload of page
        var queryLength;
        if (queryResults.length < 30) {
          queryLength = queryResults.length;
        } else {
          queryLength = 30;
        }

        // repopulates front end / angular with db-saved msgs
        for (var i = 0; i < queryLength; i++){
          var msgFromDB = queryResults.pop();
          //console.log(msgFromDB.user.name);
          var msg = {
            user: {name: msgFromDB.user.name},
            content: msgFromDB.message,
            image: msgFromDB.imageUrl
          };
          socket.emit('chat message', msg);
        }
      });
    });

    //console.log('a user connected');
    userSocket.on('post message', function(msg){

      //saves msg to database
      User.findOne({name: msg.user.name}, function(err, msgUserRef) {
        var newMessage = new Message({user: msgUserRef, message: msg.content, imageUrl: msg.image, timestamp: new Date()});
        newMessage.save();

        //emits msg to front end
        socket.emit('chat message', msg);
      });
    });
  });
}