'use strict';
require('../caps');
require('../driver/driver');
require('../vendor/vendor');
require('dotenv').config();
const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
// const events = require('../apps/events');
// const socket = require('socket')
const faker = require('faker')
// require('../apps/vendor.js');



describe('hub test', () => {
  let io, serverSocket, clientSocket;
  // let consoleSpy;
  // let payload = {
  //   orderId: faker.datatype.uuid(),
  //   clientName: faker.name.findName(),
  //   store: process.env.STORE_NAME,
  //   address: faker.address.streetAddress()
  // }
  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });
  // beforeEach(() => {

  //   consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  // });

  // afterEach(() => {

  //   consoleSpy.mockRestore();
  // });
  afterAll(() => {
    io.close();
    clientSocket.close();
  });
  test("should work", (done) => {
    clientSocket.on("hello", (arg) => {
      expect(arg).toBe("world");
      done();
    });
    serverSocket.emit("hello", "world");
  });

  test("should work (with ack)", (done) => {
    serverSocket.on("hi", (cb) => {
      cb("hola");
    });
    clientSocket.emit("hi", (arg) => {
      expect(arg).toBe("hola");
      done();
    });
  });

  // it('test pickup',async () => {

  //   events.emit('newOrder', payload);
  //   await expect(consoleSpy).toHaveBeenCalled();
  // });

  // it('test tranist',async () => {
   
  //   events.emit('intransit', payload);

  //   await expect(consoleSpy).toHaveBeenCalled();
  // });

  // it('test delivered',async () => {

  //   events.emit('delivered');
  //   expect(consoleSpy).toHaveBeenCalled();
  // });

});