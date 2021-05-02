import React from 'react';

const Loader = ({ show }: { show: boolean }) => {
    let classes = ["Loader"];
    if (!show) {
        classes = [...classes, "Hidden"]
    }
    return (<div className={classes.join(' ')}><div className="lds-dual-ring"></div></div>);
}

export default Loader;