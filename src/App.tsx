import React, { useContext } from 'react';

import Dashboard from './components/Dashboard/Dashboard';
import SignIn from './components/SignIn/SignIn';
import { UserContext } from './providers/UserProvider';
import Footer from './components/Footer/Footer';

function App() {
  const user = useContext(UserContext);

  return (
    <>
      {user ? <Dashboard /> : <SignIn />}
      <Footer />
    </>
  );
}

export default App;
