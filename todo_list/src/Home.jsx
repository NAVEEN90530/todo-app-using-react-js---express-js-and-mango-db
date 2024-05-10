import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Create } from './Create';
import { BsFillCheckCircleFill, BsCircleFill, BsFillTrashFill } from 'react-icons/bs'; 
import "./Home.css";

export const Home = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id) => {
        axios.put(`http://localhost:3001/update/${id}`)
            .then(result => {
                const updatedTodos = todos.map(todo => {
                    if (todo._id === id) {
                        return { ...todo, done: !todo.done };
                    }
                    return todo;
                });
                setTodos(updatedTodos);
            })
            .catch(err => console.log(err));
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(result => {
                const updatedTodos = todos.filter(todo => todo._id !== id);
                setTodos(updatedTodos);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="container">
            <h2 className="title">Todo List</h2>
            <Create />

            {todos.length === 0 ? (
                <div>
                    <h2>No Records</h2>
                </div>
            ) : 
            todos.map( todo =>(
                <div className="task" key={todo._id}>
                    <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                        {todo.done ? 
                            <BsFillCheckCircleFill className="icon circlecheck" />
                            : 
                            <BsCircleFill className="icon" />
                        }
                        <p className={todo.done ? "line-through" : ""}>{todo.task}</p>
                    </div>
                    <div>
                        <span><BsFillTrashFill className="icon delete-icon" onClick={() => handleDelete(todo._id)} /></span>
                    </div>
                </div>
            ))}
        </div>
    );
};
