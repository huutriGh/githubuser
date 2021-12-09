import { combineReducers } from 'redux';
import issueReducer from './issue/issue.reducer';
import reposReducer from './repository/repository.reducer';
import usersReducer from './users/user.reducer';

export default combineReducers({
  users: usersReducer,
  repos: reposReducer,
  issues: issueReducer,
});
