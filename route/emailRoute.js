const express = require("express");
const router = express.Router();
const download = require("./../controller/upload");
router.post("/", download.email);
module.exports = router;
