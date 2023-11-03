const Modbus = require('jsmodbus');
const { Buffer } = require('node:buffer');
const net = require('net');

// Modbus server details
const serverHost = '192.168.59.231';
const serverPort = 502;

// Create a TCP socket connection
const socket = new net.Socket();
const client = new Modbus.client.TCP(socket);

// Connect to the Modbus server
socket.connect(serverPort, serverHost, () => {
  console.log('Connected to Modbus server');

  client.readHoldingRegisters(0, 10)
    .then((data) => {
      console.log('Read holding registers successful');
      const fullDecodedData = data.response;
      console.log("fullDecodedData", fullDecodedData);
      const pHvaluesAsArray = data.response._body.valuesAsArray;
      const pHvaluesAsBuffer = data.response._body.valuesAsBuffer;
    })
    
    .catch((error) => {
      console.error('Error occurred:', error);
    })
    .finally(() => {
      // Close the connection
      socket.end();
    });

});

// Handle socket close
socket.on('close', () => {
  console.log('Socket closed');
});

// Handle socket errors
socket.on('error', (error) => {
  console.error('Socket error:', error);
});