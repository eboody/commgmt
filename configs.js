const Config = {};

Config.getConfigFromGroupUrl = (configs, groupUrl = window?.location?.href) =>
	configs.find((config) => config.group_url === groupUrl);

Config.getConfigs = async () => {
	console.log('Downloading Configs');
	const rawConfigs = fetch('https://abc.1gu.xyz/events', {
		headers: {
			key: 'eranissodamncool',
		},
	});
	let configs = Snakify.objects(await (await rawConfigs).json());

	configs.forEach(
		(config) => (config.activity_units = config.activity_unit === 'crunch' ? 'crunches' : config.activity_unit + 's')
	);

	localStorage.setItem('configs', JSON.stringify(configs));
};

Config.getConfig = async () => {
	let localConfigsString = localStorage.getItem('configs');

	if (!localConfigsString) {
		await Config.getConfigs();
		localConfigsString = localStorage.getItem('configs');
	}

	localConfigs = JSON.parse(localConfigsString);
	Config.data = Config.getConfigFromGroupUrl(localConfigs);

	if (!Config.data) {
		localStorage.removeItem('configs');
		await Config.getConfig();
	}
};

Config.getConfig();
