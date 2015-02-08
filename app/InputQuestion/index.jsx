var React = require('react');
var api = require('../api');
var { TextField } = require('material-ui');

require('./index.less');

module.exports = React.createClass({

  propTypes: {
    question: React.PropTypes.object.isRequired,
    update: React.PropTypes.func.isRequired,
    submit: React.PropTypes.func.isRequired,
    disabled: React.PropTypes.bool.isRequired,
  },

  _onKeyUp: function (e) {
    
  },

  _updateAnswer: function() {
    var value = this.refs.input.getValue();
    this.props.update(this.props.question.id, value);
  },

  render: function() {
    var label = this.props.question.label;
    var tokenIndex = label.indexOf('%!');
    var beforeToken = label.substr(0, tokenIndex);
    var afterToken = label.substr(tokenIndex + 2);

    return (
      <div>
        <span>{beforeToken}</span>
        <TextField ref="input" value={this.props.question.value} disabled={this.props.disabled} onChange={this._updateAnswer} onBlur={this.props.submit.bind(null, this.props.question)} hintText="Type Here" />
        <span>{afterToken}</span>
      </div>
    );
  },

});

