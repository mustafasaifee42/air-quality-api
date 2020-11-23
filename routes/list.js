var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/countries", function (req, res, next) {
  axios
  .get("http://berkeleyearth.lbl.gov/air-quality/maps/cities/city_list.json")
  .then((d) => {
    let countries = [];
    d.data.forEach((country) => {
          let obj = {
            countryName: country.country.replace(/_/g, " "),
            countryID: country.country,
          };
          countries.push(obj);
        });
        res.json(countries);
        
    })
    .catch((error) => res.json({ error: error.message }));
});

router.get("/cities", function (req, res, next) {
  let countryFilter = req.query.country;
  axios
    .get("http://berkeleyearth.lbl.gov/air-quality/maps/cities/city_list.json")
    .then((d) => {
      let cities = [];
      d.data.forEach((country) => {
        country.regions.forEach((region) => {
          region.cities.forEach((city) => {
            let obj = {
              countryName: country.country.replace(/_/g, " "),
              countryID: country.country,
              regionName: region.region.replace(/_/g, " "),
              regionID: region.region.replace(/ /g, "_"),
              cityName: city.replace(/_/g, " "),
              cityID: city.replace(/ /g, "_"),
            };
            cities.push(obj);
          });
        });
      });
      if (countryFilter) {
        cities = cities.filter((city) => city["countryID"] === countryFilter);
      }
      res.json(cities);
    })
    .catch((error) => res.json({ error: error.message }));
});
module.exports = router;
