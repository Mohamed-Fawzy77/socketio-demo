import httpServer, { app } from "./src/http-server.js";
import express from "express";
import { sendRealTimeMessage } from "./src/socket-io.gateway.js";
import { validateTokenAndGetUserIdFromToken } from "./src/auth.js";
import {
  addMessageToChat,
  getUserChats,
  validateUserAccessToChat,
} from "./src/chats.js";

app.use(express.json());

app.get("/chats", (req, res) => {
  const token = req.headers.token;

  const id = validateTokenAndGetUserIdFromToken(token);

  const userChats = getUserChats(id);

  res.send(userChats);
});

app.post("/message", (req, res) => {
  const token = req.headers.token;

  const userId = validateTokenAndGetUserIdFromToken(token);

  const { message, chatId } = req.body;
  validateUserAccessToChat({ userId, chatId });

  const createdMessage = addMessageToChat({
    message,
    chatId,
    userId,
  });

  sendRealTimeMessage(chatId, createdMessage);
  res.send(createdMessage);
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
