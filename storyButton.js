const StoryButton = {};

StoryButton.create = async (post) => {
	await StoryButton.applyPostTransition(post);

	const button = document.createElement('button');

	StoryButton.setStyles(button);

	StoryButton.addListeners(button, post);

	post.appendChild(button);

	setTimeout(() => (button.style.transform = 'scale(1)'), 10);
};

StoryButton.setStyles = (button) => {
	const elemenWithBackgroundColor = document.querySelector('[data-pagelet="DiscussionRootSuccess"]')?.children[0];
	const backgroundColor = elemenWithBackgroundColor
		? window.getComputedStyle(elemenWithBackgroundColor).backgroundColor
		: 'var(--web-wash)';

	button.innerText = '+';

	const styles = `
        position: absolute;
        top: 0;
        border-radius: 50%;
        margin-top: -26px;
        margin-left: 20rem;
        height: 50px;
        width: 50px;
        background-color: ${window
					.getComputedStyle(document.querySelector('[aria-label="Invite"]'))
					.getPropertyValue('--primary-button-background')};
        border:none;
        outline: 10px solid ${backgroundColor};
        font-size: 2.5rem;
        transition: all 0.1s ease-in-out;
        transform: scale(0.1);
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;

	button.style = styles;
};

StoryButton.applyPostTransition = async (post) => {
	post.style.transition = 'margin 300ms';
	post.style.marginTop = '3rem';
	await Utils.timeout(175);
};

StoryButton.addListeners = (button, post) => {
	button.addEventListener('click', async (e) => await StoryButton.handleClick(post), { once: true });

	button.addEventListener(
		'mouseover',
		(e) => {
			button.style.transform = 'scale(1.1)';
			button.style.backgroundColor = '#04c3cb';
		},
		false
	);
	button.addEventListener(
		'mouseout',
		(e) => {
			button.style.backgroundColor = `${window
				.getComputedStyle(document.querySelector('[aria-label="Invite"]'))
				.getPropertyValue('--primary-button-background')}`;
			button.style.transform = 'scale(1)';
		},
		false
	);
};

StoryButton.saveStory = async (e, post) => {
	const postObject = await StoryButton.getPostObject(e, post);
	fetch('https://abc.1gu.xyz/story', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(postObject),
	});
};
