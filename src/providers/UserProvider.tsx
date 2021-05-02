import React, { createContext, FunctionComponent, useEffect, useState } from 'react';
import { auth } from '../services/firebase'

export type User = {
    email: string;
    uid: string;
}

export const UserContext = createContext<Partial<User>>({});

const UserProvider: FunctionComponent = (props) => {

    const [authUser, setAuthUser] = useState<any>(null);

    useEffect(() => {        
        const unsubscribe = auth.onAuthStateChanged(authUser => {
                authUser ? setAuthUser(authUser) : setAuthUser(null);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <UserContext.Provider value={authUser}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider;