const Comment = {
	element: null,
};

Comment.getElement = (el, articleFound = false) => {
	const elementDoesntExist = !el || !el.parentElement;
	if (elementDoesntExist) return;

	const gotComment = el.matches('li') && articleFound;
	if (gotComment) {
		return el;
	}

	const encounteredArticle = el.getAttribute('role') === 'article' || articleFound;
	return Comment.getElement(el.parentElement, encounteredArticle);
};

Comment.setElement = (el) => (Comment.element = el);

// Comment.highlight = () => (Comment.element.style.border = `2px solid ${Styles.colors.accent}`);

// Comment.unhighlight = () => (Comment.element.style.border = `none`);
