import React from 'react';

type TextInputProps = {
    id: string,
    changed: any,
    value: string,
    placeholder?: string
}

const TextInput = (props: TextInputProps) => {
    return (<input
        id={props.id}
        type="text" 
        onChange={props.changed} value={props.value}
        placeholder={props.placeholder}
        className="textInput"
        autoComplete="off"
    />);
}

export default TextInput;