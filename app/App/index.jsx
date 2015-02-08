var React = require('react');
var InputQuestion = require('../InputQuestion');
var SelectQuestion = require('../SelectQuestion');
var DateQuestion = require('../DateQuestion');
var { Slider, FlatButton } = require('material-ui');
var api = require('../api');

require('./index.less');

function questionToComponent(question) {
  if (!question) return;
  var Component;
  switch (question.type) {
    case 'input': Component = InputQuestion; break;
    case 'select': Component = SelectQuestion; break;
    case 'date': Component = DateQuestion; break;
    default: throw new Error(question.type + ' not implemented');
  }
  return <Component question={question} update={this._update} />;
}

module.exports = React.createClass({

  getInitialState: function() {
    return {
      previousQuestion: null,
      currentQuestion: null,
      progress: 0,
    };
  },

  componentWillMount: function() {
    var self = this;
    api.getInitial().then(data => self.setState({
      currentQuestion: data.question,
      progress: data.progress,
    }));
  },

  _update: function(data) {
    this.setState({
      previousQuestion: this.state.currentQuestion,
      currentQuestion: data.question,
      progress: data.progress,
    });
  },

  render: function() {
    var merge = this._mergeState;
    var previousQuestion = questionToComponent.call(this, this.state.previousQuestion);
    var currentQuestion = questionToComponent.call(this, this.state.currentQuestion);

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
        <img src="images/orlatologo2.png" />
        <span className="right">
          <FlatButton label="About" />
          <FlatButton label="Contact" />
        </span>
      </div>
      <div className="quote">
        <div className="previous">{previousQuestion}</div>
        <div className="current">{currentQuestion}</div>
      </div>
        <div className="responsewrapper">
          <div className="response">
            <div className="phoebe">
              <div className="circular">
                <img src="images/phoebeprofilepicture.jpg" />
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
