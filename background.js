try {
	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
		console.log(changeInfo);
		if (changeInfo.status === 'complete') {
			chrome.scripting.executeScript({
				files: ['contentScript.js'],
				target: { tabId: tab.id },
			});
		}
	});
} catch (e) {
	console.log(e);
}
