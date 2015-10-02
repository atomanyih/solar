const React = require('react');

const DateTime = require('./date-time');
const Astronomy = require('./astronomy');
const LocationControls = require('./location-controls');
const Clock = require('./clock');
const Zenometer = require('./zenometer');

const App = React.createClass({
  getInitialState() {
    return {
      date: new DateTime(),
      coordinates: {
        latitude: 37,
        longitude: -122
      }
    };
  },
  updateTimeFromClock(angle) {
    this.setState({
      date: DateTime.fromAngle(angle)
    });
  },
  updatePosition(latitude, longitude) {
    this.setState({
      coordinates: {
        latitude: latitude,
        longitude: longitude
      }
    });
  },
  render() {
    const {date, coordinates} = this.state;
    const astronomy = new Astronomy(coordinates.latitude, coordinates.longitude);
    return (
      <div>
        <div>
          <Clock time={date} handleTimePick={this.updateTimeFromClock} astronomy={astronomy}/>
          <Zenometer time={date} astronomy={astronomy}/>
        </div>
        <LocationControls coordinates={coordinates} onUpdatePosition={this.updatePosition}/>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('root'));
