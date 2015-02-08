function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function json(response) {
  return response.json();
}

var api = 'http://localhost:8000/';

module.exports = {
  getInitial: function() {
    return fetch(api + 'initial').then(status).then(json);
  },

  sendAnswer: function(id, value) {
    var options = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, value })
    };
    return fetch(api + 'answer/', options).then(status).then(json);
  },
};
