import express from "express";
// import http from "http";
import { createServer } from "node:http";

export const app = express();
const httpServer = createServer(app);

export default httpServer;
