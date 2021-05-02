import React, { FunctionComponent, useContext } from "react"
import { UserContext } from "../../providers/UserProvider";
import { authMethods } from "../../services/authMethods";

const Toolbar: FunctionComponent = () => {

    const user = useContext(UserContext);

    return (
        <div className="toolbar">
            <div><img src="logo.gif" alt="" /> <span>Cześć!</span><span>({user?.email})</span></div>
            <button onClick={authMethods.signout}>Wyloguj</button>
        </div>
    );
}

export default Toolbar;