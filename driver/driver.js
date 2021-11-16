'use strict';

require('dotenv').config();
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
const io = require('socket.io-client');
const socket = io.connect(`${SERVER_URL}/caps`);

socket.on('pickup', payload => {

  setTimeout(() => {
    console.log('================ DriverPickup FIRED ==================');
    console.log(`DRIVER: picked up [ORDER_ID]: ${payload.order.orderId}`);
    socket.emit('in-transit', payload);
  }, 2000);

  setTimeout(() => {
    console.log('=============== DriverDelivered FIRED =================');
    console.log(`DRIVER: delivered [ORDER_ID]: ${payload.order.orderId}`, payload);
    socket.emit('delivered', payload);
  }, 4000);
});