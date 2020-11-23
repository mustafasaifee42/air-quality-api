const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", function (req, res, next) {
  axios
    .get(
      `http://berkeleyearth.lbl.gov/air-quality/maps/cities/city_averages.json`
    )
    .then((d) => {
      const cities = d.data.Cities.map((d,i) => {
        return {
            city:d[2],
            country:d[0],
            region:d[1],
            'PM2.5': {
              "Last Day":d[3],
              "Last Day":d[4],
              "Last 2 Days":d[5],
              "Last 3 Days":d[6],
              "Last 5 Days":d[7],
              "Last Week":d[8],
              "Last 30 Days":d[9],
              "Last Year":d[10],
            }          
          }
        })
        res.json(cities)
      })
    .catch((error) => res.json({ error: error.message }));
});

module.exports = router;
