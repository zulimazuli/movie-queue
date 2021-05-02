import React, { useContext} from 'react';
import { Router } from '@reach/router';

import Dashboard from './components/Dashboard/Dashboard';
import SignIn from './components/SignIn/SignIn';
import { UserContext } from './providers/UserProvider';

function App() {
  const user = useContext(UserContext);

  return (
      user ? <Dashboard /> :
        <Router>
          <SignIn path="/" />
        </Router>
  );
}

export default App;
