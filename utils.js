const Utils = {};

Utils.createElement = (tag, name) => {
	const element = document.createElement(tag);
	element.classList.add(name);
	element.classList.add('removable');
	return element;
};

Utils.capitalize = (input) => {
	if (!input) return '';
	return input.substring(0, 1).toUpperCase() + input.substring(1);
};

Snakify = {
	string: (string) => {
		return string
			.toLowerCase()
			.trim()
			.replace(/\?|%/g, '')
			.replace(/(\s|-|\.)/g, '_');
	},

	object: (object) => {
		if (typeof object !== 'object') return;
		return Object.entries(object).reduce((acc, val) => {
			acc[Snakify.string(val[0])] = val[1];
			return acc;
		}, {});
	},

	objects: (array) => {
		if (!Array.isArray(array)) return;
		return array.map((obj) => Snakify.object(obj));
	},
};

Utils.formatDate = (string) => {
	let input = string;
	if (Object.prototype.toString.call(string) === '[object Date]') input = string.toString();

	var options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'America/New_York',
	};
	var date = new Date(input.replace(/-/g, '/').replace(/T.+/, ''));
	return date.toLocaleDateString('en-US', options);
};

Utils.timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

Utils.onVisible = (element, callback) => {
	new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.intersectionRatio > 0) {
				callback(element);
				observer.disconnect();
			}
		});
	}).observe(element);
};

Utils.isTextBox = (el) => {
	if (el.parentElement?.getAttribute('role') === 'textbox' || el?.getAttribute('role') === 'textbox') return true;
	return false;
};

Utils.shadeColor = (color, percent) => {
	var R = parseInt(color.substring(1, 3), 16);
	var G = parseInt(color.substring(3, 5), 16);
	var B = parseInt(color.substring(5, 7), 16);

	R = parseInt((R * (100 + percent)) / 100);
	G = parseInt((G * (100 + percent)) / 100);
	B = parseInt((B * (100 + percent)) / 100);

	R = R < 255 ? R : 255;
	G = G < 255 ? G : 255;
	B = B < 255 ? B : 255;

	var RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16);
	var GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16);
	var BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16);

	return '#' + RR + GG + BB;
};
