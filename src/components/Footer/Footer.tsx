import React from "react";

const Footer = () => {
    const { version } = require('../../../package.json');

    return (<div className="footer">
        <span>v{version}</span>
    </div>);
};

export default React.memo(Footer);