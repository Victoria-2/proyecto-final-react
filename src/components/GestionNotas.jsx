import React, { useState, useEffect } from 'react';
import { notaService } from '../services/notaService.js';
import '../styles/components/gestionNotas.css';

export const GestionNotas = () => {
  const [notas, setNotas] = useState([]);
  const [error, setError] = useState('');

  // Usamos useEffect para pedir las notas automáticamente al cargar el componente
  useEffect(() => {
    const pedirNotas = async () => {
      try {
        // Llamamos al servicio, como es una promesa usamos 'await'
        const datos = await notaService.getAllNotas();

        // Guardamos las notas en el estado para que se actualice
        setNotas(datos);
      } catch (err) {
        setError(err.message);
      }
    };

    pedirNotas();
  }, []); // dejar los '[]' es lo que hace que suceda todo lo anterior ni bien carga el componente y no luego de otro

  return (
    <div className="contenedor-notas">
      <h3>Listado Oficial de Notas</h3>

      {/* Si hay un error, lo renderizamos y mostramos */}
      {error && <div className="mensaje-error">{error}</div>}

      <table className="tabla-notas">
        <thead>
          <tr className="encabezado-tabla">
            <th>Legajo</th>
            <th>ID Materia</th>
            <th>Nota</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {/* Recorremos el array con el estado de las notas .map */}
          {notas.map((item) => (
            <tr key={item.id}>
              <td>{item.legajo}</td>
              <td>{item.idMateria}</td>
              <td>{item.nota}</td>
              <td>{new Date(item.fecha).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
