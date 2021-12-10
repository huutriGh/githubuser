import IssueType from './issue.type';

const INITIAL_STATE = {
  issue: {
    search: {
      edges: [],
    },
  },
  error: null,
  status: '',
};
const issueReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IssueType.INITIAL_ISSUE_STATE:
      return {
        ...INITIAL_STATE,
      };
    case IssueType.FETCH_ISSUE_START:
      return {
        ...state,
        status: IssueType.FETCH_ISSUE_START,
      };
    case IssueType.FETCH_ISSUE_SUCCESS:
      return {
        ...state,
        issue: action.payload === null ? INITIAL_STATE.issue : action.payload,
        error: null,
        status: IssueType.FETCH_ISSUE_SUCCESS,
      };
    case IssueType.FETCH_ISSUE_FAIL:
      return {
        ...state,
        issue: INITIAL_STATE.issue,
        error: action.payload,
        status: IssueType.FETCH_ISSUE_FAIL,
      };
    case IssueType.CREATE_ISSUE_START:
      return {
        ...state,
        status: IssueType.CREATE_ISSUE_START,
      };
    case IssueType.CREATE_ISSUE_SUCCESS:
      let edges = state.issue.search.edges;
      const node = {
        ...action.payload.createIssue.issue,
      };
      edges.unshift({ node });

      state.issue.search.edges = edges;
      return {
        ...state,

        status: IssueType.CREATE_ISSUE_SUCCESS,
      };
    case IssueType.CREATE_ISSUE_FAIL:
      return {
        ...state,
        error: action.payload,
        status: IssueType.CREATE_ISSUE_FAIL,
      };
    case IssueType.CREATE_ISSUE_CANCLE:
      return {
        ...state,
        status: IssueType.CREATE_ISSUE_CANCLE,
      };

    default:
      return state;
  }
};

export default issueReducer;
