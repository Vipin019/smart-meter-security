// Created by Prince Kumar (20UEE058)

import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { IoChevronBackCircleSharp } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__home">
        {<IoChevronBackCircleSharp className="navbar__home--icon" />}
      </Link>
      <h6>Centrilized System</h6>
      <Link to="/user" className="navbar__users">
        Find Users
      </Link>
    </nav>
  );
};

export default Navbar;
