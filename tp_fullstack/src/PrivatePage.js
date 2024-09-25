import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const PrivatePage = () => {
  const { isAuthenticated, user, logout } = useAuth0();

  // Si no está autenticado, redirigir a la página pública
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Bienvenido, {user.name}</h1>
      <button onClick={() => logout({ returnTo: window.location.origin })}>Cerrar sesión</button>
    </div>
  );
};

export default PrivatePage;
