function timeToAngle(time) {
  const secondsPastToday = time.getHours() * 60 * 60 + time.getMinutes() * 60 + time.getSeconds();
  const secondsInDay = 24 * 60 * 60;
  return secondsPastToday / secondsInDay * 2 * Math.PI - Math.PI / 2;
}

function dateToTimeString(date) {
  const match = /(\d{2}:\d{2}):\d{2}/.exec(date.toTimeString());
  return match[1];
}

function timeInputValueToDate(timeString) {
  const date = new Date();

  const match = /(\d{2}):(\d{2})/.exec(timeString);

  date.setHours(match[1]);
  date.setMinutes(match[2]);

  return date
}

function DateTime(date) {
  date = date || new Date();

  return {
    toAngle() {
      return timeToAngle(date);
    },
    toString() {
      return dateToTimeString(date);
    }
  }
}

DateTime.fromString = function(timeString) {
  console.log('asdas');
  return new DateTime(timeInputValueToDate(timeString));
};

export default DateTime
