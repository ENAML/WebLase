'use strict';

module.exports = function(app, sockets){

  sockets.on('connection', function(){
    console.log('Sarumon Client Connected . gov');
  });

  sockets.on('imageReq', function() {

  });

};