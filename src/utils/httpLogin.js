import axios from "axios";

const httpFetch = (email,password) => {
    return axios({
        method: "post",
        url: "",
        data: { email: email },
        config: {
            headers: { "Content-Type": "application/json" }
        }
    })
}

export default httpFetch;