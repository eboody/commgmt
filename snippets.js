const Snippets = {
	showing: false,
	post: {},
	data: [
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
	],
};

Snippets.replaceTextWithConfigStuff = (config, name, string) => {
	return string
		.replace(/\{+first.name\}+/g, name.split(' ')[0])
		.replace(/<Activity\s+UNITS>/gi, config.activity_units)
		.replace(/<event\smonth>/gi, config.event_month)
		.replace(/<challenge\smonth>/gi, config.event_month)
		.replace(/<End\sDate>/gi, Utils.formatDate(config.end_date))
		.replace(/<org>/gi, config.nonprofit)
		.replace(/<opt.in.url>/gi, config.opt_in_url)
		.replace(/<FUNDRAISING\sURL>/gi, config.fbc_1click_url);
};

Snippets.handleClick = async (post) => {
	Snippets.post = post;
	// if (await textBoxActive()) {
	// 	const textBox = document.activeElement;
	// 	textBox?.setAttribute('id', new Date().getTime());
	// 	if (textBox?.outerHTML != textBoxBuffer?.outerHTML || !document.querySelectorAll('.custom-button').length) {
	// 		textBoxBuffer = textBox;
	// 		navigator.clipboard.writeText('');
	// 		removeCustomStuff();
	// 		const post = getPostElementFromTextBox(textBox);
	// 		Snippets.createButtons(post, textBox);
	// 		Snippets.showing = true;
	// 	}
	// } else if (!e.target.classList.contains('custom-snippet') && !e.target.classList.contains('custom-preview')) {
	// 	removeCustomStuff();
	// }
};

Snippets.createButtons = (post, textBox) => {
	Snippets.data.forEach((s, index) => setTimeout(() => createButton(post, textBox, s, index), 10 * index));
};

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

	tooltip.innerText = Snippets.replaceTextWithConfigStuff(Config.data, name, text);

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
			if (!storyButton) return;

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

const getName = (post) => {
	if (document.activeElement.getAttribute('aria-label').includes('Reply to'))
		return document.activeElement.getAttribute('aria-label')?.split('Reply to')[1].trim();
	else
		return [...post.querySelectorAll('a')]
			.filter((a) => a.href.includes('user'))[0]
			.querySelector('a')
			.getAttribute('aria-label');
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

Snippets.removeCustomStuff = () => {
	if (!Snippets.showing) return;
	const previews = [...document.querySelectorAll('.custom-preview'), ...document.querySelectorAll('.custom-button')];
	previews.forEach((el, index) => {
		el.style.transform = 'scale(0)';
		setTimeout(() => el.remove(), 10 * index);
	});
};
