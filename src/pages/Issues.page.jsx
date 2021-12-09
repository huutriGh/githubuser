import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router';
import OpentIssue from '../components/OpenIssue/OpenIssue.component';
//import Search from '../components/Search/Search.Component';
import userStyles from './Users.style';

const IssuesPage = () => {
  const classes = userStyles();
  const { state } = useLocation();

  return (
    <Container className={classes.layout}>
      <Paper elevation={3} className={classes.paper}>
        <Grid container spacing={10} direction='row'>
          {
            // <Grid item xs={12} sm={12}>
            //   <Search />
            // </Grid>
          }
          <Grid item xs={12} sm={12}>
            <OpentIssue queryData={state} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default IssuesPage;
