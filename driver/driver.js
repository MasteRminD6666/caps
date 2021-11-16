"use strict";
require('dotenv').config();
const io = require("socket.io-client");
const HUB_SERVER = process.env.HUB_SERVER || "http://localhost:3001/caps";
const client = io.connect(HUB_SERVER);



client.on('send', payload => {

    console.log(`Thank you for delivering  Package # ${payload.orderId.orderId} delivered`);
  });