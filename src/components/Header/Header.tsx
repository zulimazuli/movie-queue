import { Link } from '@reach/router';
import React, { FunctionComponent, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { UserContext } from '../../providers/UserProvider';
import { authMethods } from '../../services/authMethods';
import { queueActions } from '../../store/queue-slice';

const Header: FunctionComponent = () => {
  const dispatch = useDispatch();
  const user = useContext(UserContext);

  const signOutHandler = () => {
    authMethods.signout();
    dispatch(queueActions.clearQueue());
  };

  return (
    <div className="header">
      <div>
        <img src="logo.gif" alt="" /> <span>Cześć!</span>
        <span>({user?.email})</span>
      </div>
      <div>
        {user.isAdmin && (
          <>
            <Link to="/">Dashboard</Link>
            <Link to="/admin">Admin</Link>
          </>
        )}
        <Link to="/" onClick={signOutHandler}>
          Wyloguj
        </Link>
      </div>
    </div>
  );
};

export default React.memo(Header);
