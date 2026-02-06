import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sakib:sakib2@cluster0.cphe2d0.mongodb.net/HealthSyncHospital?retryWrites=true&w=majority&appName=Cluster0",
    );
    console.log("DB connected !");
    server = app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
