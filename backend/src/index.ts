import express from 'express';
import cors from 'cors';
import serviceRoutes from './routes/service.routes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/services', serviceRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});