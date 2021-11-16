'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);

const caps = io.of('/caps');


io.on('connection', socket => {
  console.log('User/Socket connected to general server: ', socket.id);
});

caps.on('connection', socket => {

  console.log('User/Socket connected to caps NameSpace: ', socket.id);

  socket.on('join', room => {
    // console.log('================RAmi===========', socket.NameSpace);
    console.log(`CLIENT: ${socket.id} just connected to ${room}`);
    socket.join(room);
  });

  socket.on('pickup', (payload) => {

    let time = new Date();
    console.log('EVENT: pickup', time, payload);
    caps.emit('pickup', payload);
  });

  socket.on('in-transit', payload => {
    let time = new Date();
    console.log('EVENT: in-transit', time, payload);
    caps.emit('in-transit', payload);
  });

  socket.on('delivered', payload => {
    let time = new Date();
    console.log('EVENT: delivered', time, payload);
    caps.emit('delivered', payload);
  });

});