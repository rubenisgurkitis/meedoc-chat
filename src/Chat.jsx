var React = require('react');
var ChatMessages = require('./ChatMessages');
var ChatStore = require('./ChatStore');
var ChatActions = require('./ChatActions');
var Reflux = require('reflux');

module.exports = React.createClass({
	mixins: [
		Reflux.connect(ChatStore, 'chatStore')
	],

	componentWillMount: function() {
		ChatActions.connectSocket();
	},

	handleSendButtonClick: function(event) {
		ChatActions.send(document.getElementById('chat-input').value);
		document.getElementById('chat-input').value = '';
		document.getElementById('chat-input').placeholder = '';
	},

	handleLogoutButtonClick: function(event) {
		ChatActions.logout();
	},

	handleInputKeyPress: function(event) {
		if (event.nativeEvent.keyCode === 13){
			ChatActions.send(event.target.value);
			event.target.value = null;
			event.target.placeholder = '';
		}
	},

	render: function() {
		var sUserName = this.state.chatStore.user;
		if (sUserName) {
			return (
				<div>
					<div>
							<ChatMessages messages={this.state.chatStore.messages} />
							<button
								onClick={this.handleLogoutButtonClick}>
								Logout
							</button>
					</div>
					<div className="chat-input">
						<input
							id="chat-input"
							className="input"
							onKeyPress={this.handleInputKeyPress}
							placeholder="Enter messages here!!!">
						</input>
						<button
							onClick={this.handleSendButtonClick}>
							Send
						</button>
					</div>
				</div>
			);
		} else {
			return null;
		}
	}
});
