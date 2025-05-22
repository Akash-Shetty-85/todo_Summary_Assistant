import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import router from './routes/todo.routes.js';

dotenv.config({
    path: "./.env"
});


const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    }
));
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/todos', router);

app.get('/check', (req, res) => res.send('Todo Summary Assistant Backend is running!'));

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
