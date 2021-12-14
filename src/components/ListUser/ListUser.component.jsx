import { Box, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import React from 'react';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import UserType from '../../redux/users/user.type';
import { SearchReposQuery } from './../../GithubQuery/GithubQuery';
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
        <Box
          flexDirection='row'
          display='flex'
          overflow='scroll'
          justifyContent='center'
          alignContent='center'
          alignSelf='center'
          alignItems='center'
          margin={2}
        >
          {users.map((user) => (
            <Box
              key={user.node.login}
              justifyContent='center'
              alignContent='center'
              alignSelf='center'
              alignItems='center'
              flexDirection='column'
            >
              <Button onClick={() => getReposOfUser(user.node.login)} size='large' fullWidth >
                <Typography
                  color='blue'
                  justifyContent='center'
                  alignContent='center'
                  alignSelf='center'
                  alignItems='center'
                >
                  <Avatar alt={user.node.login} src={user.node.avatarUrl} />
                  {user.node.login}
                </Typography>
              </Button>
            </Box>
          ))}
        </Box>
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
