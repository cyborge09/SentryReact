import * as https from '../utils/https';

export const validateAdminStatus = async (email, password) => {
	let loginStatus = false;
	let response;

	try {
		let data = {
			email: email,
			password: password,
		};

		response = await https.post('auth/login', data);

		if (response.status === 200) {
			loginStatus = true;
			const { accessToken, refreshToken, userId } = {
				accessToken: response.data.data.accessToken,
				refreshToken: response.data.data.refreshToken,
				userId: response.data.data.data.id,
			};
			return { loginStatus, accessToken, refreshToken, userId };
		}
	} catch (err) {
		return err.response;
	}
};
