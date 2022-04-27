let configs;
let config;

const getConfigFromGroupUrl = (groupUrl = window?.location?.href) =>
	configs.find((config) => config.group_url === groupUrl);

const getConfigs = async () => {
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
};

getConfigs().then(() => {
	config = getConfigFromGroupUrl(window.location.href);
});
