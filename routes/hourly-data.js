const express = require("express");
const router = express.Router();
const axios = require("axios");
const { getHours } = require("../utils/getDateTimeRange");
const { getDataAsObj } = require("../utils/getDataAsObj");
const { getHourlyData } = require("../utils/getFinalData");

router.get("/:country", function (req, res, next) {
  axios
    .get(
      `http://berkeleyearth.lbl.gov/air-quality/maps/cities/${req.params.country}/${req.params.country}.txt`
    )
    .then((d) => {
      if (req.query.startDate && req.query.startDate) {
        const startDate = req.query.startDate.split("-"),
          endDate = req.query.endDate.split("-");
        const dateTime = getHours(new Date(startDate), new Date(endDate));
        const dataAsObj = getDataAsObj(d.data);
        const dataFinal = getHourlyData(dataAsObj, dateTime);
        res.json(dataFinal);
      } else {
        const dateTime = new Date();
        const dataAsObj = getDataAsObj(d.data);
        let dateTimeValue = `${dateTime.getUTCFullYear()}-${
          dateTime.getUTCMonth() + 1
        }-${dateTime.getUTCDate()}T${dateTime.getUTCHours() - 1}:00:00`;
        const dataFinal = getHourlyData(dataAsObj, [dateTimeValue]);
        res.json(dataFinal[0]);
      }
    })
    .catch((error) => res.json({ error: error.message }));
});

router.get("/:country/:region", function (req, res, next) {
  axios
    .get(
      `http://berkeleyearth.lbl.gov/air-quality/maps/cities/${req.params.country}/${req.params.region}/${req.params.region}.txt`
    )
    .then((d) => {
      if (req.query.startDate && req.query.startDate) {
        const startDate = req.query.startDate.split("-"),
          endDate = req.query.endDate.split("-");
        const dateTime = getHours(new Date(startDate), new Date(endDate));
        const dataAsObj = getDataAsObj(d.data);
        const dataFinal = getHourlyData(dataAsObj, dateTime);
        res.json(dataFinal);
      } else {
        const dateTime = new Date();
        const dataAsObj = getDataAsObj(d.data);
        let dateTimeValue = `${dateTime.getUTCFullYear()}-${
          dateTime.getUTCMonth() + 1
        }-${dateTime.getUTCDate()}T${dateTime.getUTCHours() - 1}:00:00`;
        const dataFinal = getHourlyData(dataAsObj, [dateTimeValue]);
        res.json(dataFinal[0]);
      }
    })
    .catch((error) => res.json({ error: error.message }));
});

router.get("/:country/:region/:city", function (req, res, next) {
  axios
    .get(
      `http://berkeleyearth.lbl.gov/air-quality/maps/cities/${req.params.country}/${req.params.region}/${req.params.city}.txt`
    )
    .then((d) => {
      if (req.query.startDate && req.query.startDate) {
        const startDate = req.query.startDate.split("-"),
          endDate = req.query.endDate.split("-");
        const dateTime = getHours(new Date(startDate), new Date(endDate));
        const dataAsObj = getDataAsObj(d.data);
        const dataFinal = getHourlyData(dataAsObj, dateTime);
        res.json(dataFinal);
      } else {
        const dateTime = new Date();
        const dataAsObj = getDataAsObj(d.data);
        let dateTimeValue = `${dateTime.getUTCFullYear()}-${
          dateTime.getUTCMonth() + 1
        }-${dateTime.getUTCDate()}T${dateTime.getUTCHours() - 1}:00:00`;
        const dataFinal = getHourlyData(dataAsObj, [dateTimeValue]);
        res.json(dataFinal[0]);
      }
    })
    .catch((error) => res.json({ error: error.message }));
});

/* GET home page. */

module.exports = router;
