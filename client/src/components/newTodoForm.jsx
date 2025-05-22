import { Button } from '@/components/ui/button';
import { useState } from 'react';

const NewTodoForm = ({ onSubmit, onCancel }) => {
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('medium');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task || !dueDate) return;
        onSubmit({ task, priority, due_date: dueDate });
    };

    return (
        <form onSubmit={handleSubmit} className=" p-4 rounded-xl shadow-md space-y-3 border border-gray-200">
            <input className="w-full border p-2 rounded" placeholder="Task" value={task} onChange={(e) => setTask(e.target.value)} />
            <select className="w-full border p-2 rounded" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <input className="w-full border p-2 rounded cursor-pointer" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
                <Button type="submit">Add</Button>
            </div>
        </form>
    );
};

export default NewTodoForm;
