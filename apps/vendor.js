'use strict';

require('dotenv').config();
const faker = require('faker');
const events = require('./events');
const orders = [];

function CustomOrder() {
    this.time = new Date()
    this.storeName = faker.company.companyName()
    this.customerAddressStreet = faker.address.streetAddress()
    this.orderId = faker.datatype.uuid()
    this.customerName = faker.name.findName()
    this.customerAddressCity = faker.address.city()
    this.customerAddressZIP = faker.address.zipCode()
    this.customerAddressState = faker.address.state()
    this.customerPhoneNumber = faker.phone.phoneNumber()
    this.customerEmail = faker.internet.email()
    this.customerGender = faker.name.gender()
};

setInterval(() => {

    let customOrder = new CustomOrder();
    orders.push(customOrder);
    let logObj = {
        event: 'pickup',
        order: customOrder,
        numberOfOrders: orders.length
    }
    events.emit('pickup', customOrder);



    console.log('================ PICKUP FIRED ==================', logObj);
}, 8000);

setInterval(() => {
    let deliveryTime = Math.ceil(Math.random() * 8000);
    let customOrder = orders.splice(0, 1);
    let deliveredObj = {
        event: 'delivered',
        order: customOrder,
        time: deliveryTime,
        numberOfOrdersLeft: orders.length
    }
    events.emit('delivered',deliveredObj);
}, 7000);

setInterval(() => {
    let deliveryTime = Math.ceil(Math.random() * 8000);
    let customOrder = orders.splice(0, 1);
    let deliveredObj = {
        event: 'transit',
        order: customOrder,
        time: deliveryTime,
    }
    events.emit('transit',deliveredObj);
}, 6000);

function loggerDelivered(payload) {
    setTimeout(function(){
        console.log('---------------------------------DELIVERED FIRED ---------------------------------', payload);
      }, 15000)
   
}
function loggerTransit(payload) {
  setTimeout(function(){
    console.log('---------------------------------Transit FIRED ---------------------------------', payload);
  }, 5000)
}

events.on('delivered', loggerDelivered);
events.on('transit', loggerTransit);


module.exports = orders;