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
    console.log('res', response);
    if (response.status === 200) {
      loginStatus = true;
      const { accessToken, refreshToken } = {
        accessToken: response.data.data.accessToken,
        refreshToken: response.data.data.refreshToken,
      };
      return { loginStatus, accessToken, refreshToken };
    }
  } catch (err) {
    return err.response;
  }
};
