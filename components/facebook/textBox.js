const Textbox = {
	name: null,
	element: null,
	form: null,
};

Textbox.getForm = (el) => {
	if (!el || !el.parentElement) return;
	if (el.matches('form')) return el;
	const form = Textbox.getForm(el.parentElement);
	return form;
};

Textbox.set = (textbox) => {
	Textbox.form = Textbox.getForm(textbox);
	Textbox.element = Textbox.form.querySelector('[role="textbox"]');
	Textbox.name =
		Textbox.element.querySelector('span[data-lexical-text="true"]')?.innerText ||
		Textbox.element.getAttribute('aria-label')?.split('Reply to ')[1];
	Textbox.setListener(textbox);
};
Textbox.setListeners = (post) => {
	[...post.querySelectorAll('[role="textbox"]')]
		.filter((t) => !t.innerText.includes('Comment as'))
		.forEach((textbox) => Textbox.setListener(textbox));
};

Textbox.setLastComment = (textbox) => {
	const form = Textbox.getForm(textbox);
	const textboxHasntChanged = form === Textbox.form;
	const associatedCommentsHasAlreadyBeenInitialized = Array.isArray(form.associatedComments);

	console.log('in setLastComment');
	console.log(form.associatedComments);
	if (!associatedCommentsHasAlreadyBeenInitialized) {
		form.associatedComments = [Comment.element];
		return;
	}

	if (textboxHasntChanged) {
		Textbox.form.associatedComments.push(Comment.element);
	} else {
		let lastCommentAssociatedWithTextbox = form.associatedComments.find((el) => el === Comment.element);
		if (!lastCommentAssociatedWithTextbox)
			lastCommentAssociatedWithTextbox = form.associatedComments[form.associatedComments.length - 1];
		Comment.set(lastCommentAssociatedWithTextbox);
	}
};

Textbox.setListener = (textbox) => {
	const handleFocus = (e) => {
		const textbox = e.target;
		Textbox.setLastComment(textbox);
		Textbox.set(textbox);
		Group.createButtons();
		setTimeout(() => Utils.scrollIntoView(Textbox.element), 100);
	};

	const handleClick = (e) => {
		e.stopPropagation();
	};

	if (!Textbox.getForm(textbox).alreadyListening) {
		Textbox.getForm(textbox).addEventListener('focus', handleFocus, { capture: true });
		Textbox.getForm(textbox).addEventListener('click', handleClick);
		Textbox.getForm(textbox).alreadyListening = true;
	}
};

Textbox.focus = () => Textbox.element?.focus();
Textbox.click = () => Textbox.element?.dispatchEvent(new Event('click', { bubbles: true }));
