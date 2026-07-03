// En este caso, nuestros servicios son como un hibrido entre un controller y un modelo para React.
// Lo que hacemos es en un tipo de objeto de JS con {} tenemos elementos key:value, pero lo utilizaríamos con key:function, de esta forma podemos llamar a los endpoints de forma más sencilla y quedan los componentes más limpios.

const API_URL = 'https://tp4-pruebas-progiii-2.onrender.com/alumnos';

export const alumnoService = {
  getAll: async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al obtener alumnos');
    return await response.json();
  },

  create: async (alumno) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alumno),
    });
    if (!response.ok) throw new Error('Error al crear el alumno');
    return await response.json();
  },

  update: async (legajo, datosAlumno) => {
    const response = await fetch(`${API_URL}/${legajo}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosAlumno),
    });
    if (!response.ok) throw new Error('Error al modificar el alumno');
    return await response.json();
  },

  delete: async (legajo) => {
    const response = await fetch(`${API_URL}/${legajo}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar alumno');
    return await response.json();
  },
};
