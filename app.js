// create an express app
const express = require("express")
const airQualityRouter = require('./routes/air-quality');
const listRouter = require('./routes/list');
const app = express()

// use the express-static middleware
app.use(express.static("public"))

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Unofficial API for getting summary data about PM 2.5 level from Berkley Earth</h1>")
})

app.use('/air-quality', airQualityRouter);
app.use('/list', listRouter);

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
  () => console.log("Server is running..."));
  