const Post = {
	values: null,
	element: null,
};

Post.process = async (post) => {
	post.style.marginBottom = '3rem';

	Post.expand(post);

	const postValues = Post.extractValues(post);
	if (postValues.content.includes('Press Enter to post')) postValues.content = null;

	// if (postValues.post_id !== '393274116021334') {
	// 	return Post.hidePost(post);
	// }

	const postIsFromNonprofit = postValues.name.includes(Config.data.nonprofit);
	if (postIsFromNonprofit) {
		return Post.hidePost(post, (isOrg = true));
	}

	const isCandidate = postValues.content && postValues.content.length > 100;
	if (isCandidate) {
		AI.isStory(postValues.content).then((isStory) => {
			if (isStory) {
				post.isStory = true;
				const org = Config.data.nonprofit;
				AI.generateResponses(postValues.content, org).then((responses) => {
					post.responses = responses;
					post.style.transition = 'all 0.7s ease-in-out';
					post.style.boxShadow = 'rgb(254 254 255) 0px 7px 29px 0px';
					post.style.borderRadius = '10px';
				});
			}
		});
	}

	const postDoesntHaveTextContent = !postValues.content && !/[1-9]+\sComments/.test(post.innerText);
	if (postDoesntHaveTextContent) {
		// return Post.hidePost(post);
	}

	Post.whenVisible(post);
	Post.save(post);
	Post.observe(post);
	Post.setListeners(post);
};

Post.hidePost = (post, isOrg = false) => {
	post.style.marginBottom = '0rem';
	post.style.height = '3rem';

	if (post.previousElementSibling?.querySelector('.dot')) {
		post.style.marginTop = '1.4rem';
		post.style.height = '3.5rem';
	}

	const firstChild = post.children[0];
	firstChild.style.display = 'none';

	const imageUrl = post.querySelector('image').getAttribute('xlink:href');
	const image = document.createElement('img');
	image.setAttribute('src', imageUrl);
	image.style.borderRadius = '50%';

	const dot = document.createElement('button');
	dot.classList.add('dot');
	dot.appendChild(image);
	dot.style = `
        width: 50px;
        height: 50px;
        background-color: ${isOrg ? Styles.colors.accent : 'tomato'};
        border-radius: 50%;
        position: absolute;
        top: -21px;
        left: -50px;
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

Post.whenVisible = (post) => {
	// Utils.onVisible(post.querySelector('svg'), () =>
	// 	setTimeout(() => {
	// 		StoryButton.create(post);
	// 	}, 500)
	// );
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
	const postValues = await Post.extractValues(post);
	if (!postValues.content || postValues.name === Config.data.nonprofit) return;
};

Post.setListeners = (post) => {
	post.addEventListener('mouseenter', (e) => {
		post.style.zIndex = 2;
	});
	post.addEventListener('mouseleave', (e) => {
		if (post !== Post.element) post.style.zIndex = 1;
	});
	post.addEventListener('custom:altered-textbox', (e) => console.log(e));
	post.addEventListener(
		'click',
		(e) => {
			const selectedPostValues = Post.extractValues(post);
			const clickedNewPost = selectedPostValues.post_id !== Post.values?.post_id || !Post.element;

			if (clickedNewPost) {
				Window.clear();
				Post.element = post;
				Post.element.zIndex = 2;
				Post.values = selectedPostValues;
			}
		},
		{ capture: true }
	);

	ReplyButton.setListeners(post);

	post.querySelector('[aria-label="Write a comment"]')?.addEventListener('click', (e) => {
		// Window.clear();
		Comment.element = Comment.name = null;
		Textbox.set(post.querySelector('[aria-label="Write a comment"]'));
		Utils.scrollIntoView(Textbox.element);
		Group.createButtons();
		e.stopPropagation();
	});
};

Post.observe = (post) => {
	const mutationContainsReply = (mutation) => {
		const addedNode = mutation.addedNodes[0];

		return (
			addedNode &&
			addedNode.querySelector &&
			[...mutation.addedNodes[0].querySelectorAll('[role="button"]')].find((r) => r.innerText === 'Reply')
		);
	};

	const mutationHasGif = (mutation) => {
		const addedNode = mutation.addedNodes[0];

		return addedNode && addedNode.querySelector && addedNode.querySelector('div[aria-label="Play GIF"]');
	};
	const mutationHasVideo = (mutation) => {
		const addedNode = mutation.addedNodes[0];

		return addedNode && addedNode.querySelector && addedNode.querySelector('video');
	};

	const handlePostMutation = (mutationsList) => {
		mutationsList.forEach((mutation) => {
			const addedNode = mutation.addedNodes[0];
			if (mutationContainsReply(mutation)) {
				mutation.addedNodes.forEach((n) =>
					[...n.querySelectorAll('[role="button"]')]
						.filter((r) => r.innerText === 'Reply')
						.forEach((b) => ReplyButton.setListener(b))
				);
			}
			if (mutationContainsTextbox(mutation)) {
				const textbox = addedNode.querySelector('[role="textbox"]');
				Textbox.setListener(textbox);
				if (!textbox.querySelector('span')) {
					if (!Comment.getElement(textbox, true).contains(Comment.element))
						Comment.set(Comment.getElement(textbox, true));
				}
			}
			if (mutationHasGif(mutation)) {
				addedNode.querySelector('div[aria-label="Play GIF"]').remove();
			}
			if (mutationHasVideo(mutation)) {
				addedNode.querySelector('video').remove();
			}
		});
	};

	const postObserver = new MutationObserver(handlePostMutation);
	postObserver.observe(post, { attributes: true, childList: true, subtree: true });
};

Post.extractValues = (post) => {
	const postContentArray = post.innerText
		.split('View insights')[0]
		.split('\n')
		.filter((el) => !/\:\d\d\s\/\s\d\:\d\d/.test(el))
		.map((el) => el.trim().replace('· ', ''))
		.filter((el) => el && !/^\+\d+$/.test(el));

	const name =
		post.querySelector('h3 strong')?.innerText || post.querySelector('h3 strong')?.innerText || postContentArray[0];
	const content =
		post.querySelector('[data-ad-preview="message"]')?.textContent ||
		postContentArray
			.slice(3)
			.join(' ')
			.replace(/\s*\·\s*/, '');
	const time = Dates.getTimeOfPostFromRelativeTime(
		post.querySelector('span[id]')?.querySelector('[aria-label]')?.innerText || postContentArray[1]
	);
	const post_id = [...post.querySelectorAll('a')].find((a) => a.href.includes('/post_insights/'))?.href.split('/')[6];
	const user_id = [...post.querySelectorAll('a')].find((a) => a.href.includes('/user/'))?.href.split('/')[6];

	const postValues = {
		name,
		time,
		content,
		user_id,
		post_id,
		group_url: window.location.href,
		challenge_id: Config.data.id,
	};

	return postValues;
};
