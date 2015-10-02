const SunCalc = require('suncalc');

function Astronomy(latitude, longitude) {
  return {
    getSunTimes(time) {
      return SunCalc.getTimes(time.date, latitude, longitude);
    },

    getMoonTimes(time) {
      return SunCalc.getMoonTimes(time.date, latitude, longitude);
    },

    getSunPosition(time) {
      return SunCalc.getPosition(time.date, latitude, longitude);
    },

    getSunPositionRange(time) {
      const times = SunCalc.getTimes(time.date, latitude, longitude);
      const maxPosition = SunCalc.getPosition(times.solarNoon, latitude, longitude).altitude;
      const minPosition = SunCalc.getPosition(times.nadir, latitude, longitude).altitude;

      return [minPosition, maxPosition];
    }
  }
}

export default Astronomy;

