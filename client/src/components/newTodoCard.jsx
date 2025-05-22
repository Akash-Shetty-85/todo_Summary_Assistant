import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';

const NewTodoCard = ({ onClick }) => (
    <Card
        onClick={onClick}
        className="flex flex-col justify-center items-center cursor-pointer p-4 shadow-md hover:shadow-lg transition-all rounded-2xl border-dashed border-2 border-gray-300 text-gray-500 hover:text-gray-700 hover:border-gray-500"
    >
        <Plus size={32} />
        <span className="mt-2 text-sm font-medium">Add New Task</span>
    </Card>
);

export default NewTodoCard;
