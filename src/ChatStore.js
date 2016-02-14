var Reflux = require('reflux');
var ChatActions = require('./ChatActions');
var SocketUrl = 'ws://codingtest.meedoc.com/ws?username=';
var Socket;

var initialState = {
	messages: [],
	user: '',
	connected: false
};

module.exports = Reflux.createStore({
	listenables: [ChatActions],

	getInitialState() {
		return this.state = initialState;
	},

	onConnectSocket(userName) {
		this.state.user = userName;
		Socket = new WebSocket(SocketUrl + userName);
		Socket.onopen = this.onOpenConnection;
		Socket.onclose = this.onCloseConnection;
		Socket.onerror = this.onConnectionError;
	},

	onOpenConnection(event) {
		Socket.onmessage = this.onMessageReceived;
		this.state.connected = true;
		this.trigger(this.state);
	},

	onCloseConnection(event) {
		this.state.connected = false;
		this.state.user = null;
		this.trigger(this.state);
	},

	onConnectionError(event) {
		this.state.connected = false;
		// Add code to try to reconnect and logout in case that reconnection
		// is not possible.
	},

	onMessageReceived(event) {
		var oMessage = JSON.parse(event.data);
		this.state.messages = this.state.messages.concat({
			name: oMessage.sender,
			text: oMessage.message
		});
		this.trigger(this.state);
	},

	onSend(sMessage) {
		Socket.send(sMessage);
		this.state.messages = this.state.messages.concat({
			name: this.state.user,
			text: sMessage
		});
		this.trigger(this.state);
	},

	onLogout() {
		Socket.close();
	}

});
