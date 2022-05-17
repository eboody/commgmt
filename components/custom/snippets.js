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
				`We are excited to have you join us for our challenge, <FIRST NAME>! Be sure to officially register by clicking the link below👇 to join us in Messenger and log your activity throughout the challenge. <ACTIVITY EMOJI>\n<OPT-IN URL>`,
				`Keep up the great work, <FIRST NAME>! Don't forget to create your <NONPROFIT> fundraiser by clicking the link below👇 to help our community reach our goal!\n<1CLICK URL>`,
			],
		},
		{
			name: 'activity',
			icon: Icons.activity,
			messages: [
				`Hi {{first_name}} - As long as you have clicked the link below and chosen to participate in this challenge, you are good to go! You can start logging <ACTIVITY UNITS> on <EVENT MONTH> 1. 😄\n👉<OPT-IN URL>`,
				`Hi {{first_name}}, you can track your <ACTIVITY UNITS> in Messenger (link below) by typing "Menu" then enter, and clicking on "Record <ACTIVITY UNITS>." Enter the number of <ACTIVITY UNITS> you achieved that day! Be sure to only enter digits when prompted and not words (ex. "3" or "15").\n<OPT-IN URL>`,
				`{{first_name}} - To correct your activity total in Messenger, type "Menu" and tap the "Record <ACTIVITY UNITS>" button, then correct your total <ACTIVITY UNITS> completed. Thanks for joining us!\n<OPT-IN URL>`,
				`Hi {{first_name}} - This challenge and logging <ACTIVITY UNITS> will officially start on <EVENT MONTH> 1, but you don't have to wait to start fundraising! Thank you for supporting our mission. 😄\n<FUNDRAISING URL>`,
				`Hi {{first_name}}! This challenge will run through the month of <CHALLENGE MONTH>. You can log <ACTIVITY UNITS> in Messenger (link below) from <CHALLENGE MONTH> 1 until the end of the month, but fundraising goes through <END DATE>. Thank you for supporting <ORG>!\n<OPT-IN URL>`,
				`<FIRST NAME> - This is a virtual event and you can complete your <ACTIVITY UNIT>s wherever works best for you! Click below👇 to opt-in to Messenger today to log your <ACTIVITY UNIT>s and claim rewards throughout the challenge. <CHALLENGE EMOJI>\n<OPT-IN URL>`,
			],
		},
		{
			name: 'fundraising',
			icon: Icons.fundraising,
			messages: [
				`Hi <FIRST NAME> - You can raise money for this challenge by starting a personal Facebook fundraiser for <NONPROFIT> here:\n\n👉<1CLICK URL>\n\nOnce that's done, make the first donation yourself and then share your fundraising page with your Facebook friends! 💰`,
				`<FIRST NAME> - Facebook does not take any fee from your donations. 100% of the donations go directly to <NONPROFIT>. <ORG HEART>`,
				`<FIRST NAME> - Unfortunately, we cannot link any donations done outside of Facebook to your challenge fundraiser. You can have your friend send you money or a check directly, and then you can donate on their behalf on Facebook. Thank you for supporting our mission.`,
				`Hi {{first_name}} - Once you have created your personal fundraiser, it will automatically pop up on your Facebook Profile wall. You can also check and manage your fundraiser page by clicking on the link below. Let us know if you have any other questions! 😄\nhttps://www.facebook.com/fundraisers/manage`,
			],
		},
		{
			name: 'teams',
			icon: Icons.teams,
			messages: [
				`Hi {{first_name}} - You can manage your team from the menu dashboard in Messenger (link below). Simply type "Menu" then enter and select "Team Settings" and follow the prompts from there. Let us know if you have any other questions!\n<OPT-IN URL>`,
				`Hi <FIRST NAME> - We encourage every member of your team to create a personal fundraiser for this challenge. If you choose to do a team fundraiser, you can click "Edit" to change the name of your fundraiser. Thanks for joining us!\n<1CLICK URL>`,
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
		.replace(/(\{|\[|\<)+Activity.UNIT((\}|\]|\>)?S)(\}|\]|\>)?/gi, Config.data.activity_units)
		.replace(/(\{|\[|\<)+Activity.UNIT(\}|\]|\>)+/gi, Config.data.activity_unit)
		.replace(/(\{|\[|\<)+event.month(\}|\]|\>)+/gi, Config.data.event_month)
		.replace(/(\{|\[|\<)+challenge.month(\}|\]|\>)+/gi, Config.data.event_month)
		.replace(/(\{|\[|\<)+End.Date(\}|\]|\>)+/gi, Utils.formatDate(Config.data.end_date))
		.replace(/(\{|\[|\<)+org(\}|\]|\>)+/gi, Config.data.nonprofit)
		.replace(/(\{|\[|\<)+opt.in.url(\}|\]|\>)+/gi, Config.data.opt_in_url)
		.replace(/(\{|\[|\<)+1click.URL(\}|\]|\>)+/gi, Config.data.fbc_1click_url)
		.replace(/(\{|\[|\<)+FUNDRAISING\sURL(\}|\]|\>)+/gi, Config.data.fbc_1click_url);
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
            font-size: 1.5rem;
            border-radius: ${window
							.getComputedStyle(document.querySelector('[aria-label="Invite"]'))
							.getPropertyValue('--button-corner-radius')};
                transition: all 0.1s ease-in-out;


        `;

		snippet.setColor = () => {
			snippet.style.color = Utils.shadeColor(Styles.colors.codes[index], 20);
			snippet.style.backgroundColor = Styles.colors.commentBackground;
			snippet.style.border = `1px solid ${Utils.shadeColor(Styles.colors.codes[index], 20)}`;
			snippet.style.boxShadow = `rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px`;
		};

		snippet.invertColor = () => {
			snippet.style.backgroundColor = `${Utils.shadeColor(Styles.colors.codes[index], 20)}`;
			snippet.style.border = `2px solid ${Styles.colors.commentBackground}`;
			snippet.style.color = Styles.colors.commentBackground;
			snippet.style.boxShadow = `rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset`;
		};

		snippet.setColor();

		addTooltip(Post.element, m, snippet, index);
		sectionElement.appendChild(snippet);
		snippet.addEventListener('click', (e) => {
			e.stopPropagation();
			Preview.upsertPreview(Snippets.replaceTextWithConfigStuff(Comment.name || Post.values.name, m));
			Textbox.focus();
		});
	});

	button.appendChild(sectionElement);
};

const addTooltip = (post, text, button, index) => {
	const name = Comment.name || Post.values.name;

	const color = Utils.shadeColor(Styles.colors.codes[index], 20);

	const tooltip = Utils.createElement('div', 'tooltip');
	const circle = Utils.createElement('div', 'circle');

	circle.style = `
        height: 15px;
        width: 15px;
        background-color: ${color};
        border-radius: 50%;
        position: absolute;
        bottom: -17.5px;
        left: 38.5px;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
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
        box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    `;

	tooltip.style.border = `2px solid ${Styles.colors.commentBackground}`;

	tooltip.innerText = Snippets.replaceTextWithConfigStuff(name, text);

	button.appendChild(tooltip);
	tooltip.appendChild(circle);

	button.addEventListener(
		'mouseenter',
		(e) => {
			tooltip.style.display = 'block';
			button.style.transform = 'scale(1.1)';
			button.invertColor();
			const storyButton = post.querySelector('.story-button');
			if (storyButton) storyButton.style.transform = 'scale(0)';
		},
		false
	);
	button.addEventListener(
		'mouseleave',
		(e) => {
			tooltip.style.display = 'none';
			button.setColor();
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
