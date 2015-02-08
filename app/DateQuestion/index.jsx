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
    api.sendAnswer().then(this.props.update);
  },

  render: function() {
    var text = this.props.question.text;
    var tokenIndex = text.indexOf('%!');
    var beforeToken = text.substr(0, tokenIndex);
    var afterToken = text.substr(tokenIndex + 2);

    return (
      <div>
        <span>{beforeToken}</span>
        <DatePicker onChange={this._updateAnswer} hintText="Hint Text" />
        <span>{afterToken}</span>
      </div>
    );
  },

});

