var net = require("net");

process.on("uncaughtException", function (error) {
    console.error(error);
});

var incomingPort = 8002;
var outcomingHost = 'hybrid-server';
var outcomingPort = 8082;

var server = net.createServer(incomingSocket => {
    console.log(`New connection from ${incomingSocket.remoteAddress}:${incomingSocket.remotePort}`);
    var outcomingSocket = new net.Socket();
    outcomingSocket.connect(outcomingPort, outcomingHost);

    outcomingSocket.on('connect', () => {
        console.log(`Connected to outcoming host ${outcomingHost}:${outcomingPort}`);
    });

    incomingSocket.pipe(outcomingSocket).pipe(incomingSocket);
});

server.listen(incomingPort);
console.log(`Listening on port ${incomingPort}...`);