import { combineReducers } from 'redux';
import reposReducer from './repository/repository.reducer';
import usersReducer from './users/user.reducer';

export default combineReducers({
  users: usersReducer,
  repos: reposReducer,
});
