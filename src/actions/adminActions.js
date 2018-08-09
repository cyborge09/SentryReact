export const SET_CURRENT_PROJECT = "SET_CURRENT_PROJECT";
export const PROJECT_FETCH_SUCCESS = "PROJECT_FETCH_SUCCESS";
export const PROJECT_DELETE_SUCCESS = "PROJECT_DELETE_SUCCESS";





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


export const projectDeleteSuccess = () => ({
  type: PROJECT_DELETE_SUCCESS
});