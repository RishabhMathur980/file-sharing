const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const pug = require("pug");
const path = require("path");
const app = express();
const cors = require("cors");
const File = require("./model/file");
const fs = require("fs");
const UploadRoute = require("./route/uploadRoute");
const downloadRoute = require("./route/downloadRoute");
const emailRoute = require("./route/emailRoute");
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
const PORT = process.env.PORT;
const DB = process.env.LINK;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("connected");
  });
app.use("/api/files", UploadRoute);
app.use("/download", downloadRoute);
app.use("/email", emailRoute);
app.get("/files", async (req, res) => {
  const number = fs.readFileSync(`${__dirname}/file.txt`, "utf-8");
  const data = await File.findOne({ uuid: number });
  res.render("index", {
    data,
  });
});
app.get("/", (req, res) => {
  res.render("index");
});
// app.get("/", (req, res) => {
//   res.render("index");
// });
app.listen(PORT, () => {
  console.log(`server is running at ${PORT} port`);
});
