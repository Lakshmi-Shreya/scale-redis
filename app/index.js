const express = require("express");
const app = express();
const server = require("http").createServer(app);
const port = 3000;

// Scaling With Sockets
const io = require("socket.io")(server);
const redis = require("socket.io-redis");
io.adapter(redis({ host: "192.168.137.67", port: 6379 }));
// io.adapter(redis({ host: "localhost", port: 6379 }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).sendFile("public/index.html");
});

// var count = 0;

io.on("connection", (socket) => {
  // count++;
  // io.emit("count", count);
  // console.log(socket.id + " Is Connected!");

  socket.emit("id", process.env.ID);

  socket.on("msg", (msg) => {
    socket.broadcast.emit("msg", msg);
  });

  socket.on("disconnect", () => {
    // count--;
    // io.emit("count", count);
    // console.log(socket.id + " Is Disconnected");
  });
});

server.listen(port, () => {
  console.log("Listening On Port " + port);
});
