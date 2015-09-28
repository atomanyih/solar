const React = require('react');
const DateTime = require('./date-time');
const Arc = require('./arc');
const SunCalc = require('suncalc');

const Clock = React.createClass({
  render() {
    const {time} = this.props;
    const center = {x: 256, y: 256};
    const radius = 256;

    const angle = time.toAngle();

    const handX = 256 + 256 * Math.cos(angle);
    const handY = 256 + 256 * Math.sin(angle);

    const times = SunCalc.getTimes(new Date().setHours(12), 37, -122);
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

        <path className="clock-hand" d={`M ${center.x} ${center.y} L ${handX} ${handY}`}/>

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