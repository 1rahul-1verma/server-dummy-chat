const express = require("express"),
    app = express(),
    cors = require('cors');

app.use(cors());
const { appRoutes } = require("./routes/routes.js");

app.use("/", appRoutes);
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next()
  });
const port = 3131;
app.listen(port, () => {
});
