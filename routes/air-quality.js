var express = require("express");
var router = express.Router();
const axios = require("axios");

var getDates = function(startDate, endDate) {
    var dates = [],
        addDays = function(days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        },
        currentDate = addDays.call(startDate, 1);
    while (currentDate <= addDays.call(endDate, 1)) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };
  
/* GET home page. */
router.get("/:country/:region/:city", function (req, res, next) {
  let startDate = req.query.startDate.split('-'), endDate = req.query.endDate.split('-');
  var dates = getDates(new Date(startDate), new Date(endDate));
  axios
    .get(
      `http://berkeleyearth.lbl.gov/air-quality/maps/cities/${req.params.country}/${req.params.region}/${req.params.city}.json`
    )
    .then((d) => {
      let arr = dates.map((date) => {
        let dateString = date.toISOString().substring(0, 10);
        let indx = d.data.day_data.findIndex(el => el[0] === dateString)
        if(indx !== -1)
          return {
            date: dateString,
            average: d.data.day_data[indx][1][0],
            max: d.data.day_data[indx][1][1],
            min: d.data.day_data[indx][1][2],
          }
        return {
          date: dateString,
          average: null,
          max: null,
          min: null,
        }
        
      })
      res.json(arr)
    })
    .catch(error => res.json({ "error": error.message }));
 
});

router.get("/:country", function (req, res, next) {
  let startDate = req.query.startDate.split('-'), endDate = req.query.endDate.split('-');
  var dates = getDates(new Date(startDate), new Date(endDate));
  axios
    .get(
      `http://berkeleyearth.lbl.gov/air-quality/maps/cities/${req.params.country}/${req.params.country}.json`
    )
    .then((d) => {
      let arr = dates.map((date) => {
        let dateString = date.toISOString().substring(0, 10);
        let indx = d.data.day_data.findIndex(el => el[0] === dateString)
        if(indx !== -1)
          return {
            date: dateString,
            average: d.data.day_data[indx][1][0],
            max: d.data.day_data[indx][1][1],
            min: d.data.day_data[indx][1][2],
          }
        return {
          date: dateString,
          average: null,
          max: null,
          min: null,
        }
        
      })
      res.json(arr)
    })
    .catch(error => res.json({ "error": error.message }));
 
});

router.get("/:country/:region", function (req, res, next) {
  let startDate = req.query.startDate.split('-'), endDate = req.query.endDate.split('-');
  var dates = getDates(new Date(startDate), new Date(endDate));
  axios
    .get(
      `http://berkeleyearth.lbl.gov/air-quality/maps/cities/${req.params.country}/${req.params.region}/${req.params.region}.json`
    )
    .then((d) => {
      let arr = dates.map((date) => {
        let dateString = date.toISOString().substring(0, 10);
        let indx = d.data.day_data.findIndex(el => el[0] === dateString)
        if(indx !== -1)
          return {
            date: dateString,
            average: d.data.day_data[indx][1][0],
            max: d.data.day_data[indx][1][1],
            min: d.data.day_data[indx][1][2],
          }
        return {
          date: dateString,
          average: null,
          max: null,
          min: null,
        }
        
      })
      res.json(arr)
    })
    .catch(error => res.json({ "error": error.message }));
 
});


router.get("/countries", function (req, res, next) {
  axios
    .get(
      'http://berkeleyearth.lbl.gov/air-quality/maps/cities/country_averages.json'
    )
    .then((d) => {
      let countries = d.data.map((el) => {
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
      let cities = d.data.map((el) => {
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
