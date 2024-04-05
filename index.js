import httpServer, { app } from "./src/http-server.js";
import express from "express";
import {
  sendNewGoldPrice,
  sendNewSilverPrice,
  sendMessageToRoom,
} from "./src/socket-io.gateway.js";

app.use(express.json());

app.post("/gold", (req, res) => {
  const price = req.body.price;

  sendNewGoldPrice(price);
  res.send("new gold price sent");
});

app.post("/silver", (req, res) => {
  const price = req.body.price;

  sendNewSilverPrice(price);
  res.send("new silver price sent");
});

app.post("/send-message-to-room", (req, res) => {
  const { message, room } = req.body;

  sendMessageToRoom(message, room);
  res.send("message sent to room");
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
