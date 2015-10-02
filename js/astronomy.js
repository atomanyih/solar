const SunCalc = require('suncalc');

const coordinates = [37, -122];

export function getSunTimes(time) {
  return SunCalc.getTimes(time.date, ...coordinates);
}

export function getMoonTimes(time) {
  return SunCalc.getMoonTimes(time.date, ...coordinates);
}

export function getSunPosition(time) {
  return SunCalc.getPosition(time.date, ...coordinates);
}

export function getSunPositionRange(time) {
  const times = SunCalc.getTimes(time.date, ...coordinates);
  const maxPosition = SunCalc.getPosition(times.solarNoon, ...coordinates).altitude;
  const minPosition = SunCalc.getPosition(times.nadir, ...coordinates).altitude;

  return [minPosition, maxPosition];
}
