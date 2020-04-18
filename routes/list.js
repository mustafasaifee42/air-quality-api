var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/countries", function (req, res, next) {
  axios
    .get(
      'http://berkeleyearth.lbl.gov/air-quality/maps/cities/country_averages.json'
    )
    .then((d) => {
      let countries = d.data.Countries.map((el) => {
        return {
          "countryName": el[0],
          "countryID":el[0].replace(/ /g,"_")
        }
      })
      res.json(countries)
    })
    .catch(error => res.json({ "error": error.message }));
 
});

router.get("/cities", function (req, res, next) {
  let country = req.query.country
  axios
    .get(
      'http://berkeleyearth.lbl.gov/air-quality/maps/cities/city_averages.json'
    )
    .then((d) => {
      let cities = d.data.Cities.map((el) => {
        let obj = {
          country:el[0],
          "countryID":el[0].replace(/ /g,"_"),
          region:el[1],
          "regionID":el[0].replace(/ /g,"_"),
          city:el[2],
          "cityID":el[0].replace(/ /g,"_"),
        }
        return obj
      })
      if (country)
        {
          let obj = []
          cities.forEach((el) => {
            if (el.countryID === country) obj.push(el)
          })
          res.json(obj)
        }
      else res.json(cities)
    })
    .catch(error => res.json({ "error": error.message }));
 
});
module.exports = router;
