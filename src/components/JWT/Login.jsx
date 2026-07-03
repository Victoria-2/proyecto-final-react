// src/components/Login.jsx
import React, { useState } from 'react';
import { authService } from '../../services/authService';
import '../../styles/components/login.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitamos que se envíe el formulario vacío
    setError('');

    try {
      const datos = await authService.login(email, password);
      // Guardamos el token en el almacenamiento local
      localStorage.setItem('token', datos.token);
      // Redireccionamos a la pantalla del perfil
      window.location.href = '/perfil';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h3 className="login-title">Iniciar Sesión</h3>
      {error && <div className="login-error">⚠️ {error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="btn-submit">
          Ingresar
        </button>
      </form>

      <p className="login-footer">
        ¿No tenés cuenta? <a href="/register">Registrate acá</a>
      </p>
    </div>
  );
};
