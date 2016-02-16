var React = require('react');
var Welcome = require('./Welcome');
var Chat = require('./Chat');
var Reflux = require('reflux');
var ChatStore = require('../stores/ChatStore');

module.exports = React.createClass({
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
