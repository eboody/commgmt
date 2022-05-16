const Config = {};

Config.getConfigFromGroupUrl = (configs, groupUrl = window?.location?.href) =>
	configs.find((config) => config.group_url === groupUrl);

Config.getConfig = async (url) => {
	const rawConfig = await fetch(`https://abc.1gu.xyz/event?group_url=${url}`, {
		headers: {
			key: 'eranissodamncool',
		},
	});
	let config = Snakify.object(await rawConfig.json());

	config.activity_units = config.activity_unit === 'crunch' ? 'crunches' : config.activity_unit + 's';

	Config.data = config;
	console.log('Downloaded Config');
};

Config.waitForConfig = async () => {
	let count = 0;
	while (!Config?.data?.id) {
		await Utils.timeout(1000);
		count++;
		if (count === 10) throw "Couldn't get config";
	}
};
