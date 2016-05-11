var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var conf = require('./config.json');

server.listen(conf.port);

// deliver static files
app.use(express.static(__dirname + '/www'));

// if path / is requested
app.get('/', function (req, res) {
	// deliver file index.html
	res.sendfile(__dirname + '/www/index.html');
});

io.sockets.on('connection', function (socket) {
	// client is connected 
	socket.emit('chat', { time: new Date(), text: 'You are now connected with the server!' });
	// if a user sends a text message
	socket.on('chat', function (data) {
		// send text message to all other connected users
		io.sockets.emit('chat', { time: new Date(), name: data.name || 'Anonymous', text: data.text });
	});
});

// Portnummer in die Konsole schreiben
console.log('Server runs at http://127.0.0.1:' + conf.port + '/');