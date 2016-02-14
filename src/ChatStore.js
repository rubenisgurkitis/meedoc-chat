var Reflux = require('reflux');
var ChatActions = require('./ChatActions');
var SocketUrl = 'ws://codingtest.meedoc.com/ws?username=';
var Socket;
var ConnectionAttemps = 0;

var initialState = {
	messages: [],
	user: null,
	connected: false
};

module.exports = Reflux.createStore({
	listenables: [ChatActions],

	getInitialState() {
		return this.state = initialState;
	},

	onSetUser(userName) {
		this.state.user = userName;
		this.trigger(this.state);
	},

	onConnectSocket() {
		Socket = new WebSocket(SocketUrl + this.state.user);
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
		this.state.messages = [];
		this.trigger(this.state);
	},

	onConnectionError(event) {
		debugger
		if (ConnectionAttemps < 3) {
			ConnectionAttemps++;
			this.onConnectSocket();
		} else {
			Socket.close();
		}
		// Add code to try to reconnect and logout in case that reconnection
		// is not possible.
	},

	onMessageReceived(event) {
		var messageKey = this.getNewKey();
		var oMessage = JSON.parse(event.data);
		this.state.messages = this.state.messages.concat({
			key: messageKey,
			name: oMessage.sender,
			text: oMessage.message
		});
		this.trigger(this.state);
	},

	onSend(sMessage) {
		var messageKey = this.getNewKey();
		Socket.send(sMessage);
		this.state.messages = this.state.messages.concat({
			key: messageKey,
			name: this.state.user,
			text: sMessage
		});
		this.trigger(this.state);
	},

	onLogout() {
		Socket.close();
	},

	getNewKey() {
		var key = this.state.messages.length;
		key++;
		return key;
	}

});
