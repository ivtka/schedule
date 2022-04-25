import express from 'express';
import 'express-async-errors';
import { NotFoundError } from './errors/not-found-error';
import errorHandler from './middlewares/error-handler';
import authRoutes from './routes/auth';

const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.all('*', async () => {
  throw new NotFoundError();
})

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server is listening on port ${port}`)
);