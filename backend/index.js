require('dotenv').config({ path: '../.env'})
const express = require('express')
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger-output.json');
const cors = require('cors');
const bodyParser = require('body-parser');

// importar rutas y autenticación
const taskRouter = require("./src/modules/task/task.routes");
const usuarioRouter = require("./src/modules/user/user.routes");

const app = express()
const port = process.env.PORT || 4000;

const allowedOrigins = ['https://tp-full-stack-prog3-ia8u.vercel.app'];

// config basicas
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// conexión a mongodb
mongoose.connect(process.env.DB_FULLSTACK)
.then(() => console.log('Conectado a la base de datos'))
.catch((error) => console.error('Error conectando a MongoDB:', error));

// ruta pública
app.get("/", async (request, response) => {
  return response.send("LandingPage");
});

// documentación swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {explorer: true}));

// rutas protegidas con auth0
app.use(taskRouter);
app.use(usuarioRouter);

// inicio del servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`)
})