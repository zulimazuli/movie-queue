import React, { useState } from 'react';
import { authMethods } from '../../services/authMethods';
import useNotification from '../../hooks/useNotification';
import { RouteComponentProps } from '@reach/router';

const SignIn = (props: RouteComponentProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { addSuccess, addError } = useNotification();

  const signIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    authMethods
      .signin(email, password)
      .then(() => {
        addSuccess('Zalogowano!');
      })
      .catch((err) => {
        addError('Niepoprawny email lub hasło.');
        console.error('error siging in: ', err);
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
