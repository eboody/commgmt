const StoryButton = {};

StoryButton.create = async (post) => {
	const button = document.createElement('button');

	StoryButton.setStyles(button);

	StoryButton.addListeners(button, post);

	const container = document.createElement('div');
	container.style = `
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
    `;

	container.appendChild(button);

	post.appendChild(container);

	setTimeout(() => (button.style.transform = 'scale(1)'), 10);
};

StoryButton.setStyles = (button) => {
	button.setAttribute('class', 'story-button');
	const elemenWithBackgroundColor = document.querySelector('[data-pagelet="DiscussionRootSuccess"]')?.children[0];
	const backgroundColor = elemenWithBackgroundColor
		? window.getComputedStyle(elemenWithBackgroundColor).backgroundColor
		: 'var(--web-wash)';

	button.innerText = '+';

	const buttonWidth = 50;

	const styles = `
        position: absolute;
        top: 0;
        border-radius: 50%;
        margin-top: -26px;
        height: ${buttonWidth}px;
        width: ${buttonWidth}px;
        background-color: ${window
					.getComputedStyle(document.querySelector('[aria-label="Invite"]'))
					.getPropertyValue('--primary-button-background')};
        border:none;
        outline: 10px solid ${Styles.colors.background};
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

StoryButton.addListeners = (button, post) => {
	button.addEventListener(
		'click',
		async (e) => {
			// console.log(Post.extractValues(post));
			// console.log(Post.values);
			const isStory = await AI.isStory(Post.values.content);
			if (isStory) {
				Post.element.responses = await AI.generateResponses(Post.values.content);
				Post.element.style.boxShadow = 'rgb(254 254 255) 0px 7px 29px 0px';
				Post.element.style.borderRadius = '10px';
			}
		}
		// { once: true }
	);

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

StoryButton.saveStory = async (post) => {
	const postObject = await Post.getPostObject(post);
	fetch('https://abc.1gu.xyz/story', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(postObject),
	});
};
