let snippets = [
	`Hi {{first_name}}, you can track your <ACTIVITY UNITS> here in Messenger by typing "Menu" then enter, and click on "Record <ACTIVITY UNITS>." Enter the number of <ACTIVITY UNITS> you achieved that day! Be sure to only enter digits when prompted and not words (ex. "3" or "15").`,
	`{{first_name}} - To correct your activity total, type "Menu" and tap the "Record <ACTIVITY UNITS>" button, then tap "Edit my total <ACTIVITY UNITS>" and correct your total <ACTIVITY UNITS> completed. Thanks for joining us! `,
	`Hi {{first_name}}! Thanks for sharing your progress! If you want to track your progress and motivate the team to hit our challenge goal, we encourage you to post your photos/videos in the group! Remember to continue logging your <ACTIVITY UNITS> here in Messenger. 😄`,
	`Thank you for supporting our mission, {{first_name}}!`,
	`Hi {{first_name}}, how can we help you?`,
	`Hi {{first_name}} - We have updated your information in our system. Thanks for supporting our mission!`,
	`Hi {{first_name}}! This challenge will run through the month of <CHALLENGE MONTH>. You can log <ACTIVITY UNITS> here in Messenger from <CHALLENGE MONTH> 1 until the end of the month, but fundraising goes through <END DATE>. Thank you for supporting <ORG>!`,
	`Hi {{first_name}} - We are experiencing some technical issues today and are working on resolving this issue. We apologize for the inconvenience of logging your <ACTIVITY UNITS>!`,
	`Hi {{first_name}}! We're sorry you're having trouble! Please try accessing the link on your computer rather than through your mobile device. Let us know if you continue to experience this issue. Thank you!`,
	`Thank you for sharing your story, {{first_name}}! We are proud to have you join the challenge. 😊`,
	`Hi {{first_name}} - This challenge and logging <ACTIVITY UNITS> will officially start on <EVENT MONTH> 1, but you don't have to wait to start fundraising! Thank you for supporting our mission. 😄`,
	`Hi {{first_name}} - As long as you have clicked the link below and chosen to participate in this challenge, you are good to go! You can start logging <ACTIVITY UNITS> on <EVENT MONTH> 1. 😄
👉<OPT-IN URL>`,
	`Hi {{first_name}}! You can manage your team from the menu dashboard. Simply type "Menu" then enter and select "Team Settings" and follow the prompts from there. Let us know if you have any other questions!`,
	`Hi {{first_name}}! You can raise money for this challenge by starting a personal fundraiser for <ORG> here 👉<FUNDRAISING URL>. 

Once that's done, you can share your fundraising page with your Facebook friends! Thank you for supporting our mission!`,
	`Hi {{first_name}}! Once you have created your personal fundraiser, it will automatically pop up on your Facebook Profile wall. You can also check and manage your fundraiser page by clicking on the link below. Let us know if you have any other questions! 😄

https://www.facebook.com/fundraisers/manage`,
	`Hi {{first_name}} - Please click the link below to access your fundraiser page: 
<PARTICIPANT'S FUNDRAISING URL>`,
	`Hi {{first_name}} - This is a Facebook challenge and having a Facebook account is required to register in Messenger to track your progress and claim milestone rewards throughout the challenge. We will also share helpful tips, tricks, and reminders to enhance your challenge experience along the way! Thanks for joining us! 🙂`,
	`{{first_name}} - You can log your <ACTIVITY UNITS> as many times as you like—multiple times a day or once a week—as long as you are keeping up to date with your numbers! Keep up the great work. 😎`,
	`Hi {{first_name}} - We apologize for the technical issues you have been experiencing. Our team is working hard to solve the issue as quickly as possible. We will keep you updated! Thank you for your patience.`,
	`Hi {{first_name}} - We are sorry you are having trouble. To help you with this issue, we recommend contacting Facebook Support here: 👉https://www.facebook.com/help/738034692937865`,
	`Hi {{first_name}} - The issue you have been experiencing has been resolved. Thank you for your patience and support! Let us know if you have any questions.`,
	`Hi {{first_name}} - The challenge has now ended. Thank you for your participation and your support! Stay tuned for the next challenge. 😊`,
];

let textBoxBuffer;
const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const handleClick = async (e) => {
	if (await textBoxActive()) {
		const textBox = document.activeElement;
		textBox?.setAttribute('id', new Date().getTime());
		if (textBox?.outerHTML != textBoxBuffer?.outerHTML || !document.querySelectorAll('.custom-button').length) {
			textBoxBuffer = textBox;
			navigator.clipboard.writeText('');
			removeCustomStuff();
			const post = getPostElementFromTextBox(textBox);
			createButtons(post, textBox);
		}
	} else if (!e.target.classList.contains('custom-snippet') && !e.target.classList.contains('custom-preview')) {
		removeCustomStuff();
	}
};

const removeCustomStuff = () => {
	const previews = [...document.querySelectorAll('.custom-preview'), ...document.querySelectorAll('.custom-button')];
	previews.forEach((el, index) => {
		el.style.transform = 'scale(0)';
		setTimeout(() => el.remove(), 10 * index);
	});
};

const createButtons = (post, textBox) => {
	snippets.forEach((s, index) => setTimeout(() => createButton(post, textBox, s, index), 10 * index));
};

const createStoryButton = async (post) => {
	if (!window?.location?.href) return;
	post.style.transition = 'margin 300ms';
	post.style.marginTop = '3rem';
	await timeout(175);
	const button = document.createElement('button');
	const config = getConfigFromGroupUrl(window.location.href);

	button.style = `position: absolute;
        top: 0;
        border-radius: 50%;
        margin-top: -1rem;
        margin-left: 20rem;
        height: 50px;
        width: 50px;
        background-color: ${window
					.getComputedStyle(document.querySelector('[aria-label="Invite"]'))
					.getPropertyValue('--primary-button-background')};
        border:none;
        outline: 10px solid ${
					window.getComputedStyle(document.querySelector('[data-pagelet="DiscussionRootSuccess"]').children[0])
						.backgroundColor
				};
        font-size: 2.5rem;
        transition: all 0.1s ease-in-out;
        transform: scale(0.1);
        color: white;
        `;
	button.classList.add('story-button');
	button.innerText = '+';

	button.setAttribute(
		'post_id',
		[...post.querySelectorAll('a')].find((a) => a.href.includes('/post_insights/')).href.split('/')[6]
	);
	button.setAttribute(
		'user_id',
		[...post.querySelectorAll('a')].find((a) => a.href.includes('/user/')).href.split('/')[6]
	);

	button.addEventListener(
		'click',
		async (e) => {
			e.preventDefault();
			const seeMoreElement = Array.from(post.querySelectorAll('div'))
				.filter((el) => el.innerText.toLowerCase().includes('see more'))
				.slice(-1)
				.pop();
			if (seeMoreElement) seeMoreElement.click();
			await timeout(300);
			const postContentArray = post.innerText
				.split('View insights')[0]
				.split('\n')
				.filter((el) => !/\:\d\d\s\/\s\d\:\d\d/.test(el))
				.map((el) => el.trim().replace('· ', ''))
				.filter((el) => el && !/^\+\d+$/.test(el));
			const name = postContentArray[0].split(' is with')[0].split(' is at ')[0];
			const time = postContentArray[1];
			const content = postContentArray.slice(3).join(' ').replace('· ', '');

			if (name.includes(' shared a post.')) {
				name.replace(' shared a post.', '');
				if (content.includes('M Facebook fundraisers ')) content = content.split('M Facebook fundraisers ')[1];
			}

			const postObject = {
				user_id: e.target.getAttribute('user_id'),
				name,
				time: getTimeOfPostFromRelativeTime(time),
				content,
				group_url: window.location.href,
				post_id: e.target.getAttribute('post_id'),
				challenge_id: config.id,
			};

			fetch('https://abc.1gu.xyz/story', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(postObject),
			});
			console.log(postObject);
			button.remove();
		},
		{ once: true }
	);

	post.appendChild(button);

	setTimeout(() => (button.style.transform = 'scale(1)'), 10);

	button.addEventListener(
		'mouseover',
		(e) => {
			button.style.transform = 'scale(1.1)';
			button.style.backgroundColor = '#04c3cb';
		},
		false
	);
	button.addEventListener(
		'mouseout',
		(e) => {
			button.style.backgroundColor = `${window
				.getComputedStyle(document.querySelector('[aria-label="Invite"]'))
				.getPropertyValue('--primary-button-background')}`;
			button.style.transform = 'scale(1)';
		},
		false
	);
};

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

const createButton = (post, textBox, text, index) => {
	const button = document.createElement('button');

	button.style = `
        position: absolute;
        border-radius: ${window
					.getComputedStyle(document.querySelector('[aria-label="Invite"]'))
					.getPropertyValue('--button-corner-radius')};
        margin-top: ${-2.75 * (index + 1)}rem;
        margin-left: -2rem;
        height: 2.25rem;
        width: 2.25rem;
        background-color: ${window
					.getComputedStyle(document.querySelector('[aria-label="Invite"]'))
					.getPropertyValue('--primary-button-background')};
        color: #fff !important;
        font-size: 1.1rem !important;
        border: none;
  
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
        transition: all 0.1s ease-in-out;
        transform: scale(0.1);
    `;

	button.innerText = `${index + 1}`;
	button.classList.add('custom-button');
	button.classList.add(`button-${index + 1}`);
	button.addEventListener('click', () => {
		textBox.focus();
		upsertPreview(post, text, textBox);
	});

	addTooltip(post, text, button);

	post.children[0].appendChild(button);
	setTimeout(() => (button.style.transform = 'scale(1)'), 15);
};

const addTooltip = (post, text, button) => {
	const name = getName(post);

	const tooltip = document.createElement('div');

	tooltip.classList.add('custom-tooltip');

	tooltip.style = `
        background-color: white;
        position: absolute;
        color: #33566a;
        padding: 2rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        border-radius: 5px;
        width:500px;
        top: 0;
        left: 40px;
        display: none;
        font-size:1.1rem;
    `;

	tooltip.innerText = replaceTextWithConfigStuff(getConfigFromGroupUrl(), name, text);

	button.appendChild(tooltip);
	button.addEventListener(
		'mouseover',
		(e) => {
			tooltip.style.display = 'block';
			tooltip.style.top = '-' + tooltip.getBoundingClientRect().height + 'px';
			button.style.transform = 'scale(1.1)';
			button.style.backgroundColor = '#04c3cb';
			const storyButton = post.querySelector('.story-button');
			if (storyButton) storyButton.style.transform = 'scale(0)';
		},
		false
	);
	button.addEventListener(
		'mouseout',
		(e) => {
			tooltip.style.display = 'none';
			button.style.backgroundColor = `${window
				.getComputedStyle(document.querySelector('[aria-label="Invite"]'))
				.getPropertyValue('--primary-button-background')}`;
			button.style.transform = 'scale(1)';
			const storyButton = post.querySelector('.story-button');

			setTimeout(() => {
				const showingTooltip = [...post.querySelectorAll('.custom-tooltip')].find(
					(t) => window.getComputedStyle(t).display === 'block'
				);
				if (!showingTooltip) storyButton.style.transform = 'scale(1)';
			}, 300);
		},
		false
	);
};

const upsertPreview = (node, text, textBox) => {
	let preview = node.querySelector('.custom-preview');
	if (preview) {
		let adjustedText = text;
		if (preview.children.length) {
			let textToReplace = text.match(/^Hi.*{{first_name}}\s*[\,\.\!\-]\s*|\,\s+{{first_name}}/);
			adjustedText = capitalize(text.replace(textToReplace, ''));
		}

		if (
			[...preview.children].find((p) => p.innerText === constructSnippet(node, text, textBox).innerText) ||
			[...preview.children].find((p) => p.innerText === constructSnippet(node, adjustedText, textBox).innerText)
		)
			return;
		preview.appendChild(constructSnippet(node, adjustedText, textBox));
	} else {
		preview = document.createElement('div');
		preview.classList.add('custom-preview');
		preview.style = `
            background-color: white;
            max-width: 650px;
            padding: 1.5rem;
            border-radius: 1rem;
            box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
            font-size:1.1rem;
            color: #33566a;
            transition: all 0.1s ease-in-out;
            transform: scale(0.1);
            margin-top: 1rem;
            `;
		preview.appendChild(constructSnippet(node, text, textBox));
		node.appendChild(preview);
		setTimeout(() => {
			preview.style.transform = 'scale(1)';
		}, 50);
	}
	navigator.clipboard.writeText(preview.innerText);
	return;
};

const removeEmptyPreviews = () => {
	const previews = [...document.querySelectorAll('.custom-preview')];
	if (previews.find((el) => el.innerText === '')) previews.forEach((el) => el.remove());
};

const getName = (post) => {
	if (document.activeElement.getAttribute('aria-label').includes('Reply to'))
		return document.activeElement.getAttribute('aria-label')?.split('Reply to')[1].trim();
	else
		return [...post.querySelectorAll('a')]
			.filter((a) => a.href.includes('user'))[0]
			.querySelector('a')
			.getAttribute('aria-label');
};

const constructSnippet = (node, text, textBox) => {
	if (!window?.location?.href) return;

	const config = getConfigFromGroupUrl(window.location.href);

	const snippet = document.createElement('p');
	snippet.classList.add('custom-snippet');
	snippet.style = `
        background-color: #fff;
        border-radius: 5px;
        padding: 1.5rem;
        box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
    `;
	const name = getName(node);
	snippet.innerText = replaceTextWithConfigStuff(config, name, text);
	snippet.addEventListener('click', () => {
		snippet.remove();
		removeEmptyPreviews();
		navigator.clipboard.writeText(node.querySelector('.custom-preview')?.innerText || '');
		textBox.focus();
	});

	return snippet;
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

const replaceTextWithConfigStuff = (config, name, string) => {
	return string
		.replace(/\{+first.name\}+/g, name.split(' ')[0])
		.replace(/<Activity\s+UNITS>/gi, config.activity_units)
		.replace(/<event\smonth>/gi, config.event_month)
		.replace(/<challenge\smonth>/gi, config.event_month)
		.replace(/<End\sDate>/gi, formatDate(config.end_date))
		.replace(/<org>/gi, config.nonprofit)
		.replace(/<opt.in.url>/gi, config.opt_in_url)
		.replace(/<FUNDRAISING\sURL>/gi, config.fbc_1click_url);
};

const getPostElementFromTextBox = (node) => {
	if (!node) return;
	if (node?.parentElement?.getAttribute('role') === 'article' && !node?.parentElement?.getAttribute('aria-label')) {
		return node?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;
	} else {
		return getPostElementFromTextBox(node?.parentElement);
	}
};

const textBoxActive = () =>
	new Promise((resolve) =>
		setTimeout(() => {
			if (document.activeElement.getAttribute('role') === 'textbox') {
				resolve(true);
			} else resolve(false);
		}, 50)
	);

let configs;

const getConfigFromGroupUrl = (groupUrl = window?.location?.href) =>
	configs.find((config) => config.group_url === groupUrl);

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

const capitalize = (input) => {
	if (!input) return '';
	return input.substring(0, 1).toUpperCase() + input.substring(1);
};

const handleMouseover = (e) => {
	const post = getPostElementFromTextBox(e.target);
	if (post && !post.getAttribute('story-button-created')) {
		post.setAttribute('story-button-created', 'true');
		createStoryButton(post);
	}
};

(async () => {
	if (!/.*facebook.*groups/.test(window.location.href)) return;
	window.addEventListener('click', handleClick, true);
	window.addEventListener('mouseover', handleMouseover, { passive: true });
	const rawConfigs = fetch('https://abc.1gu.xyz/events', {
		headers: {
			key: 'eranissodamncool',
		},
	});
	configs = Snakify.objects(await (await rawConfigs).json());

	configs.forEach(
		(config) => (config.activity_units = config.activity_unit === 'crunch' ? 'crunches' : config.activity_unit + 's')
	);
	console.log(configs.length);
	doThing();
})();
