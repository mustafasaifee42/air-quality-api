const express = require("express");
const router = express.Router();
const axios = require("axios");
const { getHours } = require("../utils/getDateTimeRange");
const { getDataAsObj } = require("../utils/getDataAsObj");
const { formatNumber } = require("../utils/formatNumber");
const {
  getHourlyData,
  getDailyData,
  getMonthlyData,
} = require("../utils/getFinalData");

router.get("/:country", function (req, res, next) {
  axios
    .get(
      `http://berkeleyearth.lbl.gov/air-quality/maps/cities/${req.params.country}/${req.params.country}.txt`
    )
    .then((d) => {
      const dataAsObj = getDataAsObj(d.data);
      const dateTime = new Date();

      const startDate = `${new Date().getFullYear() - 2}-${formatNumber(
        new Date().getMonth() + 1
      )}-${formatNumber(new Date().getDate())}`;
      const endDate = `${new Date().getFullYear()}-${formatNumber(
        new Date().getMonth() + 1
      )}-${formatNumber(new Date().getDate())}`;
      const dateTimeValue = getHours(new Date(startDate), new Date(endDate));
      const dataFinalHourly = getHourlyData(dataAsObj, dateTimeValue);
      const dataFinalDaily = getDailyData(dataAsObj, dateTimeValue);

      const StartDate30DaysTemp = new Date();
      StartDate30DaysTemp.setDate(new Date().getDate() - 31);
      const StartDate30Days = `${StartDate30DaysTemp.getFullYear()}-${formatNumber(
        StartDate30DaysTemp.getMonth() + 1
      )}-${formatNumber(StartDate30DaysTemp.getDate())}`;
      const dateTimeValue30Days = getHours(
        new Date(StartDate30Days),
        new Date(endDate)
      );
      const dataFinalHourly30Days = getHourlyData(
        dataAsObj,
        dateTimeValue30Days
      );

      const dateTimeYest = new Date();

      dateTimeYest.setDate(dateTimeYest.getDate() - 1);
      const dateTimeHoursOneDay = getHours(
        new Date(dateTimeYest),
        new Date(dateTime)
      );
      const dataFinalYest = getDailyData(dataAsObj, dateTimeHoursOneDay);

      const EndDateMonth = `${new Date().getFullYear()}-${formatNumber(
        new Date().getMonth() + 1
      )}`;
      const StartDateMonthTemp = new Date();
      StartDateMonthTemp.setMonth(new Date().getMonth() - 1);
      const StartDateMonth = `${StartDateMonthTemp.getFullYear()}-${formatNumber(
        StartDateMonthTemp.getMonth() + 1
      )}`;

      const startDateMonthFinal = StartDateMonth.split("-"),
        endDatMonthFinal = EndDateMonth.split("-");
      const dateTimeMonth = getHours(
        new Date([startDateMonthFinal[0], startDateMonthFinal[1], "01"]),
        new Date([endDatMonthFinal[0], endDatMonthFinal[1], "01"])
      );
      const dataFinalLatMonth = getMonthlyData(dataAsObj, dateTimeMonth);
      let data = {
        "Most Recent": dataAsObj[dataAsObj.length - 1],
        "Last Day": dataFinalYest[0],
        "Last 30 Days": dataFinalHourly30Days,
        "Last Month": dataFinalLatMonth[0],
        'Last 2 Years Hourly Data': dataFinalHourly,
        'Last 2 Years Daily Averages': dataFinalDaily,
      };
      res.json(data);
    })
    .catch((error) => res.json({ error: error.message }));
});

router.get("/:country/:region", function (req, res, next) {
  axios
    .get(
      `http://berkeleyearth.lbl.gov/air-quality/maps/cities/${req.params.country}/${req.params.region}/${req.params.region}.txt`
    )
    .then((d) => {
      const dataAsObj = getDataAsObj(d.data);
      const dateTime = new Date();

      const startDate = `${new Date().getFullYear() - 2}-${formatNumber(
        new Date().getMonth() + 1
      )}-${formatNumber(new Date().getDate())}`;
      const endDate = `${new Date().getFullYear()}-${formatNumber(
        new Date().getMonth() + 1
      )}-${formatNumber(new Date().getDate())}`;
      const dateTimeValue = getHours(new Date(startDate), new Date(endDate));
      const dataFinalHourly = getHourlyData(dataAsObj, dateTimeValue);
      const dataFinalDaily = getDailyData(dataAsObj, dateTimeValue);

      const StartDate30DaysTemp = new Date();
      StartDate30DaysTemp.setDate(new Date().getDate() - 31);
      const StartDate30Days = `${StartDate30DaysTemp.getFullYear()}-${formatNumber(
        StartDate30DaysTemp.getMonth() + 1
      )}-${formatNumber(StartDate30DaysTemp.getDate())}`;
      const dateTimeValue30Days = getHours(
        new Date(StartDate30Days),
        new Date(endDate)
      );
      const dataFinalHourly30Days = getHourlyData(
        dataAsObj,
        dateTimeValue30Days
      );

      const dateTimeYest = new Date();

      dateTimeYest.setDate(dateTimeYest.getDate() - 1);
      const dateTimeHoursOneDay = getHours(
        new Date(dateTimeYest),
        new Date(dateTime)
      );
      const dataFinalYest = getDailyData(dataAsObj, dateTimeHoursOneDay);

      const EndDateMonth = `${new Date().getFullYear()}-${formatNumber(
        new Date().getMonth() + 1
      )}`;
      const StartDateMonthTemp = new Date();
      StartDateMonthTemp.setMonth(new Date().getMonth() - 1);
      const StartDateMonth = `${StartDateMonthTemp.getFullYear()}-${formatNumber(
        StartDateMonthTemp.getMonth() + 1
      )}`;

      const startDateMonthFinal = StartDateMonth.split("-"),
        endDatMonthFinal = EndDateMonth.split("-");
      const dateTimeMonth = getHours(
        new Date([startDateMonthFinal[0], startDateMonthFinal[1], "01"]),
        new Date([endDatMonthFinal[0], endDatMonthFinal[1], "01"])
      );
      const dataFinalLatMonth = getMonthlyData(dataAsObj, dateTimeMonth);
      let data = {
        "Most Recent": dataAsObj[dataAsObj.length - 1],
        "Last Day": dataFinalYest[0],
        "Last 30 Days": dataFinalHourly30Days,
        "Last Month": dataFinalLatMonth[0],
        'Last 2 Years Hourly Data': dataFinalHourly,
        'Last 2 Years Daily Averages': dataFinalDaily,
      };
      res.json(data);
    })
    .catch((error) => res.json({ error: error.message }));
});

router.get("/:country/:region/:city", function (req, res, next) {
  axios
    .get(
      `http://berkeleyearth.lbl.gov/air-quality/maps/cities/${req.params.country}/${req.params.region}/${req.params.city}.txt`
    )
    .then((d) => {
      const dataAsObj = getDataAsObj(d.data);
      const dateTime = new Date();

      const startDate = `${new Date().getFullYear() - 2}-${formatNumber(
        new Date().getMonth() + 1
      )}-${formatNumber(new Date().getDate())}`;
      const endDate = `${new Date().getFullYear()}-${formatNumber(
        new Date().getMonth() + 1
      )}-${formatNumber(new Date().getDate())}`;
      const dateTimeValue = getHours(new Date(startDate), new Date(endDate));
      const dataFinalHourly = getHourlyData(dataAsObj, dateTimeValue);
      const dataFinalDaily = getDailyData(dataAsObj, dateTimeValue);

      const StartDate30DaysTemp = new Date();
      StartDate30DaysTemp.setDate(new Date().getDate() - 31);
      const StartDate30Days = `${StartDate30DaysTemp.getFullYear()}-${formatNumber(
        StartDate30DaysTemp.getMonth() + 1
      )}-${formatNumber(StartDate30DaysTemp.getDate())}`;
      const dateTimeValue30Days = getHours(
        new Date(StartDate30Days),
        new Date(endDate)
      );
      const dataFinalHourly30Days = getHourlyData(
        dataAsObj,
        dateTimeValue30Days
      );

      const dateTimeYest = new Date();

      dateTimeYest.setDate(dateTimeYest.getDate() - 1);
      const dateTimeHoursOneDay = getHours(
        new Date(dateTimeYest),
        new Date(dateTime)
      );
      const dataFinalYest = getDailyData(dataAsObj, dateTimeHoursOneDay);

      const EndDateMonth = `${new Date().getFullYear()}-${formatNumber(
        new Date().getMonth() + 1
      )}`;
      const StartDateMonthTemp = new Date();
      StartDateMonthTemp.setMonth(new Date().getMonth() - 1);
      const StartDateMonth = `${StartDateMonthTemp.getFullYear()}-${formatNumber(
        StartDateMonthTemp.getMonth() + 1
      )}`;

      const startDateMonthFinal = StartDateMonth.split("-"),
        endDatMonthFinal = EndDateMonth.split("-");
      const dateTimeMonth = getHours(
        new Date([startDateMonthFinal[0], startDateMonthFinal[1], "01"]),
        new Date([endDatMonthFinal[0], endDatMonthFinal[1], "01"])
      );
      const dataFinalLatMonth = getMonthlyData(dataAsObj, dateTimeMonth);
      let data = {
        "Most Recent": dataAsObj[dataAsObj.length - 1],
        "Last Day": dataFinalYest[0],
        "Last 30 Days": dataFinalHourly30Days,
        "Last Month": dataFinalLatMonth[0],
        'Last 2 Years Hourly Data': dataFinalHourly,
        'Last 2 Years Daily Averages': dataFinalDaily,
      };
      res.json(data);
    })
    .catch((error) => res.json({ error: error.message }));
});

/* GET home page. */

module.exports = router;
