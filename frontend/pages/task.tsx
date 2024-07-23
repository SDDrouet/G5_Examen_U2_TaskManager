// pages/task.tsx
import React from 'react';
import TaskView from '../views/taskView';

const TaskPage: React.FC = () => {
    return (
        <div className="container mx-auto p-6">
            <TaskView />
        </div>
    );
};

export default TaskPage;
