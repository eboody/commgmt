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
