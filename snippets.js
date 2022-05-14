const Snippets = {
	showing: false,
	post: {},
	sections: [
		{
			name: 'encourage',
			icon: Icons.encourage,
			messages: [
				`Thank you for supporting our mission, {{first_name}}! `,
				`Welcome to the team, <FIRST NAME>! Thanks for joining us!`,
				`Thank you for sharing your story, {{first_name}}. We are proud to have you join the challenge. <ORG HEART>`,
				`We are excited to have you join us for our challenge, <FIRST NAME>! Be sure to officially register by clicking the link below👇 to join us in Messenger and log your activity throughout the challenge. <ACTIVITY EMOJI>
                <OPT-IN URL>`,
				`Keep up the great work, <FIRST NAME>! Don't forget to create your <NONPROFIT> fundraiser by clicking the link below👇 to help our community reach our goal!
                <1CLICK URL>`,
			],
		},
		{
			name: 'activity',
			icon: Icons.activity,
			messages: [
				`Hi {{first_name}} - As long as you have clicked the link below and chosen to participate in this challenge, you are good to go! You can start logging <ACTIVITY UNITS> on <EVENT MONTH> 1. 😄
👉<OPT-IN URL>`,
				`Hi {{first_name}}, you can track your <ACTIVITY UNITS> in Messenger (link below) by typing "Menu" then enter, and clicking on "Record <ACTIVITY UNITS>." Enter the number of <ACTIVITY UNITS> you achieved that day! Be sure to only enter digits when prompted and not words (ex. "3" or "15").
<OPT-IN URL>`,
				`{{first_name}} - To correct your activity total in Messenger, type "Menu" and tap the "Record <ACTIVITY UNITS>" button, then correct your total <ACTIVITY UNITS> completed. Thanks for joining us! 
<OPT-IN URL>`,
				`Hi {{first_name}} - This challenge and logging <ACTIVITY UNITS> will officially start on <EVENT MONTH> 1, but you don't have to wait to start fundraising! Thank you for supporting our mission. 😄
<FUNDRAISING URL>`,
				`Hi {{first_name}}! This challenge will run through the month of <CHALLENGE MONTH>. You can log <ACTIVITY UNITS> in Messenger (link below) from <CHALLENGE MONTH> 1 until the end of the month, but fundraising goes through <END DATE>. Thank you for supporting <ORG>!
<OPT-IN URL>`,
				`<FIRST NAME> - This is a virtual event and you can complete your <ACTIVITY UNIT>s wherever works best for you! Click below👇 to opt-in to Messenger today to log your <ACTIVITY UNIT>s and claim rewards throughout the challenge. <CHALLENGE EMOJI>
<OPT-IN URL>`,
			],
		},
		{
			name: 'fundraising',
			icon: Icons.fundraising,
			messages: [
				`Hi <FIRST NAME> - You can raise money for this challenge by starting a personal Facebook fundraiser for <NONPROFIT> here: 
👉<1CLICK URL>

Once that's done, make the first donation yourself and then share your fundraising page with your Facebook friends! 💰`,
				`<FIRST NAME> - Facebook does not take any fee from your donations. 100% of the donations go directly to <NONPROFIT>. <ORG HEART>`,
				`<FIRST NAME> - Unfortunately, we cannot link any donations done outside of Facebook to your challenge fundraiser. You can have your friend send you money or a check directly, and then you can donate on their behalf on Facebook. Thank you for supporting our mission.`,
				`Hi {{first_name}} - Once you have created your personal fundraiser, it will automatically pop up on your Facebook Profile wall. You can also check and manage your fundraiser page by clicking on the link below. Let us know if you have any other questions! 😄
https://www.facebook.com/fundraisers/manage`,
			],
		},
		{
			name: 'teams',
			icon: Icons.teams,
			messages: [
				`Hi {{first_name}} - You can manage your team from the menu dashboard in Messenger (link below). Simply type "Menu" then enter and select "Team Settings" and follow the prompts from there. Let us know if you have any other questions!
<OPT-IN URL>`,
				`Hi <FIRST NAME> - We encourage every member of your team to create a personal fundraiser for this challenge. If you choose to do a team fundraiser, you can click "Edit" to change the name of your fundraiser. Thanks for joining us!
<1CLICK URL>`,
			],
		},
		{
			name: 'challenge',
			icon: Icons.challenge,
			messages: [
				`Hi {{first_name}}! We're sorry you're having trouble! Please try accessing the link on your computer rather than through your mobile device. Let us know if you continue to experience this issue. Thank you!`,
				`Hi {{first_name}} - This is a Facebook challenge and having a Facebook account is required to register in Messenger to track your progress and claim milestone rewards throughout the challenge. We will also share helpful tips, tricks, and reminders to enhance your challenge experience along the way! Thanks for joining us! 🙂`,
				`Hi {{first_name}} - We apologize for the technical issues you have been experiencing. Our team is working hard to solve the issue as quickly as possible. We will keep you updated in Messenger! Thank you for your patience.`,
			],
		},
	],
};

Snippets.replaceTextWithConfigStuff = (name, string) => {
	return string
		.replace(/(\{|\[|\<)+nonprofit(\}|\]|\>)+/gi, Config.data.nonprofit)
		.replace(/(\{|\[|\<)+(activity|challenge).emoji(\}|\]|\>)+/gi, Config.data.challenge_emoji || '')
		.replace(/(\{|\[|\<)+org.heart(\}|\]|\>)+/gi, Config.data.org_heart || '❤')
		.replace(/(\{|\[|\<)+first.name(\}|\]|\>)+/gi, name?.split(' ')[0])
		.replace(/(\{|\[|\<)Activity.UNIT((\}|\]|\>)?S)(\}|\]|\>)?/gi, Config.data.activity_units)
		.replace(/(\{|\[|\<)Activity.UNIT(\}|\]|\>)/gi, Config.data.activity_unit)
		.replace(/(\{|\[|\<)event.month(\}|\]|\>)/gi, Config.data.event_month)
		.replace(/(\{|\[|\<)challenge.month(\}|\]|\>)/gi, Config.data.event_month)
		.replace(/(\{|\[|\<)End.Date(\}|\]|\>)/gi, Utils.formatDate(Config.data.end_date))
		.replace(/(\{|\[|\<)org(\}|\]|\>)/gi, Config.data.nonprofit)
		.replace(/(\{|\[|\<)opt.in.url(\}|\]|\>)/gi, Config.data.opt_in_url)
		.replace(/(\{|\[|\<)1click.URL(\}|\]|\>)/gi, Config.data.fbc_1click_url)
		.replace(/(\{|\[|\<)FUNDRAISING\sURL(\}|\]|\>)/gi, Config.data.fbc_1click_url);
};

Snippets.handleClick = async (post) => {
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

Snippets.createButtons = () => {
	const groups = Utils.createElement('div', 'snippet-groups');

	groups.style = `
        position: absolute;
        display: row;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width:max-content;
        background-color: ${Styles.colors.background};
        margin-left: -3rem;
        padding: 5px;
        border-radius: 10px;
        top: ${Textbox.element.getBoundingClientRect().y - Post.element.getBoundingClientRect().y - 10}px;
    `;

	if (Snippets.showing) {
		Window.clear();
	}

	Snippets.showing = true;

	Snippets.sections.forEach((section, index) => {
		setTimeout(() => groups.appendChild(createButton(Post.element, section, index), 10 * index));
	});

	Post.element.appendChild(groups);
};

const createButton = (post, section, index) => {
	const button = Utils.createElement('button', 'snippet-group-button');

	const same = '50';
	const buttonHeight = same;
	const buttonWidth = same;

	button.style = `
        border-radius: ${window
					.getComputedStyle(document.querySelector('[aria-label="Invite"]'))
					.getPropertyValue('--button-corner-radius')};
        height: ${buttonHeight}px;
        width: ${buttonWidth}px;
        background-color: ${Styles.colors.accent};
        color: #fff !important;
        font-size: 1.1rem !important;
        border: none;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
        transition: all 0.1s ease-in-out;
        transform: scale(0.1);
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 5px;
    `;

	// button.innerText = `${index + 1}`;
	button.classList.add('custom-button');
	button.classList.add(`button-${index + 1}`);
	button.addEventListener('click', (e) => {
		e.stopPropagation();
		Textbox.focus();
		// upsertPreview(post, text, textBox);
	});

	button.addEventListener(
		'mouseenter',
		(e) => {
			// console.log('mouse entered');
			createSnippetsButtons(button, section);
		},
		false
	);
	button.addEventListener(
		'mouseleave',
		(e) => {
			// console.log('mouse left');
			removeSnippets(button);
		},
		false
	);

	addGroupTooltip(post, section.name, button, index);

	const image = Utils.createElement('img', 'group-image');
	image.src = section.icon;
	image.style.width = '100%';
	button.appendChild(image);

	// post.children[0].appendChild(button);
	setTimeout(() => (button.style.transform = 'scale(1)'), 15);
	return button;
};
const removeSnippets = (button) => button.querySelector('.section').remove();

const createSnippetsButtons = (button, section) => {
	const sectionElement = Utils.createElement('div', 'section');

	sectionElement.style = `
        position: absolute;
        left: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        overflow:"hidden"
        white-space: nowrap;
        padding-left: 15px;
        height: 80px;
        padding-right: 20px;
        `;

	section.messages.forEach((m, index) => {
		const snippet = Utils.createElement('button', 'snippet');

		snippet.innerText = index + 1;
		snippet.style = `
            width: 50px;
            height: 50px;
            display: inline-block;
            margin: 0 3px;
            background-color: ${Utils.shadeColor(Styles.colors.codes[index], 20)};
            border: none;
            color: white;
            font-size: 1.5rem;
            border-radius: ${window
							.getComputedStyle(document.querySelector('[aria-label="Invite"]'))
							.getPropertyValue('--button-corner-radius')};
            transition: all 0.1s ease-in-out;
            box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
        `;
		addTooltip(Post.element, m, snippet, index);
		sectionElement.appendChild(snippet);
	});

	button.appendChild(sectionElement);
};

const addGroupTooltip = (post, text, button, index) => {
	const name = Textbox.name;

	const tooltip = Utils.createElement('div', 'tooltip');

	tooltip.classList.add('custom-tooltip');

	tooltip.style = `
        background-color: white;
        position: absolute;
        color: #33566a;
        padding: 10px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        border-radius: 5px;
        display: none;
        font-size: 14px;
        width: max-content;
        max-width: 300px;
        transition: all 0.1s ease-in-out;
        left: -100px;
    `;

	tooltip.innerText = Utils.capitalize(text);

	button.appendChild(tooltip);

	button.addEventListener(
		'mouseenter',
		(e) => {
			tooltip.style.display = 'block';
			button.style.transform = 'scale(1.1)';
			button.querySelector('img').style.transform = 'scale(1.3)';
			button.style.backgroundColor = '#04c3cb';
			button.style.border = `2px solid ${Styles.colors.accent}`;
			const storyButton = post.querySelector('.story-button');
			if (storyButton) storyButton.style.transform = 'scale(0)';
		},
		false
	);
	button.addEventListener(
		'mouseleave',
		(e) => {
			tooltip.style.display = 'none';
			button.style.backgroundColor = Styles.colors.accent;
			button.style.transform = 'scale(1)';
			button.querySelector('img').style.transform = 'scale(1)';
			button.style.boxShadow = 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px';
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

const addTooltip = (post, text, button, index) => {
	const name = Textbox.name;

	const tooltip = Utils.createElement('div', 'tooltip');
	const circle = Utils.createElement('div', 'circle');

	circle.style = `
        height: 15px;
        width: 15px;
        background-color: ${Utils.shadeColor(Styles.colors.codes[index], 20)};
        border-radius: 50%;
        position: absolute;
        bottom: -17.5px;
        left: 38.5px;
    `;

	tooltip.style = `
        background-color: white;
        position: absolute;
        color: #33566a;
        padding: 10px;
        border-radius: 5px;
        display: none;
        font-size: 14px;
        width: max-content;
        max-width: 300px;
        transition: all 0.1s ease-in-out;
        left: -25px;
        bottom: 65px;
    `;

	tooltip.style.border = `2px solid ${Utils.shadeColor(Styles.colors.codes[index], 20)}`;

	tooltip.innerText = Snippets.replaceTextWithConfigStuff(name, text);

	button.appendChild(tooltip);
	tooltip.appendChild(circle);

	button.addEventListener(
		'mouseenter',
		(e) => {
			tooltip.style.display = 'block';
			button.style.transform = 'scale(1.1)';
			button.style.backgroundColor = '#04c3cb';
			button.style.border = `2px solid ${Utils.shadeColor(Styles.colors.codes[index], 20)}`;
			const storyButton = post.querySelector('.story-button');
			if (storyButton) storyButton.style.transform = 'scale(0)';
		},
		false
	);
	button.addEventListener(
		'mouseleave',
		(e) => {
			tooltip.style.display = 'none';
			button.style.backgroundColor = Utils.shadeColor(Styles.colors.codes[index], 20);
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
		prview = Utils.createElement('div', 'preview');
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
