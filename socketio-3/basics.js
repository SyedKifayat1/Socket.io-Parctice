// this is 3rd party modules from npm 
const express = require('express');
const socket = require('socket.io');

const app = express();

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(8000,()=>{
    console.log("Server is running on port 8000");
});

const io = socket(expressServer)

io.on('connection',(socket) => {
    console.log("Client connected: "+ socket.id);
    // in ws we use "sesd" method to connect and in socket.io we use "emit" method to connect
    socket.emit("messageFromServer", {data:"welcome to the socket server"})
    socket.on("messageToServer",(data)=>{
        console.log("Received message: ", data.data);
        // io.emit("messageFromServer", {data: "message received by server"})
    })
})
