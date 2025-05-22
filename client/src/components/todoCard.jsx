import React from 'react';
import { BadgeCheck, Clock, Flag, Trash2, CheckCircle, Undo2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const priorityColors = {
  high: 'text-red-600',
  medium: 'text-yellow-500',
  low: 'text-green-500',
};

const TodoCard = ({ todo, onDelete, onUpdate }) => {
  return (
    <TooltipProvider>
      <Card
        className={`p-4 shadow-md hover:shadow-lg transition-all rounded-2xl ${todo.is_completed ? 'bg-green-800 text-white' : ''}`}>
        <div className="flex justify-between items-center">
          <section>
            <h2 className="text-xl font-semibold h-fit max-w-[90%]">{todo.task}</h2>
          </section>
          <section>
            <div className="flex items-center gap-2">
              {todo.is_completed ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Undo2
                      className="cursor-pointer text-yellow-300"
                      onClick={onUpdate}
                    />
                  </TooltipTrigger>
                  <TooltipContent>Mark as Incomplete</TooltipContent>
                </Tooltip>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CheckCircle
                      className="cursor-pointer text-green-500"
                      onClick={onUpdate}
                    />
                  </TooltipTrigger>
                  <TooltipContent>Mark as Completed</TooltipContent>
                </Tooltip>
              )}

              <Tooltip>
                <TooltipTrigger asChild>
                  <Trash2
                    className="cursor-pointer text-red-500"
                    onClick={onDelete}
                  />
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
            </div>
          </section>
        </div>

        <CardContent className="mt-2 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>Due: {new Date(todo.due_date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Flag size={16} className={priorityColors[todo.priority]} />
            <span className={`${priorityColors[todo.priority]} capitalize`}>
              Priority: {todo.priority}
            </span>
          </div>
          <div className="text-xs text-gray-400">
            Created: {new Date(todo.created_at).toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default TodoCard;
