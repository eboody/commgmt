const getTimeOfPostFromRelativeTime = (string) => {
	if (/^\d+h$/.test(string)) return subtractHours(string.replace('h', ''));
	if (/^\d+m$/.test(string)) return subtractMinutes(string.replace('m', ''));
	if (/^Yesterday.*[A|P]M$/.test(string)) return getYesterday(string);
	if (
		/^[January|February|March|April|May|June|July|August|September|October|November|December].*\d\d\sat\s.*[A|P]M$/.test(
			string
		)
	)
		return getDateFromString(string);
};

const subtractHours = (hours) => new Date(new Date().getTime() - 1000 * 60 * 60 * parseInt(hours));
const subtractMinutes = (minutes) => new Date(new Date().getTime() - 1000 * 60 * parseInt(minutes));
const getYesterday = (string) => {
	const time = getTimeFromString(string);
	const isMorning = /AM$/.test(string);
	const today = new Date();
	const yesterday = today.getDate() - 1;
	const month = today.getMonth() + 1;
	const year = today.getFullYear();
	return new Date(`${year}/${month}/${yesterday} ${time} ${isMorning ? 'AM' : 'PM'}`);
};

const getTimeFromString = (string) => string.match(/\d+\:\d\d/)[0];

const getDateFromString = (string) => {
	const month = getMonthFromString(string);
	const day = string.match(/\d+/);
	const year = new Date().getFullYear();
	const time = getTimeFromString(string);
	const isMorning = /AM$/.test(string);
	return new Date(`${year}/${month}/${day} ${time} ${isMorning ? 'AM' : 'PM'}`);
};

const getMonthFromString = (string) => {
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
