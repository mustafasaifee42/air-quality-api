var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://berkeleyearth.lbl.gov/air-quality/maps/cities/country_averages.json').then(d => {
    let countryList = d.data.Countries.map((d) => {
      return {
        "countryName": d[0],
        "countryID":d[0].replace(/ /g,"_")
      }
    })
    res.json(countryList);
  })
});

module.exports = router;
