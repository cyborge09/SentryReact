import { SET_CURRENT_PROJECT } from "../actions/adminActions";

const INITIAL_STATE = {
  project: {
    currentProject: ""
  }
};

const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_PROJECT: {
      return {
        ...state,
        project: {
          ...state.project,
          currentProject: action.payload.projectName
        }
      };
    }

    default:
      return state;
  }
};
export default adminReducer;
