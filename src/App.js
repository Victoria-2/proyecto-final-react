import React from 'react';
import './App.css';
// Importamos las herramientas tradicionales de navegación
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { GestionAlumnos } from './components/GestionAlumnos';
import { GestionNotas } from './components/GestionNotas';
import { Footer } from './components/common/Footer';
import { Navbar } from './components/common/Navbar';

// JWT
import { Login } from './components/JWT/Login';
import { Register } from './components/JWT/Register';
import { Perfil } from './components/JWT/Perfil';
import { ListaUsuarios } from './components/JWT/ListaUsuarios';

function App() {
  return (
    // Envolvemos toda la aplicación en el Router tradicional
    <Router>
      <div className="App">
        <Navbar />

        <header className="App-header">
          <h1>Panel de Control de Alumnos</h1>
          <p>Demostración Full-Stack (React + Node.js + Neon PostgreSQL)</p>

          <div style={{ width: '80%', marginTop: '20px' }}>
            {/* El "interruptor" de pantallas */}
            <Routes>
              {/* Cuando la URL sea / o /alumnos, llama a GestionAlumnos */}
              <Route path="/" element={<GestionAlumnos />} />
              <Route path="/alumnos" element={<GestionAlumnos />} />

              {/* Cuando la URL sea /notas, llama a GestionNotas */}
              <Route path="/notas" element={<GestionNotas />} />

              {/* JWT */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/usuarios" element={<ListaUsuarios />} />
            </Routes>
          </div>
        </header>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
