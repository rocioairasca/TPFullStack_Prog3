import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivatePage = () => {
  const { isAuthenticated, user, logout } = useAuth0();

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ name: '', description: ''});
  const [editMode, setEditMode] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
 
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 7;


  useEffect(() => {
    fetchTasks();
  }, [currentPage]); 
  
  const fetchTasks = async () => {
    if (user && user.name) { // Asegúrate de que el username no esté vacío
      try {
        const response = await axios.get(
          `https://tp-full-stack-prog3.vercel.app/api/task/${user.name}`,
          {
            params: {
              page: currentPage,
              perPage: perPage,
              sort: JSON.stringify({ createdAt: -1 }),
            },
          }
        );
        setTasks(response.data.tasks);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      };
    }
  };

  // Si no está autenticado, redirigir a la página pública
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
    console.log(currentPage);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
    console.log(currentPage);
  };

  // creamos una nueva tarea
  const createTask = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const taskData = {
        ...task,
        user: user.name, // Añadir el username a los datos de la tarea
      };

      const response = await axios.post("https://tp-full-stack-prog3.vercel.app/api/task", taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(prevTasks => [...prevTasks, response.data]); // Añadir la nueva tarea a la lista de tareas
      setTask({ name: '', description: '' });
      fetchTasks();

    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const editTask = async (_id) => {
    const response = await axios.put(`https://tp-full-stack-prog3.vercel.app/api/task/${_id}`, {...task});
    setTasks(tasks.map((t) => (t._id === _id ? response.data : t))); // actualizamos la lista de tareas
    setTask({ name: '', description: '' });
    setEditMode(false);
  }

  // Deshabilitamos tareas
  const disableTasks = async () => {
    await Promise.all(
      selectedTasks.map(async (taskId) => {
        await axios.patch(`https://tp-full-stack-prog3.vercel.app/api/task/${taskId}`, { completed: true });
      })
    );

    fetchTasks();
    
    // Filtrar tareas completadas
    const updatedTasks = tasks.filter((t) => !selectedTasks.includes(t._id));
    setTasks(updatedTasks);
    setSelectedTasks([]); // Limpiar selección
  };


  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Task Manager</span>
          <h5>Bienvenido, {user.name}</h5>
          <button className='btn btn-outline-danger' type='button' onClick={() => logout({ returnTo: window.location.origin })}>Cerrar sesión</button>
        </div>
      </nav>


      <div className='mt-5 p-4'>
        <div className='row'>
          <div className='col-3'>
            <div className="card text-center mb-3">
              <div className="card-header">
                {editMode ? 'Editar Tarea' : 'Crear Nueva Tarea'}
              </div>
              <div className="card-body">
                <form onSubmit={(e) => { e.preventDefault(); editMode ? editTask(task._id) : createTask(); }}>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Título</span>
                    <input
                      type="text"
                      className="form-control"
                      value={task.name}
                      onChange={(e) => setTask({ ...task, name: e.target.value })}
                      placeholder="Ingrese el título de la tarea"
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Descripción</span>
                    <textarea
                      className="form-control"
                      value={task.description}
                      onChange={(e) => setTask({ ...task, description: e.target.value })}
                      placeholder="Ingrese la descripción de la tarea"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {editMode ? 'Actualizar Tarea' : 'Crear Tarea'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className='col p-3'>
            <div className="card text-center">
              <div className="card-header">
                TAREAS - Página {currentPage + 1}
              </div>
              <div className="card-body">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">
                        <input
                          type='checkbox'
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTasks(tasks.map(task => task._id));
                            } else {
                              setSelectedTasks([]);
                            }
                          }}
                        />
                      </th>
                      <th scope="col">Tarea</th>
                      <th scope="col">Descripción</th>
                      <th scope="col">Fecha de Creación</th>
                      <th scope='col'>Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {tasks.map((task, index) => (
                      <tr key={task._id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedTasks.includes(task._id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedTasks([...selectedTasks, task._id]);
                              } else {
                                setSelectedTasks(selectedTasks.filter((id) => id !== task._id));
                              }
                            }}
                          />
                        </td>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <td>{new Date(task.createdAt).toLocaleString()}</td>
                        <td>
                          <div className="btn-group" role="group" aria-label="Basic example">
                            <button onClick={() => { setTask(task); setEditMode(true); }} className="btn btn-info">Editar</button>
                            {/* Puedes agregar más botones aquí si es necesario */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
          <button className='btn btn-primary' onClick={disableTasks}>Completar Tareas Seleccionadas</button>
        </div>
        
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
              <p className="page-link" onClick={handlePrevPage}>Anterior</p>
            </li>
            {/** 
            {[...Array(Math.ceil(totalTasks / perPage))].map((_, index) => (
              <li className={`page-item ${currentPage === index ? 'active' : ''}`} key={index}>
                <a className="page-link" href='#' onClick={() => handlePageChange(index)}>{index + 1}</a>
              </li>
            ))}
            */}
            <li className={`page-item ${currentPage < (totalPages - 1) ? '' : 'disabled'}`}>
              <p className="page-link" onClick={handleNextPage}>Siguiente</p>
            </li>
          </ul>
        </nav>

      </div>

      <footer>
        <div className='container p-3 mt-5 border-top'>
          <small className='d-block text-muted text-center'>&copy; 2024 - FullStack Task Manager</small>
        </div>
      </footer>
    </div>
  );
};

export default PrivatePage;
