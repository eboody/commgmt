const ReplyButton = {};

ReplyButton.setListeners = (post) => {
	[...post.querySelectorAll('[role="button"]')]
		.filter((el) => el.innerText === 'Reply')
		.forEach((replyButton) => ReplyButton.setListener(replyButton));
};

ReplyButton.setListener = (replyButton) => {
	replyButton.addEventListener('click', handleReplyButtonClick);
};

const handleReplyButtonClick = (event) => {
	const replyButton = event.target;

	commentElement = Comment.getElement(replyButton);

	if (!commentElement) {
		return replyButton.removeEventListener('click', handleReplyButtonClick);
	}

	commentAlreadySelected = commentElement === Comment.element;
	if (!commentAlreadySelected) {
		Comment.setElement(commentElement);
	}

	const textBoxChild = commentElement.querySelector('[role="textbox"]');
	if (textBoxChild) {
		Textbox.set(textBoxChild);
		Textbox.click();
	}

	if (replyButton.hasMutationObserver) return;
	replyButton.hasMutationObserver = true;

	const commentElementObserver = new MutationObserver(handleCommentElementMutation);
	commentElementObserver.observe(commentElement, { attributes: true, childList: true, subtree: true });
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
		if (!mutationContainsTextbox(mutation)) return;

		const textbox = getTextboxFromMutation(mutation);

		if (textbox === Textbox.element) return;

		Textbox.set(textbox);
		Utils.scrollIntoView(Textbox.element);

		Snippets.createButtons();

		Textbox.form.addEventListener('click', (e) => {
			e.stopPropagation();
			Textbox.set(e.target);
			Utils.scrollIntoView(Textbox.element);
			Textbox.focus();
			Snippets.createButtons();
		});
	});
};
