const React = require('react');
const DateTime = require('./date-time');
const Arc = require('./arc');
const SunCalc = require('suncalc');
const Zenometer = require('./zenometer');
const {cartesianToAngle} = require('./polar');

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
    const {circle, time} = this.props;
    const {center, radius} = circle;

    const numberCircle = new Circle(center, radius - 15);

    let times = [];
    for (let i = 0; i < 24; i++) {
      const angle = i / 24 * 2 * Math.PI - Math.PI / 2;
      const {x, y} = numberCircle.getPointAtAngle(angle);

      const {x: innerX, y: innerY} = (new Circle(center, radius - 5)).getPointAtAngle(angle);
      const {x: outerX, y: outerY} = circle.getPointAtAngle(angle);

      times.push(
        <g>
          <path className="tick" d={`M ${innerX} ${innerY} L ${outerX} ${outerY}`}/>
          <text className="label" x={x} y={y} transform={`rotate(${angle / Math.PI * 180} ${x} ${y})`}>{i % 12 || 12}</text>
        </g>
      )
    }

    return (
      <g className="hours">
        <circle cx={center.x} cy={center.y} r={radius}/>
        {times}
        <text className="current" x={center.x} y={center.y + 15}>{time.toString()}</text>
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

const SunClock = React.createClass({
  render() {
    const {time, circle} = this.props;

    const times = SunCalc.getTimes(time.date, 37, -122);
    const civilTwilightStart = new DateTime(times.sunset);
    const nauticalTwilightStart = new DateTime(times.dusk);
    const astronomicalTwilightStart = new DateTime(times.nauticalDusk);
    const night = new DateTime(times.night);
    const astronomicalDawnStart = new DateTime(times.nightEnd);
    const nauticalDawnStart = new DateTime(times.nauticalDawn);
    const civilDawnStart = new DateTime(times.dawn);
    const dawn = new DateTime(times.sunrise);

    const ranges = [
      {
        class: 'civil-twilight',
        start: civilTwilightStart,
        end: nauticalTwilightStart
      },
      {
        class: 'nautical-twilight',
        start: nauticalTwilightStart,
        end: astronomicalTwilightStart
      },
      {
        class: 'astronomical-twilight',
        start: astronomicalTwilightStart,
        end: night
      },
      {
        class: 'night',
        start: night,
        end: astronomicalDawnStart
      },
      {
        class: 'astronomical-dawn',
        start: astronomicalDawnStart,
        end: nauticalDawnStart
      },
      {
        class: 'nautical-dawn',
        start: nauticalDawnStart,
        end: civilDawnStart
      },
      {
        class: 'civil-dawn',
        start: civilDawnStart,
        end: dawn
      }
    ];

    const arcs = ranges.map((range) => {
      return (
        <Arc className={`arc ${range.class}`}
             circle={circle}
             startTime={range.start}
             endTime={range.end}/>
      )
    });

    return (
      <g className="clock sun">
        {arcs}
      </g>
    )
  }
});

const MoonClock = React.createClass({
  render() {
    const {time, circle} = this.props;

    const times = SunCalc.getMoonTimes(time.date, 37, -122);
    const aboveHorizonStart = new DateTime(times.rise);
    const belowHorizonStart = new DateTime(times.set);


    const ranges = [
      {
        class: 'below-horizon',
        start: belowHorizonStart,
        end: aboveHorizonStart
      }
    ];

    const arcs = ranges.map((range) => {
      return (
        <Arc className={`arc ${range.class}`}
             circle={circle}
             startTime={range.start}
             endTime={range.end}/>
      )
    });

    return (
      <g className="clock moon">
        <circle className="above-horizon" cx={circle.center.x} cy={circle.center.y} r={circle.radius}/>
        {arcs}
      </g>
    )
  }
});

const Clock = React.createClass({
  onClick(e) {
    const {left, top} = e.target.getBoundingClientRect();
    const xWithinElement = e.clientX - left;
    const yWithinElement = e.clientY - top;
    const xAroundCircle = xWithinElement - 256;
    const yAroundCircle = 256 - yWithinElement;
    this.props.handleTimePick(
      cartesianToAngle(xAroundCircle, yAroundCircle)
    );
  },
  render() {
    const {time} = this.props;
    const center = {x: 256, y: 256};
    const radius = 256;

    const circle = new Circle(center, radius);

    const width = 512;
    const height = 512;
    return (
      <svg xmlns="http://www.w3.org/svg/2000"
           viewBox="0 0 512 512"
           width={width}
           height={height}>

        <circle id="clock-path" cx={center.x} cy={center.y} r={radius}/>

        <SunClock circle={circle} time={time}/>
        <MoonClock circle={new Circle(center, radius/2)} time={time}/>

        <ClockHand circle={circle} date={time}/>

        <ClockHours circle={new Circle(center, radius/2 - 20)} time={time}/>
        <rect fill="white" opacity="0" x={0} y={0} width={width} height={height} onClick={this.onClick}/>
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
  updateTimeFromClock(angle) {
    this.setState({
      date: DateTime.fromAngle(angle)
    });
  },
  render() {
    const {date} = this.state;
    return (
      <div>
        <Clock time={date} handleTimePick={this.updateTimeFromClock}/>
        <Zenometer time={date}/>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('root'));
