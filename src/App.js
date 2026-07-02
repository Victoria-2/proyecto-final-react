import React from 'react';
import './App.css';
// Importamos las herramientas necesarias para la navegación
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { GestionAlumnos } from './components/GestionAlumnos';
import { GestionNotas } from './components/GestionNotas';
import { Footer } from './components/common/Footer';
import { Navbar } from './components/common/Navbar';

function App() {
  return (
    // Envolvemos toda la aplicación en un Router para poder manejar las rutas sin poner URLs
    <Router>
      <div className="App">
        <Navbar /> {/* componente que tiene la barra de navegación */}

        <header className="App-header">
          <h1>Panel de Control de Alumnos</h1>
          <p>Demostración Full-Stack (React + Node.js + Neon PostgreSQL)</p>

          <div style={{ width: '80%', marginTop: '20px' }}>
            {/* 'Routes' hace que sea un apartado en dónde, depende la URL, depende lo que muestra*/}
            <Routes>
              {/* Cuando la URL sea / o /alumnos, llama a GestionAlumnos */}
              <Route path="/" element={<GestionAlumnos />} />
              <Route path="/alumnos" element={<GestionAlumnos />} />

              {/* Cuando la URL sea /notas, llama a GestionNotas */}
              <Route path="/notas" element={<GestionNotas />} />
            </Routes>
          </div>
        </header>

        <Footer /> {/* componente que tiene el footer*/}
      </div>
    </Router>
  );
}

export default App;
