var React = require('react');
var ReactDOM = require('react-dom');
var Welcome = require('./Welcome');
var Chat = require('./Chat');

var App = React.createClass({

	getInitialState: function() {
		return {
			userName: null
		}
	},

	onName: function(sName) {
		this.setState({userName: sName});
	},

	render: function() {
		return(
			<div>
				<Welcome userName={this.state.userName} onName={this.onName} />
				<Chat userName={this.state.userName} />
			</div>
		);
	}
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
