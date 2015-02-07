var React = require('react');
var InputQuestion = require('../InputQuestion');
var SelectQuestion = require('../SelectQuestion');
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
        <div className="questions">
          <ul>
          djvh
            {questions}
          </ul>
        </div>
      );
    });
    return (
      <div>
        {groups}
        estimate: {this.state.estimate} <br/>
        progress: {this.state.progress * 100} %
      </div>
    );
  },

});
