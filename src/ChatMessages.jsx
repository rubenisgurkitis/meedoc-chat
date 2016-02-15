var React = require('react');

module.exports = React.createClass({
	componentWillUpdate: function() {
		var listDom = document.getElementById('message-list');
		this.shouldScrollBottom = listDom.scrollTop + listDom.offsetHeight === listDom.scrollHeight;
	},

	componentDidUpdate: function() {
		if (this.shouldScrollBottom) {
			var listDom = document.getElementById('message-list');
			listDom.scrollTop = listDom.scrollHeight;
		}
	},

	render: function() {
		var messageList = this.props.messages.map(function(message) {
			return	(
				<li key={message.key}>
					<span
						className="chat-message-header" >
						{message.time}
					</span>
					<span
						className="chat-message-header" >
						{message.name}
					</span>
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
