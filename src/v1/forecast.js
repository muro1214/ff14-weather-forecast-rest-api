const express = require("express");
const eorzeaWeather = require("./weathers");
const boom = require("express-boom");
const zoneList = require("./../eorzea_zones");

var router = express.Router();

function validateQuery(query) {
  if (!Object.keys(query).length) {
    return {
      day: 1
    };
  }

  return {
    day: query.day,
    hour: query.hour
  };
}

router.use(function(req, res, next) {
  console.log(`Time: ${new Date().toLocaleString()}, Request Type: ${req.method}, Request URL: ${req.originalUrl}`);

  if (req.method !== "GET") {
    return res.boom.methodNotAllowed("Only the GET method is allowed");
  }

  next();
})

router.get("/forecast/", function(req, res) {
  res.header('Content-Type', 'application/json; charset=utf-8');

  res.send({
    message: "Eorzea weather forecast REST API"
  });
});

router.get("/forecast/:zoneId", function(req, res) {
  if (!zoneList[req.params.zoneId]) {
    return res.boom.badRequest("Unknown zone ID: " + req.params.zoneId);
  }

  const weathers = eorzeaWeather.getWeathers({
    zoneId: zoneList[req.params.zoneId],
    locale: "ja"
  });
  res.header('Content-Type', 'application/json; charset=utf-8');

  res.send(weathers);
});

router.get("/forecast/:zoneId/past", function(req, res) {
  if (!zoneList[req.params.zoneId]) {
    return res.boom.badRequest("Unknown zone ID: " + req.params.zoneId);
  }

  const weathers = eorzeaWeather.getPastWeathers({
    zoneId: zoneList[req.params.zoneId],
    locale: "ja"
  }, validateQuery(req.query));
  res.header('Content-Type', 'application/json; charset=utf-8');

  res.send(weathers);
});

router.get("/forecast/:zoneId/present", function(req, res) {
  if (!zoneList[req.params.zoneId]) {
    return res.boom.badRequest("Unknown zone ID: " + req.params.zoneId);
  }

  const weathers = eorzeaWeather.getPresentWeathers({
    zoneId: zoneList[req.params.zoneId],
    locale: "ja"
  });
  res.header('Content-Type', 'application/json; charset=utf-8');

  res.send(weathers);
});

router.get("/forecast/:zoneId/future", function(req, res) {
  if (!zoneList[req.params.zoneId]) {
    return res.boom.badRequest("Unknown zone ID: " + req.params.zoneId);
  }

  const weathers = eorzeaWeather.getFutureWeathers({
    zoneId: zoneList[req.params.zoneId],
    locale: "ja"
  }, validateQuery(req.query));
  res.header('Content-Type', 'application/json; charset=utf-8');

  res.send(weathers);
});

router.use(function(req, res, next) {
  res.boom.notFound("Unknown URL : " + req.originalUrl);
});

module.exports = router;
