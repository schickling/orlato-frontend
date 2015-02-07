var React = require('react');
var { TextField } = require('material-ui');
require('./index.less');

module.exports = React.createClass({

  propTypes: {
    question: React.PropTypes.object.isRequired,
  },

  render: function() {
    var text = this.props.question.text;
    var tokenIndex = text.indexOf('%!');
    var beforeToken = text.substr(0, tokenIndex);
    var afterToken = text.substr(tokenIndex + 2);

    return (
      <div>
        <span>{beforeToken}</span>
        <TextField hintText="Hint Text" />
        <span>{afterToken}</span>
      </div>
    );
  },

});

