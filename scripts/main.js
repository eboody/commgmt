let textBoxBuffer;

const handleClick = async (e) => {
	if (await textBoxActive()) {
		const textBox = document.activeElement;
		textBox?.setAttribute('id', new Date().getTime());
		if (textBox?.outerHTML != textBoxBuffer?.outerHTML || !document.querySelectorAll('.custom-button').length) {
			textBoxBuffer = textBox;
			navigator.clipboard.writeText('');
			removeCustomStuff();
			const post = getPostElementFromTextBox(textBox);
			createButtons(post, textBox);
		}
	} else if (!e.target.classList.contains('custom-snippet') && !e.target.classList.contains('custom-preview')) {
		removeCustomStuff();
	}
};

const removeCustomStuff = () => {
	const previews = [...document.querySelectorAll('.custom-preview'), ...document.querySelectorAll('.custom-button')];
	previews.forEach((el, index) => {
		el.style.transform = 'scale(0)';
		setTimeout(() => el.remove(), 10 * index);
	});
};

const createButtons = (post, textBox) => {
	snippets.forEach((s, index) => setTimeout(() => createButton(post, textBox, s, index), 10 * index));
};

const createButton = (post, textBox, text) => {
	const index = snippets.indexOf(text);
	const button = document.createElement('button');

	button.style = `
        position: absolute;
        border-radius: ${window
					.getComputedStyle(document.querySelector('[aria-label="Invite"]'))
					.getPropertyValue('--button-corner-radius')};
        margin-top: ${-2.75 * (index + 1)}rem;
        margin-left: -2rem;
        height: 2.25rem;
        width: 2.25rem;
        background-color: ${window
					.getComputedStyle(document.querySelector('[aria-label="Invite"]'))
					.getPropertyValue('--primary-button-background')};
        color: #fff !important;
        font-size: 1.1rem !important;
        border: none;
  
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
        transition: all 0.1s ease-in-out;
        transform: scale(0.1);
    `;

	button.innerText = `${index + 1}`;
	button.classList.add('custom-button');
	button.classList.add(`button-${index + 1}`);
	button.addEventListener('click', () => {
		textBox.focus();
		upsertPreview(post, text, textBox);
	});

	addTooltip(post, text, button);

	post.children[0].appendChild(button);
	setTimeout(() => (button.style.transform = 'scale(1)'), 15);
};

const addTooltip = (post, text, button) => {
	const name = getName(post);

	const tooltip = document.createElement('div');

	tooltip.classList.add('custom-tooltip');

	tooltip.style = `
        background-color: white;
        position: absolute;
        color: #33566a;
        padding: 2rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        border-radius: 5px;
        width:500px;
        top: 0;
        left: 40px;
        display: none;
        font-size:1.1rem;
    `;

	tooltip.innerText = replaceTextWithConfigStuff(getConfigFromGroupUrl(), name, text);

	button.appendChild(tooltip);
	button.addEventListener(
		'mouseover',
		(e) => {
			tooltip.style.display = 'block';
			tooltip.style.top = '-' + tooltip.getBoundingClientRect().height + 'px';
			button.style.transform = 'scale(1.1)';
			button.style.backgroundColor = '#04c3cb';
			const storyButton = post.querySelector('.story-button');
			if (storyButton) storyButton.style.transform = 'scale(0)';
		},
		false
	);
	button.addEventListener(
		'mouseout',
		(e) => {
			tooltip.style.display = 'none';
			button.style.backgroundColor = `${window
				.getComputedStyle(document.querySelector('[aria-label="Invite"]'))
				.getPropertyValue('--primary-button-background')}`;
			button.style.transform = 'scale(1)';
			const storyButton = post.querySelector('.story-button');
			if (!storyButton) return;

			setTimeout(() => {
				const showingTooltip = [...post.querySelectorAll('.custom-tooltip')].find(
					(t) => window.getComputedStyle(t).display === 'block'
				);
				if (!showingTooltip) storyButton.style.transform = 'scale(1)';
			}, 300);
		},
		false
	);
};

const upsertPreview = (node, text, textBox) => {
	let preview = node.querySelector('.custom-preview');
	if (preview) {
		let adjustedText = text;
		if (preview.children.length) {
			let textToReplace = text.match(/^Hi.*{{first_name}}\s*[\,\.\!\-]\s*|\,\s+{{first_name}}/);
			adjustedText = capitalize(text.replace(textToReplace, ''));
		}

		if (
			[...preview.children].find((p) => p.innerText === constructSnippet(node, text, textBox).innerText) ||
			[...preview.children].find((p) => p.innerText === constructSnippet(node, adjustedText, textBox).innerText)
		)
			return;
		preview.appendChild(constructSnippet(node, adjustedText, textBox));
	} else {
		preview = document.createElement('div');
		preview.classList.add('custom-preview');
		preview.style = `
            background-color: white;
            max-width: 650px;
            padding: 1.5rem;
            border-radius: 1rem;
            box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
            font-size:1.1rem;
            color: #33566a;
            transition: all 0.1s ease-in-out;
            transform: scale(0.1);
            margin-top: 1rem;
            `;
		preview.appendChild(constructSnippet(node, text, textBox));
		node.appendChild(preview);
		setTimeout(() => {
			preview.style.transform = 'scale(1)';
		}, 50);
	}
	navigator.clipboard.writeText(preview.innerText);
	return;
};

const removeEmptyPreviews = () => {
	const previews = [...document.querySelectorAll('.custom-preview')];
	if (previews.find((el) => el.innerText === '')) previews.forEach((el) => el.remove());
};

const getName = (post) => {
	if (document.activeElement.getAttribute('aria-label').includes('Reply to'))
		return document.activeElement.getAttribute('aria-label')?.split('Reply to')[1].trim();
	else
		return [...post.querySelectorAll('a')]
			.filter((a) => a.href.includes('user'))[0]
			.querySelector('a')
			.getAttribute('aria-label');
};

const constructSnippet = (node, text, textBox) => {
	if (!window?.location?.href) return;

	const config = getConfigFromGroupUrl(window.location.href);

	const snippet = document.createElement('p');
	snippet.classList.add('custom-snippet');
	snippet.style = `
        background-color: #fff;
        border-radius: 5px;
        padding: 1.5rem;
        box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
    `;
	const name = getName(node);
	snippet.innerText = replaceTextWithConfigStuff(config, name, text);
	snippet.addEventListener('click', () => {
		snippet.remove();
		removeEmptyPreviews();
		navigator.clipboard.writeText(node.querySelector('.custom-preview')?.innerText || '');
		textBox.focus();
	});

	return snippet;
};

const getPostElementFromTextBox = (node) => {
	if (!node) return;
	if (node?.parentElement?.getAttribute('role') === 'article' && !node?.parentElement?.getAttribute('aria-label')) {
		return node?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;
	} else {
		return getPostElementFromTextBox(node?.parentElement);
	}
};

const textBoxActive = () =>
	new Promise((resolve) =>
		setTimeout(() => {
			if (document.activeElement.getAttribute('role') === 'textbox') {
				resolve(true);
			} else resolve(false);
		}, 50)
	);

const handleMouseover = (e) => {
	const post = getPostElementFromTextBox(e.target);
	if (post && !post.getAttribute('story-button-created')) {
		post.setAttribute('story-button-created', 'true');
		storyButton.create(post);
	}
};

(async () => {
	if (!/.*facebook.*groups/.test(window.location.href)) return;
	window.addEventListener('click', handleClick, true);
	window.addEventListener('mouseover', handleMouseover, { passive: true });
})();
