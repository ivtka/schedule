import express from 'express';
import 'express-async-errors';
import { NotFoundError } from './errors/NotFoundError';
import errorHandler from './middlewares/errorHandler';
import authRoutes from './routes/auth';
import eventRoutes from './routes/event'

const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/', eventRoutes);

app.all('*', async () => {
  throw new NotFoundError();
})

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server is listening on port ${port}`)
);