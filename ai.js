const AI = {};

AI.isStory = async (story) => {
	const response = await (
		await fetch(`https://commgmt.herokuapp.com/isStory?story=${story}`, {
			headers: {
				key: 'eranissodamncool',
			},
		})
	).json();
	return response.isStory;
};

AI.generateResponses = async (story, org) => {
	const response = await (
		await fetch(`https://commgmt.herokuapp.com/generateResponses?story=${story}&org=${org}`, {
			headers: {
				key: 'eranissodamncool',
			},
		})
	).json();

	return response;
};
