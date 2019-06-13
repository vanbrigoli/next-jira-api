const http = require("http");
var mongoose = require("mongoose");
const express = require("express");

/**
 * Connect to mongoDB
 */
const configDB = require("./config/db");
mongoose.connect(process.env.MONGODB_URI || configDB.url, {
  useNewUrlParser: true
});

/**
 * API routes
 */
const app = express();
app.get("/", (req, res) => {
  res.send("Hello World!");
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
