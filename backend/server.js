import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import licenseRoutes from "./routes/license.routes.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

import { app, server } from "./socket/socket.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/license", licenseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/conversations", conversationRoutes);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on ${PORT}`);
});
