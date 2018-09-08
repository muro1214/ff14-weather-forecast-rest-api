// エオルゼア内の時間
exports.EIGHT_HOURS = 8 * 175 * 1000;
exports.ONE_DAY = this.EIGHT_HOURS * 3;

exports.getStartTime = function() {
  const oneHour = 175 * 1000;
  const msec = new Date().getTime();
  const bell = (msec / oneHour) % 8;
  const startMsec = msec - Math.round(oneHour * bell);

  return new Date(startMsec);
}
