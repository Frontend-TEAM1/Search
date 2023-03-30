import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const FromDB = async key => {
	try {
		const response = await axios.get(`${BASE_URL}/search`, {
			params: {
				key,
			},
		});
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
