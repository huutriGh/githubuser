import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { connect } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import { createStructuredSelector } from 'reselect';
import {
  selectFetchUserStatus,
  selectUser,
} from './../../redux/users/user.selector';
import Typography from '@mui/material/Typography';
import React from 'react';
import UserType from '../../redux/users/user.type';
import { withApollo } from 'react-apollo';
import { SearchReposQuery } from './../../GithubQuery/GithubQuery';
import {
  fetchReposStart,
  fetchReposSuccess,
  fetchReposFail,
} from './../../redux/repository/repository.actions';

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

  return users.length > 0 ? (
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
  ) : fetchStatus !== '' && fetchStatus !== UserType.FETCH_USER_START ? (
    <Typography variant='h6'>No User found</Typography>
  ) : null;
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
