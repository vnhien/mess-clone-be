// Import the 'express' module
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import "./overide";
import { authRouter } from "./routes/auth-route";
import cors from "cors";
import { initSockerServer } from "./socket";
import { devRouter } from "./routes/dev";
import { userRouter } from "./routes/user-route";

// Create an Express application
const app = express();
// Set the port number for the server
const port = process.env.DEFAULT_PORT || 3003;

//
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb" }));
app.options("*", cors());
app.use(cors());
app.use(express.static("public"));
app.set("trust proxy", true);

// Define a route for the root path ('/')
app.get("/", (req, res) => {
  // Send a response to the client
  res.send("Hello world !!!!!!!!!!");
});

app.use("/auth", authRouter);
app.use("/dev", devRouter);
app.use("/user", userRouter);
// Start the server and listen on the specified port
var server = app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
});

initSockerServer(server);
