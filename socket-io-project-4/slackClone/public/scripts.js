const userName = prompt("What is your username?");
const password = prompt("What is your Password?");  

const socket = io("http://localhost:9000");

socket.on("connect",()=>{
    console.log("Connected to server");
    socket.emit("clientConnect");
})


// listen for the nsList event from the server which give us the namespace
socket.on("nsList",(nsData)=>{
    console.log("Received message from server: ", nsData);
    const namespacesDiv = document.querySelector(".namespaces");
    nsData.forEach(ns=>{
        namespacesDiv.innerHTML += ` <div class="namespace" ns="${ns.name}"><img src="${ns.image}"></div>`
    })
})