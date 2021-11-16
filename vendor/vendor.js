'use strict';

require('dotenv').config();
const faker = require('faker');

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
const io = require('socket.io-client');
const socket = io.connect(`${SERVER_URL}/caps`);

const STORE_Name = process.env.STORE_NAME || '1-800-flowerZ';
const orderQueue = [];



socket.emit('join', STORE_Name);


setInterval( () => {
  let customOrder = new CustomOrder();
  orderQueue.push(customOrder);
  let obj = {order:customOrder, numberOfOrdersLeft: orderQueue.length};
  socket.emit('pickup', obj);
  console.log('================ PICKUP FIRED ==================', obj);
}, 5000);


socket.on('delivered', payload => {
  console.log(`thank you for delivering ${payload.order.orderId} from all of us at ${STORE_Name}`);
});


function CustomOrder() {
  this.time = new Date(),
  this.storename = process.env.STORE_NAME || '1-800-flowerZ' ,
  this.orderId = faker.datatype.uuid(),
  this.customerName = faker.name.findName(),
  this.customerAddressCity = faker.address.city(),
  this.customerAddressState = faker.address.state(),
  this.customerEmail = faker.internet.email()
}

module.exports = orderQueue;