import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow-sm py-3 animate-navbar">
      <div className="container-fluid px-4">
        <NavLink className="navbar-brand fs-4 fw-bold" to="/">📊 Customer Dashboard</NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active text-warning fw-semibold' : 'text-white'}`
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/customers"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active text-warning fw-semibold' : 'text-white'}`
                }
              >
                Customers
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
