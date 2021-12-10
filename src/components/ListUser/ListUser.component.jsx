import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import UserType from '../../redux/users/user.type';
import { SearchReposQuery } from './../../GithubQuery/GithubQuery';
import LinearProgress from '@mui/material/LinearProgress';
import {
  fetchReposFail,
  fetchReposStart,
  fetchReposSuccess,
} from './../../redux/repository/repository.actions';
import {
  selectFetchUserStatus,
  selectUser,
} from './../../redux/users/user.selector';

const UserList = (props) => {
  const {
    users = [],
    fetchStatus,
    client,
    getReposStart,
    getReposSuccess,
    getReposFail,
  } = props;
  const getReposOfUser = async (login) => {
    getReposStart();
    try {
      const { data } = await client.query({
        query: SearchReposQuery,
        variables: { query: `user:${login}`, first: 100 },
      });

      getReposSuccess(data);
    } catch (error) {
      getReposFail(error);
    }
  };

  switch (fetchStatus) {
    case UserType.FETCH_USER_START:
      return <LinearProgress />;
    case UserType.FETCH_USER_SUCCESS:
      return (
        <Stack
          direction='row'
          spacing={1}
          alignItems='center'
          justifyContent='center'
          alignContent='center'
          alignSelf='center'
        >
          {users.map((user) => (
            <Grid
              container
              spacing={1}
              key={user.node.login}
              justifyContent='center'
              alignContent='center'
              alignSelf='center'
            >
              <Grid item xs={12} sm={12} alignSelf='center'>
                <IconButton onClick={() => getReposOfUser(user.node.login)}>
                  <Avatar
                    alt={user.node.login}
                    src={user.node.avatarUrl}
                    variant='square'
                  />
                </IconButton>
                <Typography variant='h6' color='blue'>
                  {user.node.login}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Stack>
      );
    case UserType.FETCH_USER_FAIL:
      return <Typography variant='h6'>No User found</Typography>;

    default:
      return null;
  }
};
const mapStateToProps = createStructuredSelector({
  users: selectUser,
  fetchStatus: selectFetchUserStatus,
});

const mapDispatchToProps = (dispatch) => ({
  getReposStart: () => dispatch(fetchReposStart()),
  getReposSuccess: (repos) => dispatch(fetchReposSuccess(repos)),
  getReposFail: (error) => dispatch(fetchReposFail(error)),
});

export default withApollo(
  connect(mapStateToProps, mapDispatchToProps)(UserList)
);
