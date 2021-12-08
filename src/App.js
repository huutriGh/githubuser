import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import IssuesPage from './pages/Issues.page';
import UserPage from './pages/Users.page';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_GITHUB_API,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
  },
});

const theme = createTheme();
function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<UserPage />} />
            <Route exact path='/Issues' element={<IssuesPage />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
