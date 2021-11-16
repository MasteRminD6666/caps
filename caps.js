"use strict"

//Note Rami this hub file used to manage events 


const { v4: uuidv4 } = require('uuid');
const io = require("socket.io")(3001);
const caps = io.of("/caps");
let listOfLogin = [];
let queue = {};
caps.on("connection", socket => {
  console.log('connected to Global', socket.id);
  socket.on("join", storeName => {
    console.log(`Client: ${socket.id} just connected to ${storeName} `);
    let clientObject = {
      time: new Date(),
      client: socket.id,
      room: storeName,
      namespace: '-----CAPS-----',
    }
    listOfLogin.push(clientObject);
    console.log('Here is all the joined clients', listOfLogin);

    if (!queue.hasOwnProperty(storeName)) {
      queue[storeName] = {
        'PickedOrder': {},
        'intransit': {},
      };
    }

  })


})
