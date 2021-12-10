import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import issueReducer from './issue/issue.reducer';
import reposReducer from './repository/repository.reducer';
import usersReducer from './users/user.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['users', 'repos', 'issues'],
};
const appReducer = combineReducers({
  users: usersReducer,
  repos: reposReducer,
  issues: issueReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default persistReducer(persistConfig, rootReducer);
