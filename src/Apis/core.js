import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const FromDB = async key => {
	console.log('>>>>>>>>>>>>>1');
	const response = await axios.get(`${BASE_URL}/search`, {
		params: {
			key,
		},
	});
	console.log('>>>>>>>>>>>>>', key);
	console.log('>>>>>>>>>>>>>', response.data);
	return response.data;
};
