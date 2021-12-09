import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectRepos,
  selectRepostatus,
} from '../../redux/repository/repository.selector';
import ListContent from '../ListContent/ListContent.component';
import ReposType from './../../redux/repository/repository.type.js';

function createData(name, detail, nameWithOwner, reposId) {
  return {
    name,
    detail,
    nameWithOwner,
    reposId,
  };
}

const Repository = ({ repos = [], fetchStatus }) => {
  const rows = repos.map((repos) =>
    createData(
      repos.node.name,
      `${repos.node.stargazers.totalCount} Star / ${repos.node.watchers.totalCount} Watching`,
      repos.node.nameWithOwner,
      repos.node.id
    )
  );

  return repos.length > 0 ? (
    <ListContent rows={rows} name='Name' detail='Star / Watching' />
  ) : fetchStatus !== '' && fetchStatus !== ReposType.FETCH_REPOS_START ? (
    <Typography variant='h6'>No User found</Typography>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  repos: selectRepos,
  fetchStatus: selectRepostatus,
});
export default connect(mapStateToProps, null)(Repository);
