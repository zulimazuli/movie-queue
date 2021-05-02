import React from 'react';

type ButtonProps = {
    id?: string,
    clicked: any,
    children: any,
    disabled?: boolean
}

const Button = (props: ButtonProps) => {
    return (<button
        id={props.id ?? ""}
        onClick={props.clicked}
        className="button"
        disabled={props.disabled}
    >
            {props.children}
    </button>);
}

export default Button;