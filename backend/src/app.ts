import express from 'express';
import userRoutes from './routes/userRoutes';

import cors from 'cors'; // Importa el paquete cors

const app = express();
const serverPort = 5000;
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
  };

// Then pass these options to cors:
app.use(cors(options));

app.use(express.json());

app.use('/users', userRoutes);

app.listen(serverPort, () => {
    console.log(`Servidor corriendo en http://localhost:${serverPort}`);
});