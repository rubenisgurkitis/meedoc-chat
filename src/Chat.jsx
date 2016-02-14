var React = require('react');
var ChatMessages = require('./ChatMessages');
var ChatStore = require('./ChatStore');
var ChatActions = require('./ChatActions');
var Reflux = require('reflux');

module.exports = React.createClass({
	mixins: [
		Reflux.connect(ChatStore, 'chatStore')
	],

	componentWillReceiveProps: function(nextProps) {
		ChatActions.connectSocket(nextProps.userName);
	},

	handleSendButtonClick: function(event) {
		ChatActions.send(document.getElementById('chat-input').value);
	},

	handleLogoutButtonClick: function(event) {
		ChatActions.logout();
	},

	handleInputKeyPress: function(event) {
		if (event.nativeEvent.keyCode === 13){
			ChatActions.send(event.target.value);
		}
	},

	render: function() {
		var sUserName = this.state.chatStore.user;
		if (sUserName) {
			return (
				<div>
						<ChatMessages messages={this.state.chatStore.messages} />
						<button
							onClick={this.handleLogoutButtonClick}>
							Logout
						</button>
					<div style={{display: "fixed"}}>
						<input
							id="chat-input"
							onKeyPress={this.handleInputKeyPress}
							style={{width: "300px"}}
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
