const Textbox = {
	name: null,
	element: null,
};

Textbox.getCommentElement = (el, articleFound = false) => {
	let found = articleFound ? true : false;
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
	return Textbox.getForm(el.parentElement);
};
