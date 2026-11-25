const { io } = require("socket.io-client");

const token = process.env.JWT_TOKEN;
if (!token) throw new Error("Set JWT_TOKEN to the token returned by login");

const socket = io("http://localhost:5000", { auth: { token } });

socket.on("connect", () => {
  console.log("Connected:", socket.id);
  socket.emit("joinRoom", "general");
  socket.emit("chatMessage", { room: "general", message: "Hello from Socket.IO client!" });
});
socket.on("joinedRoom", console.log);
socket.on("chatMessage", (data) => console.log("CHAT:", data));
socket.on("connect_error", (error) => console.error("Connection error:", error.message));