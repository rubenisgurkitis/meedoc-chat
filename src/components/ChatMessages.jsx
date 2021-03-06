var React = require('react');
var ReactEmoji = require('react-emoji');

module.exports = React.createClass({
	componentWillUpdate: function() {
		// Checks if the list was scrolled till the bottom before the upload
		// happens
		var listDom = document.getElementById('message-list');
		this.shouldScrollBottom = listDom.scrollTop + listDom.offsetHeight === listDom.scrollHeight;
	},

	componentDidUpdate: function() {
		// If the list was scrolled till the bottom, scrolls to the new bottom
		if (this.shouldScrollBottom) {
			var listDom = document.getElementById('message-list');
			listDom.scrollTop = listDom.scrollHeight;
		}
	},

	render: function() {
		var messageList = this.props.messages.map(function(message) {
			var text = ReactEmoji.emojify(message.text);
			// Maybe this is a good point to use dangerouslySetInnerHTML feature
			// but with it, the emoji component doesn't work. In this case, I think
			// the features are more important so I decided to don't use
			// dangerouslySetInnerHTML
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
					<p>{text}</p>
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
