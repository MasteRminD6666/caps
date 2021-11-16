"use strict";
require('dotenv').config();
const io = require("socket.io-client");
const HUB_SERVER = process.env.HUB_SERVER || "http://localhost:3001/caps";
const faker = require('faker');
const client = io.connect(HUB_SERVER);
const guitarStore = '1-206-flowers';
const animeStore = 'AnimeGate';
client.emit('join', guitarStore);
client.emit('join', animeStore);

setTimeout(() => {
  let order = {
    orderId: faker.datatype.uuid(),
    clientName: faker.name.findName(),
    store: guitarStore,
    address: faker.address.streetAddress()
  }
  client.emit('newOrder', order);


}, 1000)
client.on('order', ({ orderId, payload }) => {
  client.emit("intransit", { orderId, payload });

  console.log(`DRIVER: Package # ${payload.orderId} is ready for pickup`);

  setTimeout(() => {
      console.log(`DRIVER: Package # ${payload.orderId} in transit`);
  }, 5000)

  setTimeout(() => {
      console.log(`DRIVER: Package # ${payload.orderId} in delivered`);
  }, 20000)
});


client.on('order', ({ orderId, payload }) => {
  client.emit('delivered',{ orderId, payload })

})


