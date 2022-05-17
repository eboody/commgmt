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

AI.generateResponses = async (story, org, name) => {
	const response = await (
		await fetch(`https://commgmt.herokuapp.com/generateResponses?story=${story}&org=${org}&name=${name}`, {
			headers: {
				key: 'eranissodamncool',
			},
		})
	).json();

	return response;
};
