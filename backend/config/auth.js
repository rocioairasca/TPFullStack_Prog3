// Este middleware checkJwt verificará si el token es válido antes de que cualquier ruta sea accesible.

const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const authConfig = {
  domain: process.env.AUTH0_DOMAIN,
  audience: process.env.AUTH0_AUDIENCE,
};

// middleware para validar el JWT
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ['RS256']
}).unless({
  path: ['/'],
});

module.exports = (req, res, next) => {
  console.log('Token recibido:', req.headers.authorization);  // <-- Aquí verificas el token
  checkJwt(req, res, next);
};

module.exports = { checkJwt };
