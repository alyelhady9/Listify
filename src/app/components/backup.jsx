"use client";
import { useState, useEffect , useRef} from 'react';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { GoTrash } from "react-icons/go";
import { LiaEdit } from "react-icons/lia";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');
  const hasMounted = useRef(false);
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true; // Set it to true after the first run
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      setTasks(storedTasks);}
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault()
    if (task && time) {
      const newTask = { id: Date.now(), task, time, completed: false };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setTask('');
      setTime('');
      
    }
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(t => t.id !== id);
    setTasks(updatedTasks);
  };

  const editTask = (id, newTask, newTime) => {
    const updatedTasks = tasks.map(t =>
      t.id === id ? { ...t, task: newTask, time: newTime } : t
    );
    setTasks(updatedTasks);
  };

  return (
    <div className='flex flex-col w-5/12 max-lg:w-full'>
      <div className='flex justify-between items-center mb-4 select-none'>
       <h1 className='text-lg font-bold w-fit dark:text-indigo-500 text-indigo-600'>Daily Tasks</h1>
       {
        tasks .length > 0 &&
       <div className='bg-indigo-600 text-white p-2 rounded-md cursor-pointer hover:bg-indigo-800 '
       onClick={() => setTasks([])}
       >Clear</div>
       }
      </div>
      <form onSubmit={addTask}>

      <div className='flex justify-between items-center p-3 bg-gray-200 dark:bg-gray-800'>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What needs to be done today?"
          className='border-2 w-7/12 p-2 rounded-md dark:bg-gray-700 dark:border-gray-600'
          />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className='w-3/12
          bg-gray-50 border border-gray-300 text-gray-900 text-sm
          rounded-md focus:ring-blue-500 focus:border-blue-500 block
          p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-indigo-600
          
          
          '
          />
        {task && time && (
          <button className='bg-indigo-600 text-white p-2 rounded-md' onClick={addTask}>
            Add 
          </button>
        )}
      </div>
        </form>
      <ul className='dark:bg-gray-800 list-none p-3 min-h-24 bg-gray-200 mt-4'>
        
        {
          tasks.length === 0 ? (
          <p className='text-center flex items-center h-full justify-center font-bold select-none text-indigo-600'>No tasks added yet</p>
        ):
        
        tasks.map(({ id, task, time, completed }) => (
          <li key={id}  className='dark:bg-gray-700 flex w-full justify-between items-center p-2 rounded-md my-2 bg-white'>
            <div className='flex items-center'>
              <span className=' mr-2 rounded-full' onClick={() => toggleTaskCompletion(id)}>
                {completed ? <FaCheckCircle className='text-green-600' /> : <FaRegCircle />}
              </span>
              <span className='ml-2'>{task} </span>
            </div>
            <div className='flex items-center'>
              <div className='mr-4'>
                <span className='text-gray-500 dark:text-gray-300'>{time}</span>
              </div>
              <button className='bg-red-600 text-white p-2 rounded-md font-bold text-lg hover:bg-red-800' onClick={() => deleteTask(id)}><GoTrash /></button>
              <button className='ml-4 bg-indigo-600 text-white p-2 rounded-md font-bold text-lg hover:bg-indigo-800' onClick={() => {
                const newTask = prompt('Edit task:', task);
                const newTime = prompt('Edit time:', time);
                if (newTask && newTime) {
                  editTask(id, newTask, newTime);
                }
              }}><LiaEdit /></button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Todo;
