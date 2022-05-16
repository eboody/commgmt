const Group = {};

Group.createButtons = () => {
	const groups = Utils.createElement('div', 'snippet-groups');

	const connector = Utils.createElement('div', 'snippet-connector');

	connector.style = `border-top: 2px solid var(--comment-background);
    height: 19px;
    position: absolute;
    margin-top: 0rem;
    
    z-index: 0;`;
	groups.append(connector);

	groups.style = `
    position: absolute;
    display: row;
    flex-direction: column;
    align-items: center;
    justify-content: center;
        width:max-content;
        background-color: ${Styles.colors.commentBackground};
        margin-left: -5rem;
        padding: 5px;
        border-radius: 10px;
        top: ${Textbox.element.getBoundingClientRect().y - Post.element.getBoundingClientRect().y - 10}px;
    `;

	if (Snippets.showing) {
		Window.clear();
	}

	Snippets.showing = true;

	Snippets.sections.forEach((section, index, array) => {
		const isLast = array.length === index + 1;
		setTimeout(() => groups.appendChild(Group.createButton(Post.element, section, index, isLast), 20 * index));
	});

	Post.element.appendChild(groups);

	const connectorWidth = Textbox.form.getBoundingClientRect().x - groups.getBoundingClientRect().x;
	const adjustment = connectorWidth > 180 ? 64 : 65;
	connector.style.width = `${connectorWidth - adjustment}px`;
};

Group.createButton = (post, section, index, isLast) => {
	const button = Utils.createElement('button', 'snippet-group-button');

	const same = '50';
	const buttonHeight = same;
	const buttonWidth = same;

	button.style = `
        border-radius: ${window
					.getComputedStyle(document.querySelector('[aria-label="Invite"]'))
					.getPropertyValue('--button-corner-radius')};
        height: ${buttonHeight}px;
        width: ${buttonWidth}px;
        background-color: ${Styles.colors.accent};
        color: #fff !important;
        font-size: 1.1rem !important;
        border: none;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
        transition: all 0.1s ease-in-out;
        transform: scale(0.1);
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: ${isLast ? '0px' : '5px'};
    `;

	// button.innerText = `${index + 1}`;
	button.classList.add('custom-button');
	button.classList.add(`button-${index + 1}`);
	button.addEventListener('click', (e) => {
		e.stopPropagation();
		Textbox.focus();
		// upsertPreview(post, text, textBox);
	});

	button.addEventListener(
		'mouseenter',
		(e) => {
			// console.log('mouse entered');
			createSnippetsButtons(button, section);
			button.style.transform = 'scale(1.1)';
			button.querySelector('img').style.transform = 'scale(1.3)';
			button.style.backgroundColor = '#04c3cb';
			button.style.border = `2px solid ${Styles.colors.accent}`;
			const storyButton = post.querySelector('.story-button');
			if (storyButton) storyButton.style.transform = 'scale(0)';
		},
		false
	);
	button.addEventListener(
		'mouseleave',
		(e) => {
			// console.log('mouse left');
			Group.removeSnippets(button);
		},
		false
	);

	Group.addGroupTooltip(post, section.name, button, index);

	const image = Utils.createElement('img', 'group-image');
	image.src = section.icon;
	image.style.width = '100%';
	button.appendChild(image);

	setTimeout(() => (button.style.transform = 'scale(1)'), 15);
	return button;
};

Group.removeSnippets = (button) => button.querySelector('.section').remove();

Group.addGroupTooltip = (post, text, button, index = -1) => {
	const tooltip = Utils.createElement('div', 'tooltip');

	tooltip.classList.add('custom-tooltip');

	tooltip.style = `
        background-color: white;
        position: absolute;
        color: #33566a;
        padding: 10px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        border-radius: 5px;
        display: none;
        font-size: 14px;
        width: max-content;
        max-width: 300px;
        transition: all 0.1s ease-in-out;
        left: -100px;
    `;

	tooltip.innerText = Utils.capitalize(text);

	button.appendChild(tooltip);

	button.addEventListener(
		'mouseenter',
		(e) => {
			tooltip.style.display = 'block';
		},
		false
	);
	button.addEventListener(
		'mouseleave',
		(e) => {
			tooltip.style.display = 'none';
			button.style.backgroundColor = Styles.colors.accent;
			button.style.transform = 'scale(1)';
			button.querySelector('img').style.transform = 'scale(1)';
			button.style.boxShadow = 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px';
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
