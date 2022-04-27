const capitalize = (input) => {
	if (!input) return '';
	return input.substring(0, 1).toUpperCase() + input.substring(1);
};

const Snakify = {
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

const formatDate = (string) => {
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

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
