var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET home page. */

router.get("/:country/:region/city-list", function (req, res, next) {
  axios
    .get(
      "http://berkeleyearth.lbl.gov/air-quality/maps/cities/city_list.json"
    )
    .then((d) => {
      let countryIndex = d.data.findIndex(
        (d) => d.country === req.params.country
      );
      if (countryIndex !== -1) {
        let regionIndex = d.data[countryIndex].regions.findIndex(
          (d) => d.region === req.params.region
        );
        if (regionIndex !== -1) {
          let cityList = d.data[countryIndex].regions[regionIndex]["cities"];
          res.json({
            country: req.params.country,
            regions: req.params.region,
            cities: cityList,
          });
        } else {
          res.json({ error: "Region not found" });
        }
      } else {
        res.json({ error: "Country not found" });
      }
    });
});

router.get("/:country/region-list", function (req, res, next) {
  axios
    .get(
      "http://berkeleyearth.lbl.gov/air-quality/maps/cities/city_list.json"
    )
    .then((d) => {
      let countryIndex = d.data.findIndex(
        (d) => d.country === req.params.country
      );
      if (countryIndex !== -1) {
        let regionList = d.data[countryIndex].regions.map((d) => d.region);
        res.json({
          country: req.params.country,
          regions: regionList,
        });
      } else {
        res.json({ error: "Country not found" });
      }
    });
});

router.get("/:country/air-quality", function (req, res, next) {
  axios
    .get(
      "http://berkeleyearth.lbl.gov/air-quality/maps/cities/city_list.json"
    )
    .then((d) => {
      let countryIndex = d.data.findIndex(
        (d) => d.country === req.params.country
      );
      if (countryIndex !== -1) {
        let regionList = d.data[countryIndex].regions.map((d) => d.region);
        res.json({
          country: req.params.country,
          regions: regionList,
        });
      } else {
        res.json({ error: "Country not found" });
      }
    });
});

module.exports = router;
