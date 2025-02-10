// const userName = prompt("What is your username?");
// const password = prompt("What is your Password?");  

const userName = "Kifayat";
const password = "x";


//always join the main namespace, because that's where the client gets the other namespace from
const socket = io("http://localhost:9000");
// const socket1 = io("http://localhost:9000/mozilla");
// const socket2 = io("http://localhost:9000/linux");
// const socket3 = io("http://localhost:9000/wiki");


// socket will be put into this array, in the index of their ns.id
const nameSpaceSockets = [];
const listeners = {
    "nsChange": [],
    "message": []
}

 
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
        
        //update the HTML with each ns
        namespacesDiv.innerHTML += ` <div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`

        // initialize thisNs as its index in nameSpaceSocket
        // if the connection is new then this will be null
        // if the connection has already been established then it will reconnect and remain on its spot
        // let thisNs = nameSpaceSockets[ns.id];

        if(!nameSpaceSockets[ns.id])
        {
            // there is no socket at this nsId. So make a new connection
            //join this namespace with with io()
            io(`http://localhost:9000${ns.endpoint}`); 
        }

        
        
        // nameSpaceSockets[ns.id] = thisNs;
        // thisNs.on("nsChange", (data) => {
        //     console.log("Namespace changed", data);
        // }); 
    })
    Array.from(document.getElementsByClassName("namespace")).forEach(element=>{
        console.log(element);
        element.addEventListener("click",()=>{
            joinNs(element,nsData);

        });

    })
    joinNs(document.getElementsByClassName("namespace")[0],nsData);
})