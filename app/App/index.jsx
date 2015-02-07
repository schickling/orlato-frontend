var React = require('react');
var InputQuestion = require('../InputQuestion');
var SelectQuestion = require('../SelectQuestion');
var RadioQuestion = require('../RadioQuestion');
var { Toolbar, ToolbarGroup, DropDownMenu, Icon, DropDownIcon, RaisedButton } = require('material-ui');
var api = require('../api');

require('./index.less');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      groups: [],
      estimate: 0,
      progress: 0,
    };
  },

  componentWillMount: function() {
    var self = this;
    api.getInitial().then(response => self.setState({
      groups: response.groups,
      estimate: response.estimate,
      progress: response.progress,
    }));
  },

  render: function() {
    var groups = this.state.groups.map(function(group) {
      var questions = group.map(function(question) {
        switch (question.type) {
          case 'input':
            return <InputQuestion question={question} />;
          case 'select':
            return <SelectQuestion question={question} />;
          case 'radio':
            return <RadioQuestion question={question} />;
          default:
            throw new Error(question.type + ' not implemented');
        }
      });

      return (
        <div className="container">
        <div className="questions">
          <ul>
            {questions}
          </ul>
        </div>
        </div>
      );
    });

    var filterOptions = [
      { payload: '1', text: 'All Broadcasts' },
      { payload: '2', text: 'All Voice' },
      { payload: '3', text: 'All Text' },
      { payload: '4', text: 'Complete Voice' },
      { payload: '5', text: 'Complete Text' },
      { payload: '6', text: 'Active Voice' },
      { payload: '7', text: 'Active Text' },
    ];
    var iconMenuItems = [
      { payload: '1', text: 'Download' },
      { payload: '2', text: 'More Info' }
    ];

    return (
      <div>
        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <DropDownMenu menuItems={filterOptions} />
          </ToolbarGroup>
            <ToolbarGroup key={1} float="right">
            <Icon icon="mui-icon-pie" />
            <Icon icon="mui-icon-sort" />
            <DropDownIcon icon="navigation-expand-more" menuItems={iconMenuItems} />
            <span className="mui-toolbar-separator">&nbsp;</span>
            <RaisedButton label="Insure me" primary={true} />
          </ToolbarGroup>
        </Toolbar>
        {groups}
        estimate: {this.state.estimate} <br/>
        progress: {this.state.progress * 100} %
      </div>
    );
  },

});
