"use strict";
require('dotenv').config();
const io = require("socket.io-client");
const HUB_SERVER = process.env.HUB_SERVER || "http://localhost:3001/caps";
const client = io.connect(HUB_SERVER);

client.on('order', ({ orderId, payload }) => {
    client.emit("intransit", { orderId, payload });

    console.log(`DRIVER: Package # ${payload.orderId} is ready for pickup`);

    setTimeout(() => {
        console.log(`DRIVER: Package # ${payload.orderId} in transit`);
    }, 5000)

    setTimeout(() => {
        console.log(`DRIVER: Package # ${payload.orderId} in delivered`);
    }, 10000)
});
