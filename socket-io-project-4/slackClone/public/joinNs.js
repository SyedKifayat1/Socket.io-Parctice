// We could ask the server for fresh info on this NS. BAD!!
// We have socket.io/ws, and the server will tell us when something has happened!

const joinNs = (element,nsData) => {
    const nsEndpoint = element.getAttribute("ns");
    console.log(nsEndpoint);
    const clickNs = nsData.find(row => row.endpoint === nsEndpoint);
    const rooms = clickNs.rooms;
    const roomList = document.querySelector(".room-list");
    roomList.innerHTML = "";
    console.log(roomList);
    rooms.forEach(room => {
        roomList.innerHTML += `<li><i class="fa-solid fa-lock"></i> ${room.roomTitle}</li>`
    })

    localStorage.setItem("lastNs", nsEndpoint);
}