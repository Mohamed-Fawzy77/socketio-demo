import { validateTokenAndGetUserIdFromToken } from "./auth.js";
import { validateUserAccessToChat } from "./chats.js";
import httpServer from "./http-server.js";
import { Server } from "socket.io";
const io = new Server(httpServer);

function getChatRoomName(chatId) {
  return `chat-${chatId}`;
}

io.on("connection", (socket) => {
  try {
    const userId = validateTokenAndGetUserIdFromToken(
      socket.handshake.headers.token
    );
    socket.userId = userId;
  } catch (error) {
    socket.disconnect();
  }

  socket.on("subscribe-to-chat", (chatId) => {
    try {
      const userId = socket.userId;
      validateUserAccessToChat({
        userId,
        chatId: +chatId,
      });
      socket.join(getChatRoomName(chatId));

      socket.emit("message", `subscribed to chat ${chatId}`);
    } catch (error) {
      socket.emit("message", `failed to subscribe to chat ${chatId}`);
    }
  });
});

export function sendRealTimeMessage(chatId, message) {
  io.to(getChatRoomName(chatId)).emit("new-chat-message", message);
}
