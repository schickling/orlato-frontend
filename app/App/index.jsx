var _ = require('lodash');
var React = require('react');
var InputQuestion = require('../InputQuestion');
var SelectQuestion = require('../SelectQuestion');
var DateQuestion = require('../DateQuestion');
var { Slider, FlatButton, RaisedButton, Dialog } = require('material-ui');
var api = require('../api');
var standardActions = [
  { text: 'Thank you, take me back' },
];

require('./index.less');

function questionToComponent(disabled, question) {
  if (!question) return;
  var Component;
  switch (question.type) {
    case 'input': Component = InputQuestion; break;
    case 'number': Component = InputQuestion; break; // TODO add number
    case 'select': Component = SelectQuestion; break;
    case 'date': Component = DateQuestion; break;
    default: throw new Error(question.type + ' not implemented');
  }
  return <Component disabled={disabled} question={question} submit={this._submitQuestion} update={this._updateQuestion} />;
}

function initQuestions(questions) {
  questions.forEach(q => q.value = '');
  return questions;
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
      currentQuestions: initQuestions(data.questions),
      progress: data.progress,
    }));
  },

  _updateQuestion: function(id, value) {
    var currentQuestions = this.state.currentQuestions;
    var question = _.findWhere(currentQuestions, { id });
    question.value = value;

    this.setState({ currentQuestions });
  },


  _submitQuestion: function(question) {
    api.sendAnswer(question.id, question.value).then(this._switchQuestions);
  },

  _switchQuestions: function(data) {
    var newState = {
      progress: data.progress,
    };

    if (data.questions) {
      newState.previousQuestions = this.state.currentQuestions;
      newState.currentQuestions = initQuestions(data.questions);
    }

    this.setState(newState);
  },

  _dialog: function () {
    this.refs.dialog.show();
  },

  render: function() {
    var merge = this._mergeState;
    var previousQuestions = this.state.previousQuestions.map(questionToComponent.bind(this, true));
    var currentQuestions = this.state.currentQuestions.map(questionToComponent.bind(this, false));

    var message;
    //if (this.state.progress > 0.99) {
    if (true) {
      message = (
        <div className="submission">
        You&#39;re all done! Get a quote:<br />
        <RaisedButton onClick={this._dialog} label="Get quote" />
        <Dialog ref="dialog" title="It will cost..." actions={standardActions}>
        <div className="aviva">
        <h2>£450</h2>
        with<br />
        <img src="http://www.aviva.co.uk/library/images/logos/aviva-logo-secondary.gif" />
        </div>
        <div className="allianz">
        <h2>£300</h2>
        with<br />
        <img src="http://www.hautevilleinsurance.com/Images/logo_allianz.jpg" />
        </div>
        <div className="clearfloat"></div>
        </Dialog>
        <h5>(Yes, really, that&#39;s it!)</h5></div>
      );
    } else {
      message = (
        <span>
        Well done, you&#39;re {parseInt(this.state.progress * 100, 10)}% of the way through.
        </span>
      )
    }

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
              {message}
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
