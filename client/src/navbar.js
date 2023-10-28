// Created by Prince Kumar (20UEE058)

import React, {useState} from "react";
import "./Navbar.css"; 
import { Link } from "react-router-dom";

const Navbar = () => {
    const [selectedRole, setSelectedRole] = useState('user');
  
    const handleRoleSelect = (role) => {
      setSelectedRole(role);
    };
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <Link to="/user">
            <button onClick={() => handleRoleSelect('user')}
            className={selectedRole === 'user' ? 'selected' : ''}>User</button>
          </Link>
        </li>
        <li>
          <Link to="/admin">
            <button onClick={() => handleRoleSelect('admin')}
            className={selectedRole === 'admin' ? 'selected' : ''}>Admin</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
