// create an express app
const express = require("express")
const airQualityRouter = require('./routes/air-quality');
var countryListRouter = require('./routes/country-list');
var regionListRouter = require('./routes/region-list');
var cityListRouter = require('./routes/city-list');
const app = express()

// use the express-static middleware
app.use(express.static("public"))

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>")
})

app.use('/country-list', countryListRouter);
app.use('/region-list', regionListRouter);
app.use('/city-list', cityListRouter);
app.use('/air-quality', airQualityRouter);

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
  () => console.log("Server is running..."));
  