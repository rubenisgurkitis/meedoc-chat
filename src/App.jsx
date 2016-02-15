var React = require('react');
var ReactDOM = require('react-dom');
var Welcome = require('./Welcome');
var Chat = require('./Chat');
var Reflux = require('reflux');
var ChatStore = require('./ChatStore');

var App = React.createClass({
	mixins: [
		Reflux.connect(ChatStore, 'chatStore')
	],

	render: function() {
		if (this.state.chatStore.user) {
			return(
				<div>
					<Welcome />
					<Chat />
				</div>
			);
		} else {
			return(
				<div>
					<Welcome />
				</div>
			);
		}
	}
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
