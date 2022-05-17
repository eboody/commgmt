const Comment = {
	element: null,
	name: null,
};

Comment.getElement = (el, articleFound = false) => {
	const elementDoesntExist = !el || !el.parentElement;
	if (elementDoesntExist) return;

	const gotComment = el.matches('li') && articleFound;
	if (gotComment) {
		return el;
	}

	const encounteredArticle = el.getAttribute('role') === 'article' || articleFound || el.matches('ul');
	return Comment.getElement(el.parentElement, encounteredArticle);
};

Comment.focus = () => {
	if (!Comment.element) return null;
	[...Comment.element.querySelectorAll('[role="button"]')].find((el) => el.innerText === 'Reply').click();
};

Comment.set = (el) => {
	if (!el) return;
	Comment.element = el;
	Comment.name = [...el.querySelectorAll('a[href^="/groups/367608568587889/user/"]')].find(
		(a) => !a.querySelector('svg')
	).innerText;
};
