'use strict';

const net = require("net");
const Stream = require('stream');

process.on("uncaughtException", error => {
    console.error(error);
});

const incomingPort = 8002;
const outcomingHost = 'hybrid-server';
const outcomingPort = 8082;

class ProxyProtoFilterChain {
    _onData = data => {
        this._onData = this.next;//only first package has proxy header, others just pass to next chain
        const index = data.indexOf('\r\n');
        const proxyHeader = data.subarray(0, index);

        console.log('-----------------proxy header-------------');
        console.log(proxyHeader.toString());//run all proxy filters
        console.log('------------------------------------------');
        const restData = data.slice(index + 2);
        this.next(restData);
    };

    onData = data => {
        this._onData(data);
    };

    next = data => {
        this.nextChain.onData(data);
    };

    setNext = chain => {
        this.nextChain = chain;
    };

    getStatus = () => {
        return this.nextChain.getStatus();
    }
}

class HTTPFilterChain {
    _onData = data => {
        this._onData = data => { };
        const firstLineEnd = data.indexOf('\r\n');
        const firstLine = data.subarray(0, firstLineEnd);
        const tokens = firstLine.toString().split(' ');
        console.log(`Tokens: ${tokens}`);
        const link = tokens[1];

        this.canPassFilter = !link.startsWith('/forbidden');
    };

    onData = data => {
        this._onData(data);
    };

    getStatus = () => {
        if (this.canPassFilter) {
            return 'pass';
        }
        return 'HTTP/1.1 403 Forbidden\r\n\r\n' +
            '<!DOCTYPE html>' +
            '<html lang="en">' +
            '<head><meta charset="utf-8"><title>Error</title>' +
            '</head>' +
            '<body><pre>This link is forbidden</pre></body>' +
            '</html>\r\n\r\n';
    }
}

const server = net.createServer(incomingSocket => {
    console.log(`New connection from ${incomingSocket.remoteAddress}:${incomingSocket.remotePort}`);
    const filterChain = new ProxyProtoFilterChain();
    filterChain.setNext(new HTTPFilterChain());

    let outcomingSocket;

    incomingSocket.on('data', data => {
        filterChain.onData(data);
        console.log(`Status: ${filterChain.getStatus()}`);
        if (filterChain.getStatus() === 'pass') {
            if (!outcomingSocket) {
                outcomingSocket = new net.Socket();
                outcomingSocket.connect(outcomingPort, outcomingHost);
                outcomingSocket.write(data);
                incomingSocket.pipe(outcomingSocket).pipe(incomingSocket);
                outcomingSocket.on('end', () => console.log(`Out ended`));
                // outcomingSocket.on('data', data => console.log(data.toString()));
            }
        }
        else {
            incomingSocket.end(filterChain.getStatus());
        }
    });
    incomingSocket.on('close', hadErr => console.log(`Closed, had error: ${hadErr}`));
    incomingSocket.on('end', () => console.log(`Ended`));
});

server.listen(incomingPort);
console.log(`Listening on port ${incomingPort}...`);