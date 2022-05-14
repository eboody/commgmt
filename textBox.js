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
	Textbox.name = Textbox.element.getAttribute('aria-label')?.split('Reply to ')[1];
};

Textbox.focus = () => Textbox.element?.focus();
Textbox.click = () => Textbox.element?.click();
