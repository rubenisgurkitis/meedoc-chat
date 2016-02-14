var React = require('react');

module.exports = React.createClass({

	handleButtonClick: function(event) {
		this.props.onName(document.getElementById('input-name').value);
	},

	handleInputKeyPress: function(event) {
		if (event.nativeEvent.keyCode === 13){
			this.props.onName(event.target.value);
		}
	},

	getContent: function(name) {
		if (name) {
			return <h3>Welcome <b>{name}</b></h3>;
		} else {
			return (
				<div style={{marginTop: "20px"}}>
					<p>Enter your username</p>
					<div style={{marginTop: "20px"}}>
						<input id="input-name"
							onKeyPress={this.handleInputKeyPress}
							style={{width: "300px"}}
							placeholder="Enter username here" />
						<button
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
		view = this.getContent(this.props.userName);
		return (<section>
						<div>
							<h1 style={{fontSize: "30px"}}>
								Meedoc chat
							</h1>
							{view}
						</div>
					</section>)
	}
});
