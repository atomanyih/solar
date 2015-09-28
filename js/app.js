const React = require('react');
const DateTime = require('./date-time');

const Clock = React.createClass({
  render() {
    const {time} = this.props;
    const center = {x: 256, y: 256};
    const radius = 256;

    const angle = time.toAngle();

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

const App = React.createClass({
  getInitialState() {
    return {
      date: new DateTime()
    };
  },
  update(e) {
    this.setState({
      date: new DateTime(e.target.value)
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