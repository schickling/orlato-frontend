var React = require('react');
var api = require('../api');
var { RadioButtonGroup, RadioButton } = require('material-ui');

require('./index.less');

module.exports = React.createClass({

  propTypes: {
    question: React.PropTypes.object.isRequired,
  },

  _updateAnswer: function() {
    api.sendAnswer();
  },

  render: function() {
    var text = this.props.question.text;
    var tokenIndex = text.indexOf('%!');
    var beforeToken = text.substr(0, tokenIndex);
    var afterToken = text.substr(tokenIndex + 2);

    return (
      <div>
        <span>{beforeToken}</span>
        <RadioButtonGroup onChange={this._updateAnswer} defaultSelected="not_light">
          {this.props.question.answers.map(a => <RadioButton value={a} label={a} />)}
        </RadioButtonGroup>
        <span>{afterToken}</span>
      </div>
    );
  },

});

