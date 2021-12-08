import { Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { withApollo } from 'react-apollo';
import CreateIssueForm from '../CreateIssueForm/CreateIssueForm.component';
import ListContent from '../ListContent/ListContent.component';
import { SearchIssueQuery } from './../../GithubQuery/GithubQuery';
// function createData(name, detail) {
//   return {
//     name,
//     detail,
//   };
// }

const OpentIssue = ({ queryData, client }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (props) => {
    setOpen(false);
  };

  const rows = [
    // createData('Issue 1', '14 days ago by Octocat'),
    // createData('Issue 2', '14 days ago by Octocat'),
    // createData('Issue 3', '14 days ago by Octocat'),
    // createData('Issue 4', '14 days ago by Octocat'),
    // createData('Issue 5', '14 days ago by Octocat'),
    // createData('Issue 6', '14 days ago by Octocat'),
    // createData('Issue 7', '14 days ago by Octocat'),
    // createData('Issue 8', '14 days ago by Octocat'),
    // createData('Issue 9', '14 days ago by Octocat'),
    // createData('Issue 10', '14 days ago by Octocat'),
    // createData('Issue 11', '14 days ago by Octocat'),
    // createData('Issue 12', '14 days ago by Octocat'),
    // createData('Issue 13', '14 days ago by Octocat'),
  ];

  useEffect(() => {
    const getIssueOfRepos = async () => {
      try {
        console.log(queryData.nameWithOwner.split('/')[0]);
        console.log(queryData.nameWithOwner);

        const { data } = await client.query({
          query: SearchIssueQuery,
          variables: {
            query: `user:${queryData.nameWithOwner.split('/')[0]} repo:${
              queryData.nameWithOwner
            } state:open`,
            first: 100,
          },
        });
        console.log(data);
        return data;
      } catch (error) {}
    };
    getIssueOfRepos();
  }, [client, queryData.nameWithOwner]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Typography component='h1' variant='h5'>
          {queryData.name}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography component='h1' variant='h5' align='left'>
          {queryData.detail}
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
        <ListContent rows={rows} name='Open Issues' detail='Open Issued' />
      </Grid>
      <CreateIssueForm isOpen={open} handleClose={handleClose} />
    </Grid>
  );
};

export default withApollo(OpentIssue);
