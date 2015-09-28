var React = require('react');

var App = React.createClass({
  render() {
    return (
      <div className="app">
        yo sup
      </div>
    );
  }
});

React.render(<App />, document.getElementById('root'));