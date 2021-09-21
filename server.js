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
const ngrock = require("ngrok");
//creating server instance
const app = express();
//creating http server
const server = http.createServer(app);

//@todo add ticket history feature

//accessing environment vars
dotenv.config({ path: "./config/config.env" });

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const io = socket(server, {
  cors: {
    origin: "*",
  },
});

//route files
const user = require("./routes/user");
const project = require("./routes/project");
const ticket = require("./routes/tickets");
const comment = require("./routes/comments");

//testroute
app.get("/", (req, res) => {
  res.status(200).json({ message: "app" });
});

//mounting routers
app.use("/auth", user);
app.use("/project", project);
app.use("/ticket", ticket);
app.use("/comments", comment);

//ngrock tunnel to expose local host to public domain
// (async function () {
//   await ngrock.connect({
//     proto: "http",
//     addr: "5000",
//   });
// })();

let PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `App is running on port ${PORT} in ${process.env.NODE_ENV} mode`.green
      .underline
  );
});
