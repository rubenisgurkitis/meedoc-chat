var React = require('react');
var Reflux = require('reflux');
var ChatActions = require('../actions/ChatActions');
var ChatStore = require('../stores/ChatStore');

module.exports = React.createClass({
	mixins: [
		Reflux.connect(ChatStore, 'chatStore')
	],

	getInitialState: function() {
		return {
			inputHasText: false
		};
	},

	handleButtonClick: function(event) {
		ChatActions.setUser(document.getElementById('input-name').value);
		// Sets inputHasText to false to render correctly next time
		this.setState({
			inputHasText: false
		});
	},

	handleInputKeyPress: function(event) {
		if (event.nativeEvent.keyCode === 13){
			ChatActions.setUser(document.getElementById('input-name').value);
			// Sets inputHasText to false to render correctly next time
			this.setState({
				inputHasText: false
			});
		}
	},

	handleLogoutButtonClick: function(event) {
		ChatActions.logout();
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

	getContent: function(name, error) {
		var user = this.state.chatStore.user;
		var errorMessage = this.state.chatStore.errorMessage;
		if (user) {
			return <p>Welcome <b>{user}</b></p>;
		} else if (errorMessage){
			return (
				<div>
					<p
						className="subtitle" >
						{errorMessage}
					</p>
				</div>
			);
		} else {
			return (
				<div className="input-group-welcome" >
					<input id="input-name"
						className="input"
						onChange={this.handleInputChange}
						onKeyPress={this.handleInputKeyPress}
						placeholder="Enter username here" />
					<button
						className="button button-input"
						type="button"
						disabled={!this.state.inputHasText}
						onClick={this.handleButtonClick} >
						Sign in!
					</button>
				</div>
			);
		}
	},

	getLogoutButton: function(connected) {
		if (connected) {
			return (
				<div
					className="logout" >
					<button
						className="button button-logout"
						onClick={this.handleLogoutButtonClick} >
						Logout
					</button>
				</div>
			);
		} else {
			return null;
		}
	},

	render: function() {
		var view = this.getContent();
		var logoutView = this.getLogoutButton(this.state.chatStore.connected);
		return (
			<div>
				<header>
					<div>
						<h1
							className="title" >
							Meedoc chat
						</h1>
						{logoutView}
					</div>
				</header>
				<div>
					<section>
							{view}
					</section>
				</div>
			</div>
		);
	}
});
