const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);


server.listen(3000);

app.get('/',(request, respons) => {
	respons.sendFile(__dirname + '/index.html');
});

connections = [];


io.sockets.on('connection',(socket) => {
	console.log("Connect");
	connections.push(socket);

	socket.on('disconnect',(data) => {
		connections.splice(connections.indexOf(socket), 1);
		console.log("Disconnect");
	});

	socket.on('send mess', (data) => {
		io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
	});

});