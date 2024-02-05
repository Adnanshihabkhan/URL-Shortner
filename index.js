//npm Packedges;
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

//moudule Imports
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const { connectToMongoDB } = require("./connect");
const staticRoute = require("./routes/staticRuter");
const userRoute = require("./routes/user");
const { restrictToLoggedinUserOnly } = require("./middleware/auth");

const app = express();
const PORT = 3000;

//Connect To DB
connectToMongoDB("mongodb://localhost:27017/short-url").then;
console.log("mongodb connected");

//Parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

//ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//route
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );
  if (entry && entry.redirectURL) {
    res.redirect(entry.redirectURL);
  } else {
    // Handle the case where entry or entry.redirectURL is null or undefined
    res.status(404).send("Not Found");
  }
});

//Listen
app.listen(PORT, () => {
  console.log("SERVER STARTED AT " + PORT);
});
