import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { IoChevronBackCircleSharp } from "react-icons/io5";

const Navbar = ({ left, mid, right }) => {
  return (
    <nav className="navbar">
      <Link
        to={left === "Admin Mode" ? "/admin" : "/"}
        className="navbar__home"
      >
        {left === "Admin Mode" ? (
          <small className="navbar__admin">{left}</small>
        ) : (
          <IoChevronBackCircleSharp className="navbar__home--icon" />
        )}
      </Link>
      <h6>{mid}</h6>
      <Link
        to={right === "User Mode" ? "/user" : "/admin"}
        className="navbar__users"
      >
        {right}
      </Link>
    </nav>
  );
};

export default Navbar;
