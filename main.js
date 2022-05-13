const observeFeed = async () => {
	await Config.waitForConfig();

	let feedNode = document.querySelector('[role="feed"]');

	[...feedNode.children].forEach((node) => {
		if (!node.getAttribute('class') || node.querySelector('[class="suspended-feed"]')) return;
		Post.process(node);
	});

	const config = { attributes: true, childList: true, subtree: false };
	// console.clear();
	const callback = function (mutationsList) {
		mutationsList.forEach((mutation) => {
			if (mutation.type === 'childList') {
				const addedNode = mutation.addedNodes[0];
				if (addedNode?.getAttribute('class')) {
					const newPost = addedNode;
					Post.process(newPost);
				}
			}
		});
	};

	const observer = new MutationObserver(callback);

	observer.observe(feedNode, config);
};

const waitForFeed = () => {
	window.removeEventListener('load', waitForFeed, false);

	console.log('Page loaded');

	Colors.accent = window
		.getComputedStyle(document.querySelector('[aria-label="Invite"]'))
		.getPropertyValue('--primary-button-background');

	const target = document.body;

	const config = { attributes: true, childList: true, subtree: true };

	let observing = false;

	const callback = function (mutationsList, obs) {
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
	};

	const observer = new MutationObserver(callback);

	observer.observe(target, config);
};

window.addEventListener('load', waitForFeed, false);

window.addEventListener('click', () => {
	Textbox.clear();
	Post.clear();
	Snippets.removeCustomStuff();
	console.log('Window removed stuff');
});
