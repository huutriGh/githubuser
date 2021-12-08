import { makeStyles } from '@mui/styles';

const userStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    width: 'auto',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

export default userStyles;
