var Reflux = require('reflux');
var ChatActions = require('./ChatActions');
var SocketUrl = 'ws://codingtest.meedoc.com/ws?username=';
var Socket;
var ConnectionAttemps = 0;

var initialState = {
	messages: [],
	user: null,
	connected: false,
	errorMessage: null
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
		// Open the connections and attach listener for open, close and error
		Socket = new WebSocket(SocketUrl + this.state.user);
		Socket.onopen = this.onOpenConnection;
		Socket.onclose = this.onCloseConnection;
		Socket.onerror = this.onConnectionError;
	},

	onOpenConnection(event) {
		// Once the connection is stablished, attach listener for onmessage
		Socket.onmessage = this.onMessageReceived;
		this.state.connected = true;
		ConnectionAttemps = 0;
		this.trigger(this.state);
	},

	onCloseConnection(event) {
		// No error should be handled here but since this particular server side is
		// implemented to respond with event code 1006 after 1 minutes without
		// interaction and the WebSocket object seems to don't recognize this error
		// as an error, the handling have to be managed here too.
		if (event.code === 1006) {
			this.manageError(event);
		} else {
			this.state.connected = false;
			this.state.user = null;
			this.state.messages = [];
			this.trigger(this.state);
		}
	},

	manageError(event) {
		// Attempt to reconnect 3 times
		if (ConnectionAttemps < 3) {
			ConnectionAttemps++;
			this.onConnectSocket();
		} else {
			// If no reconnection was possible, the error will be shown to the user
			this.state.errorMessage = event.code + '-' + event.reason;
			this.trigger(this.state);
			Socket.close();
		}
	},

	onConnectionError(event) {
		this.manageError(event);
	},

	getTime() {
		return new Date().toLocaleTimeString() + "  ";
	},

	onMessageReceived(event) {
		var messageKey = this.getNewKey();
		var oMessage = JSON.parse(event.data);
		this.state.messages = this.state.messages.concat({
			key: messageKey,
			name: oMessage.sender,
			text: oMessage.message,
			time: this.getTime()
		});
		this.trigger(this.state);
	},

	onSend(sMessage) {
		var messageKey = this.getNewKey();
		Socket.send(sMessage);
		this.state.messages = this.state.messages.concat({
			key: messageKey,
			name: this.state.user,
			text: sMessage,
			time: this.getTime()
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
