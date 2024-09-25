import React from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

const PrivatePage = () => {
  const { user } = useAuth0();
  return (
    <div>
      <h1>Página Privada</h1>
      <p>Bienvenido, {user.name}</p>
      {/* Aquí irá el CRUD */}
    </div>
  );
};

export default withAuthenticationRequired(PrivatePage);