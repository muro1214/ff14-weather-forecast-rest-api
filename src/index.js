const express = require("express");
const boom = require("express-boom");
const bodyParser = require('body-parser');

// REST api
const app = express();
app.use(bodyParser.json());

app.use(boom());

var router = require("./v1/forecast");
app.use("/ff14/v1/", router);

// starte REST
app.listen(3000);
console.log("listen on port 3000");
