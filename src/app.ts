import express, { Request, Response } from 'express';
import cors from 'cors';
import connectDB from './scripts/initDB';
import AppRoute from './routes/app/AppRoute';

const PORT = 8080;
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send('<h2>Servidor Express+TypeScript ejecutandose en el puerto' + PORT);
})


app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use(cors({
  origin: ['http://localhost:3000', 'https://tienda-x--swart.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use('/api', AppRoute);

export default app;
