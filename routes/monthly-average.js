const express = require("express");
const router = express.Router();
const axios = require("axios");
const { getHours } = require("../utils/getDateTimeRange");
const { getDataAsObj } = require("../utils/getDataAsObj");
const { getMonthlyData } = require("../utils/getFinalData");

router.get("/:country", function (req, res, next) {
  axios
    .get(
      `http://berkeleyearth.lbl.gov/air-quality/maps/cities/${req.params.country}/${req.params.country}.txt`
    )
    .then((d) => {
      const startDate = req.query.startDate.split("-"),
        endDate = req.query.endDate.split("-");
      const dateTime = getHours(
        new Date([startDate[0], startDate[1], "01"]),
        new Date([endDate[0], endDate[1], "01"])
      );
      const dataAsObj = getDataAsObj(d.data);
      const dataFinal = getMonthlyData(dataAsObj, dateTime);
      res.json(dataFinal);
    })
    .catch((error) => res.json({ error: error.message }));
});

router.get("/:country/:region", function (req, res, next) {
  axios
    .get(
      `http://berkeleyearth.lbl.gov/air-quality/maps/cities/${req.params.country}/${req.params.region}/${req.params.region}.txt`
    )
    .then((d) => {
      const startDate = req.query.startDate.split("-"),
        endDate = req.query.endDate.split("-");
      const dateTime = getHours(
        new Date([startDate[0], startDate[1], "01"]),
        new Date([endDate[0], endDate[1], "01"])
      );
      const dataAsObj = getDataAsObj(d.data);
      const dataFinal = getMonthlyData(dataAsObj, dateTime);
      res.json(dataFinal);
    })
    .catch((error) => res.json({ error: error.message }));
});

router.get("/:country/:region/:city", function (req, res, next) {
  axios
    .get(
      `http://berkeleyearth.lbl.gov/air-quality/maps/cities/${req.params.country}/${req.params.region}/${req.params.city}.txt`
    )
    .then((d) => {
      const startDate = req.query.startDate.split("-"),
        endDate = req.query.endDate.split("-");
      const dateTime = getHours(
        new Date([startDate[0], startDate[1], "01"]),
        new Date([endDate[0], endDate[1], "01"])
      );
      const dataAsObj = getDataAsObj(d.data);
      const dataFinal = getMonthlyData(dataAsObj, dateTime);
      res.json(dataFinal);
    })
    .catch((error) => res.json({ error: error.message }));
});

/* GET home page. */

module.exports = router;
