const ReplyButton = {};

ReplyButton.setListeners = (post) => {
	[...post.querySelectorAll('[role="button"]')]
		.filter((el) => el.innerText === 'Reply')
		.forEach((replyButton) => ReplyButton.setListener(replyButton));
};

ReplyButton.setListener = (replyButton) => {
	replyButton.addEventListener('click', () => handleReplyButtonClick(replyButton));
};

const handleReplyButtonClick = (replyButton) => {
	commentElement = Comment.getElement(replyButton);

	if (!commentElement) {
		return replyButton.removeEventListener('click', handleReplyButtonClick);
	}

	Comment.set(commentElement);

	let lastTextboxChild = [...commentElement.querySelectorAll('[role="textbox"]')].slice(-1).pop();
	if (lastTextboxChild) {
		Textbox.set(lastTextboxChild);
		// Textbox.click();
	}

	if (commentElement.hasMutationObserver) return;
	commentElement.hasMutationObserver = true;

	const commentElementObserver = new MutationObserver((mutationsList) => handleCommentElementMutation(mutationsList));
	commentElementObserver.observe(commentElement, { attributes: true, childList: true, subtree: true });
	console.log('in handleReplyButtonClick');
	console.log(Comment.name);
};

const mutationContainsTextbox = (mutation) => {
	const addedNode = mutation.addedNodes[0];

	return (
		addedNode &&
		addedNode.querySelector &&
		addedNode.querySelector('[role="textbox"]') &&
		addedNode.querySelector('form')
	);
};

const getTextboxFromMutation = (mutation) => {
	const addedNode = mutation.addedNodes[0];
	return addedNode.querySelector('[role="textbox"]');
};

const handleCommentElementMutation = (mutationsList) => {
	mutationsList.forEach((mutation) => {
		if (mutationContainsTextbox(mutation)) {
			const textbox = getTextboxFromMutation(mutation);
			if (textbox === Textbox.element) return;
			Textbox.setListener(textbox);
		}
	});
};
