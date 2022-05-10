const Post = {
	dates: null,
	selected: null,
};

Post.hideOrgPost = (post) => {
	post.style.marginBottom = '0rem';
	post.style.transition = 'height 300ms ease-in-out';
	post.style.height = '3rem';

	if (post.previousElementSibling.querySelector('.dot')) {
		post.style.marginTop = '1.4rem';
		post.style.height = '3.5rem';
	}

	const firstChild = post.children[0];
	firstChild.style.display = 'none';

	if (!/View\s\d+\sprevious\scomments/.test(post.innerText)) {
		// post.style.display = 'none';
		// return;
	}
	const dot = document.createElement('button');
	dot.setAttribute('class', 'dot');

	const imageUrl = post.querySelector('image').getAttribute('xlink:href');
	const image = document.createElement('img');
	image.setAttribute('src', imageUrl);
	image.style.borderRadius = '50%';
	dot.appendChild(image);
	dot.style = `
        width: 50px;
        height: 50px;
        background-color: tomato;
        border-radius: 50%;
        position: absolute;
        top: -21px;
        left: -21px;
        z-index: 1;
        border: none;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `;
	dot.addEventListener('click', () => {
		if (firstChild.style.display === 'none') {
			post.style.marginBottom = '3rem';
			post.style.height = 'auto';
			firstChild.style.display = 'block';
		} else {
			post.style.marginBottom = '0rem';
			firstChild.style.display = 'none';
			post.style.height = '3rem';

			if (post.previousElementSibling.querySelector('.dot')) {
				post.style.height = '3.5rem';
			}
		}
	});
	post.prepend(dot);
};

Post.process = async (post) => {
	post.style.marginBottom = '3rem';
	const postObject = Post.createPostObject(post);
	if (postObject.name === Config.data.nonprofit) {
		Post.hideOrgPost(post);
		return;
	}
	if (!postObject.content) return;
	Utils.onVisible(post.querySelector('svg'), () =>
		setTimeout(() => {
			StoryButton.create(post);
		}, 500)
	);
	Post.expand(post);
	Post.save(post);
	Post.setListeners(post);
};
let textBoxBuffer;

const setReplyButtonListener = (replyButton) => {
	const config = { attributes: true, childList: true, subtree: true };

	const commentElement = Textbox.getCommentElement(replyButton);

	if (!commentElement) {
		console.log('Not Comment element');
		return;
	}

	const commentElementMutationCallback = (mutationsList) => {
		mutationsList.forEach((mutation) => {
			if (mutation.target.getAttribute('[aria-label^="Reply"]') || mutation.target.matches('p')) console.log(mutation);
			if (mutation.type === 'childList') {
				if (!mutation.addedNodes?.length) return;
				const addedNode = mutation.addedNodes[0];
				if (!addedNode || !addedNode.querySelector) return;
				if (addedNode?.querySelector('[data-lexical-text="true"]')) {
					const name = addedNode.innerText.trim();
					if (name === Textbox.name) return;
					Textbox.name = name;
					console.log(Textbox.name);

					const form = Textbox.getForm(addedNode);

					form.addEventListener('click', (e) => {
						if (name === Textbox.name) return;
						Textbox.name = name;
						console.log(Textbox.name);
					});
				}
			}
		});
	};

	replyButton.addEventListener('click', () => {
		const commentElementObserver = new MutationObserver(commentElementMutationCallback);
		commentElementObserver.observe(commentElement, config);
	});
};

Post.setListeners = (post) => {
	[...post.querySelectorAll('[role="button"]')]
		.filter((el) => el.innerText === 'Reply')
		.forEach((replyButton) => setReplyButtonListener(replyButton));

	post.addEventListener('click', () => {
		const thisPost = Post.createPostObject(post);
		if (thisPost.post_id !== Post.selected?.post_id) {
			Post.selected = thisPost;
			Snippets.removeCustomStuff();
		}
	});

	const config = { attributes: true, childList: true, subtree: true };

	const postMutationCallback = function (mutationsList) {
		mutationsList.forEach((mutation) => {
			if (mutation.type === 'childList') {
				if (!mutation.addedNodes?.length) return;
				const addedNode = mutation.addedNodes[0];
				if (!addedNode || !addedNode.querySelector) return;
				if (addedNode?.querySelector('[aria-label^="Comment by"]')) {
					const replyButton = [...addedNode.querySelectorAll('[role="button"]')].find((el) => el.innerText === 'Reply');
					if (!replyButton) return;
					setReplyButtonListener(replyButton);
				}
			}
		});
	};

	const postObserver = new MutationObserver(postMutationCallback);

	postObserver.observe(post, config);
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

Post.createPostObject = (post) => {
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
