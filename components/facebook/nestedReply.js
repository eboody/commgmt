const NestedReply = {};

NestedReply.getComment = (el) => {
	if (!el) return;

	if (el.parentElement.matches('li')) return el.parentElement;

	return NestedReply.getComment(el.parentElement);
};

// NestedReply.setListener = ()
