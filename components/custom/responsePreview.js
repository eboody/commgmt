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
		prview = Utils.createElement('div', 'preview');
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
