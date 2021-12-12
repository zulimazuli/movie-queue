import React, { createContext, FunctionComponent, useEffect, useState } from 'react';
import { auth } from '../services/firebase'
import { getUserRole } from '../services/firestore';
import { User } from '../interfaces/User';
import { useDispatch } from 'react-redux';
import { uiActions } from '../store/ui-slice';

export const UserContext = createContext<Partial<User>>({});

const UserProvider: FunctionComponent = (props) => {
  const dispatch = useDispatch();
  const [authUser, setAuthUser] = useState<Partial<User> | any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const user = authUser as Partial<User>;
        const role = await getUserRole(authUser.uid);

        user.role = role;
        user.isAdmin = role === 'admin' ? true : false;

        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
      dispatch(uiActions.hideLoader());
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <UserContext.Provider value={authUser}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;