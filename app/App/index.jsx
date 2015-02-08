var React = require('react');
var InputQuestion = require('../InputQuestion');
var SelectQuestion = require('../SelectQuestion');
var RadioQuestion = require('../RadioQuestion');
var DateQuestion = require('../DateQuestion');
var { Toolbar, ToolbarGroup, DropDownMenu, Icon, DropDownIcon, RaisedButton, Slider } = require('material-ui');
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
    api.getInitial().then(data => self.setState({
      groups: data.groups,
      estimate: data.estimate,
      progress: data.progress,
    }));
  },

  _mergeState: function(data) {
    this.setState({
      groups: this.state.groups.concat(data.groups),
      estimate: data.estimate,
      progress: data.progress,
    });
  },

  render: function() {
    var merge = this._mergeState;
    var groups = this.state.groups.map(function(group) {
      var questions = group.map(function(question) {
        var Component;
        switch (question.type) {
          case 'input': Component = InputQuestion; break;
          case 'select': Component = SelectQuestion; break;
          case 'radio': Component = RadioQuestion; break;
          case 'date': Component = DateQuestion; break;
          default:
            throw new Error(question.type + ' not implemented');
        }
        return <Component question={question} update={merge} />
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
      <span className="mui-toolbar-separator">&nbsp;</span>
      </ToolbarGroup>
      <ToolbarGroup key={1} float="right">
      <span className="mui-toolbar-separator">&nbsp;</span>
      <RaisedButton label="Insure me" primary={true} />
      </ToolbarGroup>
      </Toolbar>
      <div className="quote">
      {groups}
      <div className="estimate">estimate: {this.state.estimate}</div>
      <div className="progress">progress:  <Slider name="slider2" disabled={true} value={this.state.progress} /></div>
      </div>
      </div>
    );
  },

});
