const observeFeed = async () => {
	await Config.waitForConfig();

	let feedNode = document.querySelector('[role="feed"]');

	[...feedNode.children].forEach((node) => {
		if (!node.getAttribute('class') || node.querySelector('[class="suspended-feed"]')) return;
		Post.process(node);
	});

	const config = { attributes: true, childList: true, subtree: false };

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

	const target = document.body;

	const config = { attributes: true, childList: true, subtree: true };

	let observing = false;

	const callback = function (mutationsList, obs) {
		mutationsList.forEach((mutation) => {
			if (mutation.type === 'childList') {
				if (document.querySelector('[role="feed"]')) {
					console.log('Got feed');
					if (!observing) {
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
