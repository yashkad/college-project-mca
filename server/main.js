const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const apiRoute = require("./routes/openAi");
require("dotenv").config();

const corsOptions = {
  origin: "http://127.0.0.1:5173",
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", apiRoute);

app.get("/", (req, res) => {
  //   res.redirect(`/${v4()}`);
  res.send("This is the root of the api page");
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("App listining on port : " + port);
});
