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
    case 'number': Component = InputQuestion; break; // TODO add number
    case 'select': Component = SelectQuestion; break;
    case 'date': Component = DateQuestion; break;
    default: throw new Error(question.type + ' not implemented');
  }
  return <Component question={question} update={this._update} />;
}

module.exports = React.createClass({

  getInitialState: function() {
    return {
      previousQuestions: [],
      currentQuestions: [],
      progress: 0,
    };
  },

  componentWillMount: function() {
    var self = this;
    api.getInitial().then(data => self.setState({
      currentQuestions: data.questions,
      progress: data.progress,
    }));
  },

  _update: function(data) {
    var newState = {
      progress: data.progress,
    };

    if (data.questions) {
      newState.previousQuestions = this.state.currentQuestions;
      newState.currentQuestions = data.questions;
    }

    this.setState(newState);
  },

  render: function() {
    var merge = this._mergeState;
    var previousQuestions = this.state.previousQuestions.map(questionToComponent.bind(this));
    var currentQuestions = this.state.currentQuestions.map(questionToComponent.bind(this));

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
        <div className="previous">{previousQuestions}</div>
        <div className="current">{currentQuestions}</div>
      </div>
        <div className="responsewrapper">
          <div className="response">
            <div className="phoebe">
              <div className="circular">
                <img src="images/phoebeprofilepicture.jpg" />
              </div>
              <strong>Phoebe from Orlato</strong> Have a question? Just <strong>ask</strong>.
            </div>
            <div className="chatresponse">
              Hello John!<br />
              Well done, you&#39;re {parseInt(this.state.progress, 10) * 100}% of the way through.
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
