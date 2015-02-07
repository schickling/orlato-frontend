var React = require('react');
var api = require('../api');

//require('./index.less');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      groups: [],
    };
  },

  componentWillMount: function() {
    var self = this;
    api.getInitial().then(groups => self.setState({ groups }));
  },

  render: function() {
    var groups = this.state.groups.map(function(group) {
      return (
        <div>
          <ul>
            {group.map(q => <li>{q.text}</li>)}
          </ul>
        </div>
      );
    });
    return (
      <div>
        {groups}
      </div>
    );
  },

});
