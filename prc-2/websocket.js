// // http is the core node module
// const http = require('http');

// // WebSocket is a 3rd party module
// const websocket = require('ws');

// const server = http.createServer( (req, res)=> {
//     res.end("I am connected...");
// })
// const wss= new websocket.WebSocketServer({server});

// // wss.on('headers',(headers,req)=>{
// //     console.log(headers);
// // });

// wss.on('connection', (ws,req) => {
//     ws.send("Connection established with host Syed Kifayat");
//     ws.on('message', (data) => {
//         console.log("Received message: ", data.toString());
//         });
// })

// server.listen(8000,() => {
//     console.log("\n🚀 Server is listening on port 8000...\n");
// });


const http = require('http');
const WebSocket = require('ws');

const server = http.createServer((req,res)=>{
    res.end("welcome to the web server");
});

const wss = new WebSocket.Server({ server });

wss.on('connection',(ws,req)=>{
    ws.send("Hello, world!");
    ws.on("message",(data)=>{
        console.log("Received message: ", data.toString());
    })
})
server.listen(8000, () => {
  console.log('WebSocket Server is running on port 8080');
});