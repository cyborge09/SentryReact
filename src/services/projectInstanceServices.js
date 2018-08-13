import * as https from '../utils/https';

export const createNewProjectInstance = async (instanceName, projectName) => {
  try {
    let data = {
      project_name: projectName,
      instanceName: instanceName,
    };

    let response = await https.post('projectInstance', data);
    return response;
  } catch (err) {
    console.error('error in creating new project Instance');
  }
};

export const getRelatedProjectInstances = async projectName => {
  try {
    let headers = {
      projectName,
    };

    let response = await https.get('projectInstance', headers);
    return response;
  } catch (err) {}
};
