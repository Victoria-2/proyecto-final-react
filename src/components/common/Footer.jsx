// src/components/common/Footer.jsx
import React from 'react';
import '../../styles/components/footer.css';

export const Footer = () => {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-contenido">
        <p>
          &copy; {anioActual} - Cátedra de Programación III. Todos los derechos
          reservados.
        </p>
        <p className="footer-subtexto">
          Diseñado para la gestión y seguimiento académico de alumnos.
        </p>
      </div>
    </footer>
  );
};
