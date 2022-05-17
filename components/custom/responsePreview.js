const Preview = {
	element: null,
	showing: false,
};

const constructSnippet = (text) => {
	const snippet = document.createElement('p');
	snippet.classList.add('custom-snippet');
	snippet.style = `
        background-color: ${Styles.colors.commentBackground};
        border-radius: 5px;
        padding: 1.5rem;
        box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
    `;
	snippet.innerText = text;
	snippet.addEventListener('click', (e) => {
		e.stopPropagation();
		snippet.remove();

		if (!Preview.element.children.length) {
			Preview.showing = false;
			Preview.element.remove();
			Preview.element = null;
			navigator.clipboard.writeText('');
			return;
		}
		navigator.clipboard.writeText(Preview.element?.innerText || '');
		Textbox.focus();
	});

	return snippet;
};

Preview.upsertPreview = (text) => {
	Preview.element = Post.element.querySelector('.preview.removable');
	if (Preview.element) {
		let adjustedText = text;
		console.log(Preview.element.children.length);
		if (Preview.element.children.length) {
			const regexString = `(Hi\\s)?(,\\s)?${
				Comment.name?.split(' ')[0] || Post.values.name?.split(' ')[0]
			}(\\s)?(-|,)?(\\s)?`;

			const regex = new RegExp(regexString, 'ig');
			let textToReplace = text.match(regex);
			adjustedText = Utils.capitalize(text.replace(textToReplace, '').replace(/^!\s/, ''));
		}

		if (
			[...Preview.element.children].find((p) => p.innerText === constructSnippet(text).innerText) ||
			[...Preview.element.children].find((p) => p.innerText === constructSnippet(adjustedText).innerText)
		)
			return;
		Preview.element.appendChild(constructSnippet(adjustedText));
	} else {
		Preview.element = Utils.createElement('div', 'preview');
		Preview.element.style = `
            background-color: ${Styles.colors.surfaceBackground};
            max-width: 650px;
            padding: 1px 15px;
            border-radius: 1rem;
            box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
            font-size:1.1rem;
            color: ${Styles.colors.textColor};
            transition: all 0.1s ease-in-out;
            transform: scale(0.1);
            margin-top: 1rem;
            `;
		Preview.element.appendChild(constructSnippet(text));
		Post.element.appendChild(Preview.element);
		Preview.showing = true;
		setTimeout(() => {
			Preview.element.style.transform = 'scale(1)';
		}, 50);
	}

	if (!Preview.element.listening) {
		Preview.element.listening = true;
		Preview.element.addEventListener('click', (e) => {
			console.log('clicked preview');
			e.stopPropagation();
		});
	}

	navigator.clipboard.writeText(Preview.element.innerText);
	return;
};
