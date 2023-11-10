import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/crudusers.css';

const CRUDUSERS = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: '', password: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Obtener la lista de usuarios al cargar el componente
    axios.get('http://localhost:4000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de usuarios:', error);
      });
  }, []);

  const handleCreateUser = () => {
    // Crear un nuevo usuario
    axios.post('http://localhost:4000/users', newUser)
      .then(response => {
        console.log('Usuario creado exitosamente:', response.data);
        // Actualizar la lista de usuarios después de la creación
        setUsers([...users, response.data]);
        // Limpiar los campos de entrada después de la creación
        setNewUser({ email: '', password: '' });
      })
      .catch(error => {
        console.error('Error al crear el usuario:', error);
      });
  };

  const handleEditUser = () => {
    // Editar un usuario existente
    axios.put(`http://localhost:4000/users/${editingUser.id}`, editingUser)
      .then(response => {
        console.log('Usuario editado exitosamente:', response.data);
        // Actualizar la lista de usuarios después de la edición
        setUsers(users.map(user => (user.id === editingUser.id ? response.data : user)));
        // Cerrar el modal de edición
        closeEditModal();
      })
      .catch(error => {
        console.error('Error al editar el usuario:', error);
      });
  };

  const handleDeleteUser = (userId) => {
    // Eliminar un usuario
    axios.delete(`http://localhost:4000/users/${userId}`)
      .then(response => {
        console.log('Usuario eliminado exitosamente:', response.data);
        // Actualizar la lista de usuarios después de la eliminación
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => {
        console.error('Error al eliminar el usuario:', error);
      });
  };

  const openEditModal = (user) => {
    // Abrir el modal de edición y cargar los datos del usuario seleccionado
    setEditingUser(user);
    // Abre el modal de edición (puedes usar refs o estados para manejar esto según tus necesidades)
    document.getElementById('editEmployeeModal').style.display = 'block';
  };

  const closeEditModal = () => {
    // Cerrar el modal de edición y limpiar el usuario en edición
    setEditingUser(null);
    // Cierra el modal de edición (puedes usar refs o estados para manejar esto según tus necesidades)
    document.getElementById('editEmployeeModal').style.display = 'none';
  };
   
  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>Gestionar <b>Usuarios</b></h2>
              </div>
              <div className="col-sm-6">
                <a href="#addEmployeeModal" className="btn btn-success" data-toggle="modal">
                  <i className="material-icons">&#xE147;</i> <span>Añadir un usuario nuevo</span>
                </a>
                <a href="#deleteEmployeeModal" className="btn btn-danger" data-toggle="modal">
                  <i className="material-icons">&#xE15C;</i> <span>Eliminar</span>
                </a>						
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>
                  <span className="custom-checkbox">
                    <input type="checkbox" id="selectAll" />
                    <label htmlFor="selectAll"></label>
                  </span>
                </th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo electrónico</th>
                <th>Contraseña</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <a href="#editEmployeeModal" className="edit" data-toggle="modal" onClick={() => openEditModal(user)}>
                      <i className="material-icons" data-toggle="tooltip" title="Editar">&#xE254;</i>
                    </a>
                    <a href="#deleteEmployeeModal" className="delete" data-toggle="modal" onClick={() => handleDeleteUser(user.id)}>
                      <i className="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
          <div className="clearfix">
            <div className="hint-text">Mostrando <b>5</b> de <b>25 </b> Entradas</div>
            <ul className="pagination">
              <li className="page-item disabled"><a href="#">Anterior</a></li>
              <li className="page-item"><a href="#" className="page-link">1</a></li>
              <li className="page-item"><a href="#" className="page-link">2</a></li>
              <li className="page-item active"><a href="#" className="page-link">3</a></li>
              <li className="page-item"><a href="#" className="page-link">4</a></li>
              <li className="page-item"><a href="#" className="page-link">5</a></li>
              <li className="page-item"><a href="#" className="page-link">Siguiente</a></li>
            </ul>
          </div>
        </div>
      </div>

          {/* Modal para Añadir Usuario */}
      <div id="addEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleCreateUser}>
              <div className="modal-header">						
                <h4 className="modal-title">Añadir Usuario</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">					
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    required 
                  />
                </div>					
              </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancelar" />
                <input type="submit" className="btn btn-success" value="Añadir" />
              </div>
            </form>
          </div>
        </div>
      </div>


      {/* Modal para Editar Usuario */}
      <div id="editEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleEditUser}>
              <div className="modal-header">
                <h4 className="modal-title">Editar Usuario</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contraseña</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingUser.password}
                    onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancelar" />
                <input type="submit" className="btn btn-info" value="Guardar" />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Modal para Eliminar Usuario */}
      <div id="deleteEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={() => handleDeleteUser(editingUser.id)}>
              <div className="modal-header">
                <h4 className="modal-title">Eliminar Usuario</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro/a de que quieres eliminar este usuario?</p>
                <p className="text-warning"><small>Estás a punto de eliminar un usuario. Esta acción no se puede deshacer.</small></p>
              </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancelar" />
                <input type="submit" className="btn btn-danger" value="Eliminar" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRUDUSERS;

