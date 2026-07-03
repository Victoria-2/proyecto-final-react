const API_URL = 'https://tp4-pruebas-progiii-2.onrender.com/api';

export const authService = {
  // POST /api/register - Registro de nuevo usuario (Pública)
  register: async (nombre, email, password) => {
    const respuesta = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password }),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.error || 'Error al registrar el usuario');
    }

    return datos; // Devuelve { message, user, token }
  },

  // POST /api/login - Inicio de sesión (Pública)
  login: async (email, password) => {
    const respuesta = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.error || 'Error al iniciar sesión');
    }

    return datos; // Devuelve { message, user, token }
  },

  // GET /api/perfil - Obtener perfil del usuario logueado (Protegida)
  getPerfil: async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No estás autorizado. Por favor, iniciá sesión.');
    }

    const respuesta = await fetch(`${API_URL}/perfil`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Inyectamos el Bearer Token para el middleware
      },
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.error || 'Error al obtener el perfil');
    }

    return datos; // Devuelve { user }
  },

  // GET /api/users - Obtener todos los usuarios del sistema (Pública/General)
  getAllUsers: async () => {
    const respuesta = await fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.error || 'Error al obtener la lista de usuarios');
    }

    return datos; // Devuelve el array de usuarios [user1, user2, ...]
  },
};
