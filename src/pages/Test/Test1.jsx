import React, { useState, useEffect } from 'react';
import { Clock, Settings, PlusCircle, Edit2, Trash2 } from 'lucide-react';

const Test1Page = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [timer, setTimer] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('pomodoro');
  const [settings, setSettings] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  });
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newProject, setNewProject] = useState({ name: '' });
  const [newTask, setNewTask] = useState({ title: '', projectId: '', estimatedPomodoros: 1, comment: '' });

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const savedSettings = JSON.parse(localStorage.getItem('settings')) || settings;
    setProjects(savedProjects);
    setTasks(savedTasks);
    setSettings(savedSettings);
  }, []);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    let interval = null;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleTimerComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const handleTimerComplete = () => {
    setIsActive(false);
    if (mode === 'pomodoro') {
      if (currentTask) {
        const updatedTasks = tasks.map(task =>
          task.id === currentTask.id
            ? { ...task, completedPomodoros: (task.completedPomodoros || 0) + 1 }
            : task
        );
        setTasks(updatedTasks);
      }
      setMode('shortBreak');
      setTimer(settings.shortBreak * 60);
    } else {
      setMode('pomodoro');
      setTimer(settings.pomodoro * 60);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimer(settings[mode] * 60);
  };

  const addProject = () => {
    const newProjectWithId = { ...newProject, id: Date.now() };
    setProjects([...projects, newProjectWithId]);
    setNewProject({ name: '' });
    setIsAddingProject(false);
  };

  const editProject = (id) => {
    const projectToEdit = projects.find(project => project.id === id);
    setNewProject({ ...projectToEdit });
    setEditingProjectId(id);
    setIsEditingProject(true);
  };

  const updateProject = () => {
    setProjects(projects.map(project => 
      project.id === editingProjectId ? { ...project, ...newProject } : project
    ));
    setNewProject({ name: '' });
    setEditingProjectId(null);
    setIsEditingProject(false);
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
    setTasks(tasks.filter(task => task.projectId !== id));
  };

  const addTask = () => {
    const newTaskWithId = { ...newTask, id: Date.now(), completedPomodoros: 0 };
    setTasks([...tasks, newTaskWithId]);
    setNewTask({ title: '', projectId: '', estimatedPomodoros: 1, comment: '' });
    setIsAddingTask(false);
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    setNewTask({ ...taskToEdit });
    setEditingTaskId(id);
    setIsEditingTask(true);
  };

  const updateTask = () => {
    setTasks(tasks.map(task => 
      task.id === editingTaskId ? { ...task, ...newTask } : task
    ));
    setNewTask({ title: '', projectId: '', estimatedPomodoros: 1, comment: '' });
    setEditingTaskId(null);
    setIsEditingTask(false);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const selectTask = (task) => {
    setCurrentTask(task);
    resetTimer();
  };

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    setTimer(newSettings[mode] * 60);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Pomodoro App</h1>
      
      {/* Timer Section */}
      <div className="mb-6">
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${mode === 'pomodoro' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            onClick={() => { setMode('pomodoro'); setTimer(settings.pomodoro * 60); }}
          >
            Pomodoro
          </button>
          <button
            className={`px-4 py-2 rounded ${mode === 'shortBreak' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            onClick={() => { setMode('shortBreak'); setTimer(settings.shortBreak * 60); }}
          >
            Short Break
          </button>
          <button
            className={`px-4 py-2 rounded ${mode === 'longBreak' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => { setMode('longBreak'); setTimer(settings.longBreak * 60); }}
          >
            Long Break
          </button>
        </div>
        <div className="text-6xl font-bold text-center mb-4">
          {formatTime(timer)}
        </div>
        <div className="flex justify-center space-x-4">
          <button
            className={`px-6 py-2 rounded ${isActive ? 'bg-red-500' : 'bg-green-500'} text-white`}
            onClick={toggleTimer}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button
            className="px-6 py-2 rounded bg-gray-500 text-white"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
      </div>
      
      {/* Projects Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Projects</h2>
        <ul>
          {projects.map(project => (
            <li key={project.id} className="flex items-center justify-between mb-2 p-2 bg-gray-100 rounded">
              <span className="font-semibold">{project.name}</span>
              <div>
                <button onClick={() => editProject(project.id)} className="mr-2 text-yellow-500">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => deleteProject(project.id)} className="text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
        {isAddingProject || isEditingProject ? (
          <div className="mt-2">
            <input
              type="text"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              className="border rounded px-2 py-1 mr-2"
              placeholder="Project name"
            />
            <button
              onClick={isEditingProject ? updateProject : addProject}
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              {isEditingProject ? 'Update' : 'Add'}
            </button>
          </div>
        ) : (
          <button
            className="mt-2 flex items-center text-green-500"
            onClick={() => setIsAddingProject(true)}
          >
            <PlusCircle size={18} className="mr-1" /> Add Project
          </button>
        )}
      </div>
      
      {/* Tasks Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Tasks</h2>
        <ul>
          {tasks.map(task => (
            <li key={task.id} className="flex items-center justify-between mb-2 p-2 bg-gray-100 rounded">
              <div>
                <span className="font-semibold">{task.title}</span>
                <span className="ml-2 text-sm text-gray-600">
                  ({task.completedPomodoros || 0}/{task.estimatedPomodoros})
                </span>
                <p className="text-sm text-gray-500">{task.comment}</p>
              </div>
              <div>
                <button onClick={() => selectTask(task)} className="mr-2 text-blue-500">
                  <Clock size={18} />
                </button>
                <button onClick={() => editTask(task.id)} className="mr-2 text-yellow-500">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => deleteTask(task.id)} className="text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
        {isAddingTask || isEditingTask ? (
          <div className="mt-2">
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="border rounded px-2 py-1 mr-2 mb-2"
              placeholder="Task title"
            />
            <select
              value={newTask.projectId}
              onChange={(e) => setNewTask({ ...newTask, projectId: e.target.value })}
              className="border rounded px-2 py-1 mr-2 mb-2"
            >
              <option value="">Select Project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
            <input
              type="number"
              value={newTask.estimatedPomodoros}
              onChange={(e) => setNewTask({ ...newTask, estimatedPomodoros: parseInt(e.target.value) })}
              className="border rounded px-2 py-1 mr-2 mb-2 w-16"
              placeholder="Pomodoros"
            />
            <textarea
              value={newTask.comment}
              onChange={(e) => setNewTask({ ...newTask, comment: e.target.value })}
              className="border rounded px-2 py-1 mr-2 mb-2 w-full"
              placeholder="Comment"
            />
            <button
              onClick={isEditingTask ? updateTask : addTask}
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              {isEditingTask ? 'Update' : 'Add'}
            </button>
          </div>
        ) : (
          <button
            className="mt-2 flex items-center text-green-500"
            onClick={() => setIsAddingTask(true)}
          >
            <PlusCircle size={18} className="mr-1" /> Add Task
          </button>
        )}
      </div>
      
      {/* Settings Section */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Settings</h2>
        <div className="flex items-center mb-2">
          <label className="mr-2">Pomodoro:</label>
          <input
            type="number"
            value={settings.pomodoro}
            onChange={(e) => updateSettings({ ...settings, pomodoro: parseInt(e.target.value) })}
            className="border rounded px-2 py-1 w-16"
          />
          <span className="ml-1">min</span>
        </div>
        <div className="flex items-center mb-2">
          <label className="mr-2">Short Break:</label>
          <input
            type="number"
            value={settings.shortBreak}
            onChange={(e) => updateSettings({ ...settings, shortBreak: parseInt(e.target.value) })}
            className="border rounded px-2 py-1 w-16"
          />
          <span className="ml-1">min</span>
        </div>
        <div className="flex items-center">
          <label className="mr-2">Long Break:</label>
          <input
            type="number"
            value={settings.longBreak}
            onChange={(e) => updateSettings({ ...settings, longBreak: parseInt(e.target.value) })}
            className="border rounded px-2 py-1 w-16"
          />
          <span className="ml-1">min</span>
        </div>
      </div>
    </div>
  );
};

export default Test1Page;