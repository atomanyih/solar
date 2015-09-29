const React = require('react');
const DateTime = require('./date-time');
const Arc = require('./arc');
const SunCalc = require('suncalc');

function Circle(center, radius) {
  return {
    center: center,
    radius: radius,
    getPointAtAngle(angle){
      return {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle)
      }
    }
  }
}

const ClockHours = React.createClass({
  render() {
    const {circle} = this.props;
    const {center, radius} = circle;

    const numberCircle = new Circle(center, radius - 20);

    let times = [];
    for (let i = 0; i < 24; i++) {
      const angle = i / 24 * 2 * Math.PI - Math.PI / 2;
      const {x, y} = numberCircle.getPointAtAngle(angle);

      times.push(
        <text x={x} y={y} transform={`rotate(${angle / Math.PI * 180} ${x} ${y})`}>{i % 12 || 12}</text>
      )
    }

    return (
      <g className="hours">
        <circle cx={center.x} cy={center.y} r={radius}/>
        {times}
      </g>
    );
  }
});

const ClockHand = React.createClass({
  render() {
    const {circle, date} = this.props;
    const {center} = circle;
    const angle = date.toAngle();

    const {x: handX, y: handY} = circle.getPointAtAngle(angle);

    return (
      <path className="clock-hand" d={`M ${center.x} ${center.y} L ${handX} ${handY}`}/>
    );
  }
});

const Clock = React.createClass({
  render() {
    const {time} = this.props;
    const center = {x: 256, y: 256};
    const radius = 256;

    const circle = new Circle(center, radius);

    const times = SunCalc.getTimes(time.date, 37, -122);
    const civilTwilightStart = new DateTime(times.sunset);
    const nauticalTwilightStart = new DateTime(times.dusk);
    const astronomicalTwilightStart = new DateTime(times.nauticalDusk);
    const night = new DateTime(times.night);
    const dawn = new DateTime(times.dawn);

    return (
      <svg xmlns="http://www.w3.org/svg/2000"
           viewBox="0 0 512 512"
           width={512}
           height={512}>

        <circle id="clock-path" cx={center.x} cy={center.y} r={radius}/>

        <Arc className="arc civil-twilight"
             circle={circle}
             startTime={civilTwilightStart}
             endTime={nauticalTwilightStart}/>

        <Arc className="arc nautical-twilight"
             circle={circle}
             startTime={nauticalTwilightStart}
             endTime={astronomicalTwilightStart}/>

        <Arc className="arc astronomical-twilight"
             circle={circle}
             startTime={astronomicalTwilightStart}
             endTime={night}/>

        <Arc className="arc night"
             circle={circle}
             startTime={night}
             endTime={dawn}/>
        <ClockHand circle={circle} date={time}/>

        <ClockHours circle={new Circle(center, radius/2)}/>
      </svg>
    );
  }
});

const App = React.createClass({
  getInitialState() {
    return {
      date: new DateTime()
    };
  },
  update(e) {
    this.setState({
      date: DateTime.fromString(e.target.value)
    });
  },
  render() {
    const {date} = this.state;
    return (
      <div>
        <input type="time" defaultValue={date.toString()} onChange={this.update}/>
        <Clock time={date}/>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('root'));