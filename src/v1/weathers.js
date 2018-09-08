const eorzeaWeather = require("eorzea-weather");
const eorzeaTime = require("eorzea-time");
const range = require("lodash.range");
const et = require("./et");

function validateTimeOffset(timeOption) {
  var timeOffset = 0;

  if (timeOption.day !== undefined && !isNaN(timeOption.day)) {
    timeOffset += timeOption.day * et.ONE_DAY;
  }
  if (timeOption.hour !== undefined && !isNaN(timeOption.hour)) {
    timeOffset += timeOption.hour * et.EIGHT_HOURS;
  }

  return timeOffset;
}

exports.getWeathers = function({
  locale,
  zoneId
}, past = et.EIGHT_HOURS, future = et.ONE_DAY * 2) {
  const weather = new eorzeaWeather(zoneId, {
    locale
  });
  const startTime = et.getStartTime().getTime();

  // endrangeに+1することで、必ず現在の天候を出力させる
  return range(startTime - past, startTime + future + 1, et.EIGHT_HOURS).map((time) => {
    const startedAt = new Date(time);
    return {
      name: weather.getWeather(startedAt),
      eorzeaTime: new eorzeaTime(startedAt).toString(),
      startedAt: startedAt.toLocaleString(),
    };
  });
}

exports.getPastWeathers = function({
  locale,
  zoneId
}, timeOffset = {}) {
  return this.getWeathers({
    locale,
    zoneId
  }, validateTimeOffset(timeOffset), 0);
}

exports.getPresentWeathers = function({
  locale,
  zoneId
}) {
  return this.getWeathers({
    locale,
    zoneId
  }, 0, 0);
}

exports.getFutureWeathers = function({
  locale,
  zoneId
}, timeOffset = {}) {
  return this.getWeathers({
    locale,
    zoneId
  }, 0, validateTimeOffset(timeOffset));
}
