import http from "http";
import { Server } from "socket.io";
import fs from "fs";

const server = http.createServer((req, res) => {
  fs.readFile("index.html", (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end("Error loading index.html");
    }
    res.writeHead(200);
    res.end(data);
  });
});

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

io.of("/swise-channel01").on("connection", (socket) => {
  console.log("A user connected");
  // socket.join("swise01");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("swise-test", (msg) => {
    console.log("message: " + msg);
    io.of("/swise-channel01").emit("swise-test", msg);
  });
});

const PORT = process.env.PORT || 25565;

server.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
