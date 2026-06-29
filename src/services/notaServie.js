const API_URL = 'https://tp4-pruebas-progiii-2.onrender.com';

export const notaService = {
  getAllNotas: async () => {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'content-type': 'application.json',
      },
    });

    if (!response.ok) {
      throw new Error('No se pudieron traer las notas de la base de datos');
    }
    return await response.json();
  },
};
