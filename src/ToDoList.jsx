import React, { useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState([{ text: 'Get better', completed: false }]);
    const [newTask, setNewTask] = useState('');
    const [error, setNewError] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    function handleNewTask(e) {
        setNewTask(e.target.value);
        setNewError('');
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            if (editIndex !== null) {
                saveEdit();
            } else {
                addNewTask();
            }
        }
    }

    function addNewTask() {
        if (newTask.trim() === '') {
            setNewError("Task Can't be empty");
            return;
        } else if (tasks.some(task => task.text === newTask.trim())) {
            setNewError('Task already exists');
            return;
        }
        setTasks(t => [...t, { text: newTask.trim(), completed: false }]);
        setNewError('');
        setNewTask('');
        setSuccessMessage('Task added successfully!');
        setTimeout(() => setSuccessMessage(''), 2500);
    }

    function deleteTask(index) {
        setTasks(t => t.filter((_, i) => i !== index));
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function startEdit(index) {
        setEditIndex(index);
        setNewTask(tasks[index].text);
    }

    function saveEdit() {
        if (newTask.trim() === '') {
            setNewError("Task Can't be empty");
            return;
        } else if (tasks.some(task => task.text === newTask.trim()) && tasks[editIndex].text !== newTask.trim()) {
            setNewError('Task already exists');
            return;
        }
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = { text: newTask.trim(), completed: false };
        setTasks(updatedTasks);
        setNewTask('');
        setEditIndex(null);
        setNewError('');
        setSuccessMessage('Task updated successfully!');
        setTimeout(() => setSuccessMessage(''), 2500);
    }

    function toggleCompletion(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    }

    return (
        <div className="to-do-list">
            <h1>To Do List</h1>
            <div className='add-task'>
                <input
                    type="text"
                    placeholder="Enter a task"
                    onChange={handleNewTask}
                    value={newTask}
                    onKeyDown={handleKeyDown}
                />
                <button className='add-button' onClick={editIndex !== null ? saveEdit : addNewTask}>
                    {editIndex !== null ? '✔️' : 'Add'}
                </button>
            </div>
            {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p className="success-message" style={{ color: 'green' }}>{successMessage}</p>}
            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span
                            className={`text ${task.completed ? 'completed-task' : ''}`}
                            onClick={() => toggleCompletion(index)}
                        >
                            {task.text}
                        </span>
                        <button className="edit-button" onClick={() => startEdit(index)}>✏️</button>
                        <button className="delete-button" onClick={() => deleteTask(index)}>🗑️</button>
                        <button className="move-button" onClick={() => moveTaskUp(index)}>⬆️</button>
                        <button className="move-button" onClick={() => moveTaskDown(index)}>⬇️</button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
