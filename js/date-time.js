const secondsInDay = 24 * 60 * 60;

function timeToAngle(time) {
  const secondsPastToday = time.getHours() * 60 * 60 + time.getMinutes() * 60 + time.getSeconds();
  return secondsPastToday / secondsInDay * 2 * Math.PI;
}

function secondsToHMS(secondsInDay) {
  const hours = Math.floor(secondsInDay / (60 * 60));
  const minutes = Math.floor((secondsInDay - 60 * 60 * hours) / 60);

  return {
    hours: hours,
    minutes: minutes
  }
}

function dateToTimeString(date) {
  const match = /(\d{2}:\d{2}:\d{2})/.exec(date.toTimeString());
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
    },
    date: date
  }
}

DateTime.fromString = function(timeString) {
  return new DateTime(timeInputValueToDate(timeString));
};

DateTime.fromAngle = function(angle) {
  const time = secondsToHMS(angle / (2 * Math.PI) * secondsInDay);
  const date = new Date();
  date.setHours(time.hours);
  date.setMinutes(time.minutes);
  return new DateTime(date);
};

export default DateTime
