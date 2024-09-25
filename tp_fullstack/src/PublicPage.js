import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const PublicPage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  // Si el usuario ya está autenticado, redirigirlo a la página privada
  if (isAuthenticated) {
    return <Navigate to="/private" />;
  }

  return (
    <div>
      <h1>Bienvenido a la página pública</h1>
      <button onClick={() => loginWithRedirect()}>Iniciar sesión</button>
    </div>
  );
};

export default PublicPage;