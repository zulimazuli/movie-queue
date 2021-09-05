import React from 'react';

type TextInputProps = {
  id: string;
  changed: any;
  onKeyDown: any;
  value: string;
  placeholder?: string;
};

const TextInput = (props: TextInputProps) => {
  return (
    <input
      id={props.id}
      type="text"
      onChange={props.changed}
      value={props.value}
      onKeyDown={props.onKeyDown}
      placeholder={props.placeholder}
      className="textInput"
      autoComplete="off"
    />
  );
};

export default TextInput;