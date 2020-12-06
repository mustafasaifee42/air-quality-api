const express = require("express");
const router = express.Router();
const axios = require("axios");
const { getDataAsObj } = require("../utils/getDataAsObj");

function dataFomatting(inputData) {
  const dataAsObj = getDataAsObj(inputData);
  return dataAsObj;
}

router.get("/:country/", GetDataForCountry, function (req, res) {
  res.json(dataFomatting(req.data));
});

router.get("/:country/:region", GetDataForRegion, function (req, res) {
  res.json(dataFomatting(req.data));
});

router.get("/:country/:region/:city", GetDataForCity, function (req, res) {
  res.json(dataFomatting(req.data));
});

function GetDataForCountry(req, res, next) {
  axios
    .get(
      `http://berkeleyearth.lbl.gov/air-quality/maps/cities/${req.params.country}/${req.params.country}.txt`
    )
    .then((d) => {
      req.data = d.data;
      next();
    })
    .catch((error) => res.json({ error: error.message }));
}

function GetDataForRegion(req, res, next) {
  axios
    .get(
      `http://berkeleyearth.lbl.gov/air-quality/maps/cities/${req.params.country}/${req.params.region}/${req.params.region}.txt`
    )
    .then((d) => {
      req.data = d.data;
      next();
    })
    .catch((error) => res.json({ error: error.message }));
}

function GetDataForCity(req, res, next) {
  axios
    .get(
      `http://berkeleyearth.lbl.gov/air-quality/maps/cities/${req.params.country}/${req.params.region}/${req.params.city}.txt`
    )
    .then((d) => {
      req.data = d.data;
      next();
    })
    .catch((error) => res.json({ error: error.message }));
}

module.exports = router;
