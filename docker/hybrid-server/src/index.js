'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express()
app.get('/', (req, res) => {
    res.send(`Hello World, your ip: ${req.ip.toString()}\r\n`);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);