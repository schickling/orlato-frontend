var React = require('react');

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
    console.log(beforeToken, afterToken);
    return (
      <div>
        <span>{beforeToken}</span>
        <input type="text" />
        <span>{afterToken}</span>
      </div>
    );
  },

});

