import { createSelector } from 'reselect';

const selectUsers = (state) => state.users;

export const selectUser = createSelector(
  [selectUsers],
  (users) => users.users.search.edges
);
export const selectFetchUserStatus = createSelector(
  [selectUsers],
  (users) => users.status
);
