const express = require("express");
const router = express.Router();
const fs = require("fs");

const md = require("markdown-it")();

router.get("/", function (req, res, next) {
  fs.readFile("readme.md", (err, data) => {
    // if there's an error, log it and return
    if (err) {
      console.error(err);
      return;
    }
    res.send(md.render(data.toString()));
  });
});

module.exports = router;
