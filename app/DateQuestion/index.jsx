var React = require('react');
var { DatePicker } = require('material-ui');
var hack = true;

require('./index.less');

module.exports = React.createClass({

  propTypes: {
    question: React.PropTypes.object.isRequired,
    update: React.PropTypes.func.isRequired,
    submit: React.PropTypes.func.isRequired,
  },

  _updateAnswer: function(i, date) {
    this.props.update(this.props.question.id, date);
    this.props.submit(this.props.question);
  },

  render: function() {
    var label = this.props.question.label;
    var tokenIndex = label.indexOf('%!');
    var beforeToken = label.substr(0, tokenIndex);
    var afterToken = label.substr(tokenIndex + 2);
    var defaultDate;
    if (this.props.question.value) {
      defaultDate = this.props.question.value;
    } else if (hack) {
      defaultDate = new Date(1993, 1, 1, 0, 0, 0, 0);
      hack = false;
    }

    return (
      <div>
        <span>{beforeToken}</span>
        <DatePicker ref="date" defaultDate={defaultDate} onChange={this._updateAnswer} hintText="Hint Text" />
        <span>{afterToken}</span>
      </div>
    );
  },

});

