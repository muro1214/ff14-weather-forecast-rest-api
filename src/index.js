const express = require("express");
const boom = require("express-boom");
const i18n = require("i18n");
const bodyParser = require('body-parser');

i18n.configure({
  locales: ['ja', 'en'],
  defaultLocale: 'en'
});

const app = express();
app.use(i18n.init);
app.use(boom());
app.use(bodyParser.json());

var router = require("./v1/forecast");
app.use("/ff14/v1/", router);

// start REST API Server
app.listen(3000);
console.log("listen on port 3000");
