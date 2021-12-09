import IssueType from './issue.type';

export const initialState = () => ({
  type: IssueType.INITIAL_ISSUE_STATE,
});
export const fetchIssueStart = () => ({
  type: IssueType.FETCH_ISSUE_START,
});
export const fetchIssueSuccess = (issue) => ({
  type: IssueType.FETCH_ISSUE_SUCCESS,
  payload: issue,
});
export const fetchIssueFail = (error) => ({
  type: IssueType.FETCH_ISSUE_FAIL,
  payload: error,
});
export const createIssueStart = (error) => ({
  type: IssueType.CREATE_ISSUE_START,
});

export const createIssueSuccess = (issue) => ({
  type: IssueType.CREATE_ISSUE_SUCCESS,
  payload: issue,
});
export const createIssueFail = (error) => ({
  type: IssueType.CREATE_ISSUE_FAIL,
  payload: error,
});
