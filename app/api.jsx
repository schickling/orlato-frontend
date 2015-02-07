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

var api = 'http://localhost:8000/initial.json';

module.exports = {
  getInitial: function() {
    return fetch(api).then(status).then(json);
  },
};
