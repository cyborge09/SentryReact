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

export const getRelatedProjectInstances = async (projectID, userId) => {
  try {
    let headers = {
      projectID,
      userId,
    };

    let response = await https.get('projectInstance', headers);
    return response;
  } catch (err) {}
};

export const deleteSpecificProjectInstances = async instanceId => {
  try {
    let response = await https.remove(`projectInstance/${instanceId}`);
    return response;
  } catch (err) {
    console.error('error deleting data');
  }
};
