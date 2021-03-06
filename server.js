const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");

//@todo add ticket history feature

//accessing environment vars
dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

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

app.listen(PORT, () => {
  console.log(
    `App is running on port ${PORT} in ${process.env.NODE_ENV} mode`.green
      .underline
  );
});
