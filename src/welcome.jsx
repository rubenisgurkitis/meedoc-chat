var React = require('react');
var Reflux = require('reflux');
var ChatActions = require('./ChatActions');
var ChatStore = require('./ChatStore');

module.exports = React.createClass({
	mixins: [
		Reflux.connect(ChatStore, 'chatStore')
	],

	handleButtonClick: function(event) {
		ChatActions.setUser(document.getElementById('input-name').value);
	},

	handleInputKeyPress: function(event) {
		if (event.nativeEvent.keyCode === 13){
			ChatActions.setUser(document.getElementById('input-name').value);
		}
	},

	getContent: function(name) {
		if (name) {
			return <h3>Welcome <b>{name}</b></h3>;
		} else {
			return (
				<div>
					<p>Enter your username</p>
					<div>
						<input id="input-name"
							className="input"
							onKeyPress={this.handleInputKeyPress}
							placeholder="Enter username here" />
						<button
							className="welcome-button"
							onClick={this.handleButtonClick}>
							Sign in!
						</button>
					</div>
				</div>
			);
		}
	},

	render: function() {
		var view;
		view = this.getContent(this.state.chatStore.user);
		return (
			<section>
				<div>
					<h1>Meedoc chat</h1>
					{view}
				</div>
			</section>
		);
	}
});
