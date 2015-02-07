var React = require('react');
var App = require('./App');

// polyfills
require('es6-promise').polyfill();
require('whatwg-fetch');

React.render(<App/>, document.getElementById('app'));
