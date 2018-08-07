import * as https from "../utils/https";

export const fetchRelatedLogs = async projectName => {
  try {
    let headers = {
      projectName: projectName
    };

    let response = await https.get("logs", headers);
    console.log("the response is ", response);
    return response;
  } catch (err) {
    console.error("CCCCCCCCCCCCCCCCCCCCCCCCCC", err);
  }
};
