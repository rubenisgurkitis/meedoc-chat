var React = require('react');
var Reflux = require('reflux');
var ChatActions = require('./ChatActions');
var ChatStore = require('./ChatStore');

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
	},

	handleInputKeyPress: function(event) {
		if (event.nativeEvent.keyCode === 13){
			ChatActions.setUser(document.getElementById('input-name').value);
		}
	},

	handleLogoutButtonClick: function(event) {
		ChatActions.logout();
	},

	onInputChange: function(event) {
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
		if (name) {
			return <p>Welcome <b>{name}</b></p>;
		} else if (error){
			return (
				<div>
					<p
						className="subtitle" >
						Enter your username
					</p>
				</div>
			);
		} else {
			return (
				<div className="input-group-welcome" >
					<input id="input-name"
						className="input"
						onChange={this.onInputChange}
						onKeyPress={this.handleInputKeyPress}
						placeholder="Enter username here" />
					<button
						className="button"
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
						className="button"
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
		var view = this.getContent(this.state.chatStore.user,
			this.state.chatStore.errorMessage);
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
