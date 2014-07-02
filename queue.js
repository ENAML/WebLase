// 'use strict';

// var async = require('async');
// // var socket = require('./lib/controllers/socket').chat;

// // create a queue object with concurrency 3

// var q = async.queue(function (task, done) {
//   console.log('working on ' + task.name);
//   //io.sockets.emit('');
//   setTimeout(function() {
//     done();
//   }, 5000); //1000*60*10)
// }, 3);

// q.tasks;

// // add some items to the queue

// q.push({name: 'first'}, function (err) {
//   console.log('task completed');
// });

// q.push({name: 'second'}, function (err) {
//   console.log('task completed');
// });

// // add some items to the queue (batch-wise)

// q.push([{name: 'third'},{name: 'fourth'},{name: 'fifth'}], function (err) {
//   console.log('task completed');
// });

