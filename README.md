# Proyecto Fullstack - CRUD de Tareas

Este es un proyecto fullstack que permite la gestión de tareas utilizando **MongoDB** para la base de datos y **Auth0** para la autenticación.

## Tecnologías Utilizadas

- **Frontend**: React
- **Backend**: Node.js, Express
- **Base de Datos**: MongoDB (Mongoose)
- **Autenticación**: Auth0

## Configuración del backend

### Base de Datos
```bash
DB_FULLSTACK='mongodb+srv://roairasca:rocio1234@tp3redes.q08xn.mongodb.net/fullStack-Prog3?retryWrites=true&w=majority'
```

### Auth0
```bash
AUTH0_DOMAIN="dev-fl08rf2h5payxfcu.us.auth0.com"
AUTH0_CLIENT_ID="wUxgyaXXJYJnZcFgwHnIr2bsltGzsEFL"
AUTH0_CLIENT_SECRET="IxDrcGZI0JWiSuoWqUyTW0_l_c9PqdIWqze9dHbfjhUa0D_kRH2u5naczLqHv0pH"
AUTH0_AUDIENCE="https://dev-fl08rf2h5payxfcu.us.auth0.com/api/v2/"
```

### Servidor
```bash
PORT=4000
```

## Instalación

1. **Clonar el repositorio**:
```bash
git clone https://github.com/rocioairasca/TPFullStack_Prog3.git
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar las variables de entorno en un .env**:

4. **Iniciar el servidor**:
```bash
node index.js
```

## Configuración del frontend

### Auth0 Config
```bash
REACT_APP_AUTH0_DOMAIN="dev-fl08rf2h5payxfcu.us.auth0.com"
REACT_APP_AUTH0_CLIENT_ID="wUxgyaXXJYJnZcFgwHnIr2bsltGzsEFL"
```

## Instalación

1. **Moverse a la carpeta frontend**:
```bash
cd frontend
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar las variables de entorno en un .env**:

4. **Iniciar el proyecto**:
```bash
npm start
```
