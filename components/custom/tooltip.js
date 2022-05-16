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
