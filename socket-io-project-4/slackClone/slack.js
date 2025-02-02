const express = require('express');
const socket = require('socket.io');
const namespaces = require("./data/namespaces");
// import { Server } from 'socket.io';
const app = express();

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);

const io = socket(expressServer);


io.on('connection', (socket) => {
    
    socket.emit('welcome', {data:'Hello, client and welcome '});
    socket.on("clientConnect", ()=>{
        console.log("Client connected: " + socket.id);
    })
    socket.emit("nsList",namespaces);
})
