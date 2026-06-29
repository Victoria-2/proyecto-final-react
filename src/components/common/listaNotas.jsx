import React, { useState, useEffect } from 'react';
import { notaService } from '../../services/notaService.js';

export const ListaNotas = () => {
  const [notas, setNotas] = useState([]);
  const [error, setError] = useState('');

  // 2. Usamos useEffect para pedir las notas automáticamente al cargar el componente
  useEffect(() => {
    const pedirNotas = async () => {
      try {
        // 3. LLAMAMOS al servicio y esperamos la respuesta
        const datos = await notaService.getAllNotas();

        // 4. Guardamos las notas en el estado para que se muestren
        setNotas(datos);
      } catch (err) {
        setError(err.message); // Si el servicio falla, atrapamos el error
      }
    };

    pedirNotas();
  }, []);

  return (
    <div
      style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}
    >
      <h3>Listado Oficial de Notas</h3>
      <table
        border="1"
        cellPadding="10"
        style={{ width: '100%', borderCollapse: 'collapse' }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Legajo</th>
            <th>ID Materia</th>
            <th>Nota</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {/* Recorremos el array que nos dio el servicio usando .map */}
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
