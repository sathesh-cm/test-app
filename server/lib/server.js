var express = require('express');
var path = require("path");
var cors = require("cors");
var config = require("../config/config.json");

// setup server
var app = express();

//Allow CORS
app.use(cors());

var http = require('http').Server(app);
//
var io = require('socket.io')(http);

//process command and broadcast to connected apps
function processCommand(data){
    var event=data.event;
    var param=data.param;
    io.emit(event,param);
}

// Render index page
app.get('/', function(req, res){
  res.sendFile(path.resolve('public/index.html'));
});

// Setup socket.io
io.on('connection', function(socket){
  var addr=socket.request.connection.remoteAddress;
  var id=socket.id;
  console.log("user connected - (id -"+id+") (ip - "+addr+")");
  // when a client gets connected, broadcast it to all connected apps
  processCommand({event:'server:message',param:{action:"add",id:id,ip:addr}});
  socket.on('disconnect',function(){
    var addr=this.request.connection.remoteAddress;
    var id=this.id;
    console.log("user connected - (id -"+id+") (ip - "+addr+")");
    processCommand({event:'server:message',param:{action:"remove",id:this.id}});
})
});

// Start listening
http.listen(config.port, function(){
  console.log('listening on *:3000');
});
