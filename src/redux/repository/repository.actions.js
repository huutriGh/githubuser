import ReposType from './repository.type';

export const initialState = () => ({
  type: ReposType.INITIAL_REPOS_STATE,
});
export const fetchReposStart = () => ({
  type: ReposType.FETCH_REPOS_START,
});
export const fetchReposSuccess = (user) => ({
  type: ReposType.FETCH_REPOS_SUCCESS,
  payload: user,
});
export const fetchReposFail = (error) => ({
  type: ReposType.FETCH_REPOS_FAIL,
  payload: error,
});
