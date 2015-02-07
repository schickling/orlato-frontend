var React = require('react');

require('./index.less');

module.exports = React.createClass({

  propTypes: {
    question: React.PropTypes.object.isRequired,
  },

  render: function() {
    return (
      <div>
        {this.props.question.text} <input type="text" />
      </div>
    );
  },

});

