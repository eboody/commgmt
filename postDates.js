Post.getTimeOfPostFromRelativeTime = (string) => {
	if (/^\d+h$/.test(string)) return Post.subtractHours(string.replace('h', ''));
	if (/^\d+m$/.test(string)) return Post.subtractMinutes(string.replace('m', ''));
	if (/^Yesterday.*[A|P]M$/.test(string)) return Post.getYesterday(string);
	if (
		/^[January|February|March|April|May|June|July|August|September|October|November|December].*\d\d\sat\s.*[A|P]M$/.test(
			string
		)
	)
		return Post.getDateFromString(string);
};

Post.subtractHours = (hours) => new Date(new Date().getTime() - 1000 * 60 * 60 * parseInt(hours));
Post.subtractMinutes = (minutes) => new Date(new Date().getTime() - 1000 * 60 * parseInt(minutes));
Post.getYesterday = (string) => {
	const time = Post.getTimeFromString(string);
	const isMorning = /AM$/.test(string);
	const today = new Date();
	const yesterday = today.getDate() - 1;
	const month = today.getMonth() + 1;
	const year = today.getFullYear();
	return new Date(`${year}/${month}/${yesterday} ${time} ${isMorning ? 'AM' : 'PM'}`);
};

Post.getTimeFromString = (string) => string.match(/\d+\:\d\d/)[0];

Post.getDateFromString = (string) => {
	const month = Post.getMonthFromString(string);
	const day = string.match(/\d+/);
	const year = new Date().getFullYear();
	const time = Post.getTimeFromString(string);
	const isMorning = /AM$/.test(string);
	return new Date(`${year}/${month}/${day} ${time} ${isMorning ? 'AM' : 'PM'}`);
};

Post.getMonthFromString = (string) => {
	const monthNumber = months.find((month) => string.includes(month));
	return months.indexOf(monthNumber) + 1;
};

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
