import * as https from "../utils/https";

export const fetchRelatedProjects = async adminEmail => {
  try {
    let headers = {
      email: adminEmail
    };
    console.log("i want it wall sadf email", adminEmail);
    let response = await https.get("project", headers);
    console.log("the response is ", response);
    return response;
  } catch (err) {
    console.error("CCCCCCCCCCCCCCCCCCCCCCCCCC");
  }
};
