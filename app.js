// create an express app
const express = require("express");
const cors = require("cors");
const listRouter = require("./routes/list");
const HourDataRouter = require("./routes/hourly-data");
const DailyAverageDataRouter = require("./routes/daily-average");
const MonthlyAverageDataRouter = require("./routes/monthly-average");
const SummaryDataRouter = require("./routes/summary");
const AllCititesDataRouter = require("./routes/all-cities");
const app = express();

app.use(cors());

// define the first route
app.get("/", function (req, res) {
  res.send(
    "<h2>Unofficial API for fetching air quality data from Berkley Earth (PM 2.5 and PM 10 levels)</h2> <br/><br/>Documentation can be found <a href='https://github.com/mustafasaifee42/air-quality-api' target='_blank'>here</a> on github"
  );
});

app.use("/list", listRouter);
app.use("/air-quality/all-cities", AllCititesDataRouter);
app.use("/air-quality/hourly-data", HourDataRouter);
app.use("/air-quality/daily-average", DailyAverageDataRouter);
app.use("/air-quality/monthly-average", MonthlyAverageDataRouter);
app.use("/air-quality/summary", SummaryDataRouter);

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
