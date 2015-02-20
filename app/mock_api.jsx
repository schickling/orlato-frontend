var _ = require('lodash');
var parse = require('./parse');
var allQuestions = require('./questions.json');
var index, progress;
var flatQuestions = _(allQuestions)
      .map(function(qs) {
        return qs.map(function(q, i) {
          return {
            id: q.id,
            isLast: i === qs.length - 1
          };
        });
      })
      .flatten()
      .value();

function isLast(id) {
    return _.findWhere(flatQuestions, {
        id: id
    }).isLast;
}

module.exports = {

  getInitial: function() {
    index = 0;
    progress = 0;
    var questions = allQuestions[index];
    return Promise.resolve({ progress, questions });
  },

  sendAnswer: function(id, value) {
    return parse.put(id, value).then(function() {
      var questions;

      if (isLast(id)) {
        index++;
        questions = allQuestions[index];
      }

      progress = index / allQuestions.length;

      return { progress, questions };
    });
  },

  submit: function() {
  },

};
