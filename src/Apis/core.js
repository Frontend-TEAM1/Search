import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const FromDB = async key => {
	const response = await axios.get(`${BASE_URL}/search`, {
		params: {
			key,
		},
	});
	return response.data;
};
export const Axios = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});
