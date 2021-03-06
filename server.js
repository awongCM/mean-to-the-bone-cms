const express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path"),
  http = require("http"),
  app = express();

// API routes
const api = require("./server/routes/api.routes");

const mongo_server = require("./server/models/index");

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, "dist")));

// TODO: CORS rules for local development
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// API location
app.use("/api", api);

// Send all other requests to the Angular app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

//Set Port
const port = process.env.PORT || "8080";
app.set("port", port);

const server = http.createServer(app);

server.listen(port, async () => {
  const isConnected = await mongo_server.openDB();
  const message = isConnected ? "connected" : "not connected";
  console.log(`Running on localhost:${port} and with DB is ${message}`);
});
