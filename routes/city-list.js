var express = require("express");
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", function (req, res, next) {
  axios
    .get(
      "http://berkeleyearth.lbl.gov/air-quality/maps/cities/city_averages.json"
    )
    .then((d) => {
      let cityList = d.data.Cities.map((d) => {
        return {
          "countryName": d[0],
          "countryID":d[0].replace(/ /g,"_"),
          "regionName": d[1],
          "regionID":d[1].replace(/ /g,"_"),
          "cityName": d[2],
          "cityID":d[2].replace(/ /g,"_"),
        }
      })
      res.json(cityList);
    });
});

module.exports = router;
