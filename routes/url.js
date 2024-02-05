const express = require("express");
const router = express();

const { handleGenrateNewShortURL } = require("../controllers/url");

router.post("/", handleGenrateNewShortURL);

module.exports = router;
