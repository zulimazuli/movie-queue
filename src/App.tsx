import React, { Fragment, useContext } from 'react';

import Dashboard from './containers/Dashboard/Dashboard';
import SignIn from './components/SignIn/SignIn';
import { UserContext } from './providers/UserProvider';
import Footer from './components/Footer/Footer';
import { Router } from '@reach/router';
import Admin from './containers/Admin/Admin';
import NotFound from './containers/NotFound/NotFound';
import Loader from './components/UI/Loader/Loader';
import { useSelector } from 'react-redux';
import { RootState } from './store';

function App() {
  const user = useContext(UserContext);
  const loading = useSelector((state: RootState) => state.ui.loading);

  return (
    <Fragment>
      <Loader show={loading}></Loader>
      <Router>
        {user ? <Dashboard path="/" /> : <SignIn path="/" />}
        {user?.isAdmin ? <Admin path="/admin" /> : null}
        <NotFound default />
      </Router>
      <Footer />
    </Fragment>
  );
}

export default App;
