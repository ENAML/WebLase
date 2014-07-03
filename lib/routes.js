'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    middleware = require('./middleware'),
    imageModel = require('./models/image.js'),
    fs = require('fs');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.route('/api/awesomeThings')
    .get(api.awesomeThings);

  app.route('/api/users')
    .post(users.create)
    .put(users.changePassword);
  app.route('/api/users/me')
    .get(users.me);
  app.route('/api/users/:id')
    .get(users.show);

  app.route('/UploadCanvas')
  .post(function(req, res) {
    // console.log(req.body.files);
    var data_url = req.body.files;
    var matches = data_url.match(/^data:.+\/(.+);base64,(.*)$/);
    var ext = matches[1];
    var base64_data = matches[2];
    var buffer = new Buffer(base64_data, 'base64');

    var suffix = new Date().getTime();
    var fileName = 'uploads/canvasImage' + suffix + '.png';
    console.log(fileName);
    fs.writeFile(fileName, buffer, function (err) {

      app.get('imageQueue').push(fileName);

      console.log(app.get('imageQueue'));

        // fs.readFile('uploads/canvasImage.png', function(err, buf) {
        //   global.allSockets.forEach(function(socket) {
        //     socket.emit('fileUploaded', {filename: fileName, buffer: buf});
        //   });
        // });

        // res.send('success');
        // console.log('done');
    });

  });

  app.route('/Upload')
  .post(function(req, res) {
    console.log(req.files.file.path);
    app.get('imageQueue').push(req.files.file.path);
    // fs.readFile(req.files.file.path, function(err, buf) {
    //   console.log(req.files.file.path);
    //   global.allSockets.forEach(function(socket) {
    //     socket.emit('fileUploaded', {filename: req.files.file.name, buffer: buf});
    //   });
    // });
  });

  // app.route('/Upload')
  // .post(function(req, res) {
  //   // console.log(req.files);
  //   fs.readFile(req.files.file.path, function(err, buf) {
  //     console.log(req.files.file.path);
  //     global.allSockets.forEach(function(socket) {
  //       socket.emit('fileUploaded', {filename: req.files.file.name, buffer: buf});
  //     });
  //   });
  // });

  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( middleware.setUserCookie, index.index);
};