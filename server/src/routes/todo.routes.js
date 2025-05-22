// src/routes/todos.js
import express from 'express';
import {
    getTodos,
    addTodo,
    deleteTodo,
    summarizeAndSend,
    updateTodoStatus,
} from '../controllers/todo.Controller.js';
import verifyAuth from '../middleware/authMiddleware.js';
import { summarizeLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.use(verifyAuth);
// Get all todos
router.get('/', getTodos);

// Add a new todo
router.post('/', addTodo);

// Delete a todo by ID
router.delete('/:id', deleteTodo);

// Update completion status of a todo by ID
router.patch('/:id/status', updateTodoStatus);

// Summarize and send to Slack
router.post('/summarize', summarizeLimiter, summarizeAndSend);

export default router;
