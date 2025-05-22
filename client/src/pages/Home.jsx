import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContex.jsx';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TodoCard from '@/components/todoCard';
import NewTodoCard from '@/components/newTodoCard';
import NewTodoForm from '@/components/newTodoForm';
import LoadingOverlay from '@/components/LoadingOverlay.jsx';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
    const { user, signOut, session } = useAuth();
    const [Todos, setTodos] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        const fetchTodos = async () => {
            if (!session?.access_token) return;

            setLoading(true); // ✅ Show loading screen on first load

            try {
                const response = await axios.get(`${BACKEND_URL}/`, {
                    headers: { Authorization: `Bearer ${session.access_token}` },
                });
                setTodos(response.data);
            } catch (error) {
                console.error('Error fetching todos:', error);
            } finally {
                setLoading(false); // ✅ Hide it once done
            }
        };

        fetchTodos();
    }, [user]);


    const handleLogout = async () => {
        setLoading(true);
        try {
            await signOut();
            navigate('/auth');
        } catch (error) {
            console.error('Error signing out:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTodo = async (newTodo) => {
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/`, newTodo, {
                headers: { Authorization: `Bearer ${session.access_token}` },
            });

            const createdTodo = response.data;
            if (createdTodo?.id) {
                setTodos((prev) => [...prev, createdTodo]);
                setShowForm(false);
            }
        } catch (error) {
            console.error('Error creating todo:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTodo = async (id) => {
        const confirmed = window.confirm("🗑️ Are you sure you want to delete this todo?");
        if (!confirmed) return;

        setLoading(true);
        try {
            await axios.delete(`${BACKEND_URL}/${id}`, {
                headers: { Authorization: `Bearer ${session.access_token}` },
            });
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
            alert('❌ Failed to delete todo. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const GenerateSummeryOfPendingTodos = async () => {
        if (!session?.access_token) return;

        setLoading(true);
        setIsGenerating(true);

        try {
            const cleanedTodos = Todos
                .filter(todo => todo && typeof todo === 'object') // extra safety
                .map(({ task, is_completed, priority }) => ({ task, is_completed, priority }));

            if (cleanedTodos.length === 0) {
                alert("⚠️ No todos found. Please add some todos before generating a summary.");
                return;
            }

            const response = await axios.post(
                `${BACKEND_URL}/summarize`,
                { todos: cleanedTodos },
                {
                    headers: {
                        Authorization: `Bearer ${session.access_token}`,
                    },
                }
            );

            alert('✅ Summary sent to Slack\n\n');
        } catch (error) {
            console.error('Error generating summary:', error);
            alert('❌ Failed to generate and send summary.\n\n' + (error.response?.data?.error || error.message));
        } finally {
            setIsGenerating(false);
            setLoading(false);
        }
    };


    const handelEditTodo = async (id, currentTodo) => {
        const newStatus = !currentTodo.is_completed;
        const confirmed = window.confirm(
            `Are you sure you want to mark this task as ${newStatus ? 'completed' : 'incomplete'}?`
        );
        if (!confirmed) return;

        try {
            const token = session?.access_token;
            if (!token) throw new Error("User not authenticated");

            // Toggle is_completed
            const payload = {
                is_completed: newStatus,
            };

            const res = await axios.patch(`${BACKEND_URL}/${id}/status`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const updated = res.data;
            console.log('Updated successfully:', updated);

            setTodos(prev =>
                prev.map(todo => (todo.id === id ? { ...todo, is_completed: newStatus } : todo))
            );
        } catch (error) {
            console.error('Error updating todo:', error.response?.data || error.message);
            alert('Something went wrong while updating the todo.');
        }
    };



    return (
        <div>
            <nav className="flex justify-end p-3 items-center gap-5">
                {user ? (
                    <>
                        <span>{user.email}</span>
                        <Button onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <Button onClick={() => navigate('/auth')}>Login</Button>
                )}
            </nav>

            <main>
                <header className='m-4 flex items-center justify-evenly'>
                    <h1 className="text-3xl font-bold text-center w-[90%] ">TO-DO LIST</h1>
                    <Button className='bg-blue-300 text-black/80 cursor-pointer hover:bg-blue-600 hover:text-white'
                        onClick={GenerateSummeryOfPendingTodos}
                    >Generate</Button>
                </header>

                {Todos.length === 0 && !showForm && (
                    <p className="text-center text-gray-500 mb-4">No to-dos yet. Add one to get started!</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pb-6">
                    {showForm ? (
                        <NewTodoForm onSubmit={handleCreateTodo} onCancel={() => setShowForm(false)} />
                    ) : (
                        <NewTodoCard onClick={() => setShowForm(true)} />
                    )}

                    {Todos.filter(Boolean).map((todo) => (
                        todo?.id && (
                            <TodoCard
                                key={todo.id}
                                todo={todo}
                                onDelete={() => handleDeleteTodo(todo.id)}
                                onUpdate={() => {
                                    // Handle update logic here if needed
                                    handelEditTodo(todo.id, todo);
                                }}
                            />
                        )
                    ))}

                </div>
            </main>
            {loading && <LoadingOverlay />}
        </div>
    );
};

export default Home;
