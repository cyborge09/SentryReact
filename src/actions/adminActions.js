export const SET_CURRENT_PROJECT = "SET_CURRENT_PROJECT";
export const PROJECT_FETCH_SUCCESS = "PROJECT_FETCH_SUCCESS";




export const setCurrentProject = projectName => ({
  type: SET_CURRENT_PROJECT,
  payload: {
    projectName: projectName
  }
});


export const projectFetchSuccess = data => ({
  type: PROJECT_FETCH_SUCCESS,
  payload: { data }
});
