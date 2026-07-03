import React, { useState } from 'react';
import '../../styles/components/navbar.css';

export const Navbar = () => {
  // Simulamos un estado para saber si el usuario está logueado o no
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuthClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">
          <h2>
            Sistema Universitario <span>Prog III</span>
          </h2>
        </a>
      </div>

      <ul className="navbar-links">
        <li>
          <a href="/alumnos">Inicio - Alumnos</a>
        </li>
        <li>
          <a href="/notas">Notas</a>
        </li>
        <li>
          <a href="/usuarios">Usuarios registrados</a>
        </li>
      </ul>

      <div className="navbar-auth">
        {isLoggedIn ? (
          <button className="btn-logout" onClick={handleAuthClick}>
            Log out
          </button>
        ) : (
          <a href="/login">
            <button className="btn-login" onClick={handleAuthClick}>
              Log in
            </button>
          </a>
        )}
      </div>
    </nav>
  );
};
