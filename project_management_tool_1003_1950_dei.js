// 代码生成时间: 2025-10-03 19:50:57
 * Features:
 * - Project creation
 * - Task addition
 * - Task completion
 * - Task deletion
 * - Error handling
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

// GraphQL query to fetch projects
const projectQuery = graphql`
  query ProjectQuery {
    allProject {
      nodes {
        id
        name
        tasks {
          id
          description
          completed
        }
      }
    }
  }
`;

// Project component
const Project = ({ project }) => {
  const [showTasks, setShowTasks] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState(null);

  // Toggle tasks display
  const toggleTasks = () => setShowTasks(!showTasks);

  // Add task
  const addTask = () => {
    if (!newTask.trim()) {
      setError('Task description cannot be empty.');
      return;
    }
    // In a real application, this would involve an API call
    const newTasks = project.tasks.concat({
      id: Date.now().toString(),
      description: newTask,
      completed: false,
    });
    project.tasks = newTasks;
    setNewTask('');
    setError(null);
  };

  // Delete task
  const deleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const newTasks = project.tasks.filter((task) => task.id !== taskId);
      project.tasks = newTasks;
    }
  };

  // Complete task
  const completeTask = (taskId) => {
    const newTasks = project.tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    project.tasks = newTasks;
  };

  return (
    <div>
      <h2 onClick={toggleTasks}>{project.name}</h2>
      {showTasks && (
        <div>
          {project.tasks.map((task) => (
            <div key={task.id}>
              {task.description} {' '}
              <button onClick={() => completeTask(task.id)}>
                {task.completed ? 'Undo' : 'Done'}
              </button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          ))}
          <input
            type='text'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder='Add a new task...'
          />
          <button onClick={addTask}>Add Task</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

Project.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })).isRequired,
  }).isRequired,
};

// Main project management component
const ProjectManagementTool = () => {
  const data = useStaticQuery(projectQuery);
  const projects = data.allProject.nodes;

  return (
    <div>
      {projects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectManagementTool;
