import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  let styleObject = (obj) => {
    if (obj.isActive === true) {
      return {
        backgroundColor: "crimson",
        color: "white",
        textDecoration: "none",
      };
    }
  };

  return (
    <div>
      <nav className="navsection">
        <ul>
           
          <NavLink
            style={(item) => {
              return styleObject(item);
            }}
            to="/signup"
          >
            <li>Signup</li>
          </NavLink>
          <NavLink
            style={(item) => {
              return styleObject(item);
            }}
            to="/"
          >
            <li>Login</li>
          </NavLink>
          
          <NavLink
            style={(item) => {
              return styleObject(item);
            }}
            to="/forgotpassword"
          >
            <li>Forgotpassword</li>
          </NavLink>
          <NavLink
            style={(item) => {
              return styleObject(item);
            }}
            to="/reset-password"
          >
            <li>Reset-Password</li>
          </NavLink>
          <NavLink
            style={(item) => {
              return styleObject(item);
            }}
            to="/logout"
          >
            <li>logout</li>
          </NavLink>

         
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
