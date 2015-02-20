var objectId;
var api = 'https://api.parse.com/1/classes/TestForm/';
var headers = {
  'X-Parse-Application-Id': 'ZqqHDXkHFJUSGqkITPcUcFx3p2Q3VEqPpizU06KB',
  'X-Parse-REST-API-Key': 'NVB0wDX1CaZ55xPmr5ZYwDEwgOASiTu7JpCz8WSH'
};

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

module.exports = {

  put: function(key, val) {

    var data = {};
    data[key] = val;

    var body = JSON.stringify(data);

    var options = {
      headers,
      body,
    };

    if (objectId) {
      options.method = 'put';
      return fetch(api + objectId, options).then(status);
    } else {
      options.method = 'post';
      var promise = fetch(api, options).then(status);

      promise.then(json).then(d => objectId = d.objectId);

      return promise;
    }

  },

};
