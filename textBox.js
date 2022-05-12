const Textbox = {
	name: null,
	element: null,
};

Textbox.clear = () => {
	Textbox.name = null;
	Textbox.element = null;
};

Textbox.getCommentElement = (el, articleFound = false) => {
	let found = articleFound || /.*replied·\d+Reply.*/.test(el.innerText.replace(/\s/g, '')) ? true : false;
	if (!el || !el.parentElement) return;
	if (el.getAttribute('role') === 'article') {
		found = true;
	}
	if (el.matches('li') && articleFound) return el;
	return Textbox.getCommentElement(el.parentElement, found);
};

Textbox.getForm = (el) => {
	if (!el || !el.parentElement) return;
	if (el.matches('form')) return el;
	const textbox = Textbox.getForm(el.parentElement);
	Textbox.element = textbox.querySelector('[role="textbox"]');
	return textbox;
};

Textbox.set = (textbox) => {
	const form = Textbox.getForm(textbox);
	Textbox.element = form.querySelector('[role="textbox"]');
	const name = textbox.innerText
		.replace('Reply to ', '')
		.replace(/\W/g, ' ')
		.replace('  Press Enter to post', '')
		.trim();
	Textbox.name = name;
};

Textbox.focus = () => Textbox.element?.focus();
