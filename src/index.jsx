var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
