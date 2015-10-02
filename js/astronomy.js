const SunCalc = require('suncalc');

export function getSunTimes(time) {
  return SunCalc.getTimes(time.date, 37, -122);
}

export function getMoonTimes(time) {
  return SunCalc.getMoonTimes(time.date, 37, -122);
}

export function getSunPosition(time) {
  return SunCalc.getPosition(time.date, 37, -122);
}

export function getSunPositionRange(time) {
  const times = SunCalc.getTimes(time.date, 37, -122);
  const maxPosition = SunCalc.getPosition(times.solarNoon, 37, -122).altitude;
  const minPosition = SunCalc.getPosition(times.nadir, 37, -122).altitude;

  return [minPosition, maxPosition];
}
