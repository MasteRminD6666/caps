"use strict"

const events = require('./events.js');


function handleDriverPickup(payload) {

    setTimeout(() => {
        console.log('===================DELIVERED SUCCESSFULLY================', payload);

    }, 5000);
}

events.on('pickup', handleDriverPickup);
events.on('delivery', handleDriverPickup)
events.on('transit', handleDriverPickup)

module.exports = handleDriverPickup();