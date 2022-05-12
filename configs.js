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
	if (window.location.href.includes('posts')) return;
	let localConfigsString = localStorage.getItem('configs');

	if (!localConfigsString) {
		await Config.getConfigs();
		localConfigsString = localStorage.getItem('configs');
	}

	localConfigs = JSON.parse(localConfigsString);
	Config.data = Config.getConfigFromGroupUrl(localConfigs);

	if (!Config.data) {
		s;
		localStorage.removeItem('configs');
		await Config.getConfig();
	}
};

Config.waitForConfig = async () => {
	let count = 0;
	while (!Config?.data?.id) {
		await Utils.timeout(1000);
		count++;
		if (count === 10) throw "Couldn't get config";
	}
};
(async () => {
	await Config.getConfig();
})();
