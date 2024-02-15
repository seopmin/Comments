const express = require("express");
const bodyParser = require("body-parser");
const Router = require('./route');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/", Router);

// app.use((error, req, res, next) => {
//   const status = error.status || 500;
//   const message = error.message || "Something went wrong.";
//   res.status(status).json({ message: message });
// });

const server = app.listen(4000, () => {
  console.log("[SERVER] Start!");
});

const io = require("./socket").init(server);
io.on("connection", (socket) => {
  console.log("Client connected");
});
