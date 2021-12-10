import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  createIssueFail,
  createIssueStart,
  createIssueSuccess,
  createIssueCancle,
} from '../../redux/issue/issue.actions';
import { selectIssuetatus } from '../../redux/issue/issue.selector';
import { CreateIssue } from './../../GithubQuery/GithubQuery';
import IssueType from '../../redux/issue/issue.type';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

const CreateIssueForm = ({
  isOpen,
  reposId,
  handleClose,
  client,
  createIssueStart,
  createIssueSuccess,
  createIssueFail,
  createIssueCancle,
  createStatus,
}) => {
  const initState = {
    repositoryId: reposId,
    title: '',
    body: '',
  };

  const [state, setState] = useState(initState);
  const onHandleClose = () => {
    setState(initState);
    createIssueCancle();
    handleClose();
  };
  const handleChange = (event) => {
    setState((state) => ({
      ...state,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    }));
  };

  const createIssue = async () => {
    try {
      createIssueStart();
      const { data } = await client.mutate({
        mutation: CreateIssue,
        variables: {
          project: `${state.repositoryId}`,
          title: state.title,
          description: state.body,
        },
      });
      createIssueSuccess(data);
    } catch (error) {
      createIssueFail(error);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>New Issue</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            size='small'
            margin='dense'
            name='title'
            label='Title'
            fullWidth
            variant='outlined'
            value={state.title}
            onChange={handleChange}
          />

          <TextField
            margin='dense'
            size='small'
            name='body'
            label='Description'
            value={state.body}
            multiline
            rows={6}
            fullWidth
            variant='outlined'
            onChange={handleChange}
          />
          {createStatus === IssueType.CREATE_ISSUE_START ? (
            <LinearProgress />
          ) : createStatus === IssueType.CREATE_ISSUE_SUCCESS ? (
            <Typography color='primary'>Create Success</Typography>
          ) : createStatus === IssueType.CREATE_ISSUE_FAIL ? (
            <Typography color='secondary'>Create Fail !!!</Typography>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={onHandleClose} variant='contained' color='secondary'>
            Cancel
          </Button>
          <Button
            onClick={createIssue}
            variant='contained'
            disabled={createStatus === IssueType.CREATE_ISSUE_START}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  createStatus: selectIssuetatus,
});
const mapDispatchToProps = (dispatch) => ({
  createIssueStart: () => dispatch(createIssueStart()),
  createIssueSuccess: (issues) => dispatch(createIssueSuccess(issues)),
  createIssueFail: (error) => dispatch(createIssueFail(error)),
  createIssueCancle: (error) => dispatch(createIssueCancle()),
});
export default withApollo(
  connect(mapStateToProps, mapDispatchToProps)(CreateIssueForm)
);
