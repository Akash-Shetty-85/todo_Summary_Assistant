// src/controllers/todosController.js
import supabase from '../services/supabase.Service.js';
import llmService from '../services/openai.Service.js';
import slackService from '../services/slack.Service.js';
import { TodoInputSchema } from '../validators/todoSchema.js';

export const getTodos = async (req, res) => {
    const userId = req.user.id;
    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', userId)
        .order('created_at');

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
};

export const addTodo = async (req, res) => {
    const userId = req.user.id;
    const { task, due_date, priority } = req.body;

    const { data, error } = await supabase
        .from('todos')
        .insert([{ task, user_id: userId, due_date, priority }])
        .select()
        .single(); // 👈 Ensures you get a single object instead of an array

    if (error) return res.status(400).json({ error: error.message });

    res.status(201).json(data); // 👈 data is now a single todo object
};


export const deleteTodo = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    // Ensure todo belongs to user
    const { data: todo } = await supabase.from('todos').select('user_id').eq('id', id).single();
    if (!todo || todo.user_id !== userId) return res.status(403).json({ error: 'Not allowed' });

    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    res.sendStatus(204);
};

export const summarizeAndSend = async (req, res) => {

    const taskList = req.body.todos
    const userId = req.user.id;


    const formatTasksForLLM = (taskList = []) => {
        if (!Array.isArray(taskList) || taskList.length === 0) {
            return 'No tasks provided.';
        }

        return taskList.map((task, idx) => {
            return `${idx + 1}. Task: ${task.task?.trim() || 'Unnamed task'}
         - Priority: ${task.priority || 'not set'}
         - Completed: ${task.is_completed ? 'Yes' : 'No'}`;
        }).join('\n\n');
    };



    try {
        // can swap in between the LLM providers
        const summary = await llmService.generateWithFallback(formatTasksForLLM(taskList));
        const slackResponse = await slackService.sendToSlack(summary);
        const { error } = await supabase
            .from('summary_logs')
            .insert([{ user_id: userId, summary }]);

        if (error) {
            console.error('Error saving summary to DB:', error.message);
            return res.status(500).json({ error: 'Summary sent to Slack but failed to save to DB.' });
        }
        res.json({
            message: 'Summary sent to Slack and logged successfully!',
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};