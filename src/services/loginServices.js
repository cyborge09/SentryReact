import httpLogin from "../utils/httpLogin";

const loginService = async (email,password) => {
    let loginStatus = false;
    let response;
    //use if clause
    if (localStorage.getItem("AccessToken")) {
        console.log(localStorage.getItem("RefreshToken"));
        loginStatus = true;
        return { loginStatus, accessToken: localStorage.getItem("AccessToken"), refreshToken: localStorage.getItem("RefreshToken") };
    }
    else {
        try {
          
            response = await httpLogin(email,password);
            console.log("asdsa",response);
            if (response.status === 200) {
                loginStatus = true;
                const { accessToken, refreshToken } = { accessToken: response.data.USERDATA.accessToken, refreshToken: response.data.USERDATA.refreshToken };
                return { loginStatus, accessToken, refreshToken };
            }
        }
        catch (err) {
            alert("ADMIN NOT FOUND")
        }
    }


}

export default loginService;