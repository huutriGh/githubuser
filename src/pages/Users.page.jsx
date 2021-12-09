import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ListUser from '../components/ListUser/ListUser.component';
import Repository from '../components/Repository/Repository.component';
import Search from '../components/Search/Search.component';
import userStyles from './Users.style';

const UserPage = () => {
  const classes = userStyles();
  return (
    <Container className={classes.layout}>
      <Paper elevation={3} className={classes.paper}>
        <Grid container spacing={2} direction='row'>
          <Grid item xs={12} sm={12}>
            <Search />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography component='h1' variant='h5'>
              Users
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <ListUser />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography component='h1' variant='h5'>
              Repositories
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Repository />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserPage;
