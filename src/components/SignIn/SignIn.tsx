import React, { useState } from 'react';
import { authMethods } from '../../services/authMethods';
import { RouteComponentProps } from '@reach/router';
import { addError, addSuccess } from '../../helpers/Notifications';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const SignIn = (props: RouteComponentProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const signIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(uiActions.showLoader());
    authMethods
      .signin(email, password)
      .then(() => {
        addSuccess('Zalogowano!');
      })
      .catch((error) => {
        var errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
          addError('Niepoprawne hasło.');
        } else if (
          errorCode === 'auth/invalid-email' ||
          errorCode === 'auth/user-not-found'
        ) {
          addError('Niepoprawny Email.');
        } else if (errorCode === 'auth/network-request-failed') {
          addError('Błąd połączenia z serwerem.');
        } else {
          addError('Błąd: ' + error.message);
        }
      })
      .finally(() => {
        dispatch(uiActions.hideLoader());
      });
  };

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget as HTMLInputElement;

    if (name === 'userEmail') {
      setEmail(value);
    } else if (name === 'userPassword') {
      setPassword(value);
    }
  };

  return (
    <div className="signin">
      <img src="/logo.gif" alt="" style={{ objectFit: 'cover' }} />
      <form className="form-box" onSubmit={signIn}>
        <div className="flex-row">
          <input
            id="email"
            className="textInput"
            placeholder="Email"
            type="email"
            name="userEmail"
            value={email}
            onChange={onChangeHandler}
          />
        </div>
        <div className="flex-row">
          <input
            id="password"
            className="textInput"
            placeholder="Hasło"
            type="password"
            name="userPassword"
            value={password}
            onChange={onChangeHandler}
          />
        </div>
        <input className="submit button" type="submit" value="Zaloguj"></input>
      </form>
    </div>
  );
};

export default SignIn;
