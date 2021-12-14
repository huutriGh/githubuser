import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import { withApollo } from 'react-apollo';
import { useState } from 'react';
import {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFail,
} from '../../redux/users/user.actions';
import { initialReposState } from '../../redux/repository/repository.actions';
import { connect } from 'react-redux';
import InputAdornment from '@mui/material/InputAdornment';
import { SearchUsersQuery } from './../../GithubQuery/GithubQuery';

const Search = (props) => {
  const [state, setState] = useState({
    queryString: '',
  });
  const { client, getUserStart, getUserSuccess, getUserFail, initialRepos } =
    props;

  const executeSearch = async (options) => {
    const query = state.queryString;
    const { after, before, first, last } = options;

    let firstQuery = first;
    if (first === undefined && last === undefined) {
      firstQuery = 100;
    }
    try {
      const { data } = await client.query({
        query: SearchUsersQuery,
        variables: { query, after, before, first: firstQuery, last },
      });

      getUserSuccess(data);
    } catch (error) {
      getUserFail(error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    initialRepos();
    getUserStart();
    executeSearch({ after: undefined, before: undefined });
  };
  const handleQueryChange = (event) => {
    setState((state) => ({
      ...state,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    }));
  };
  return (
    <Grid container spacing={1} justifyContent='center'>
      <Grid item xs={8} sm={6}>
        <TextField
          name='queryString'
          id='input-with-icon-textfield'
          label='Search User'
          size='small'
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant='outlined'
          value={state.query}
          onChange={handleQueryChange}
          inputProps={{ maxLength: 50 }}
          onFocus={(event) => {
            event.target.select();
          }}
        />
      </Grid>
      <Grid item xs={4} sm={2}>
        <Button variant='contained' onClick={handleSubmit}>
          Seach
        </Button>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getUserStart: () => dispatch(fetchUserStart()),
  getUserSuccess: (users) => dispatch(fetchUserSuccess(users)),
  getUserFail: (error) => dispatch(fetchUserFail(error)),
  initialRepos: () => dispatch(initialReposState()),
});

export default withApollo(connect(null, mapDispatchToProps)(Search));
