import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import {
  createIssueFail,
  createIssueStart,
  createIssueSuccess,
} from '../../redux/issue/issue.actions';
import { CreateIssue } from './../../GithubQuery/GithubQuery';

const CreateIssueForm = ({
  isOpen,
  reposId,
  handleClose,
  client,
  createIssueStart,
  createIssueSuccess,
  createIssueFail,
}) => {
  const initState = {
    repositoryId: reposId,
    title: '',
    body: '',
  };

  const [state, setState] = useState(initState);
  const onHandleClose = () => {
    setState(initState);
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
        </DialogContent>
        <DialogActions>
          <Button onClick={onHandleClose} variant='contained' color='secondary'>
            Cancel
          </Button>
          <Button onClick={createIssue} variant='contained'>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  createIssueStart: () => dispatch(createIssueStart()),
  createIssueSuccess: (issues) => dispatch(createIssueSuccess(issues)),
  createIssueFail: (error) => dispatch(createIssueFail(error)),
});
export default withApollo(connect(null, mapDispatchToProps)(CreateIssueForm));
