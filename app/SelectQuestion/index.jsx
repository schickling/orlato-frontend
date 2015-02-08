var React = require('react');
var { DropDownMenu } = require('material-ui');
var api = require('../api');

require('./index.less');

module.exports = React.createClass({

  propTypes: {
    question: React.PropTypes.object.isRequired,
    update: React.PropTypes.func.isRequired,
  },

  _updateAnswer: function(index, menuItem) {
    api.sendAnswer(this.props.question.id, menuItem.payload).then(this.props.update);
  },

  render: function() {
    var label = this.props.question.label;
    var tokenIndex = label.indexOf('%!');
    var beforeToken = label.substr(0, tokenIndex);
    var afterToken = label.substr(tokenIndex + 2);
    var menuItems = this.props.question.options.map(o => ({ payload: o, text: o}));

    menuItems.unshift({payload: '', text: ''});

    return (
      <div>
        <span>{beforeToken}</span>
        <DropDownMenu onChange={this._updateAnswer} menuItems={menuItems} />
        <span>{afterToken}</span>
      </div>
    );
  },

});

