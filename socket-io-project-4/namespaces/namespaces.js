const express = require('express');
const socket = require('socket.io');
// import { Server } from 'socket.io';
const app = express();

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(8001);

const io = socket(expressServer);


io.on('connection', (socket) => {
    console.log("Client connected: " + socket.id);
    // in ws we use "sesd" method to connect and in socket.io we use "emit" method to connect
    socket.emit("messageFromServer", { data: "welcome to the socket server" })
    socket.on("newMessageToServer", (dataFromClient) => {
        console.log("Received message: ", dataFromClient.text);
        io.emit("newMessageToClient", { text: dataFromClient.text })

    })
})
