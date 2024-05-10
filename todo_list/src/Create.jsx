import React, { useState } from 'react';
import axios from 'axios';

export const Create = () => {
    const [task, setTask] = useState('');

    const handleAdd = () => {
        if (!task.trim()) { 
            return; 
        }

        axios.post('http://localhost:3001/add', { task })
            .then(result => {
                location.reload();
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <input type="text" placeholder="Enter Task" value={task} onChange={(e) => setTask(e.target.value)} />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    );
};
