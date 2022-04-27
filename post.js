const Post = {
	dates: null,
};

Post.process = (post) => {
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

Post.save = (post) => {
	const postObject = Post.createPostObject(post);
	if (!postObject.content) return;
	console.log(postObject);
};

Post.createPostObject = (post) => {
	const name = post.querySelector('h3 strong').innerText;
	const content = post.querySelector('[data-ad-preview="message"]')?.textContent;
	const time = Post.getTimeOfPostFromRelativeTime(
		post.querySelector('span[id]').querySelector('[aria-label]').innerText
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
