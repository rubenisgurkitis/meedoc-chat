var React = require('react');

module.exports = React.createClass({
	render: function() {
		var view;
		var name = this.props.name;

		if (name) {
			view = <h3>Welcome <b>{name}</b></h3>
		} else {
			view = (
				<div style={{marginTop: '20px'}}>
					<p>Enter your username</p>
					<div style={{marginTop: '20px'}}>
						<input id="input-name"
							onKeyPress={this.handleInputKeyPress}
							style={{width: '300px'}}
							placeholder="Enter username here" />
						<button
							onClick={this.handleButtonClick}>
							Sign in!
						</button>
					</div>
				</div>
			)
		}
		return (<section>
						<div>
							<h1 style={{fontSize: '30px'}}>
								Meedoc chat
							</h1>
							{view}
						</div>
					</section>)
	},
	handleButtonClick: function(event) {
		this.props.onName(document.getElementById('input-name').value);
	},
	handleInputKeyPress: function(event) {
		if (event.nativeEvent.keyCode === 13){
			this.props.onName(event.target.value);
		}
	}
});
