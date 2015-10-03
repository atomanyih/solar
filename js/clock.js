const React = require('react');

const Arc = require('./arc');
const DateTime = require('./date-time');
const Circle = require('./circle');

const ClockHours = React.createClass({
  render() {
    const {circle, time} = this.props;
    const {center, radius} = circle;

    const numberCircle = new Circle(center, radius - 15);

    let times = [];
    for (let i = 0; i < 24; i++) {
      const angle = i / 24 * 2 * Math.PI;
      const {x, y} = numberCircle.getPointAtAngle(angle);

      const {x: innerX, y: innerY} = (new Circle(center, radius - 5)).getPointAtAngle(angle);
      const {x: outerX, y: outerY} = circle.getPointAtAngle(angle);

      times.push(
        <g>
          <path className="tick" d={`M ${innerX} ${innerY} L ${outerX} ${outerY}`}/>
          <text className="label" x={x} y={y}
                transform={`rotate(${angle / Math.PI * 180} ${x} ${y})`}>{i % 12 || 12}</text>
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
    const {time, circle, astronomy} = this.props;

    const times = astronomy.getSunTimes(time);
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
    const {time, circle, astronomy} = this.props;

    const times = astronomy.getMoonTimes(time);
    const aboveHorizonStart = new DateTime(times.rise);
    const belowHorizonStart = new DateTime(times.set);


    const ranges = [
      {
        class: 'below-horizon',
        start: belowHorizonStart,
        end: aboveHorizonStart
      },
      {
        class: 'above-horizon',
        start: aboveHorizonStart,
        end: belowHorizonStart
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

    this.props.handleTimePick(
      this.circle.getAngleFromPoint({x: xWithinElement, y: yWithinElement})
    );
  },
  render() {
    const {time, astronomy} = this.props;
    const center = {x: 256, y: 256};
    const radius = 256;

    this.circle = new Circle(center, radius);

    const width = 512;
    const height = 512;
    return (
      <svg xmlns="http://www.w3.org/svg/2000"
           viewBox="0 0 512 512"
           width={width}
           height={height}>

        <circle id="clock-path" cx={center.x} cy={center.y} r={radius}/>

        <SunClock circle={this.circle} time={time} astronomy={astronomy}/>
        <MoonClock circle={new Circle(center, radius/2)} time={time} astronomy={astronomy}/>

        <ClockHand circle={this.circle} date={time}/>

        <ClockHours circle={new Circle(center, radius/2 - 20)} time={time}/>
        <rect fill="white" opacity="0" x={0} y={0} width={width} height={height} onClick={this.onClick}/>
      </svg>
    );
  }
});

export default Clock;
