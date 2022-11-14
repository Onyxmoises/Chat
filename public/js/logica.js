//Crear una instancia de SocketIO, recibe como parámetro el url del servidor al que se conectará
var socket = io.connect('http://localhost:8080');
var list = document.querySelector(`#not`)
let mensaje = document.getElementById('mensaje');
let usuario = document.getElementById('usuario');
let salida = document.getElementById('salida');
let notificaciones = document.getElementById('notificaciones');
let boton = document.getElementById('enviar');
let nombre = document.getElementById('myBtn');

var clientes = [];

mensaje.addEventListener('input', function(){
  if(mensaje.value === ''){
    // avisos.innerHTML = ''
    boton.hidden = true;
    // alert('Se requiere un mensaje para poder ingresar al chat');
  }else{
    boton.hidden = false;
  }
});

nombre.addEventListener('click', function(){
  if(usuario.value !== ''){
    socket.emit('chat:conectado', usuario.value)
  }
});
 
boton.addEventListener('click', function(){
  var data = {
    mensaje: mensaje.value,
    usuario: usuario.value,
  };
  if(usuario.value === ''){
    $("#myModal").modal("show");
    alert('Se requiere un nombre para poder ingresar al chat');
    mensaje.value = '';
  }if(mensaje.value === '' ){
    // avisos.innerHTML = ''
    // boton.hidden = true;
    // alert('Se requiere un mensaje para poder ingresar al chat');
  }else{
    boton.hidden = true;
    // avisos.innerHTML = ''
    mensaje.value = '';
    socket.emit('chat:mensaje', data);
  }
});

mensaje.addEventListener('keydown', function(){
  socket.emit('chat:escribiendo', usuario.value)
});

socket.on('chat:mensaje', function(data){
  avisos.innerHTML = ''
  // boton.hidden = true;
  salida.innerHTML += `<b>` + data.usuario + `</b>: ` + data.mensaje + `<br>`
});

socket.on('chat:escribiendo', function(data){
  if(data === ''){
    avisos.innerHTML = ''  
  }else{
    avisos.innerHTML = `<p><em>` + data + `</em> esta escribiendo ... </p>`
  } 
});


//Escuchar al evento 'hola' y realizar cierta accion, recibe como parámetro el id del evento y un callback con la información recibida
socket.on('conectado', function (data) {
  //Notificar al usuario el evento hola
  // console.log(data);
  salida.innerHTML += `<b>${data}</b>`
  // clientes.push(data);
  // document.querySelector('#notificaciones').innerHTML = JSON.stringify(clientes);
});

socket.on('desconectado', function (data) {
  //Notificar al usuario el evento hola
  console.log(data);
  // salida.innerHTML += `<b>${data}</b>`
  // salida.innerHTML += `<b>` + data.usuario + `</b>: ` + data.mensaje + `<br>`
  // clientes.push(data);
  // document.querySelector('#notificaciones').innerHTML = JSON.stringify(clientes);
});
