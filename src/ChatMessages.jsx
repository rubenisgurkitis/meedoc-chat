var React = require('react');

module.exports = React.createClass({
	render: function() {
		var messageList = this.props.messages.map(function(message) {
			return	(
				<li key={message.key}>
					<span>{message.name}</span>
						<p dangerouslySetInnerHTML={{__html: message.text}} />
				</li>
			);
		});
		return (
			<ul id="message-list">
				{messageList}
			</ul>
		);
	}
});
