const observeFeed = () => {
	let feedNode = document.querySelector('[role="feed"]');

	const firstPost = feedNode?.children?.length && feedNode.children[1];

	Post.process(firstPost);

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

	const callback = function (mutationsList, observer) {
		mutationsList.forEach((mutation) => {
			if (mutation.type === 'childList') {
				if (document.querySelector('[role="feed"]')) {
					observer.disconnect();
					console.log('Got feed');
					observeFeed();
					return;
				}
			}
		});
	};

	const observer = new MutationObserver(callback);

	observer.observe(target, config);
};

window.addEventListener('load', waitForFeed, false);
