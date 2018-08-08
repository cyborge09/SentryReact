import * as https from '../utils/https';

export const validateAdminStatus = async (email, password) => {
  let loginStatus = false;
  let response;
  //use if clause

  //   if (localStorage.getItem("AccessToken")) {
  //     console.log("kkkkkkkkkkkkkkk", localStorage.getItem("RefreshToken"));
  //     loginStatus = true;
  //     return {
  //       loginStatus,
  //       accessToken: localStorage.getItem("AccessToken"),
  //       refreshToken: localStorage.getItem("RefreshToken")
  //     };
  //   } else {
  try {
    let data = {
      email: email,
      password: password,
    };

    response = await https.post('auth/login', data);

    if (response.status === 200) {
      loginStatus = true;
      const { accessToken, refreshToken } = {
        accessToken: response.data.data.accessToken,
        refreshToken: response.data.data.refreshToken,
      };
      return { loginStatus, accessToken, refreshToken };
    }
  } catch (err) {
    alert('ADMIN NOT FOUND');
  }
  //   }
};
