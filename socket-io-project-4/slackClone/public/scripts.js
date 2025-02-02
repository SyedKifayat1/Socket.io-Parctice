// const userName = prompt("What is your username?");
// const password = prompt("What is your Password?");  

const userName = "Kifayat";
const password = "x";

const socket = io("http://localhost:9000");

socket.on("connect",()=>{
    console.log("Connected to server");
    socket.emit("clientConnect");
})


// listen for the nsList event from the server which give us the namespace
socket.on("nsList",(nsData)=>{
    const lastNs = localStorage.getItem("lastNs");
    console.log("Received message from server: ", nsData);
    const namespacesDiv = document.querySelector(".namespaces");
    namespacesDiv.innerHTML = "";
    nsData.forEach(ns=>{
        namespacesDiv.innerHTML += ` <div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`
    })
    Array.from(document.getElementsByClassName("namespace")).forEach(element=>{
        console.log(element);
        element.addEventListener("click",()=>{
            joinNs(element,nsData);
        });

    })
    joinNs(document.getElementsByClassName("namespace")[0],nsData);
})