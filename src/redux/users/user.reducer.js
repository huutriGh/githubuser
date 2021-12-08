import UserType from './user.type';

const INITIAL_STATE = {
  users: {
    search: {
      edges: [],
    },
  },
  error: null,
  status: '',
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserType.INITIAL_STATE:
      return {
        ...INITIAL_STATE,
      };
    case UserType.FETCH_USER_START:
      return {
        ...state,
        status: UserType.FETCH_USER_START,
      };
    case UserType.FETCH_USER_SUCCESS:
      return {
        ...state,
        users: action.payload === null ? INITIAL_STATE.users : action.payload,
        error: null,
        status: UserType.FETCH_USER_SUCCESS,
      };
    case UserType.FETCH_USER_FAIL:
      return {
        ...state,
        users: INITIAL_STATE.users,
        error: action.payload,
        status: UserType.FETCH_USER_FAIL,
      };

    default:
      return state;
  }
};

export default userReducer;
