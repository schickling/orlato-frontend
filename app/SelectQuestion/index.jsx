var React = require('react');
var { DropDownMenu } = require('material-ui');
var api = require('../api');

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
    var menuItems = this.props.question.answers.map(a => ({ payload: a, text: a}));

    return (
      <div>
        <span>{beforeToken}</span>
        <DropDownMenu onChange={this._updateAnswer} menuItems={menuItems} />
        <span>{afterToken}</span>
      </div>
    );
  },

});

