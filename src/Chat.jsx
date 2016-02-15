var React = require('react');
var ChatMessages = require('./ChatMessages');
var ChatStore = require('./ChatStore');
var ChatActions = require('./ChatActions');
var Reflux = require('reflux');

module.exports = React.createClass({
	mixins: [
		Reflux.connect(ChatStore, 'chatStore')
	],

	getInitialState: function() {
		return {
			inputHasText: false
		};
	},

	componentWillMount: function() {
		// Tries to connect to the socket before the rendering starts
		ChatActions.connectSocket();
	},

	handleSendButtonClick: function(event) {
		ChatActions.send(document.getElementById('chat-input').value);
		document.getElementById('chat-input').value = '';
		document.getElementById('chat-input').placeholder = '';
		this.setState({
			inputHasText: false
		});
	},

	handleInputKeyPress: function(event) {
		if (event.nativeEvent.keyCode === 13){
			ChatActions.send(event.target.value);
			event.target.value = null;
			event.target.placeholder = '';
			this.setState({
				inputHasText: false
			});
		}
	},

	handleInputChange: function(event) {
		if (event.target.value !== '') {
			this.setState({
				inputHasText: true
			});
		} else {
			this.setState({
				inputHasText: false
			});
		}
	},

	render: function() {
		var userName = this.state.chatStore.user;
		var connected = this.state.chatStore.connected;
		if (userName && connected) {
			return (
				<div>
					<div>
							<ChatMessages messages={this.state.chatStore.messages} />
					</div>
					<div className="chat-input-group" >
						<input
							id="chat-input"
							className="input chat-input"
							onChange={this.handleInputChange}
							onKeyPress={this.handleInputKeyPress}
							placeholder="Enter messages here!!!" >
						</input>
						<button
							className="chat-button"
							disabled={!this.state.inputHasText}
							onClick={this.handleSendButtonClick} >
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
