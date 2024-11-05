const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

async function getManagementApiToken() {
  const options = {
    method: 'POST',
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/json' },
    data: {
      client_id: process.env.AUTH0_CLIENT_ID,        // ID de cliente
      client_secret: process.env.AUTH0_CLIENT_SECRET, // Secreto del cliente
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`, // Audiencia para la API de gestión
      grant_type: 'client_credentials' // Tipo de grant
    }
  };

  try {
    const response = await axios(options);
    return response.data.access_token; // Devuelve el token de gestión
  } catch (error) {
    console.error('Error obteniendo el token de gestión de Auth0:', error);
    throw new Error('No se pudo obtener el token de gestión de Auth0');
  }
}

async function getAllUsers() {
  const token = await getManagementApiToken(); // Obtiene el token de gestión
  const auth0Domain = process.env.AUTH0_DOMAIN;

  const response = await axios.get(`https://${auth0Domain}/api/v2/users`, {
    headers: {
      Authorization: `Bearer ${token}`, // Usa el token para autenticar la solicitud
    },
  });

  return response.data; // Devuelve la lista de usuarios
}

async function findUserById(userId) {
  const token = await getManagementApiToken(); // Obtiene el token de gestión
  const auth0Domain = process.env.AUTH0_DOMAIN;

  const response = await axios.get(`https://${auth0Domain}/api/v2/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Usa el token para autenticar la solicitud
    },
  });

  return response.data; // Devuelve la información del usuario
}

module.exports = { 
  getAllUsers,
  findUserById 
};
