import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

const CreateIssueForm = ({ isOpen, handleClose }) => {
  const onHandleClose = () => {
    handleClose();
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
            id='name'
            label='Title'
            fullWidth
            variant='outlined'
          />

          <TextField
            margin='dense'
            size='small'
            id='name'
            label='Description'
            multiline
            rows={6}
            fullWidth
            variant='outlined'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onHandleClose} variant='contained' color='secondary'>
            Cancel
          </Button>
          <Button onClick={onHandleClose} variant='contained'>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateIssueForm;
