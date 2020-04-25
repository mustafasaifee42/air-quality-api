// create an express app
const express = require("express");
const DocumentationRouter = require("./routes/documentation");
const listRouter = require("./routes/list");
const HourDataRouter = require("./routes/hourly-data");
const DailyAverageDataRouter = require("./routes/daily-average");
const MonthlyAverageDataRouter = require("./routes/monthly-average");
const app = express();

// use the express-static middleware
app.use(express.static("public"));

// define the first route\

app.use("/", DocumentationRouter);
app.use("/list", listRouter);
app.use("/air-quality/hourly-data", HourDataRouter);
app.use("/air-quality/daily-average", DailyAverageDataRouter);
app.use("/air-quality/monthly-average", MonthlyAverageDataRouter);

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
