var React = require('react');
var ReactDOM = require('react-dom');
var Welcome = require('./welcome');

var Chat = React.createClass({
	getInitialState: function() {
		return {
			userName: null
		}
	},
	render: function() {
		return <Welcome name={this.state.userName} onName={this.onName}/>
	},
	onName: function(sName) {
		this.setState({userName: sName});
	}
});

var element = React.createElement(Chat, {});
ReactDOM.render(element, document.querySelector('.container'));
