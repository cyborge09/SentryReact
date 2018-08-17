import * as https from '../utils/https';

export const createNewProjectInstance = async (instanceName, projectID) => {
  try {
    let data = {
      projectID: projectID,
      instanceName: instanceName,
    };

    let response = await https.post('projectInstance', data);
    return response;
  } catch (err) {
    console.error('error in creating new project Instance');
  }
};

export const getRelatedProjectInstances = async projectID => {
  try {
    let headers = {
      projectID,
    };

    let response = await https.get('projectInstance', headers);
    return response;
  } catch (err) {}
};

export const getRelatedProjectName = async projectID => {
  try {
    let response = await https.get(`project/${projectID}`);
    return response;
  } catch (err) {}
};
