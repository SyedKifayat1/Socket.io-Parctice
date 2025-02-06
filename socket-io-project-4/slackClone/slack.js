const express = require('express');
const socket = require('socket.io');
const namespaces = require("./data/namespaces");
// import { Server } from 'socket.io';
const app = express();
const Room = require("./classes/Room")



app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);

const io = socket(expressServer);

app.get('/change-ns', (req, res)=> {
    //update the namespaces array
    
    namespaces[0].addRoom(new Room(3,"Deleted Article",0));
    //let everyone know in THIS namespace that it changed
    io.of(namespaces[0].endpoint).emit('nsChange',namespaces[0]);
    console.log(namespaces[0].endpoint);
    res.json(namespaces[0]);
});

io.on('connection', (socket) => {
    
    socket.emit('welcome', {data:'Hello, client and welcome '});
    socket.on("clientConnect", ()=>{
        console.log("Client connected: " + socket.id);
    })
    socket.emit("nsList",namespaces);
})


namespaces.forEach((namespace)=>{
    io.of(namespace.endpoint).on("connection",(socket) => {
        console.log(`${socket.id} connected to endpoint: ${namespace.endpoint}`);
    })
    
})