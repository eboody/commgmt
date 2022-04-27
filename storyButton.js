const StoryButton = {};

StoryButton.create = async (post) => {
	await StoryButton.applyPostTransition(post);

	const button = document.createElement('button');

	StoryButton.setStyles(button);

	StoryButton.applyAttributes(button, post);

	StoryButton.addListeners(button, post);

	post.appendChild(button);

	setTimeout(() => (button.style.transform = 'scale(1)'), 10);
};

StoryButton.setStyles = (button) => {
	const elemenWithBackgroundColor = document.querySelector('[data-pagelet="DiscussionRootSuccess"]')?.children[0];
	const backgroundColor = elemenWithBackgroundColor
		? window.getComputedStyle(elemenWithBackgroundColor).backgroundColor
		: 'transparent';

	const styles = `
        position: absolute;
        top: 0;
        border-radius: 50%;
        margin-top: -1rem;
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

StoryButton.applyAttributes = (button, post) => {
	button.classList.add('story-button');
	button.innerText = '+';

	button.setAttribute(
		'post_id',
		[...post.querySelectorAll('a')].find((a) => a.href.includes('/post_insights/'))?.href.split('/')[6]
	);
	button.setAttribute(
		'user_id',
		[...post.querySelectorAll('a')].find((a) => a.href.includes('/user/'))?.href.split('/')[6]
	);
};

StoryButton.applyPostTransition = async (post) => {
	post.style.transition = 'margin 300ms';
	post.style.marginTop = '3rem';
	await Utils.timeout(175);
};

StoryButton.addListeners = (button, post) => {
	button.addEventListener('click', async (e) => await StoryButton.handleClick(e, post), { once: true });

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

StoryButton.handleHover = async (e, post) => {
	e.preventDefault();

	const seeMoreElement = Array.from(post.querySelectorAll('div'))
		.filter((el) => el.innerText.toLowerCase().includes('see more'))
		.slice(-1)
		.pop();
	if (seeMoreElement) seeMoreElement.click();

	await Utils.timeout(300);

	StoryButton.saveStory(e, post);

	console.log(postObject);
	// e.target.remove();
};

StoryButton.saveStory = async (e, post) => {
	const postObject = StoryButton.getPostObject(e, post);
	fetch('https://abc.1gu.xyz/story', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(postObject),
	});
};

StoryButton.getPostObject = (e, post) => {
	const postContentArray = post.innerText
		.split('View insights')[0]
		.split('\n')
		.filter((el) => !/\:\d\d\s\/\s\d\:\d\d/.test(el))
		.map((el) => el.trim().replace('· ', ''))
		.filter((el) => el && !/^\+\d+$/.test(el));

	const name = postContentArray[0].split(' is with')[0].split(' is at ')[0];
	const time = postContentArray[1];
	const content = postContentArray.slice(3).join(' ').replace('· ', '');

	if (name.includes(' shared a post.')) {
		name.replace(' shared a post.', '');
		if (content.includes('M Facebook fundraisers ')) content = content.split('M Facebook fundraisers ')[1];
	}

	const postObject = {
		user_id: e.target.getAttribute('user_id'),
		name,
		time: getTimeOfPostFromRelativeTime(time),
		content,
		group_url: window.location.href,
		post_id: e.target.getAttribute('post_id'),
		challenge_id: config.id,
	};

	return postObject;
};
