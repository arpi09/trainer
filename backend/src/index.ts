import express, { Request, Response } from 'express';
import cors from 'cors';
import { authenticate } from './middlewares/authMiddleware';
import { authorizeRole } from './middlewares/roleMiddleware';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('API is running');
});

app.get('/admin-data', authenticate, authorizeRole(['admin']), (req, res) => {
  res.json({ message: 'This is admin-only data!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 