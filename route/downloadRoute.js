const express = require("express");
const router = express.Router();
const download = require("./../controller/upload");
router.get("/:uuid", download.downloadFile);
module.exports = router;
