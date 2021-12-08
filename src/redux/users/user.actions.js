import UserType from './user.type';

export const initialState = () => ({
  type: UserType.INITIAL_STATE,
});
export const fetchUserStart = () => ({
  type: UserType.FETCH_USER_START,
});
export const fetchUserSuccess = (user) => ({
  type: UserType.FETCH_USER_SUCCESS,
  payload: user,
});
export const fetchUserFail = (error) => ({
  type: UserType.FETCH_USER_FAIL,
  payload: error,
});
