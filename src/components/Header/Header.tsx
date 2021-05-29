import { Link } from "@reach/router";
import React, { FunctionComponent, useContext } from "react"
import { UserContext } from "../../providers/UserProvider";
import { authMethods } from "../../services/authMethods";

const Header: FunctionComponent = () => {

    const user = useContext(UserContext);

    return (
      <div className="header">
        <div>
          <img src="logo.gif" alt="" /> <span>Cześć!</span>
          <span>({user?.email})</span>
        </div>
        <div>
          {user.isAdmin && (
            <>
              <Link to="/">Dashboard</Link>
              <Link to="/admin">Admin</Link>
            </>
          )}
          <Link to="/" onClick={authMethods.signout}>
            Wyloguj
          </Link>
        </div>
      </div>
    );
}

export default React.memo(Header);