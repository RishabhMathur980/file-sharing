const express = require("express");
const router = express.Router();
const upload = require("./../controller/upload");
router.post("/", upload.upload, upload.uploadFile);
router.get("/:uuid", upload.downloadPage);
module.exports = router;
