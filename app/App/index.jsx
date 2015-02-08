var React = require('react');
var InputQuestion = require('../InputQuestion');
var SelectQuestion = require('../SelectQuestion');
var RadioQuestion = require('../RadioQuestion');
var DateQuestion = require('../DateQuestion');
var { Slider, FlatButton } = require('material-ui');
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
      <div className="topmenu">
        <img src="https://files.slack.com/files-pri/T03K5E00N-F03K7NP1U/orlatologo2.png" />
        <span className="right">
          <FlatButton label="About" />
          <FlatButton label="Contact" />
        </span>
      </div>
      <div className="quote">
        {groups}
      </div>
        <div className="responsewrapper">
          <div className="response">
            <div className="phoebe">
              <div className="circular">
                <img src="https://files.slack.com/files-pri/T03K5E00N-F03K6QD1J/phoebeprofilepicture.jpg" />
              </div>
              <h5>Phoebe from Orlato</h5>
              Have a question? Just <strong>ask</strong>.
            </div>
            <div className="chatresponse">
              Hello John!<br />
              Well done, you&#39;re {this.state.progress * 100}% of the way through.
            </div>
            <div className="clearfloat"></div>
            <div className="twitter">
              <a href="http://twitter.com/orlatohq"><img src="http://jennybrennan.com/images/twittericon.png" /></a>
              <a href="mailto:info@orlato.com"><img src="http://jennybrennan.com/images/emailicon.png" /></a>
            </div>
          </div>
        </div>
      </div>
    );
  },

});
