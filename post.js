const Post = {
	dates: null,
};

Post.process = async (post) => {
	const postObject = await Post.createPostObject(post);
	if (postObject.name === Config.data.nonprofit) return;
	Utils.onVisible(post.querySelector('svg'), () =>
		setTimeout(() => {
			StoryButton.create(post);
		}, 500)
	);
	Post.expand(post);
	Post.save(post);
};

Post.expand = function (post) {
	const arrayOfPotentialButtons = post
		?.querySelector('[data-ad-preview="message"]')
		?.querySelectorAll('[role="button"]');
	if (!arrayOfPotentialButtons?.length) return;

	const seeMoreElement = Array.from(arrayOfPotentialButtons).find((el) =>
		el.innerText.toLowerCase().includes('see more')
	);

	if (seeMoreElement) seeMoreElement.click();
};

Post.save = async (post) => {
	const postObject = await Post.createPostObject(post);
	if (!postObject.content || postObject.name === Config.data.nonprofit) return;
	console.log(postObject);
};

Post.createPostObject = async (post) => {
	const postContentArray = post.innerText
		.split('View insights')[0]
		.split('\n')
		.filter((el) => !/\:\d\d\s\/\s\d\:\d\d/.test(el))
		.map((el) => el.trim().replace('· ', ''))
		.filter((el) => el && !/^\+\d+$/.test(el));
	// console.log(post);
	const name = post.querySelector('h3 strong')?.innerText;
	const content =
		post.querySelector('[data-ad-preview="message"]')?.textContent ||
		postContentArray
			.slice(3)
			.join(' ')
			.replace(/\s*\·\s*/, '');
	const time = Post.getTimeOfPostFromRelativeTime(
		post.querySelector('span[id]')?.querySelector('[aria-label]')?.innerText || postContentArray[1]
	);
	const post_id = [...post.querySelectorAll('a')].find((a) => a.href.includes('/post_insights/'))?.href.split('/')[6];
	const user_id = [...post.querySelectorAll('a')].find((a) => a.href.includes('/user/'))?.href.split('/')[6];

	const postObject = {
		name,
		time,
		content,
		user_id,
		post_id,
		group_url: window.location.href,
		challenge_id: Config.data.id,
	};

	return postObject;
};
