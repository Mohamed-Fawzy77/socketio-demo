import httpServer from "./http-server.js";
import { Server } from "socket.io";
const io = new Server(httpServer);

function validateTokenAndGetUserIdFromToken(token) {
  if (!token.startWith("id")) {
    throw new Error("invalid token");
  }

  const [_, id] = token.split(":");
  return parseInt(id);
}

const friendShips = [
  {
    firstId: 1,
    secondId: 2,
  },
  {
    firstId: 1,
    secondId: 3,
  },
];

io.on("connection", (socket) => {
  socket.on("login", (token) => {
    try {
      const id = validateTokenAndGetUserIdFromToken(token);

      socket.userId = id;
    } catch (error) {
      socket.disconnect();
    }
  });

  socket.on("join-room", (roomName) => {
    socket.join(roomName);
  });
});

export function sendNewGoldPrice(price) {
  io.emit("gold-price-changed", price);
}

export function sendNewSilverPrice(price) {
  io.emit("silver-price-changed", price);
}

export function sendMessageToRoom(message, room) {
  console.log({ message, room });
  console.log({ x: io.to(room) });
  io.to(room).emit("new-message", message);
}
