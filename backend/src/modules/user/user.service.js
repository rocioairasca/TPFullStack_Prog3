const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config( );

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