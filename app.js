const express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));
server.listen(8080, () => console.log('Servidor iniciado en http//localhost:8080'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
  console.log('Socket conectado', socket.id);
  // io.emit('conectado', {texto: 'Nuevo socket conectado: ' + socket.id +`<br>`} );
  // io.emit('conectado', `Nuevo socket conectado: ${socket.id} <br>`);

  socket.on('disconnect', () => {
    console.log('socket desconectado', socket.id);
    // io.emit('desconectado', {texto: 'Socket desconectado.'+ socket.id +`<br>`});
    io.emit('desconectado', `Socket desconectado: ${socket.id}`);

  });

  socket.on('chat:mensaje', (data) => {
    io.emit('chat:mensaje', data);
  });

  socket.on('chat:escribiendo', (usuario) => {
    socket.broadcast.emit('chat:escribiendo', usuario);
  });
  
  socket.on('chat:conectado', (usuario) => {
    io.emit('conectado', `Conectado: ${usuario} <br>`);
  });
  
});


