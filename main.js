const Window = {
	feedElement: null,
	clear: () => {
		console.log('cleared window');
		Snippets.showing = false;
		Preview.showing = false;

		const previews = [...document.querySelectorAll('.removable')];

		previews.forEach((el, index) => {
			el.style.transform = 'scale(0)';
			setTimeout(() => el.remove(), 10 * index);
		});
	},
};

const observeFeed = async () => {
	await Config.getConfig(window.location.href);

	let feedNode = document.querySelector('[role="feed"]');

	Window.feedElement = feedNode;

	feedNode.style.position = 'relative';

	[...feedNode.children].forEach((node, index) => {
		const isNotPost = index === 0 || !node.getAttribute('class') || node.querySelector('[class="suspended-feed"]');
		if (isNotPost) {
			if (index === 0 && node && node.style) {
				node.style.marginBottom = '24px';
			}
			return;
		}
		Post.process(node);
	});

	const observer = new MutationObserver((mutationsList) => {
		mutationsList.forEach((mutation) => {
			if (mutation.type !== 'childList') return;

			const addedNode = mutation.addedNodes[0];

			const nodeIsPost = addedNode?.querySelector('[aria-posinset]');

			if (!nodeIsPost) return;

			const newPost = addedNode;
			Post.process(newPost);
		});
	});

	observer.observe(feedNode, { attributes: true, childList: true, subtree: false });
};

const waitForFeed = () => {
	window.removeEventListener('load', waitForFeed, false);

	console.log('Page loaded');

	document.querySelector('[role="main"]')?.addEventListener('click', (e) => {
		if (!Post.element?.contains(e.target)) Window.clear();
	});

	setTimeout(() => {
		Styles.setAccent();
		Styles.setBackground();
	}, 500);

	let observing = false;

	const observer = new MutationObserver((mutationsList, obs) => {
		mutationsList.forEach((mutation) => {
			if (mutation.type === 'childList') {
				if (document.querySelector('[role="feed"]')) {
					if (!observing) {
						console.log('Got feed');
						observing = true;
						obs.disconnect();
						observeFeed();
					}
					return;
				}
			}
		});
	});

	observer.observe(document.body, { attributes: true, childList: true, subtree: true });
};

window.addEventListener('load', waitForFeed, false);
