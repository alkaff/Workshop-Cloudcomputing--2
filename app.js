
/**
 * Module dependencies.
 */
var express = require('express')
  , app = express()
  , routes = require('./routes')
  , path = require('path')
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(3000, function(){
  console.log("Express server listening on port " + 3000);
});

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

io.sockets.on('connection', function (socket) {
  socket.on('add', function (data) {
    socket.emit('addData', routes.addCol(data));
  });

  socket.on('update', function (data) {
    socket.emit('updateData', routes.updateCol(data));
  });

  socket.on('remove', function (data) {
    socket.emit('removeData', routes.removeCol(data));
  });

});
