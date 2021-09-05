import React from 'react';

type ButtonProps = {
  id?: string;
  clicked: any;
  children: any;
};

const Button = (props: ButtonProps) => {
  return (
    <button id={props.id ?? ''} onClick={props.clicked} className="button">
      {props.children}
    </button>
  );
};

export default Button;