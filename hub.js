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
        'delivered': {}
      };
    }

  })
  socket.on('newOrder', payload => {
    let orderId = uuidv4();
    console.log('this is the queue' , queue[payload.store] )
    queue[payload.store]['PickedOrder'][orderId] = payload;
    //TODO create another one for transit 
    // no need rami to send the id get it from the payload 
    // const orderId = queue[payload.store]['PickedOrder'].orderId
    // console.log('worked',orderId);
    console.log('current order queue', queue[payload.store]);
    caps.emit('order', { orderId, payload })
  })

  
  socket.on('intransit', ({ orderId, payload }) => {
    delete queue[payload.store]['PickedOrder'][orderId];
    queue[payload.store]['intransit'][orderId] = payload;
 
      console.log('updated queue:', queue[payload.store]);
      
  

  })

    socket.on('delivered', ({orderId,payload}) => {

      delete queue[payload.store]['intransit'][orderId];
      queue[payload.store]['delivered'][orderId] = payload;
      setTimeout(() => {
        console.log('updated queue:', queue[payload.store]);
        
      },20000)
  
    })

  socket.on('delivered', payload => {
    setTimeout(() => {
      console.log(`Your order has been delivered order store-Name:${payload.store} Order_id: ${payload.orderId} `);
      
    },20000)
   
      

    caps.emit('send', payload);


  });
})
