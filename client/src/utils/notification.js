const notification = () => {
  const socket = new WebSocket("ws://100.110.132.88:8080");

  socket.addEventListener("open", (event) => {
    console.log("WebSocket connection established");
  });

  socket.addEventListener("message", (event) => {
    const message = event.data;
    return message;
  });

  socket.addEventListener("close", (event) => {
    console.log("WebSocket connection closed");
  });
};

export default notification;
