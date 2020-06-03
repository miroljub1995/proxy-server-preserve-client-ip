'use strict';

const express = require('express')
const MongoClient = require('mongodb')

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const MONGO_URI = 'mongodb://mongo-db-0.mongo-db:27017,mongo-db-1.mongo-db:27017,mongo-db-2.mongo-db:27017/?replicaSet=repl-set0'

const app = express()
app.get('/', (req, res) => {
    res.send(`Hello World, your ip: ${req.ip.toString()}\r\n`);
});

app.get('/mongo-repl-status', (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    MongoClient.connect(MONGO_URI, { useUnifiedTopology: true, }, (err, client) => {
        try {
            if (err) {
                console.log(err)
                res.send(JSON.stringify(err, null, '\t'))
                return;
            }
            client.db('admin').admin().replSetGetStatus((err, result) => {
                if (err) {
                    console.log(err)
                    res.send(JSON.stringify(err, null, '\t'))
                    return;
                }
                res.send(JSON.stringify(result, null, '\t'))
            })
        }
        catch (err) {
            console.log(err)
            res.send(JSON.stringify(err, null, '\t'))
        }
    })
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);