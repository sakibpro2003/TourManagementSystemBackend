import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL!);
    console.log("DB connected !");
    server = app.listen(envVars.PORT, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

// Unhandled rejection
process.on("unhandledRejection", (error) => {
  console.log("Unhandled rejection detected. Server shutting down...", error);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
    process.exit(1);
  }
});

process.on("uncaughtException", (error) => {
  console.log("Uncaught rejection detected. Server shutting down...", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
    process.exit(1);
  }
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal recieved. Server shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//uncaught error test
// throw new Error("Uncaught error test");

//unhandled error test
// Promise.reject(new Error("Unhandled promise error"));
