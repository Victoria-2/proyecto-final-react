import React, { useState, useEffect } from 'react';
import { alumnoService } from '../services/alumnoService';
import '../styles/components/gestionAlumnos.css';

// Nota: Recordemos que podemos tener 'estados' con React. En vez de utilizar variables o 'let', utilizamos constantes que tienen un estado variable (useState).
// La lógica es parecida a cuando creamos una variable constante pero es un array, lo que nos permite agregar y modificar elementos pero el tipo es constante.
export const GestionAlumnos = () => {
  // Estados generales para la información y los errores
  const [alumnos, setAlumnos] = useState([]);
  const [error, setError] = useState('');

  // Estados para el formulario
  const [form, setForm] = useState({
    legajo: '',
    nombre: '',
    apellido: '',
    email: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Acciones en particular que necesitamos del componente
  const cargarAlumnos = async () => {
    try {
      const datos = await alumnoService.getAll();
      setAlumnos(datos);
    } catch (err) {
      setError(err.message);
    }
  };

  // Se ejecuta cuando carga el componente, es este caso, con <GestionAlumnos /> en App.js
  useEffect(() => {
    cargarAlumnos();
  }, []); // Si dejamos los '[]' vacíos es ni bien carga el componente, sino se puede establecer luego de qué queremos que se ejecute

  // A partir de acá temenos 'hanlders' para encargarnos de eventos con el formulario.
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar formulario (CREATE o UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // UPDATE
        await alumnoService.update(form.legajo, {
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email,
        });
      } else {
        // CREATE
        await alumnoService.create({
          legajo: Number(form.legajo),
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email,
        });
      }
      // Resetear interfaz y recargar lista
      setForm({ legajo: '', nombre: '', apellido: '', email: '' });
      setIsEditing(false);
      cargarAlumnos();
    } catch (err) {
      setError(err.message);
    }
  };

  // Cargar datos en el formulario para editar
  const handleEditClick = (alumno) => {
    setForm(alumno);
    setIsEditing(true);
  };

  // DELETE
  const handleDelete = async (legajo) => {
    if (
      window.confirm(
        `¿Seguro que querés eliminar al alumno con legajo ${legajo}?`
      )
    ) {
      try {
        await alumnoService.delete(legajo);
        cargarAlumnos(); // Recargamos la lista
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Lo que está dentro del 'return' siempre es el apartado visual. Con JS utilizabamos el DOM para poder renderizar los elementos, con React retornamos la vista.
  // Si queremos utilizar JS dentro de este bloque, va dentro de los {}
  // Para aplicar el CSS, lo importamos y utilizamos 'className' en vez de 'class'
  return (
    <div className="gestion-container">
      <h2>🎓 Panel de Gestión de Alumnos (CRUD)</h2>
      {error && <p className="error-mensaje">⚠️ {error}</p>}

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="gestion-form">
        <h3>{isEditing ? '✏️ Editar Alumno' : '➕ Registrar Nuevo Alumno'}</h3>
        <div className="form-grid">
          <input
            type="number"
            name="legajo"
            placeholder="Legajo"
            value={form.legajo}
            onChange={handleChange}
            disabled={isEditing}
            required
          />
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className={`btn-submit ${isEditing ? 'editar' : 'registrar'}`}
        >
          {isEditing ? 'Guardar Cambios' : 'Registrar Alumno'}
        </button>

        {isEditing && (
          <button
            type="button"
            className="btn-cancelar"
            onClick={() => {
              setIsEditing(false);
              setForm({ legajo: '', nombre: '', apellido: '', email: '' });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      {/* TABLA DE ALUMNOS */}
      <table className="tabla-alumnos">
        <thead>
          <tr>
            <th>Legajo</th>
            <th>Nombre Completo</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.length === 0 ? (
            <tr>
              <td colSpan="4" className="tabla-no-data">
                No hay alumnos registrados.
              </td>
            </tr>
          ) : (
            alumnos.map((al) => (
              <tr key={al.legajo}>
                <td>{al.legajo}</td>
                <td>
                  {al.apellido}, {al.nombre}
                </td>
                <td>{al.email}</td>
                <td>
                  <button
                    onClick={() => handleEditClick(al)}
                    className="btn-accion btn-editar"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(al.legajo)}
                    className="btn-accion btn-eliminar"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
