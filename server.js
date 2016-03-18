var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

//Connected users counter
var connectCounter = 0;

io.on('connection', function (socket) {
    //Create username
    socket.on('join', function(name){
    	socket.nickname = name;
        console.log(name + ' connected');
        connectCounter++;
        console.log('Connected users: ' + connectCounter); 
    });

    socket.on('addBoardPos', function(data){
        socket.broadcast.emit('addBoardPos', data);
    })

    socket.on('disconnect', function() {
        connectCounter--;
        console.log('Connected users: ' + connectCounter);
    });
    //User is typing
    socket.on("sender", function (data) {
        socket.broadcast.emit("sender", data); 
    });

    socket.on('message', function(message) {
        var nickname = socket.nickname;
        console.log(nickname + ' said:', message);
    	socket.broadcast.emit('message', nickname + ': ' + message);
    	socket.emit('message', 'Me: ' + message);
    });
});

server.listen(8080);