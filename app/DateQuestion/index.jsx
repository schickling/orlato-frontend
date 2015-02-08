var React = require('react');
var api = require('../api');
var { DatePicker } = require('material-ui');

require('./index.less');

module.exports = React.createClass({

  propTypes: {
    question: React.PropTypes.object.isRequired,
    update: React.PropTypes.func.isRequired,
  },

  _updateAnswer: function() {
    api.sendAnswer(this.props.question.id).then(this.props.update);
  },

  render: function() {
    var label = this.props.question.label;
    var tokenIndex = label.indexOf('%!');
    var beforeToken = label.substr(0, tokenIndex);
    var afterToken = label.substr(tokenIndex + 2);

    return (
      <div>
        <span>{beforeToken}</span>
        <DatePicker onChange={this._updateAnswer} hintText="Hint Text" />
        <span>{afterToken}</span>
      </div>
    );
  },

});

