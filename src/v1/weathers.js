/*
The getWeathers() function is:

MIT License : https://github.com/flowercartelet/eorzea-weather-app/blob/master/LICENSE

Copyright (c) 2018 Lily Cartelet

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

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
