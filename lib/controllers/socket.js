'use strict';

var mongoose = require('mongoose'),
  io = require('socket.io');
global.allSockets = [];
global.io = io;

function chat (server) {
  console.log('hi!!!');
  var socket = io(server);

  socket.on('connection', function(userSocket) {
    // console.log(userSocket);
    console.log("got a connection");
    global.allSockets.push(userSocket);
  });


}

exports.chat = chat;