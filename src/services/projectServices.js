import * as https from "../utils/https";

export const fetchRelatedProjects = async adminEmail => {
  try {
    let headers = {
      email: adminEmail
    };

    let response = await https.get("project", headers);
    console.log("the response is ", response);
    return response;
  } catch (err) {
    console.error("CCCCCCCCCCCCCCCCCCCCCCCCCC");
  }
};

export const createNewProject = async (projectName, adminEmail) => {
  try {
    let data = {
      project_name: projectName,
      admin_email: adminEmail
    };

    let response = await https.post("project", data);
    console.log("the response is ", response);
    return response;
  } catch (err) {
    console.error("CCCCCCCCCCCCCCCCCCCCCCCCCC");
  }
};
