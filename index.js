var osc = require("osc");
var config = require('./config.js')();
var io = require('socket.io-client');
var socket = io.connect(config.serverAddress);

/**
 * Init the open sound control connection
 */
var udpPort = new osc.UDPPort({
    localAddress: config.address,
    localPort: config.inputPort,
    remoteAddress: config.address,
    remotePort: config.outputPort
});

/**
 * Open up the UDP port
 */
udpPort.open();

/**
 * Handle incoming OSC messages by sending them over SOCKET.IO/websocket to the server
 */
udpPort.on("message", function (oscMessage) {
  socket.emit(oscMessage.address, scMessage.args[0]);
  console.log("Received OSC Message ", oscMessage);
});

/**
 * Aux function to make sure we listen to all events
 */
(function initAllEvents(){
  var onevent = socket.onevent;
  socket.onevent = function (packet) {
      var args = packet.data || [];
      onevent.call (this, packet);    // original call
      packet.data = ["*"].concat(args);
      onevent.call(this, packet);      // additional call to catch-all
  };
})();


/**
 * Thanks the the initAllEvents function we can map all incoming SOCKET.IO/websocket messages
 * || maps them to OSC
 */
socket.on("*",function(event,data) {
    var msg = {
        address: "/"+event.description,
        args: data.__v
    };
    console.log("Sending OSC message", msg.address, msg.args, "to", udpPort.options.remoteAddress + ":" + udpPort.options.remotePort);
    udpPort.send(msg);
});
