const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const apiRoute = require("./routes/openAi");
const jdg0 = require("./routes/judgeAPI");
require("dotenv").config();
const { ExpressPeerServer } = require("peer");
const { v4 } = require("uuid");

const socket = require("socket.io")(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});

const corsOptions = {
  origin: "http://127.0.0.1:5173",
  optionsSuccessStatus: 200,
  origin: true,
  credentials: true,
};

const peerServer = ExpressPeerServer(server, { debug: true });

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", apiRoute);
app.use("/judge", jdg0);
app.use("/peerServer", peerServer);

app.get("/", (req, res) => {
  //   res.redirect(`/${v4()}`);
  // res.send("This is the root of the api page");
  res.redirect(`/${v4()}`);
});

app.get("/:room", (req, res) => {
  // res.render("index", { roomId: req.params.room });
  res.send(req.params.room);
});

const port = process.env.PORT || 3000;

socket.on("connection", (io) => {
  console.log("connection established");

  io.on("join-room", (data) => {
    console.log("DATA", data);
    const { userId, room } = data;
    io.join(room);
    io.broadcast.to(room).emit("user-connected", userId);
  });

  io.on("edited", (data) => {
    io.broadcast.to(data.room).emit("is-edited", data);
    console.log(data);
  });

  io.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log("App listining on port : " + port);
});
