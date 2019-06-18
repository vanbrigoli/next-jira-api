import http from "http";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import setAdmin from "./utils/setAdmin";

/**
 * Connect to mongoDB
 */
import configDB from "./config/db";
mongoose
  .connect(process.env.MONGODB_URI || configDB.url, {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Successfully connected to DB.");
    setAdmin();
  })
  .catch(error => {
    console.error("Connection error.");
  });

/**
 * API routes
 */
import routes from "./routes";
const app = express();
const router = express.Router();
// Setup cors
app.use(cors());

// Setup body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
