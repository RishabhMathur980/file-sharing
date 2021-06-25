const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const File = require("./../model/file");
const Email = require("./../services/email");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, unique);
  },
});
exports.upload = multer({
  storage,
  limit: { fileSize: 1000000 * 100 },
}).single("myfile");
exports.uploadFile = async (req, res) => {
  if (!req.file) {
    res.status(400).json({
      status: "err",
    });
  }
  const data = await File.create({
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size,
    uuid: uuidv4(),
  });
  fs.writeFile(`${__dirname}/../file.txt`, data.uuid, "utf-8", (err) => {
    if (err) {
      console.log("unable to edit the file");
    }
  });

  res.status(200).json({
    status: `file: ${process.env.URL}files/${data.uuid}`,
  });
  //   upload(req, res, async (err) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     if (!req.file) {
  //       res.status(400).json({
  //         status: "err",
  //       });
  //     }
  //     // console.log(req.file);
  //     const data = await File.create({
  //       filename: req.file.filename,
  //       path: req.file.path,
  //       size: req.file.size,
  //       uuid: uuid4(),
  //     });
  //     res.status(200).json({
  //       status: `file: ${process.env.URL}files/${data.uuid}`,
  //     });
  //   });
};
exports.downloadPage = async (req, res) => {
  const id = req.params.uuid;
  const data = await File.findOne({ uuid: id });
  res.render("download", {
    data,
  });

  //   res.status(200).json({
  //     status: data,
  //   });
};
exports.downloadFile = async (req, res) => {
  const id = req.params.uuid;
  const data = await File.findOne({ uuid: id });
  if (!data) {
    res.send("error");
  }
  const filePath = `${__dirname}/../${data.path}`;
  res.download(filePath);
};
exports.email = async (req, res) => {
  // console.log(req.body);
  const { sender, receiver } = req.body;
  const number = fs.readFileSync(`${__dirname}/../file.txt`, "utf-8");
  const data = await File.findOne({ uuid: number });
  data.sender = sender;
  data.receiver = receiver;
  const response = await data.save();
  const url = `${process.env.URL}api/files/${number}`;
  await new Email(response, url).link();
  res.status(200).json({
    status: "success",
    response,
  });
};
