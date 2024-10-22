const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config( {path: '../../../../.env'} );

// funcion para obtener un token de la API de gestion de Auth0
const getManagementApiToken = async () => {
  const auth0Domain = process.env.AUTH0_DOMAIN;
  const clientId = process.env.AUTH0_CLIENT_ID;
  const clientSecret = process.env.AUTH0_CLIENT_SECRET;

  const response = await axios.post(`https://${auth0Domain}/oauth/token`, {
    client_id: clientId,
    client_secret: clientSecret,
    audience: `https://${auth0Domain}/api/v2/`,
    grant_type: 'client_credentials'
  });

  return response.data.access_token;
};

async function getAllUsers() {
  const token = await getManagementApiToken();
  const auth0Domain = process.env.AUTH0_DOMAIN;

  const response = await axios.get(`https://${auth0Domain}/api/v2/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

async function findUserById(userId) {
  const token = await getManagementApiToken();
  const auth0Domain = process.env.AUTH0_DOMAIN;

  const response = await axios.get(`https://${auth0Domain}/api/v2/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

module.exports = { 
  getManagementApiToken, 
  getAllUsers,
  findUserById 
};