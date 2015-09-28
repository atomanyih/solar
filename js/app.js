const React = require('react');
const DateTime = require('./date-time');
const Arc = require('./arc');
const SunCalc = require('suncalc');

const ClockHand = React.createClass({
  render() {
    const {center, radius, date} = this.props;
    const angle = date.toAngle();

    const handX = center.x + radius * Math.cos(angle);
    const handY = center.y + radius * Math.sin(angle);

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

    const times = SunCalc.getTimes(time.date, 37, -122);
    const dawnAngle = (new DateTime(times.dawn)).toAngle();
    const duskAngle = (new DateTime(times.dusk)).toAngle();

    return (
      <svg xmlns="http://www.w3.org/svg/2000"
           viewBox="0 0 512 512"
           width={512}
           height={512}>

        <circle id="clock-path" cx={center.x} cy={center.y} r={radius}/>

        <Arc className="nighttime-arc"
             cx={center.x}
             cy={center.y}
             startAngle={duskAngle}
             endAngle={dawnAngle}/>

        <ClockHand center={center} radius={radius} date={time} />
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