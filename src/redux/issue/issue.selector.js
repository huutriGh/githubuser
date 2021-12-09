import { createSelector } from 'reselect';

const selectIssues = (state) => state.issues;

export const selectIssue = createSelector(
  [selectIssues],
  (issue) => issue.issue.search.edges
);
export const selectIssuetatus = createSelector(
  [selectIssues],
  (issue) => issue.status
);
export const selectIssueCount = createSelector(
  [selectIssues],
  (issue) => issue.issue.search.edges.length
);
