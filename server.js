/* eslint-disable no-unused-vars */
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const http = require("http");
const socket = require("socket.io");
const { connectDB } = require("./config/configDB");
const messageSchema = require("./models/msgSchema");
//creating server instance
const app = express();
//creating http server
const server = http.createServer(app);

//@todo add ticket history feature

//accessing environment vars
dotenv.config({ path: "./config/config.env" });

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const io = socket(server, {
  cors: {
    origin: "*",
  },
});

const messageStream = messageSchema.watch();

app.post("/sendMessage", async (req, res) => {
  try {
    await messageSchema.create(req.body);
    res.status(200).json({
      msg: "message sent",
    });
  } catch (error) {
    res.json({
      msg: "couldnt send message",
    });
  }
});

io.on("connection", (socket) => {
  console.log(`Web Socket connected on ${socket.id}`);

  messageStream.on("change", (change) => {
    if (change.operationType === "insert") {
      console.log("new message inserted");
      socket.emit("send-message", change.fullDocument);
    }
  });

  socket.on("fetch-messages", async (id) => {
    const messages = await messageSchema.find();
    socket.emit("recieve-message", messages);
  });
});

//route files
const user = require("./routes/user");
const project = require("./routes/project");
const ticket = require("./routes/tickets");
const comment = require("./routes/comments");

app.get("/", (req, res) => {
  res.status(200).json({ message: "app" });
});

//mounting routers
app.use("/auth", user);
app.use("/project", project);
app.use("/ticket", ticket);
app.use("/comments", comment);

let PORT = process.env.PORT || 50000;

server.listen(PORT, () => {
  console.log(
    `App is running on port ${PORT} in ${process.env.NODE_ENV} mode`.green
      .underline
  );
});
