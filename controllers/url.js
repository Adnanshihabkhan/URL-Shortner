const URL = require("../models/url");

const shortid = require("shortid");

async function handleGenrateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.render("home", {
    id: shortID,
  });
}

module.exports = {
  handleGenrateNewShortURL,
};
