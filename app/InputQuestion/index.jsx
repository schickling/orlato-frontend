var React = require('react/addons');
var api = require('../api');
var { TextField } = require('material-ui');

require('./index.less');

module.exports = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  propTypes: {
    question: React.PropTypes.object.isRequired,
    update: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      value: '',
    };
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
        <TextField valueLink={this.linkState('value')} onBlur={this._updateAnswer} hintText="Type Here" />
        <span>{afterToken}</span>
      </div>
    );
  },

});

