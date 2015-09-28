var React = require('react');

function timeToAngle(time) {
  const secondsPastToday = time.getHours() * 60 * 60 + time.getMinutes() * 60 + time.getSeconds();
  const secondsInDay = 24 * 60 * 60;
  return secondsPastToday / secondsInDay * 2 * Math.PI - Math.PI / 2;
}

const Clock = React.createClass({
  render() {
    const {time} = this.props;
    const center = {x: 256, y: 256};
    const radius = 256;

    const angle = timeToAngle(time);

    const handX = 256 + 256 * Math.cos(angle);
    const handY = 256 + 256 * Math.sin(angle);

    return (
      <svg xmlns="http://www.w3.org/svg/2000"
           viewBox="0 0 512 512"
           width={512}
           height={512}>

        <circle id="clock-path" cx={center.x} cy={center.y} r={radius}/>

        <path className="clock-hand" d={`M ${center.x} ${center.y} L ${handX} ${handY}`}/>

      </svg>
    );
  }
});

var App = React.createClass({
  render() {
    return (
      <div>
        <Clock time={new Date()}/>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('root'));