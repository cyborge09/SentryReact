export const SET_CURRENT_PROJECT = "SET_CURRENT_PROJECT";

export const setCurrentProject = projectName => ({
  type: SET_CURRENT_PROJECT,
  payload: {
    projectName: projectName
  }
});
