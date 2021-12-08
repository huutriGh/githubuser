import ReposType from './repository.type';

const INITIAL_STATE = {
  repos: {
    search: {
      edges: [],
    },
  },
  error: null,
  status: '',
};
const reposReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReposType.INITIAL_REPOS_STATE:
      return {
        ...INITIAL_STATE,
      };
    case ReposType.FETCH_REPOS_START:
      return {
        ...state,
        status: ReposType.FETCH_REPOS_START,
      };
    case ReposType.FETCH_REPOS_SUCCESS:
      return {
        ...state,
        repos: action.payload === null ? INITIAL_STATE.users : action.payload,
        error: null,
        status: ReposType.FETCH_REPOS_SUCCESS,
      };
    case ReposType.FETCH_REPOS_FAIL:
      return {
        ...state,
        repos: INITIAL_STATE.repos,
        error: action.payload,
        status: ReposType.FETCH_REPOS_FAIL,
      };

    default:
      return state;
  }
};

export default reposReducer;
