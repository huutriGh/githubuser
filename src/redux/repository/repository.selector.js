import { createSelector } from 'reselect';

const selectReposs = (state) => state.repos;

export const selectRepos = createSelector(
  [selectReposs],
  (repos) => repos.repos.search.edges
);
export const selectRepostatus = createSelector(
  [selectReposs],
  (repos) => repos.status
);
