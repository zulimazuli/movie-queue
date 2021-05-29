import React, { useContext } from 'react';

import Dashboard from './containers/Dashboard/Dashboard';
import SignIn from './components/SignIn/SignIn';
import { UserContext } from './providers/UserProvider';
import Footer from './components/Footer/Footer';
import { Router } from '@reach/router';
import Admin from './containers/Admin/Admin';
import NotFound from './containers/NotFound/NotFound';

function App() {
  const user = useContext(UserContext);

  return (
    <>
      <Router>
        {user ? <Dashboard path="/" /> : <SignIn path="/" />}
        {user?.isAdmin ? <Admin path="/admin" /> : null}
        <NotFound default />
      </Router>
      <Footer />
    </>
  );
}

export default App;
