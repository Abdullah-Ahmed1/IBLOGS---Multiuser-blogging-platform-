require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const schedule = require("node-schedule");

const someDate = new Date("2022-09-09T04:37:00.000+5:30");
schedule.scheduleJob("MJob", someDate, () => {
  console.log("hello motto");
  schedule.cancelJob("MJob");
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());

var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded());
require("./Connection/connection");

const profilingRoutes = require("./routes/userProfilingRoutes");
app.use("/", profilingRoutes);

const blogRoutes = require("./routes/blogRoutes");
app.use("/bloggerDashboard", blogRoutes);

const Data = require("./routes/ReaderDashboardRoutes");
app.use("/readerDashboard", Data);

app.listen(5000, () => {
  console.log("your app is running on port 5000");
});
