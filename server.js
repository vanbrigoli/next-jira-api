import http from "http";
import mongoose from "mongoose";
import express from "express";

/**
 * Connect to mongoDB
 */
import configDB from "./config/db";
mongoose.connect(process.env.MONGODB_URI || configDB.url, {
  useNewUrlParser: true
});

/**
 * API routes
 */
import routes from "./routes";
const app = express();
const router = express.Router();

routes(router);

app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Hello from Custom JIRA!");
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || "3000";
app.set("port", port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
