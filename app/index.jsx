var React = require('react');
var injectTapEventPlugin = require('react-tap-event-plugin');
var App = require('./App');

// polyfills
require('es6-promise').polyfill();
require('whatwg-fetch');

injectTapEventPlugin();

React.render(<App/>, document.getElementById('app'));
