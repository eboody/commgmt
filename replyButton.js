const ReplyButton = {};

const setReplyButtonListener = (replyButton) => {
	replyButton.addEventListener('click', handleReplyButtonClick);
};

ReplyButton.setReplyButtonListeners = (post) => {
	[...post.querySelectorAll('[role="button"]')]
		.filter((el) => el.innerText === 'Reply')
		.forEach((replyButton) => setReplyButtonListener(replyButton));
};

const mutationContainsTextbox = (mutation) => {
	if (mutation.type !== 'childList') return false;
	if (!mutation.addedNodes?.length) return false;
	const addedNode = mutation.addedNodes[0];
	if (!addedNode || !addedNode.querySelector) return false;
	if (
		/*addedNode?.querySelector('[data-lexical-text="true"]') || */ addedNode.querySelector('[role="textbox"]') &&
		addedNode.querySelector('form')
	) {
		return true;
	}
	return false;
};

const getTextboxFromMutation = (mutation) => {
	const addedNode = mutation.addedNodes[0];
	return addedNode.querySelector('[role="textbox"]');
};

const handleCommentElementMutation = (mutationsList) => {
	mutationsList.forEach((mutation) => {
		if (!mutationContainsTextbox(mutation)) return;

		const textbox = getTextboxFromMutation(mutation);

		const form = Textbox.getForm(textbox);

		const name = form.innerText
			.replace('Reply to ', '')
			.replace(/\W/g, ' ')
			.replace('  Press Enter to post', '')
			.trim();

		if (name === Textbox.name) return;
		Textbox.name = name;
		Snippets.createButtons(Post.element, Textbox.element);

		form.addEventListener('click', (e) => {
			e.stopPropagation();
			// console.log(e.target);
			if (name === Textbox.name && Snippets.showing) {
				return;
			} else {
				Textbox.set(e.target);
			}
			Textbox.focus();
			Snippets.createButtons(Post.element, Textbox.element);
		});
	});
};

const handleReplyButtonClick = (event) => {
	const replyButton = event.target;

	const commentElement = Textbox.getCommentElement(replyButton);

	if (!commentElement) {
		console.log('Not Comment element');
		replyButton.removeEventListener('click', handleReplyButtonClick);
		return;
	}

	if (commentElement.querySelector('[role="textbox"]')) Textbox.set(commentElement.querySelector('[role="textbox"]'));

	if (replyButton.hasMutationObserver) return;
	replyButton.hasMutationObserver = true;

	const commentElementObserver = new MutationObserver(handleCommentElementMutation);
	commentElementObserver.observe(commentElement, { attributes: true, childList: true, subtree: true });
};
