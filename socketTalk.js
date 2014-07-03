'use strict';

var fs = require('fs');

module.exports = function(app, sockets){

  sockets.on('connection', function(socket){
    console.log('Sarumon Client Connected . gov');
    console.log(app.get('imageQueue'));

	  socket.on('imageReq', function(data, callback) {
			var fileName = app.get('imageQueue').shift();
      console.log(fileName);
      // socket.emit('fileSend', fileName);
      if (!fileName) {
        callback({fileName: null, buffer: null});
      } else {
        fs.readFile(fileName, function(err, buf) {
          callback({fileName: fileName, buffer: buf});
        });
      }


	  });
  });

};