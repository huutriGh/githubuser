import { Button, Grid } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Navigate } from 'react-router-dom';
import {
  fetchIssueFail,
  fetchIssueStart,
  fetchIssueSuccess,
} from '../../redux/issue/issue.actions';
import {
  selectIssue,
  selectIssuetatus,
} from '../../redux/issue/issue.selector';
import IssueType from '../../redux/issue/issue.type.js';
import CreateIssueForm from '../CreateIssueForm/CreateIssueForm.component';
import ListContent from '../ListContent/ListContent.component';
import { SearchIssueQuery } from './../../GithubQuery/GithubQuery';

const OpentIssue = ({
  queryData,
  client,
  getIssueStart,
  getIssueSuccess,
  getIssueFail,
  issue = [],
  fetchStatus,
  issueCount,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getIssueOfRepos = async () => {
      try {
        getIssueStart();
        const { data } = await client.query({
          query: SearchIssueQuery,
          variables: {
            query: `repo:${
              queryData ? queryData.nameWithOwner : ''
            } created:>2020-01-01 state:open `,
            first: 100,
          },
        });

        getIssueSuccess(data);
      } catch (error) {
        getIssueFail(error);
      }
    };
    getIssueOfRepos();
  }, [
    queryData,
    client,
    getIssueFail,
    getIssueStart,
    getIssueSuccess,
    queryData?.nameWithOwner,
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const days_between = (date) => {
    let given = moment(date, 'YYYY-MM-DD');
    let current = moment().startOf('day');
    return current.diff(given, 'days');
  };

  const rows = issue.map((issue) => ({
    name: issue.node.title,
    detail: `${days_between(issue.node.createdAt)} days ago by ${
      issue.node.author.login
    }`,
    nameWithOwner: null,
    reposId: issue.node.url,
  }));

  if (!queryData) {
    return <Navigate to='/' />;
  }
  switch (fetchStatus) {
    case IssueType.FETCH_ISSUE_START:
      return <LinearProgress />;
    case IssueType.FETCH_ISSUE_SUCCESS:
    case IssueType.CREATE_ISSUE_START:
    case IssueType.CREATE_ISSUE_SUCCESS:
    case IssueType.CREATE_ISSUE_FAIL:
    case IssueType.CREATE_ISSUE_CANCLE:
      return (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography component='h1' variant='h5'>
              {queryData?.name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography component='h1' variant='h5' align='left'>
              {queryData?.detail}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography component='h1' variant='h5' align='right'>
              <Button variant='contained' onClick={handleClickOpen}>
                New Issue
              </Button>
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <ListContent
              rows={rows}
              name='Open Issues'
              detail='Created ago / by '
            />
          </Grid>
          <CreateIssueForm
            isOpen={open}
            reposId={queryData?.reposId}
            handleClose={handleClose}
          />
        </Grid>
      );
    case IssueType.FETCH_ISSUE_FAIL:
      return <Typography>Opps!!! Something wrong</Typography>;
    default:
      return null;
  }
};
const mapStateToProps = createStructuredSelector({
  issue: selectIssue,
  fetchStatus: selectIssuetatus,
});
const mapDispatchToProps = (dispatch) => ({
  getIssueStart: () => dispatch(fetchIssueStart()),
  getIssueSuccess: (issues) => dispatch(fetchIssueSuccess(issues)),
  getIssueFail: (error) => dispatch(fetchIssueFail(error)),
});
export default withApollo(
  connect(mapStateToProps, mapDispatchToProps)(OpentIssue)
);
